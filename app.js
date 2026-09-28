const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const state={
  tools:[],filtered:[],
  lang:localStorage.getItem("aiatlas-lang")||"he",
  favorites:new Set(JSON.parse(localStorage.getItem("aiatlas-favs")||"[]"))
};

const els={
  grid:$("#toolsGrid"),search:$("#searchInput"),heroSearch:$("#heroSearch"),
  cat:$("#categoryFilter"),price:$("#pricingFilter"),platform:$("#platformFilter"),sort:$("#sortFilter"),
  student:$("#studentFilter"),fav:$("#favoriteFilter"),count:$("#resultCount"),
  empty:$("#emptyState"),dialog:$("#toolDialog"),dialogContent:$("#dialogContent"),
  categories:$("#categoryGrid"),platformGrid:$("#platformGrid"),featured:$("#featuredRail"),studentSpotlight:$("#studentSpotlight"),
  toast:$("#toast")
};

const copy={
  he:{
    brandTag:"כל עולם ה-AI, מסודר.",navHome:"בית",navCategories:"קטגוריות",navPlatforms:"אפליקציות",navStudents:"לסטודנטים",navDiscover:"כל הכלים",
    heroBadge:"הדרך המהירה למצוא את כלי ה-AI הנכון",heroLine1:"כל כלי ה־AI.",heroLine2:"בלי ללכת לאיבוד.",
    heroDesc:"חיפוש חכם, קטגוריות ברורות, חינם מול בתשלום, והטבות לסטודנטים — הכל במקום אחד ובעברית.",
    chipFree:"חינם",chipUnlimited:"חינם ללא הגבלה",chipStudents:"לסטודנטים",chipCode:"תכנות",chipImages:"תמונות",chipMobile:"אפליקציה לפלאפון",heroTools:"כלים",heroCategories:"קטגוריות",heroFree:"עם מסלול חינמי",
    mockTitle:"מצא לי כלי AI ל...",mockQuery:"בניית אתר בלי קוד",mockFooter:"תוצאות מותאמות בזמן אמת",
    statTools:"כלים בקטלוג",statCats:"קטגוריות",statFree:"חינם / Freemium",statStudent:"הטבות סטודנטים",
    categoriesTitle:"מה בא לך לעשות עם AI?",categoriesDesc:"בחר תחום וקפוץ ישר לכלים שמתאימים למשימה.",platformsTitle:"איפה אפשר להשתמש בכל כלי?",platformsDesc:"Web, מחשב או פלאפון — רואים מיד אם יש אפליקציה ל-Windows, Mac, Linux, Android או iPhone/iPad.",
    studentBadge:"STUDENT HUB",studentTitle:"סטודנט? יכול להיות שמגיע לך יותר בפחות.",studentDesc:"ריכזנו כלי AI עם תוכניות חינמיות או הנחות ייעודיות לסטודנטים. כשיש הטבה מאומתת, נציג מה מקבלים ואיך בודקים זכאות.",
    studentPoint1:"קישור רשמי לכל הטבה",studentPoint2:"הסבר קצר על הזכאות",studentPoint3:"סינון בלחיצה אחת",showStudent:"הצג כל הטבות הסטודנטים",
    featuredTitle:"כלים שכדאי להכיר",featuredDesc:"קיצורי דרך לכמה מהכלים הבולטים בקטלוג.",surprise:"הפתע אותי",
    discoverTitle:"כל כלי ה-AI במקום אחד",discoverDesc:"חפש בשם, שימוש, חברה או קטגוריה וסנן בדיוק מה שאתה צריך.",
    filterStudents:"סטודנטים",filterFavorites:"מועדפים",clear:"נקה סינונים",emptyTitle:"לא מצאנו כלי מתאים",emptyDesc:"נסה חיפוש או סינון אחר.",
    footerTag:"מגלים AI בלי רעש מיותר.",footerNote:"מחירים והטבות משתנים. לפני הרשמה או רכישה תמיד כדאי לבדוק את התנאים באתר הרשמי.",
    allCategories:"כל הקטגוריות",allPrices:"כל המחירים",allPlatforms:"כל הפלטפורמות",mobileApps:"אפליקציות לפלאפון",free:"חינם",freemium:"חינם + בתשלום",paid:"בתשלום",unlimitedFree:"100% חינם + ללא הגבלה",unlimitedBadge:"∞ חינם ללא הגבלה",unlimitedTitle:"100% חינם וללא הגבלה",unlimitedDesc:"כלים שאפשר להריץ מקומית בלי מכסת הודעות או יצירות מצד השירות.",unlimitedLocal:"ללא מכסת שירות בהרצה מקומית",
    sortDefault:"סדר מומלץ",sortAZ:"א׳ → ת׳ / A → Z",sortZA:"ת׳ → א׳ / Z → A",sortFree:"חינם קודם",
    found:"כלים נמצאו",details:"פרטים",category:"קטגוריה",pricing:"מחיר",studentOffer:"הטבת סטודנט מאומתת",
    official:"לאתר הרשמי",copyLink:"העתק קישור",copied:"הקישור הועתק",appAvailability:"אפליקציות ופלטפורמות",platformUpdated:"מידע על פלטפורמות עודכן",favoritesOnly:"מועדפים",verified:"מאומת",toolsInCategory:"כלים",
    noDescription:"כלי AI בקטלוג AI Atlas.",siteTitle:"AI Atlas — כל כלי ה-AI במקום אחד"
  },
  en:{
    brandTag:"The AI world, organized.",navHome:"Home",navCategories:"Categories",navPlatforms:"Apps",navStudents:"Students",navDiscover:"All tools",
    heroBadge:"The fast way to find the right AI tool",heroLine1:"Every AI tool.",heroLine2:"Without getting lost.",
    heroDesc:"Smart search, clear categories, free vs paid, and student offers — all in one beautifully organized place.",
    chipFree:"Free",chipUnlimited:"Free & unlimited",chipStudents:"Students",chipCode:"Coding",chipImages:"Images",chipMobile:"Mobile apps",heroTools:"tools",heroCategories:"categories",heroFree:"with a free plan",
    mockTitle:"Find me an AI tool for...",mockQuery:"building a website without code",mockFooter:"Matched results in real time",
    statTools:"tools in directory",statCats:"categories",statFree:"free / freemium",statStudent:"student offers",
    categoriesTitle:"What do you want to do with AI?",categoriesDesc:"Pick a field and jump straight to tools that fit the task.",platformsTitle:"Where can you use each tool?",platformsDesc:"Web, desktop or mobile — instantly see whether there is an app for Windows, Mac, Linux, Android or iPhone/iPad.",
    studentBadge:"STUDENT HUB",studentTitle:"Student? You may be able to get more for less.",studentDesc:"We collect AI tools with free plans or dedicated student discounts. When an offer is verified, we show what you get and how eligibility works.",
    studentPoint1:"Official link for every offer",studentPoint2:"Clear eligibility summary",studentPoint3:"One-click filtering",showStudent:"Show all student offers",
    featuredTitle:"Tools worth discovering",featuredDesc:"Quick access to a selection of notable tools in the directory.",surprise:"Surprise me",
    discoverTitle:"Every AI tool in one place",discoverDesc:"Search by name, use case, company or category and filter down to exactly what you need.",
    filterStudents:"Students",filterFavorites:"Favorites",clear:"Clear filters",emptyTitle:"No matching tools found",emptyDesc:"Try a different search or filter.",
    footerTag:"Discover AI without the noise.",footerNote:"Prices and offers change. Always check the official website before signing up or purchasing.",
    allCategories:"All categories",allPrices:"All pricing",allPlatforms:"All platforms",mobileApps:"Mobile apps",free:"Free",freemium:"Free + paid",paid:"Paid",unlimitedFree:"100% free + unlimited",unlimitedBadge:"∞ Free & unlimited",unlimitedTitle:"100% free and unlimited",unlimitedDesc:"Tools you can run locally without a provider message or generation quota.",unlimitedLocal:"No provider quota when running locally",
    sortDefault:"Recommended order",sortAZ:"A → Z",sortZA:"Z → A",sortFree:"Free first",
    found:"tools found",details:"Details",category:"Category",pricing:"Pricing",studentOffer:"Verified student offer",
    official:"Official website",copyLink:"Copy link",copied:"Link copied",appAvailability:"Apps & platforms",platformUpdated:"Platform info updated",favoritesOnly:"Favorites",verified:"Verified",toolsInCategory:"tools",
    noDescription:"An AI tool in the AI Atlas directory.",siteTitle:"AI Atlas — Every AI tool in one place"
  }
};

const categoryMeta={
  "Chat & Assistants":{he:"צ׳אט ועוזרים",icon:"◌",color:"#8B5CF6"},
  "Research & Search":{he:"מחקר וחיפוש",icon:"⌕",color:"#5B8CFF"},
  "Study & Learning":{he:"לימודים ולמידה",icon:"◇",color:"#2DD4BF"},
  "Coding":{he:"תכנות",icon:"⌘",color:"#7AA9FF"},
  "App & Website Builders":{he:"בניית אתרים ואפליקציות",icon:"▱",color:"#EC6BFF"},
  "Design":{he:"עיצוב",icon:"✦",color:"#F088D7"},
  "Image Generation":{he:"יצירת תמונות",icon:"◩",color:"#A78BFA"},
  "Video Generation":{he:"יצירת וידאו",icon:"▶",color:"#FF7D8A"},
  "Video & Avatars":{he:"וידאו ואווטארים",icon:"◎",color:"#FF956B"},
  "Audio & Voice":{he:"אודיו וקול",icon:"◉",color:"#36CFC9"},
  "Music":{he:"מוזיקה",icon:"♫",color:"#F7C566"},
  "Audio & Video Editing":{he:"עריכת אודיו ווידאו",icon:"◫",color:"#62B7FF"},
  "Meetings & Transcription":{he:"פגישות ותמלול",icon:"≡",color:"#7B9CFF"},
  "Writing":{he:"כתיבה",icon:"✎",color:"#D99BFF"},
  "Translation":{he:"תרגום",icon:"文",color:"#59D5B8"},
  "Productivity":{he:"פרודוקטיביות",icon:"▤",color:"#A5B4FC"},
  "Presentations":{he:"מצגות",icon:"▣",color:"#F6A06B"},
  "Math & Science":{he:"מתמטיקה ומדע",icon:"∑",color:"#64D2A8"},
  "Automation":{he:"אוטומציה",icon:"⚡",color:"#F2C75C"},
  "Models & Developer Tools":{he:"מודלים וכלי פיתוח",icon:"⬡",color:"#73A5FF"},
  "Local AI":{he:"AI מקומי",icon:"◈",color:"#50D0B0"}
};

const platformMeta={
  web:{he:"Web",en:"Web",icon:"◎"},
  windows:{he:"Windows",en:"Windows",icon:"⊞"},
  macos:{he:"macOS",en:"macOS",icon:"◆"},
  linux:{he:"Linux",en:"Linux",icon:"◈"},
  android:{he:"Android",en:"Android",icon:"△"},
  ios:{he:"iPhone / iPad",en:"iPhone / iPad",icon:""}
};

const FEATURED=["ChatGPT","Claude","Perplexity","GitHub Copilot","Cursor","Runway","Midjourney","NotebookLM"];
const HERO_PREVIEW=["v0","Lovable","Bolt"];
const STUDENT_PREVIEW=["GitHub Copilot","Perplexity","Adobe Firefly","Notion AI"];

function t(key){return copy[state.lang][key]||key}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function initials(name){return name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function hostFor(url){try{return new URL(url).hostname.replace(/^www\./,"")}catch{return ""}}
function iconUrl(tool){const h=hostFor(tool.url);return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(h)}&sz=128`}
function logo(tool,cls="tool-logo"){
  return `<div class="${cls}" title="${esc(tool.name)}"><img src="${iconUrl(tool)}" alt="" loading="lazy" data-initials="${esc(initials(tool.name))}"></div>`
}
function localDesc(tool){return state.lang==="he"?(tool.descHe||tool.desc||tool.descEn):(tool.descEn||tool.desc||tool.descHe)||t("noDescription")}
function localOffer(tool){return state.lang==="he"?(tool.studentOfferHe||tool.studentOffer||tool.studentOfferEn):(tool.studentOfferEn||tool.studentOffer||tool.studentOfferHe)||""}
function localCategory(cat){return state.lang==="he"?(categoryMeta[cat]?.he||cat):cat}
function priceLabel(value){return t(value)}
function localUnlimitedNote(tool){
  return state.lang==="he"?(tool.unlimitedNoteHe||tool.unlimitedNoteEn||""):(tool.unlimitedNoteEn||tool.unlimitedNoteHe||"");
}
function platformLabel(value){const p=platformMeta[value];return p?(state.lang==="he"?p.he:p.en):value}
function platformBadges(tool,compact=false){
  const items=(tool.platforms||["web"]).map(p=>{
    const meta=platformMeta[p]||{icon:"•"};
    return '<span class="platform-chip '+esc(p)+'" title="'+esc(platformLabel(p))+'"><b>'+meta.icon+'</b><span>'+esc(platformLabel(p))+'</span></span>';
  }).join("");
  return '<div class="platform-badges '+(compact?"compact":"")+'">'+items+'</div>';
}
function saveFavorites(){localStorage.setItem("aiatlas-favs",JSON.stringify([...state.favorites]))}

function attachImageFallbacks(root=document){
  root.querySelectorAll("img[data-initials]").forEach(img=>{
    img.onerror=()=>{
      const p=img.parentElement;
      p.innerHTML=`<span class="logo-fallback">${esc(img.dataset.initials||"AI")}</span>`;
    };
  });
}

function toolCard(tool,index){
  const favorite=state.favorites.has(tool.name);
  return `<article class="tool-card">
    <div class="tool-top">
      <div class="tool-ident">
        ${logo(tool)}
        <div style="min-width:0"><div class="tool-name">${esc(tool.name)}</div><div class="tool-maker">${esc(tool.maker)}</div></div>
      </div>
      <button class="fav-btn ${favorite?"active":""}" data-fav="${esc(tool.name)}" aria-label="${esc(t("favoritesOnly"))}">★</button>
    </div>
    <p class="tool-desc">${esc(localDesc(tool))}</p>
    <div class="badges">
      <span class="badge ${esc(tool.pricing)}">${esc(priceLabel(tool.pricing))}</span>
      ${tool.student?'<span class="badge student">🎓 Student</span>':""}
      ${tool.unlimitedFree?`<span class="badge unlimited">∞ ${esc(t("unlimitedBadge").replace(/^∞\s*/, ""))}</span>`:""}
    </div>
    ${platformBadges(tool,true)}
    <div class="card-bottom">
      <span class="category-label">${esc(localCategory(tool.category))}</span>
      <button class="details-btn" data-open="${index}">${esc(t("details"))} ←</button>
    </div>
  </article>`
}

function renderTools(){
  const q=els.search.value.trim().toLowerCase();
  let results=state.tools.filter(tool=>{
    const hay=[tool.name,tool.maker,tool.category,tool.descHe,tool.descEn,tool.desc,...(tool.tags||[])].filter(Boolean).join(" ").toLowerCase();
    return (!q||hay.includes(q))
      &&(els.cat.value==="all"||tool.category===els.cat.value)
      &&(els.price.value==="all"||(els.price.value==="unlimited"?tool.unlimitedFree:tool.pricing===els.price.value))
      &&(els.platform.value==="all"||(els.platform.value==="mobile"?((tool.platforms||[]).includes("android")||(tool.platforms||[]).includes("ios")):(tool.platforms||[]).includes(els.platform.value)))
      &&(!els.student.checked||tool.student)
      &&(!els.fav.checked||state.favorites.has(tool.name));
  });

  if(els.sort.value==="az") results.sort((a,b)=>a.name.localeCompare(b.name));
  if(els.sort.value==="za") results.sort((a,b)=>b.name.localeCompare(a.name));
  if(els.sort.value==="free") results.sort((a,b)=>({free:0,freemium:1,paid:2}[a.pricing]-{free:0,freemium:1,paid:2}[b.pricing]));

  state.filtered=results;
  els.grid.innerHTML=results.map(toolCard).join("");
  els.count.textContent=`${results.length} ${t("found")}`;
  els.empty.classList.toggle("hidden",results.length!==0);

  $$("[data-fav]").forEach(btn=>btn.onclick=e=>{
    e.stopPropagation();
    const name=btn.dataset.fav;
    state.favorites.has(name)?state.favorites.delete(name):state.favorites.add(name);
    saveFavorites();renderTools();
  });
  $$("[data-open]").forEach(btn=>btn.onclick=()=>openTool(state.filtered[Number(btn.dataset.open)]));
  attachImageFallbacks(els.grid);
}

function openTool(tool){
  if(!tool)return;
  const offer=localOffer(tool);
  els.dialogContent.innerHTML=`
    <div class="dialog-head">
      ${logo(tool)}
      <div><h2>${esc(tool.name)}</h2><div class="tool-maker">${esc(tool.maker)}</div></div>
    </div>
    <div class="dialog-body">
      <p>${esc(localDesc(tool))}</p>
      <div class="badges"><span class="badge ${esc(tool.pricing)}">${esc(priceLabel(tool.pricing))}</span>${tool.student?'<span class="badge student">🎓 Student</span>':""}${tool.unlimitedFree?`<span class="badge unlimited">${esc(t("unlimitedBadge"))}</span>`:""}</div>
      <div class="dialog-tags">${(tool.tags||[]).slice(0,8).map(x=>`<span class="dialog-tag">#${esc(x)}</span>`).join("")}</div>
      <div class="dialog-meta">
        <div><small>${esc(t("category"))}</small><strong>${esc(localCategory(tool.category))}</strong></div>
        <div><small>${esc(t("pricing"))}</small><strong>${esc(priceLabel(tool.pricing))}</strong></div>
      </div>
      ${offer?`<div class="student-offer"><strong>🎓 ${esc(t("studentOffer"))}</strong><p>${esc(offer)}</p></div>`:""}
      ${tool.unlimitedFree?`<div class="unlimited-offer"><strong>∞ ${esc(t("unlimitedTitle"))}</strong><p>${esc(localUnlimitedNote(tool)||t("unlimitedLocal"))}</p></div>`:""}
      <div class="dialog-platforms">
        <div class="dialog-platform-title"><strong>${esc(t("appAvailability"))}</strong><small>${esc(t("platformUpdated"))}: ${esc(tool.platformsUpdated||"2026-09-28")}</small></div>
        ${platformBadges(tool)}
        ${(state.lang==="he"?tool.platformNoteHe:tool.platformNoteEn)?`<p>${esc(state.lang==="he"?tool.platformNoteHe:tool.platformNoteEn)}</p>`:""}
      </div>
      <div class="dialog-actions">
        <a class="dialog-link" href="${esc(tool.url)}" target="_blank" rel="noreferrer">${esc(t("official"))} ↗</a>
        <button class="copy-btn" id="copyToolLink">${esc(t("copyLink"))}</button>
      </div>
    </div>`;
  attachImageFallbacks(els.dialog);
  $("#copyToolLink").onclick=async()=>{try{await navigator.clipboard.writeText(tool.url);showToast(t("copied"))}catch{}};
  els.dialog.showModal();
}

function buildCategories(){
  const counts={}; state.tools.forEach(x=>counts[x.category]=(counts[x.category]||0)+1);
  const unlimitedCount=state.tools.filter(x=>x.unlimitedFree).length;
  const unlimitedCard=unlimitedCount?`<button class="category-card unlimited-category" data-unlimited="true" style="--catColor:#35e6b6">
      <span class="category-icon">∞</span>
      <h3>${esc(t("unlimitedTitle"))}</h3>
      <p>${unlimitedCount} ${esc(t("toolsInCategory"))}</p>
      <span class="category-arrow">←</span>
    </button>`:"";
  els.categories.innerHTML=unlimitedCard+Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).map(cat=>{
    const meta=categoryMeta[cat]||{icon:"◇",color:"#8B5CF6"};
    return `<button class="category-card" data-category="${esc(cat)}" style="--catColor:${meta.color}">
      <span class="category-icon">${meta.icon}</span>
      <h3>${esc(localCategory(cat))}</h3>
      <p>${counts[cat]} ${esc(t("toolsInCategory"))}</p>
      <span class="category-arrow">←</span>
    </button>`
  }).join("");
  $(".category-card").forEach(btn=>btn.onclick=()=>{
    if(btn.dataset.unlimited){
      resetFilters();
      els.price.value="unlimited";
    }else{
      els.cat.value=btn.dataset.category;
    }
    renderTools();
    $("#discover").scrollIntoView({behavior:"smooth"});
  });
}

function buildPlatforms(){
  const order=["web","windows","macos","linux","android","ios"];
  els.platformGrid.innerHTML=order.map(p=>{
    const meta=platformMeta[p],count=state.tools.filter(x=>(x.platforms||[]).includes(p)).length;
    return '<button class="platform-card" data-platform="'+p+'"><span class="platform-card-icon '+p+'">'+meta.icon+'</span><span class="platform-card-copy"><strong>'+esc(platformLabel(p))+'</strong><small>'+count+' '+esc(t("toolsInCategory"))+'</small></span><span class="platform-card-arrow">↗</span></button>';
  }).join("");
  $("[data-platform]").forEach(btn=>btn.onclick=()=>{
    els.platform.value=btn.dataset.platform;
    renderTools();
    $("#discover").scrollIntoView({behavior:"smooth"});
  });
}

function buildFeatured(){
  const tools=FEATURED.map(n=>state.tools.find(x=>x.name===n)).filter(Boolean);
  els.featured.innerHTML=tools.map(tool=>`<article class="featured-card" data-tool="${esc(tool.name)}">
    <div class="featured-top">${logo(tool,"featured-logo")}<div><h3>${esc(tool.name)}</h3><small>${esc(tool.maker)}</small></div></div>
    <p>${esc(localDesc(tool))}</p>
    <div class="featured-footer"><span class="badge ${esc(tool.pricing)}">${esc(priceLabel(tool.pricing))}</span><span>↗</span></div>
  </article>`).join("");
  $$(".featured-card").forEach(card=>card.onclick=()=>openTool(state.tools.find(x=>x.name===card.dataset.tool)));
  attachImageFallbacks(els.featured);
}

function buildStudentSpotlight(){
  const tools=STUDENT_PREVIEW.map(n=>state.tools.find(x=>x.name===n)).filter(x=>x&&x.student);
  els.studentSpotlight.innerHTML=tools.map(tool=>`<button class="student-mini" data-student-tool="${esc(tool.name)}">
    ${logo(tool,"student-mini-logo")}
    <span class="student-mini-body"><strong>${esc(tool.name)}</strong><small>${esc(localOffer(tool))}</small></span>
    <span class="verified">✓ ${esc(t("verified"))}</span>
  </button>`).join("");
  $$("[data-student-tool]").forEach(btn=>btn.onclick=()=>openTool(state.tools.find(x=>x.name===btn.dataset.studentTool)));
  attachImageFallbacks(els.studentSpotlight);
}

function buildHeroPreview(){
  const root=$("#heroToolsPreview");
  const tools=HERO_PREVIEW.map(n=>state.tools.find(x=>x.name===n)).filter(Boolean);
  root.innerHTML=tools.map((tool,i)=>`<div class="preview-tool">${logo(tool,"preview-logo")}<div><strong>${esc(tool.name)}</strong><small>${esc(localCategory(tool.category))}</small></div><span class="preview-score">${["MATCH","AI","WEB"][i]}</span></div>`).join("");
  attachImageFallbacks(root);
}

function fillFilters(){
  const currentCat=els.cat.value||"all",currentPrice=els.price.value||"all",currentPlatform=els.platform.value||"all",currentSort=els.sort.value||"default";
  const cats=[...new Set(state.tools.map(x=>x.category))].sort();
  els.cat.innerHTML=`<option value="all">${esc(t("allCategories"))}</option>`+cats.map(cat=>`<option value="${esc(cat)}">${esc(localCategory(cat))}</option>`).join("");
  els.price.innerHTML=`<option value="all">${esc(t("allPrices"))}</option><option value="unlimited">∞ ${esc(t("unlimitedFree"))}</option><option value="free">${esc(t("free"))}</option><option value="freemium">${esc(t("freemium"))}</option><option value="paid">${esc(t("paid"))}</option>`;
  els.platform.innerHTML=`<option value="all">${esc(t("allPlatforms"))}</option><option value="mobile">${esc(t("mobileApps"))}</option>`+Object.keys(platformMeta).map(p=>`<option value="${p}">${esc(platformLabel(p))}</option>`).join("");
  els.sort.innerHTML=`<option value="default">${esc(t("sortDefault"))}</option><option value="az">${esc(t("sortAZ"))}</option><option value="za">${esc(t("sortZA"))}</option><option value="free">${esc(t("sortFree"))}</option>`;
  if([...els.cat.options].some(o=>o.value===currentCat))els.cat.value=currentCat;
  if([...els.price.options].some(o=>o.value===currentPrice))els.price.value=currentPrice;
  if([...els.platform.options].some(o=>o.value===currentPlatform))els.platform.value=currentPlatform;
  if([...els.sort.options].some(o=>o.value===currentSort))els.sort.value=currentSort;
}

function updateStats(){
  const cats=new Set(state.tools.map(x=>x.category)).size;
  const free=state.tools.filter(x=>x.pricing!=="paid").length;
  const student=state.tools.filter(x=>x.student).length;
  [["#statTools",state.tools.length],["#statCats",cats],["#statFree",free],["#statStudent",student],["#heroToolCount",state.tools.length],["#heroCategoryCount",cats],["#heroFreeCount",free]].forEach(([sel,val])=>$(sel).textContent=val);
}

function applyLanguage(){
  document.documentElement.lang=state.lang;
  document.documentElement.dir=state.lang==="he"?"rtl":"ltr";
  document.title=t("siteTitle");
  $$("[data-i18n]").forEach(el=>{const value=t(el.dataset.i18n);if(value)el.textContent=value});
  $("#heBtn").classList.toggle("active",state.lang==="he");
  $("#enBtn").classList.toggle("active",state.lang==="en");
  els.heroSearch.placeholder=state.lang==="he"?"חפש ChatGPT, קוד, וידאו, לימודים...":"Search ChatGPT, coding, video, studying...";
  els.search.placeholder=state.lang==="he"?"חיפוש לפי שם או שימוש...":"Search by name or use case...";
  fillFilters();buildCategories();buildPlatforms();buildFeatured();buildStudentSpotlight();buildHeroPreview();renderTools();
}

function setLanguage(lang){state.lang=lang;localStorage.setItem("aiatlas-lang",lang);applyLanguage()}
function resetFilters(){
  els.search.value="";els.heroSearch.value="";els.cat.value="all";els.price.value="all";els.platform.value="all";els.sort.value="default";els.student.checked=false;els.fav.checked=false;renderTools();
}
function quickFilter(kind){
  resetFilters();
  if(kind==="free")els.price.value="free";
  if(kind==="unlimited")els.price.value="unlimited";
  if(kind==="student")els.student.checked=true;
  if(kind==="coding")els.cat.value="Coding";
  if(kind==="image")els.cat.value="Image Generation";
  if(kind==="mobile")els.platform.value="mobile";
  renderTools();$("#discover").scrollIntoView({behavior:"smooth"});
}
function showToast(message){els.toast.textContent=message;els.toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>els.toast.classList.remove("show"),1800)}

function setupEvents(){
  [els.search].forEach(el=>el.addEventListener("input",renderTools));
  [els.cat,els.price,els.platform,els.sort,els.student,els.fav].forEach(el=>el.addEventListener("change",renderTools));
  els.heroSearch.addEventListener("input",()=>{els.search.value=els.heroSearch.value;renderTools()});
  els.heroSearch.addEventListener("keydown",e=>{if(e.key==="Enter")$("#discover").scrollIntoView({behavior:"smooth"})});
  $("#clearFilters").onclick=resetFilters;
  $("#heBtn").onclick=()=>setLanguage("he");$("#enBtn").onclick=()=>setLanguage("en");
  $("#themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("aiatlas-theme",document.body.classList.contains("light")?"light":"dark")};
  $("#dialogClose").onclick=()=>els.dialog.close();
  els.dialog.addEventListener("click",e=>{if(e.target===els.dialog)els.dialog.close()});
  $("#surpriseBtn").onclick=()=>{const pool=state.filtered.length?state.filtered:state.tools;if(pool.length)openTool(pool[Math.floor(Math.random()*pool.length)])};
  $$("[data-quick]").forEach(btn=>btn.onclick=()=>quickFilter(btn.dataset.quick));
  document.addEventListener("keydown",e=>{
    if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();els.heroSearch.focus()}
    if(e.key==="Escape"&&els.dialog.open)els.dialog.close();
  });
}

function setupReveal(){
  if(!("IntersectionObserver" in window)){ $$(".reveal").forEach(x=>x.classList.add("visible"));return }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.08});
  $$(".reveal").forEach(el=>observer.observe(el));
}

async function init(){
  if(localStorage.getItem("aiatlas-theme")==="light")document.body.classList.add("light");
  setupEvents();setupReveal();
  try{
    const response=await fetch("data/tools.json?v=5");
    if(!response.ok)throw new Error("tools.json");
    state.tools=await response.json();
    updateStats();applyLanguage();
  }catch(error){
    els.grid.innerHTML=`<div class="empty"><div class="empty-icon">!</div><h3>Could not load tools database</h3></div>`;
  }
}
init();