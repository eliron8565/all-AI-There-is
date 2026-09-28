const state={tools:[],filtered:[],lang:localStorage.getItem("aiatlas-lang")||"he",favorites:new Set(JSON.parse(localStorage.getItem("aiatlas-favs")||"[]"))};
const $=s=>document.querySelector(s);
const els={grid:$("#toolsGrid"),search:$("#searchInput"),heroSearch:$("#heroSearch"),cat:$("#categoryFilter"),price:$("#pricingFilter"),student:$("#studentFilter"),fav:$("#favoriteFilter"),count:$("#resultCount"),empty:$("#emptyState"),dialog:$("#toolDialog"),dialogContent:$("#dialogContent")};
const i18n={
he:{navDiscover:"גילוי",navStudents:"לסטודנטים",navCategories:"קטגוריות",fresh:"קטלוג AI שמתעדכן בקלות",hero1:"כל כלי ה־AI.",hero2:"במקום אחד.",heroDesc:"מצא כלי לפי משימה, מחיר, שימוש חינמי והטבות לסטודנטים — בלי לטבוע במאות טאבים.",tools:"כלים",categories:"קטגוריות",freeOptions:"עם אפשרות חינמית",studentDeals:"הטבות סטודנטים",studentTitle:"AI שעולה פחות כשאתה סטודנט",studentDesc:"מצא במהירות כלים עם תוכנית חינמית, מחיר מוזל או הטבת סטודנטים. תנאי הזכאות משתנים לפי מוסד ומדינה.",showStudent:"הצג הטבות סטודנטים",discoverTitle:"מצא את הכלי הנכון",surprise:"הפתע אותי",clear:"נקה סינונים"},
en:{navDiscover:"Discover",navStudents:"Students",navCategories:"Categories",fresh:"An AI catalog built to stay useful",hero1:"Every AI tool.",hero2:"One place.",heroDesc:"Find tools by task, price, free access and student benefits — without drowning in tabs.",tools:"tools",categories:"categories",freeOptions:"with free access",studentDeals:"student offers",studentTitle:"AI that costs less when you're a student",studentDesc:"Quickly find free plans, discounts and student offers. Eligibility varies by institution and country.",showStudent:"Show student offers",discoverTitle:"Find the right tool",surprise:"Surprise me",clear:"Clear filters"}};
function initials(name){return name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function pricingLabel(v){return state.lang==="he"?({free:"חינם",freemium:"חינם + בתשלום",paid:"בתשלום"}[v]||v):({free:"Free",freemium:"Freemium",paid:"Paid"}[v]||v)}
function saveFavs(){localStorage.setItem("aiatlas-favs",JSON.stringify([...state.favorites]))}
function card(t,i){
 const fav=state.favorites.has(t.name);
 return `<article class="tool-card" data-index="${i}">
   <div class="tool-top"><div class="tool-ident"><div class="tool-logo">${initials(t.name)}</div><div><div class="tool-name">${t.name}</div><div class="tool-maker">${t.maker}</div></div></div>
   <button class="fav-btn ${fav?"active":""}" data-fav="${t.name.replaceAll('"',"&quot;")}" aria-label="favorite">★</button></div>
   <p class="tool-desc">${t.desc}</p>
   <div class="badges"><span class="badge ${t.pricing}">${pricingLabel(t.pricing)}</span>${t.student?'<span class="badge student">🎓 Student</span>':""}</div>
   <div class="card-bottom"><span class="category-label">${t.category}</span><button class="details-btn" data-open="${i}">${state.lang==="he"?"פרטים":"Details"} →</button></div>
 </article>`}
function render(){
 const q=els.search.value.trim().toLowerCase();
 state.filtered=state.tools.filter(t=>{
   const hay=[t.name,t.maker,t.category,t.desc,...t.tags].join(" ").toLowerCase();
   return (!q||hay.includes(q)) &&
   (els.cat.value==="all"||t.category===els.cat.value) &&
   (els.price.value==="all"||t.pricing===els.price.value) &&
   (!els.student.checked||t.student) &&
   (!els.fav.checked||state.favorites.has(t.name));
 });
 els.grid.innerHTML=state.filtered.map(card).join("");
 els.count.textContent=state.lang==="he"?`${state.filtered.length} כלים נמצאו`:`${state.filtered.length} tools found`;
 els.empty.classList.toggle("hidden",state.filtered.length!==0);
 document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=e=>{e.stopPropagation();const n=b.dataset.fav;state.favorites.has(n)?state.favorites.delete(n):state.favorites.add(n);saveFavs();render()});
 document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openTool(state.filtered[+b.dataset.open]));
}
function openTool(t){
 if(!t)return;
 els.dialogContent.innerHTML=`<div class="dialog-head"><div class="tool-logo">${initials(t.name)}</div><div><h2 style="margin:0">${t.name}</h2><div class="tool-maker">${t.maker}</div></div></div>
 <div class="dialog-body"><p>${t.desc}</p><div class="badges"><span class="badge ${t.pricing}">${pricingLabel(t.pricing)}</span>${t.student?'<span class="badge student">🎓 Student</span>':""}</div>
 <div class="dialog-meta"><div><small>${state.lang==="he"?"קטגוריה":"Category"}</small><strong>${t.category}</strong></div><div><small>${state.lang==="he"?"מחיר":"Pricing"}</small><strong>${pricingLabel(t.pricing)}</strong></div></div>
 ${t.studentOffer?`<div style="padding:14px;border:1px solid var(--line);border-radius:14px;margin-bottom:18px"><strong>🎓 ${state.lang==="he"?"הטבת סטודנט":"Student offer"}</strong><p style="margin:7px 0 0">${t.studentOffer}</p></div>`:""}
 <a class="dialog-link" href="${t.url}" target="_blank" rel="noreferrer">${state.lang==="he"?"לאתר הרשמי":"Official website"} ↗</a></div>`;
 els.dialog.showModal();
}
function populateCategories(){
 const cats=[...new Set(state.tools.map(t=>t.category))].sort();
 els.cat.innerHTML=`<option value="all">${state.lang==="he"?"כל הקטגוריות":"All categories"}</option>`+cats.map(c=>`<option value="${c}">${c}</option>`).join("");
}
function updateStats(){
 $("#statTools").textContent=state.tools.length;
 $("#statCats").textContent=new Set(state.tools.map(t=>t.category)).size;
 $("#statFree").textContent=state.tools.filter(t=>t.pricing!=="paid").length;
 $("#statStudent").textContent=state.tools.filter(t=>t.student).length;
}
function applyLang(){
 const d=i18n[state.lang];document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==="he"?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(d[k])el.textContent=d[k]});
 $("#langBtn").textContent=state.lang==="he"?"EN":"HE";
 els.search.placeholder=state.lang==="he"?"חיפוש לפי שם או שימוש...":"Search by name or use...";
 els.heroSearch.placeholder=state.lang==="he"?"חפש ChatGPT, כתיבה, וידאו, קוד...":"Search ChatGPT, writing, video, code...";
 populateCategories();render();
}
function resetFilters(){els.search.value="";els.heroSearch.value="";els.cat.value="all";els.price.value="all";els.student.checked=false;els.fav.checked=false;render()}
async function init(){
 try{
  const r=await fetch("data/tools.json"); state.tools=await r.json();
  updateStats();populateCategories();applyLang();
 }catch(e){els.grid.innerHTML='<p>Could not load tools database.</p>'}
 [els.search,els.cat,els.price,els.student,els.fav].forEach(el=>el.addEventListener(el.tagName==="SELECT"||el.type==="checkbox"?"change":"input",render));
 els.heroSearch.addEventListener("input",()=>{els.search.value=els.heroSearch.value;render()});
 els.heroSearch.addEventListener("keydown",e=>{if(e.key==="Enter")document.querySelector("#discover").scrollIntoView({behavior:"smooth"})});
 $("#clearFilters").onclick=resetFilters;
 $("#dialogClose").onclick=()=>els.dialog.close();
 $("#themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("aiatlas-theme",document.body.classList.contains("light")?"light":"dark")};
 $("#langBtn").onclick=()=>{state.lang=state.lang==="he"?"en":"he";localStorage.setItem("aiatlas-lang",state.lang);applyLang()};
 $("#surpriseBtn").onclick=()=>{const pool=state.filtered.length?state.filtered:state.tools;openTool(pool[Math.floor(Math.random()*pool.length)])};
 document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>{resetFilters();const q=b.dataset.quick;if(q==="free")els.price.value="free";if(q==="student")els.student.checked=true;if(q==="coding")els.cat.value="Coding";if(q==="image")els.cat.value="Image Generation";render();document.querySelector("#discover").scrollIntoView({behavior:"smooth"})});
 document.addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement.tagName!=="INPUT"){e.preventDefault();els.heroSearch.focus()}if(e.key==="Escape"&&els.dialog.open)els.dialog.close()});
}
if(localStorage.getItem("aiatlas-theme")==="light")document.body.classList.add("light");
init();