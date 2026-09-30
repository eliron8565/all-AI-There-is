const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const state={
  tools:[],filtered:[],
  lang:localStorage.getItem("aiatlas-lang")||"he",
  favorites:new Set(JSON.parse(localStorage.getItem("aiatlas-favs")||"[]")),
  compare:JSON.parse(localStorage.getItem("aiatlas-compare")||"[]"),
  onlyNew:false
};

const els={
  grid:$("#toolsGrid"),search:$("#searchInput"),heroSearch:$("#heroSearch"),
  cat:$("#categoryFilter"),price:$("#pricingFilter"),platform:$("#platformFilter"),sort:$("#sortFilter"),
  student:$("#studentFilter"),fav:$("#favoriteFilter"),openSource:$("#openSourceFilter"),count:$("#resultCount"),
  empty:$("#emptyState"),dialog:$("#toolDialog"),dialogContent:$("#dialogContent"),
  compareDialog:$("#compareDialog"),compareDialogContent:$("#compareDialogContent"),
  categories:$("#categoryGrid"),platformGrid:$("#platformGrid"),featured:$("#featuredRail"),studentSpotlight:$("#studentSpotlight"),studentBenefits:$("#studentBenefitsGrid"),newTools:$("#newToolsRail"),
  compareDock:$("#compareDock"),compareChips:$("#compareChips"),compareCount:$("#compareCount"),
  toast:$("#toast")
};

const copy={
  he:{
    brandTag:"כל עולם ה-AI, מסודר.",navHome:"בית",navCollections:"אוספים",navNew:"חדש עכשיו",navCategories:"קטגוריות",navPlatforms:"אפליקציות",navStudents:"לסטודנטים",navDiscover:"כל הכלים",
    heroBadge:"הדרך המהירה למצוא את כלי ה-AI הנכון",heroLine1:"כל כלי ה־AI.",heroLine2:"בלי ללכת לאיבוד.",
    heroDesc:"חיפוש חכם, קטגוריות ברורות, חינם מול בתשלום, והטבות לסטודנטים — הכל במקום אחד ובעברית.",
    chipFree:"חינם",chipUnlimited:"חינם ללא הגבלה",chipLocal:"AI מקומי",chipStudents:"🇮🇱 סטודנטים בישראל",chipCode:"תכנות",chipImages:"תמונות",chipMobile:"אפליקציה לפלאפון",chipOpenSource:"קוד פתוח",heroTools:"כלים",heroCategories:"קטגוריות",heroFree:"עם מסלול חינמי",
    mockTitle:"מצא לי כלי AI ל...",mockQuery:"בניית אתר בלי קוד",mockFooter:"תוצאות מותאמות בזמן אמת",
    statTools:"כלים בקטלוג",statCats:"קטגוריות",statFree:"חינם / Freemium",statStudent:"הטבות בישראל",
    collectionsTitle:"תתחיל ממה שאתה באמת צריך",collectionsDesc:"אוספים מוכנים שחוסכים חיפוש וסינון ידני.",collectionUnlimitedDesc:"כלים מקומיים בלי מכסת שירות",collectionLocal:"רץ אצלך במחשב",collectionLocalDesc:"יותר פרטיות ושליטה",collectionStudent:"סטודנטים בישראל",collectionStudentDesc:"הטבות שאומתו כמתאימות לישראל",collectionMobile:"AI בכיס",collectionMobileDesc:"Android ו-iPhone/iPad",collectionOpenSource:"קוד פתוח",collectionOpenSourceDesc:"כלים שאפשר לבדוק, להריץ ולארח בעצמך",metricCatalog:"קטלוג",metricFree:"גישה חינמית",liveTitle:"בחירות מהירות",categoriesTitle:"מה בא לך לעשות עם AI?",categoriesDesc:"בחר תחום וקפוץ ישר לכלים שמתאימים למשימה.",platformsTitle:"איפה אפשר להשתמש בכל כלי?",platformsDesc:"Web, מחשב או פלאפון — רואים מיד אם יש אפליקציה ל-Windows, Mac, Linux, Android או iPhone/iPad.",
    studentBadge:"ISRAEL STUDENT HUB",studentTitle:"סטודנטים בישראל — ההטבות שבאמת רלוונטיות לכם.",studentDesc:"כאן מוצגות רק הטבות שמצאנו להן בסיס רשמי לשימוש של סטודנטים בישראל. לכל כלי מצורפים תנאי הזכאות וקישור רשמי לבדיקה.",
    studentPoint1:"בדיקה מול מקור רשמי",studentPoint2:"תנאי זכאות לישראל",studentPoint3:"סינון בלחיצה אחת",showStudent:"הצג הטבות לסטודנטים בישראל",studentExtrasTitle:"עוד הטבות שימושיות לסטודנטים בישראל",studentExtrasDesc:"לא רק AI — גם כלי פיתוח, עיצוב, תוכנות לימוד ושירותים מקצועיים.",
    featuredTitle:"כלים שכדאי להכיר",featuredDesc:"קיצורי דרך לכמה מהכלים הבולטים בקטלוג.",surprise:"הפתע אותי",newNowTitle:"חדש עכשיו ב-AI Atlas",newNowDesc:"כלים שנוספו לאחרונה כדי שתוכל לראות ישר מה התחדש.",showNew:"הצג את כל החדשים",
    discoverTitle:"כל כלי ה-AI במקום אחד",discoverDesc:"חפש בשם, שימוש, חברה או קטגוריה וסנן בדיוק מה שאתה צריך.",
    filterStudents:"🇮🇱 סטודנטים בישראל",filterFavorites:"מועדפים",filterOpenSource:"קוד פתוח",clear:"נקה סינונים",emptyTitle:"לא מצאנו כלי מתאים",emptyDesc:"נסה חיפוש או סינון אחר.",
    footerTag:"מגלים AI בלי רעש מיותר.",footerNote:"מחירים והטבות משתנים. לפני הרשמה או רכישה תמיד כדאי לבדוק את התנאים באתר הרשמי.",
    allCategories:"כל הקטגוריות",allPrices:"כל המחירים",allPlatforms:"כל הפלטפורמות",mobileApps:"אפליקציות לפלאפון",free:"חינם",freemium:"חינם + בתשלום",paid:"בתשלום",unlimitedFree:"100% חינם + ללא הגבלה",unlimitedBadge:"∞ חינם ללא הגבלה",unlimitedTitle:"100% חינם וללא הגבלה",unlimitedDesc:"כלים שאפשר להריץ מקומית בלי מכסת הודעות או יצירות מצד השירות.",unlimitedLocal:"ללא מכסת שירות בהרצה מקומית",
    sortDefault:"סדר מומלץ",sortNew:"חדשים קודם",sortAZ:"א׳ → ת׳ / A → Z",sortZA:"ת׳ → א׳ / Z → A",sortFree:"חינם קודם",newBadge:"חדש",
    found:"כלים נמצאו",details:"פרטים",category:"קטגוריה",pricing:"מחיר",studentOffer:"הטבת סטודנט",israelStudentOffer:"מתאים לסטודנטים בישראל",checkEligibility:"לבדיקת הזכאות הרשמית",israelVerified:"אומת לישראל",
    official:"לאתר הרשמי",copyLink:"העתק קישור",copied:"הקישור הועתק",appAvailability:"אפליקציות ופלטפורמות",platformUpdated:"מידע על פלטפורמות עודכן",favoritesOnly:"מועדפים",verified:"מאומת",toolsInCategory:"כלים",bestFor:"מתאים ל",compare:"השווה",compareTitle:"השוואת כלים",compareClear:"נקה",compareOpen:"השווה עכשיו",compareLimit:"אפשר להשוות עד 3 כלים",compareNeedTwo:"בחר לפחות 2 כלים להשוואה",compareCategory:"קטגוריה",comparePrice:"מחיר",comparePlatforms:"פלטפורמות",compareStudent:"סטודנטים בישראל",compareUnlimited:"ללא הגבלה",compareOpenSource:"קוד פתוח",compareUses:"שימושים",yes:"כן",no:"לא",
    noDescription:"כלי AI בקטלוג AI Atlas.",siteTitle:"AI Atlas — כל כלי ה-AI במקום אחד"
  },
  en:{
    brandTag:"The AI world, organized.",navHome:"Home",navCollections:"Collections",navNew:"What\'s new",navCategories:"Categories",navPlatforms:"Apps",navStudents:"Students",navDiscover:"All tools",
    heroBadge:"The fast way to find the right AI tool",heroLine1:"Every AI tool.",heroLine2:"Without getting lost.",
    heroDesc:"Smart search, clear categories, free vs paid, and student offers — all in one beautifully organized place.",
    chipFree:"Free",chipUnlimited:"Free & unlimited",chipLocal:"Local AI",chipStudents:"🇮🇱 Students in Israel",chipCode:"Coding",chipImages:"Images",chipMobile:"Mobile apps",chipOpenSource:"Open source",heroTools:"tools",heroCategories:"categories",heroFree:"with a free plan",
    mockTitle:"Find me an AI tool for...",mockQuery:"building a website without code",mockFooter:"Matched results in real time",
    statTools:"tools in directory",statCats:"categories",statFree:"free / freemium",statStudent:"Israel student offers",
    collectionsTitle:"Start with what you actually need",collectionsDesc:"Ready-made collections that save manual searching and filtering.",collectionUnlimitedDesc:"Local tools without provider quotas",collectionLocal:"Runs on your computer",collectionLocalDesc:"More privacy and control",collectionStudent:"Students in Israel",collectionStudentDesc:"Offers verified as relevant in Israel",collectionMobile:"AI in your pocket",collectionMobileDesc:"Android and iPhone/iPad",collectionOpenSource:"Open source",collectionOpenSourceDesc:"Tools you can inspect, run and self-host",metricCatalog:"Catalog",metricFree:"Free access",liveTitle:"Quick picks",categoriesTitle:"What do you want to do with AI?",categoriesDesc:"Pick a field and jump straight to tools that fit the task.",platformsTitle:"Where can you use each tool?",platformsDesc:"Web, desktop or mobile — instantly see whether there is an app for Windows, Mac, Linux, Android or iPhone/iPad.",
    studentBadge:"ISRAEL STUDENT HUB",studentTitle:"Students in Israel — offers that are actually relevant to you.",studentDesc:"This section only shows offers with official evidence that they can apply to students in Israel. Each tool includes eligibility details and an official verification link.",
    studentPoint1:"Checked against official sources",studentPoint2:"Israel eligibility summary",studentPoint3:"One-click filtering",showStudent:"Show Israel student offers",studentExtrasTitle:"More useful student benefits for Israel",studentExtrasDesc:"Not just AI — developer tools, design software, study tools and professional services.",
    featuredTitle:"Tools worth discovering",featuredDesc:"Quick access to a selection of notable tools in the directory.",surprise:"Surprise me",newNowTitle:"Just added to AI Atlas",newNowDesc:"Recently added tools so you can instantly see what\'s new.",showNew:"Show all new tools",
    discoverTitle:"Every AI tool in one place",discoverDesc:"Search by name, use case, company or category and filter down to exactly what you need.",
    filterStudents:"🇮🇱 Students in Israel",filterFavorites:"Favorites",filterOpenSource:"Open source",clear:"Clear filters",emptyTitle:"No matching tools found",emptyDesc:"Try a different search or filter.",
    footerTag:"Discover AI without the noise.",footerNote:"Prices and offers change. Always check the official website before signing up or purchasing.",
    allCategories:"All categories",allPrices:"All pricing",allPlatforms:"All platforms",mobileApps:"Mobile apps",free:"Free",freemium:"Free + paid",paid:"Paid",unlimitedFree:"100% free + unlimited",unlimitedBadge:"∞ Free & unlimited",unlimitedTitle:"100% free and unlimited",unlimitedDesc:"Tools you can run locally without a provider message or generation quota.",unlimitedLocal:"No provider quota when running locally",
    sortDefault:"Recommended order",sortNew:"Newest first",sortAZ:"A → Z",sortZA:"Z → A",sortFree:"Free first",newBadge:"NEW",
    found:"tools found",details:"Details",category:"Category",pricing:"Pricing",studentOffer:"Student offer",israelStudentOffer:"Available to students in Israel",checkEligibility:"Check official eligibility",israelVerified:"Verified for Israel",
    official:"Official website",copyLink:"Copy link",copied:"Link copied",appAvailability:"Apps & platforms",platformUpdated:"Platform info updated",favoritesOnly:"Favorites",verified:"Verified",toolsInCategory:"tools",bestFor:"Best for",compare:"Compare",compareTitle:"Compare tools",compareClear:"Clear",compareOpen:"Compare now",compareLimit:"You can compare up to 3 tools",compareNeedTwo:"Choose at least 2 tools to compare",compareCategory:"Category",comparePrice:"Pricing",comparePlatforms:"Platforms",compareStudent:"Students in Israel",compareUnlimited:"Unlimited",compareOpenSource:"Open source",compareUses:"Use cases",yes:"Yes",no:"No",
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
  "Local AI":{he:"AI מקומי",icon:"◈",color:"#50D0B0"},
  "AI Agents":{he:"סוכני AI",icon:"⌁",color:"#C8FF5A"},
  "Data & Analytics":{he:"דאטה ואנליטיקה",icon:"⌗",color:"#67E8F9"},
  "3D & Assets":{he:"3D ונכסים",icon:"⬢",color:"#FB923C"},
  "Legal AI":{he:"AI למשפטים",icon:"§",color:"#F59E0B"},
  "Marketing & SEO":{he:"שיווק ו-SEO",icon:"↗",color:"#F472B6"},
  "Sales & CRM":{he:"מכירות ו-CRM",icon:"◎",color:"#60A5FA"},
  "Customer Support":{he:"שירות לקוחות",icon:"◍",color:"#34D399"},
  "PDF & Documents":{he:"PDF ומסמכים",icon:"▤",color:"#A78BFA"},
  "Career & Resume":{he:"קריירה וקורות חיים",icon:"◇",color:"#FACC15"}
};

const platformMeta={
  web:{he:"Web",en:"Web",icon:"◎"},
  windows:{he:"Windows",en:"Windows",icon:"⊞"},
  macos:{he:"macOS",en:"macOS",icon:"◆"},
  linux:{he:"Linux",en:"Linux",icon:"◈"},
  android:{he:"Android",en:"Android",icon:"△"},
  ios:{he:"iPhone / iPad",en:"iPhone / iPad",icon:""}
};

const FEATURED=["ChatGPT","Claude","Manus","Genspark","Cursor","Recraft","Meshy","Fathom"];
const HERO_PREVIEW=["v0","Lovable","Bolt"];
const STUDENT_PREVIEW=["GitHub Copilot","JetBrains AI Assistant","Figma AI","Adobe Firefly","Notion AI"];

const STUDENT_BENEFITS=[
  {
    name:"GitHub Student Developer Pack",
    icon:"GH",
    url:"https://education.github.com/pack",
    status:"verified",
    he:"חבילת 80+ כלים ומשאבים לסטודנטים מאומתים, כולל GitHub Pro, Copilot Student, Codespaces והטבות של שותפים.",
    en:"80+ tools and resources for verified students, including GitHub Pro, Copilot Student, Codespaces and partner offers.",
    noteHe:"פתוח לסטודנטים בני 13+ בתוכנית לימודים שמעניקה תואר/דיפלומה, עם אימייל מוסדי או הוכחת לימודים.",
    noteEn:"For students aged 13+ enrolled in a degree or diploma program, verified with a school email or proof of enrollment."
  },
  {
    name:"JetBrains Student Pack",
    icon:"JB",
    url:"https://www.jetbrains.com/academy/student-pack/",
    status:"verified",
    he:"גישה חינמית לכלי JetBrains ללימודים, כולל IntelliJ IDEA, PyCharm, WebStorm ועוד. AI Pro מוצע כניסיון מוגבל.",
    en:"Free educational access to JetBrains tools including IntelliJ IDEA, PyCharm, WebStorm and more. AI Pro is offered as a limited trial.",
    noteHe:"אימות עם אימייל אוניברסיטאי, ISIC/ITIC או GitHub Student Developer Pack. לשימוש לימודי לא-מסחרי.",
    noteEn:"Verify with a university email, ISIC/ITIC or GitHub Student Developer Pack. Educational, non-commercial use only."
  },
  {
    name:"Figma for Education",
    icon:"FG",
    url:"https://www.figma.com/education/higher-education/",
    status:"verified",
    he:"סטודנטים ומרצים זכאים יכולים לקבל תוכנית Education בחינם עם יכולות Professional של Figma ו-FigJam.",
    en:"Eligible students and educators can get a free Education plan with Professional Figma and FigJam features.",
    noteHe:"דורש אימות סטטוס לימודים. מתאים גם למוסדות השכלה גבוהה.",
    noteEn:"Requires education-status verification and supports higher-education students."
  },
  {
    name:"Autodesk Education",
    icon:"AD",
    url:"https://www.autodesk.com/education/edu-software/overview",
    status:"institution",
    he:"סטודנטים זכאים מקבלים גישה חינמית לשנה לתוכנות Autodesk לצורכי לימודים, עם אפשרות חידוש כל עוד נשארים זכאים.",
    en:"Eligible students get one year of free educational access to Autodesk software, renewable while eligible.",
    noteHe:"תלוי באימות המוסד והסטטוס. השימוש הוא ללימודים ולא לעבודה מסחרית.",
    noteEn:"Depends on institution/status verification. Educational use only, not commercial work."
  },
  {
    name:"Microsoft 365 Education",
    icon:"MS",
    url:"https://www.microsoft.com/education/products/office-365-education",
    status:"institution",
    he:"סטודנטים עם כתובת אימייל חינוכית זכאית יכולים לקבל Office 365 Education בחינם דרך המוסד.",
    en:"Students with an eligible education email can get Office 365 Education through their institution.",
    noteHe:"הזכאות והיישומים הזמינים תלויים במוסד הלימודים ובתוכנית שהמוסד מפעיל.",
    noteEn:"Eligibility and included apps depend on the educational institution and its plan."
  },
  {
    name:"Canva Education",
    icon:"CV",
    url:"https://www.canva.com/education/",
    status:"school",
    he:"Canva Education חינמית לתלמידי K-12 דרך מורה או בית ספר זכאי, עם כלי עיצוב ויכולות AI של Canva.",
    en:"Canva Education is free for eligible K-12 students through a verified teacher or school, with Canva design and AI tools.",
    noteHe:"מיועד בעיקר לבתי ספר K-12 — לא הטבת סטודנטים כללית לאוניברסיטאות.",
    noteEn:"Primarily for K-12 schools, not a general university student offer."
  }
];

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
function localIsraelOffer(tool){return state.lang==="he"?(tool.israelStudentOfferHe||tool.israelStudentOfferEn||""):(tool.israelStudentOfferEn||tool.israelStudentOfferHe||"")}
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
function saveFavorites(){localStorage.setItem("aiatlas-favs",JSON.stringify([...state.favorites]))}\nfunction isOpenSource(tool){return (tool.tags||[]).some(x=>String(x).toLowerCase()==="open-source")}\nfunction saveCompare(){localStorage.setItem("aiatlas-compare",JSON.stringify(state.compare))}\nfunction bestFor(tool){return (tool.tags||[]).filter(x=>!["open-source","local","offline"].includes(String(x).toLowerCase())).slice(0,3)}

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
      ${tool.israelStudent?`<span class="badge israel">🇮🇱 ${esc(t("israelVerified"))}</span>`:""}${tool.isNew?`<span class="badge new">${esc(t("newBadge"))}</span>`:""}
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
      &&(!els.student.checked||tool.israelStudent)
      &&(!els.fav.checked||state.favorites.has(tool.name));
  });

  if(els.sort.value==="new") results.sort((a,b)=>Number(!!b.isNew)-Number(!!a.isNew));
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
      <div class="badges"><span class="badge ${esc(tool.pricing)}">${esc(priceLabel(tool.pricing))}</span>${tool.student?'<span class="badge student">🎓 Student</span>':""}${tool.israelStudent?`<span class="badge israel">🇮🇱 ${esc(t("israelVerified"))}</span>`:""}${tool.isNew?`<span class="badge new">${esc(t("newBadge"))}</span>`:""}${tool.unlimitedFree?`<span class="badge unlimited">${esc(t("unlimitedBadge"))}</span>`:""}</div>
      <div class="dialog-tags">${(tool.tags||[]).slice(0,8).map(x=>`<span class="dialog-tag">#${esc(x)}</span>`).join("")}</div>
      <div class="dialog-meta">
        <div><small>${esc(t("category"))}</small><strong>${esc(localCategory(tool.category))}</strong></div>
        <div><small>${esc(t("pricing"))}</small><strong>${esc(priceLabel(tool.pricing))}</strong></div>
      </div>
      ${offer?`<div class="student-offer"><strong>🎓 ${esc(t("studentOffer"))}</strong><p>${esc(offer)}</p></div>`:""}
      ${tool.israelStudent?`<div class="israel-offer"><strong>🇮🇱 ${esc(t("israelStudentOffer"))}</strong><p>${esc(localIsraelOffer(tool))}</p>${tool.israelStudentOfferUrl?`<a href="${esc(tool.israelStudentOfferUrl)}" target="_blank" rel="noreferrer">${esc(t("checkEligibility"))} ↗</a>`:""}</div>`:""}
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
  $$(".category-card").forEach(btn=>btn.onclick=()=>{
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
  $$("[data-platform]").forEach(btn=>btn.onclick=()=>{
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

function buildStudentBenefits(){
  if(!els.studentBenefits)return;
  const statusLabel={
    verified:state.lang==="he"?"🇮🇱 מתאים / אימות נדרש":"🇮🇱 Israel-ready / verification required",
    institution:state.lang==="he"?"🏫 תלוי במוסד":"🏫 Institution-dependent",
    school:state.lang==="he"?"🏫 K-12 בלבד":"🏫 K-12 only"
  };
  els.studentBenefits.innerHTML=STUDENT_BENEFITS.map(item=>`
    <a class="student-benefit-card" href="${esc(item.url)}" target="_blank" rel="noreferrer">
      <span class="student-benefit-icon">${esc(item.icon)}</span>
      <span class="student-benefit-copy">
        <strong>${esc(item.name)}</strong>
        <small>${esc(state.lang==="he"?item.he:item.en)}</small>
        <em>${esc(state.lang==="he"?item.noteHe:item.noteEn)}</em>
      </span>
      <span class="student-benefit-status ${esc(item.status)}">${esc(statusLabel[item.status])}</span>
    </a>`).join("");
}

function buildStudentSpotlight(){
  const tools=STUDENT_PREVIEW.map(n=>state.tools.find(x=>x.name===n)).filter(x=>x&&x.israelStudent);
  els.studentSpotlight.innerHTML=tools.map(tool=>`<button class="student-mini" data-student-tool="${esc(tool.name)}">
    ${logo(tool,"student-mini-logo")}
    <span class="student-mini-body"><strong>${esc(tool.name)}</strong><small>${esc(localOffer(tool))}</small></span>
    <span class="verified israel-verified">🇮🇱 ${esc(t("israelVerified"))}</span>
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
  els.sort.innerHTML=`<option value="default">${esc(t("sortDefault"))}</option><option value="new">${esc(t("sortNew"))}</option><option value="az">${esc(t("sortAZ"))}</option><option value="za">${esc(t("sortZA"))}</option><option value="free">${esc(t("sortFree"))}</option>`;
  if([...els.cat.options].some(o=>o.value===currentCat))els.cat.value=currentCat;
  if([...els.price.options].some(o=>o.value===currentPrice))els.price.value=currentPrice;
  if([...els.platform.options].some(o=>o.value===currentPlatform))els.platform.value=currentPlatform;
  if([...els.sort.options].some(o=>o.value===currentSort))els.sort.value=currentSort;
}

function updateStats(){
  const cats=new Set(state.tools.map(x=>x.category)).size;
  const free=state.tools.filter(x=>x.pricing!=="paid").length;
  const student=state.tools.filter(x=>x.israelStudent).length;
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
  fillFilters();buildCategories();buildPlatforms();buildFeatured();buildStudentSpotlight();buildStudentBenefits();buildHeroPreview();renderTools();
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
  if(kind==="local")els.cat.value="Local AI";
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
  $("#themeBtn").onclick=()=>{document.body.classList.toggle("theme-red");localStorage.setItem("aiatlas-theme-color",document.body.classList.contains("theme-red")?"red":"blue")};
  $("#dialogClose").onclick=()=>els.dialog.close();
  els.dialog.addEventListener("click",e=>{if(e.target===els.dialog)els.dialog.close()});
  $("#surpriseBtn").onclick=()=>{const pool=state.filtered.length?state.filtered:state.tools;if(pool.length)openTool(pool[Math.floor(Math.random()*pool.length)])};
  $$("[data-quick]").forEach(btn=>btn.onclick=()=>quickFilter(btn.dataset.quick));
  document.addEventListener("keydown",e=>{
    if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();els.heroSearch.focus()}
    if(e.key==="Escape"&&els.dialog.open)els.dialog.close();
  });
}

function setupVisualEffects(){
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const progress=$("#scrollProgress"),backTop=$("#backTop");

  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const pct=max>0?Math.min(100,(window.scrollY/max)*100):0;
    if(progress)progress.style.width=pct+"%";
    if(backTop)backTop.classList.toggle("show",window.scrollY>650);
  };
  updateScroll();
  window.addEventListener("scroll",updateScroll,{passive:true});
  window.addEventListener("resize",updateScroll,{passive:true});
  if(backTop)backTop.onclick=()=>window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});

  if(fine&&!reduce){
    let mx=innerWidth*.5,my=innerHeight*.28,raf=0;
    document.addEventListener("pointermove",e=>{
      mx=e.clientX;my=e.clientY;
      if(!raf)raf=requestAnimationFrame(()=>{
        document.documentElement.style.setProperty("--mx",mx+"px");
        document.documentElement.style.setProperty("--my",my+"px");
        raf=0;
      });
      const card=e.target.closest(".tool-card,.featured-card,.collection-card,.category-card,.platform-card,.student-mini");
      if(card){
        const r=card.getBoundingClientRect();
        const x=e.clientX-r.left,y=e.clientY-r.top;
        card.style.setProperty("--px",x+"px");
        card.style.setProperty("--py",y+"px");
        if(!card.classList.contains("student-mini")){
          const rx=((y/r.height)-.5)*-3.2;
          const ry=((x/r.width)-.5)*3.2;
          card.style.transform=`perspective(850px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
        }
      }
    },{passive:true});
    document.addEventListener("pointerout",e=>{
      const card=e.target.closest?.(".tool-card,.featured-card,.collection-card,.category-card,.platform-card,.student-mini");
      if(card&&!card.contains(e.relatedTarget)){
        card.style.transform="";
        card.style.removeProperty("--px");
        card.style.removeProperty("--py");
      }
    });
  }

  document.addEventListener("click",e=>{
    const btn=e.target.closest("button,.details-btn,.primary-btn,.surprise-btn,.clear-btn");
    if(!btn||reduce)return;
    const r=btn.getBoundingClientRect();
    const ripple=document.createElement("span");
    ripple.className="ripple";
    ripple.style.left=(e.clientX-r.left)+"px";
    ripple.style.top=(e.clientY-r.top)+"px";
    const size=Math.max(r.width,r.height)*.75;
    ripple.style.width=ripple.style.height=size+"px";
    btn.appendChild(ripple);
    setTimeout(()=>ripple.remove(),560);
  });

  const links=[...document.querySelectorAll(".side-nav a")];
  const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window&&sections.length){
    const spy=new IntersectionObserver(entries=>{
      const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+visible.target.id));
    },{rootMargin:"-20% 0px -65% 0px",threshold:[0,.15,.4,.7]});
    sections.forEach(s=>spy.observe(s));
  }
}

function setupReveal(){
  if(!("IntersectionObserver" in window)){ $$(".reveal").forEach(x=>x.classList.add("visible"));return }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.08});
  $$(".reveal").forEach(el=>observer.observe(el));
}

async function init(){
  if(localStorage.getItem("aiatlas-theme-color")==="red")document.body.classList.add("theme-red");
  setupEvents();setupReveal();setupVisualEffects();
  try{
    const response=await fetch("data/tools.json?v=10");
    if(!response.ok)throw new Error("tools.json");
    state.tools=await response.json();
    updateStats();applyLanguage();
  }catch(error){
    els.grid.innerHTML=`<div class="empty"><div class="empty-icon">!</div><h3>Could not load tools database</h3></div>`;
  }
}
init();