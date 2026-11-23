import fs from "node:fs/promises";

const tools = JSON.parse(await fs.readFile("data/tools.json", "utf8"));
const timeoutMs = 12000;
const maxAttempts = 2;
const okRestricted = new Set([401,403,405,429]);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function request(url){
  let lastError = null;

  for(let attempt=1; attempt<=maxAttempts; attempt++){
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), timeoutMs);

    try{
      const res = await fetch(url,{
        method:"GET",
        redirect:"follow",
        signal:controller.signal,
        headers:{
          "user-agent":"Mozilla/5.0 (compatible; AI-Atlas-LinkChecker/2.0; +https://eliron8565.github.io/all-AI-There-is/)",
          "accept":"text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8"
        }
      });

      clearTimeout(timer);

      if(res.status >= 500 && attempt < maxAttempts){
        await sleep(650 * attempt);
        continue;
      }

      return {res,attempt};
    }catch(error){
      clearTimeout(timer);
      lastError = error;

      if(attempt < maxAttempts){
        await sleep(650 * attempt);
        continue;
      }
    }
  }

  throw lastError || new Error("request failed");
}

async function check(tool){
  const url = String(tool.url || "").trim();

  if(!url){
    return {name:tool.name,url,ok:false,kind:"invalid",status:0,error:"missing URL"};
  }

  try{
    new URL(url);
  }catch{
    return {name:tool.name,url,ok:false,kind:"invalid",status:0,error:"invalid URL"};
  }

  try{
    const {res,attempt} = await request(url);
    const ok = (res.status >= 200 && res.status < 400) || okRestricted.has(res.status);
    const kind = ok ? "ok" : ([404,410].includes(res.status) ? "broken" : "http-error");

    return {
      name:tool.name,
      url,
      ok,
      kind,
      status:res.status,
      finalUrl:res.url || url,
      attempts:attempt
    };
  }catch(error){
    return {
      name:tool.name,
      url,
      ok:false,
      kind:"unreachable",
      status:0,
      attempts:maxAttempts,
      error:error?.name==="AbortError" ? "timeout" : String(error?.message || error)
    };
  }
}

const results=[];
const concurrency=4;
let cursor=0;

async function worker(){
  while(true){
    const i=cursor++;
    if(i>=tools.length) return;
    results[i]=await check(tools[i]);
  }
}

await Promise.all(Array.from({length:concurrency},worker));

const suspicious=results.filter(x=>!x.ok);
const hardBroken=suspicious.filter(x=>x.kind==="broken" || x.kind==="invalid");
const unreachable=suspicious.filter(x=>x.kind==="unreachable");
const otherHttp=suspicious.filter(x=>x.kind==="http-error");
const redirected=results.filter(x=>x.ok && x.finalUrl && x.finalUrl!==x.url);

await fs.writeFile("link-check-report.json",JSON.stringify({
  checkedAt:new Date().toISOString(),
  total:results.length,
  suspicious:suspicious.length,
  hardBroken:hardBroken.length,
  unreachable:unreachable.length,
  otherHttp:otherHttp.length,
  redirected:redirected.length,
  results
},null,2));

console.log(`Checked ${results.length} links`);
console.log(`Suspicious: ${suspicious.length}`);
console.log(`Hard broken / invalid: ${hardBroken.length}`);
console.log(`Temporarily unreachable: ${unreachable.length}`);
console.log(`Other HTTP errors: ${otherHttp.length}`);
console.log(`Redirected: ${redirected.length}`);

if(suspicious.length){
  console.log("\nSuspicious links (reported as warnings; workflow stays healthy):");
  for(const x of suspicious){
    const reason=x.status || x.error || x.kind;
    console.log(`::warning title=AI Atlas link check::${x.name}: ${x.url} [${reason}]`);
  }
}

console.log("\nLink check finished. External site blocking/timeouts do not fail the workflow.");
