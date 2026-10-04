import fs from "node:fs";

const html=fs.readFileSync("index.html","utf8");
const js=fs.readFileSync("app.js","utf8");
const css=fs.readFileSync("styles.css","utf8");
const sw=fs.readFileSync("sw.js","utf8");
const tools=JSON.parse(fs.readFileSync("data/tools.json","utf8"));

const errors=[];
const warnings=[];
const fail=m=>errors.push(m);
const warn=m=>warnings.push(m);

try{new Function(js)}catch(error){fail("app.js syntax: "+error.message)}

const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const idSet=new Set(ids);
for(const id of idSet){
  if(ids.filter(x=>x===id).length>1)fail("Duplicate HTML id: "+id);
}

const dynamicIds=new Set(["copyToolLink"]);
const refs=[...js.matchAll(/\$\("#([^"]+)"\)/g)].map(m=>m[1]);
for(const id of new Set(refs)){
  if(!idSet.has(id)&&!dynamicIds.has(id))fail("app.js references missing #"+id);
}

const i18n=[...html.matchAll(/data-i18n="([^"]+)"/g)].map(m=>m[1]);
const placeholders=[...html.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m=>m[1]);
for(const key of new Set([...i18n,...placeholders])){
  const matches=js.match(new RegExp("\\b"+key+":","g"))||[];
  if(matches.length<2)fail("Missing HE/EN translation key: "+key);
}

const quicks=[...html.matchAll(/data-quick="([^"]+)"/g)].map(m=>m[1]);
for(const quick of new Set(quicks)){
  if(!js.includes('kind==="'+quick+'"'))fail("Unhandled data-quick action: "+quick);
}

let depth=0,minDepth=0;
for(const ch of css){
  if(ch==="{")depth++;
  if(ch==="}"){depth--;minDepth=Math.min(minDepth,depth)}
}
if(depth!==0||minDepth<0)fail("CSS braces unbalanced: depth="+depth+", min="+minDepth);

if(!Array.isArray(tools))fail("data/tools.json must be an array");
const names=new Set();
const urls=new Set();
for(const [i,tool] of tools.entries()){
  const prefix="Tool #"+(i+1);
  if(!tool||typeof tool!=="object"){fail(prefix+" is not an object");continue}
  for(const key of ["name","url","category","pricing"]){
    if(!tool[key])fail(prefix+" missing "+key);
  }
  if(!Array.isArray(tool.platforms)||tool.platforms.length===0)warn((tool.name||prefix)+" has no platforms");
  if(!tool.descHe&&!tool.descEn&&!tool.desc)warn((tool.name||prefix)+" has no description");
  if(tool.name){
    const n=tool.name.toLowerCase();
    if(names.has(n))fail("Duplicate tool name: "+tool.name);
    names.add(n);
  }
  if(tool.url){
    if(!/^https:\/\/[^\s]+$/i.test(tool.url))fail("Invalid HTTPS URL for "+tool.name+": "+tool.url);
    const normalized=tool.url.replace(/\/$/,"").toLowerCase();
    if(urls.has(normalized))warn("Duplicate URL: "+tool.url);
    urls.add(normalized);
  }
  if(!["free","freemium","paid"].includes(tool.pricing))fail("Invalid pricing for "+tool.name+": "+tool.pricing);
}

const cssVersion=html.match(/styles\.css\?v=(\d+)/)?.[1];
const appVersion=html.match(/app\.js\?v=(\d+)/)?.[1];
const dataVersion=js.match(/tools\.json\?v=(\d+)/)?.[1];
const cacheVersion=sw.match(/ai-atlas-v(\d+)/)?.[1];
if(!cssVersion||!appVersion||!dataVersion||!cacheVersion)fail("Could not detect all cache versions");
else if(new Set([cssVersion,appVersion,dataVersion,cacheVersion]).size!==1){
  fail("Cache versions differ: css="+cssVersion+", app="+appVersion+", data="+dataVersion+", sw="+cacheVersion);
}

console.log("AI Atlas audit");
console.log("- tools:",tools.length);
console.log("- html ids:",idSet.size);
console.log("- DOM refs:",new Set(refs).size);
console.log("- quick actions:",new Set(quicks).size);
console.log("- cache version:",cssVersion||"?");

if(warnings.length){
  console.warn("\nWarnings:");
  warnings.forEach(x=>console.warn("- "+x));
}
if(errors.length){
  console.error("\nErrors:");
  errors.forEach(x=>console.error("- "+x));
  process.exit(1);
}
console.log("\nValidation passed.");
