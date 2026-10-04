import fs from "node:fs/promises";

const tools = JSON.parse(await fs.readFile("data/tools.json", "utf8"));
const timeoutMs = 12000;
const okRestricted = new Set([401,403,405,429]);

async function check(tool){
  const url = String(tool.url || "").trim();
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), timeoutMs);
  try{
    const res = await fetch(url,{
      method:"GET",
      redirect:"follow",
      signal:controller.signal,
      headers:{"user-agent":"AI-Atlas-LinkChecker/1.0"}
    });
    clearTimeout(timer);
    const ok = (res.status >= 200 && res.status < 400) || okRestricted.has(res.status);
    return {
      name:tool.name,
      url,
      ok,
      status:res.status,
      finalUrl:res.url || url
    };
  }catch(error){
    clearTimeout(timer);
    return {
      name:tool.name,
      url,
      ok:false,
      status:0,
      error:error?.name==="AbortError" ? "timeout" : String(error?.message || error)
    };
  }
}

const results=[];
const concurrency=8;
let cursor=0;

async function worker(){
  while(true){
    const i=cursor++;
    if(i>=tools.length) return;
    results[i]=await check(tools[i]);
  }
}

await Promise.all(Array.from({length:concurrency},worker));

const broken=results.filter(x=>!x.ok);
const redirected=results.filter(x=>x.ok && x.finalUrl && x.finalUrl!==x.url);

await fs.writeFile("link-check-report.json",JSON.stringify({
  checkedAt:new Date().toISOString(),
  total:results.length,
  broken:broken.length,
  redirected:redirected.length,
  results
},null,2));

console.log(`Checked ${results.length} links`);
console.log(`Broken: ${broken.length}`);
console.log(`Redirected: ${redirected.length}`);

if(redirected.length){
  console.log("\nRedirects:");
  for(const x of redirected) console.log(`- ${x.name}: ${x.url} -> ${x.finalUrl} [${x.status}]`);
}

if(broken.length){
  console.error("\nBroken links:");
  for(const x of broken) console.error(`- ${x.name}: ${x.url} [${x.status || x.error}]`);
  process.exitCode=1;
}
