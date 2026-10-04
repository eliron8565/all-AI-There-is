const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function readArray(key){
  try{
    const value=JSON.parse(localStorage.getItem(key)||"[]");
    return Array.isArray(value)?value:[];
  }catch{
    try{localStorage.removeItem(key)}catch{}
    return [];
  }
}
function readString(key,fallback){
  try{
    const value=localStorage.getItem(key);
    return value||fallback;
  }catch{return fallback}
}
function writeStorage(key,value){
  try{localStorage.setItem(key,value);return true}catch{return false}
}

const EMBEDDED_TOOLS=[{"name":"ChatGPT","maker":"OpenAI","url":"https://chatgpt.com","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","writing","coding","research","images","voice"],"descHe":"עוזר AI כללי לכתיבה, קוד, ניתוח, מחקר, תמונות ועבודה עם קבצים.","descEn":"A general AI assistant for writing, coding, analysis, research, images and file work.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Claude","maker":"Anthropic","url":"https://claude.ai","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","writing","coding","documents"],"descHe":"עוזר AI חזק לעבודה עם טקסט, מסמכים, ניתוח וקוד.","descEn":"A capable AI assistant for text, documents, analysis and coding.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Gemini","maker":"Google","url":"https://gemini.google.com","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","google","research","multimodal"],"descHe":"העוזר של Google עם יכולות מולטימודליות ושילוב עם שירותי Google.","descEn":"Google's multimodal AI assistant with integrations across Google services.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Microsoft Copilot","maker":"Microsoft","url":"https://copilot.microsoft.com","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","web","microsoft","images"],"descHe":"עוזר AI של Microsoft לחיפוש, יצירה ועבודה יומיומית.","descEn":"Microsoft's AI assistant for search, creation and everyday productivity.","platforms":["web","windows","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Grok","maker":"xAI","url":"https://grok.com","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","research","web"],"descHe":"עוזר AI של xAI לשיחה, חיפוש, מחקר ויצירת תוכן.","descEn":"xAI's assistant for conversation, search, research and content creation.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Le Chat","maker":"Mistral AI","url":"https://chat.mistral.ai","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","writing","research","coding"],"descHe":"עוזר AI של Mistral לשיחה, כתיבה, חיפוש וקוד.","descEn":"Mistral's AI assistant for chat, writing, search and coding.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"DeepSeek","maker":"DeepSeek","url":"https://chat.deepseek.com","category":"Chat & Assistants","pricing":"free","student":false,"tags":["chat","reasoning","coding"],"descHe":"עוזר AI לשיחה, חשיבה וקוד עם גישה חינמית לשירות הצ'אט.","descEn":"An AI assistant focused on chat, reasoning and coding with free chat access.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Poe","maker":"Quora","url":"https://poe.com","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","models","bots"],"descHe":"פלטפורמה לשיחה עם מגוון מודלי AI ובוטים במקום אחד.","descEn":"A platform for chatting with multiple AI models and bots in one place.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"האפליקציה הרשמית זמינה ל-iPhone/iPad, Android, macOS ו-Windows.","platformNoteEn":"The official app is available for iPhone/iPad, Android, macOS and Windows.","platformsUpdated":"2026-09-28"},{"name":"Meta AI","maker":"Meta","url":"https://www.meta.ai","category":"Chat & Assistants","pricing":"free","student":false,"tags":["chat","images","meta"],"descHe":"עוזר AI של Meta לשיחה, יצירה וחיפוש.","descEn":"Meta's AI assistant for conversation, creation and search.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Character.AI","maker":"Character Technologies","url":"https://character.ai","category":"Chat & Assistants","pricing":"freemium","student":false,"tags":["chat","characters","roleplay"],"descHe":"שיחות עם דמויות וסוכנים מבוססי AI שנוצרו לקהילות ושימושים שונים.","descEn":"Chat with AI-powered characters and agents built for many communities and use cases.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Perplexity","maker":"Perplexity","url":"https://www.perplexity.ai","category":"Research & Search","pricing":"freemium","student":true,"studentOfferHe":"Education Pro לסטודנטים ומחנכים מאומתים ב-$10 לחודש באמצעות אימות SheerID.","studentOfferEn":"Education Pro is available to verified students and educators for $10/month with SheerID verification.","tags":["research","search","citations","study"],"descHe":"מנוע תשובות ומחקר עם מקורות, ציטוטים וחיפוש ברשת.","descEn":"An answer and research engine with web search, sources and citations.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"זמין ב-Web, במובייל ובאפליקציות מחשב; ל-Windows קיימת גם חוויית Personal Computer ייעודית.","platformNoteEn":"Available on web, mobile and desktop; Windows also has a dedicated Personal Computer experience.","platformsUpdated":"2026-09-28","israelStudent":false,"israelStudentStatus":"check","israelStudentOfferHe":"Education Pro דורש אימות SheerID. Perplexity אינה מפרסמת בדף ההטבה התחייבות מפורשת לישראל; הזכאות בפועל תלויה ברשימת המדינות והמוסדות שמופיעה בטופס SheerID.","israelStudentOfferEn":"Education Pro requires SheerID verification. Perplexity's offer page does not explicitly guarantee Israel; actual eligibility depends on the countries and institutions available in the SheerID form.","israelStudentOfferUrl":"https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro","israelVerifiedAt":"2026-09-29"},{"name":"Elicit","maker":"Elicit","url":"https://elicit.com","category":"Research & Search","pricing":"freemium","student":false,"tags":["research","papers","academic","study"],"descHe":"עוזר למחקר אקדמי, מציאת מאמרים וסינתוז ראיות.","descEn":"An academic research assistant for finding papers and synthesizing evidence.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Consensus","maker":"Consensus","url":"https://consensus.app","category":"Research & Search","pricing":"freemium","student":false,"tags":["research","papers","academic","study"],"descHe":"חיפוש תשובות מתוך מאמרים ומחקר מדעי.","descEn":"Search for answers grounded in scientific papers and academic research.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"SciSpace","maker":"SciSpace","url":"https://scispace.com","category":"Research & Search","pricing":"freemium","student":false,"tags":["research","pdf","papers","study"],"descHe":"קריאה, הסבר, חיפוש וסיכום של מאמרים אקדמיים.","descEn":"Read, explain, search and summarize academic papers.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Phind","maker":"Phind","url":"https://www.phind.com","category":"Research & Search","pricing":"freemium","student":false,"tags":["search","developer","coding","research"],"descHe":"מנוע תשובות וחיפוש שמכוון במיוחד למפתחים ולשאלות טכניות.","descEn":"A search and answer engine focused on developers and technical questions.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"NotebookLM","maker":"Google","url":"https://notebooklm.google.com","category":"Study & Learning","pricing":"free","student":false,"tags":["study","pdf","notes","research","audio"],"descHe":"כלי לימוד ומחקר שמבוסס על המקורות והמסמכים שאתה מעלה.","descEn":"A study and research tool grounded in the sources and documents you provide.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Khanmigo","maker":"Khan Academy","url":"https://www.khanmigo.ai","category":"Study & Learning","pricing":"freemium","student":false,"tags":["study","tutor","education"],"descHe":"מורה פרטי מבוסס AI ללמידה מודרכת.","descEn":"An AI-powered tutor designed for guided learning.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Quizlet","maker":"Quizlet","url":"https://quizlet.com","category":"Study & Learning","pricing":"freemium","student":false,"tags":["study","flashcards","quiz","learning"],"descHe":"כלי לימוד, כרטיסיות, מבחנים ויכולות AI ללמידה.","descEn":"Study tools, flashcards, quizzes and AI-powered learning features.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"GitHub Copilot","maker":"GitHub","url":"https://github.com/features/copilot","category":"Coding","pricing":"freemium","student":true,"studentOfferHe":"Copilot Student ניתן בחינם לסטודנטים מאומתים דרך GitHub Education, כולל גישה לתכונות פרימיום.","studentOfferEn":"Copilot Student is free for verified students through GitHub Education, including access to premium features.","tags":["coding","github","autocomplete","developer","agent"],"descHe":"עוזר קוד בתוך סביבת הפיתוח עם השלמות, צ'אט וסוכני קוד.","descEn":"A coding assistant for IDEs with completions, chat and agentic workflows.","platforms":["web","windows","macos","linux"],"platformNoteHe":"קיימת אפליקציית GitHub Copilot שולחנית ל-Windows, macOS ו-Linux, בנוסף לשילובים בתוך עורכי קוד.","platformNoteEn":"A GitHub Copilot desktop app is available on Windows, macOS and Linux, alongside IDE integrations.","platformsUpdated":"2026-09-28","israelStudent":true,"israelStudentStatus":"verified","israelStudentOfferHe":"מתאים לסטודנטים בישראל בכפוף לאימות GitHub Education. סטודנט מאומת מקבל Copilot Student בחינם עם גישה לתכונות פרימיום. אפשר לאמת עם אימייל אקדמי או מסמכי לימודים לפי תהליך GitHub.","israelStudentOfferEn":"Available to students in Israel subject to GitHub Education verification. Verified students get Copilot Student free with premium features. Verification can use an academic email or accepted enrollment documents.","israelStudentOfferUrl":"https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students","israelVerifiedAt":"2026-09-29"},{"name":"Cursor","maker":"Anysphere","url":"https://cursor.com","category":"Coding","pricing":"freemium","student":false,"tags":["coding","editor","agent","developer"],"descHe":"עורך קוד מבוסס AI עם צ'אט, השלמות וסוכנים שעובדים על הפרויקט.","descEn":"An AI code editor with chat, completions and agents that work across your project.","platforms":["web","windows","macos","linux"],"platformNoteHe":"אפליקציית שולחן העבודה זמינה ל-Windows, macOS ו-Linux; יש גם גישת Web לסוכנים.","platformNoteEn":"The desktop app is available on Windows, macOS and Linux, with web access for agents as well.","platformsUpdated":"2026-09-28"},{"name":"Windsurf","maker":"Cognition","url":"https://windsurf.com","category":"Coding","pricing":"freemium","student":false,"tags":["coding","editor","agent"],"descHe":"סביבת פיתוח עם AI לכתיבה, ניווט ושינוי קוד בפרויקטים.","descEn":"An AI development environment for writing, navigating and changing codebases.","platforms":["windows","macos","linux"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Replit","maker":"Replit","url":"https://replit.com","category":"Coding","pricing":"freemium","student":false,"tags":["coding","browser","deploy","agent"],"descHe":"סביבת פיתוח בדפדפן עם סוכן AI לבנייה, הרצה ופריסה של אפליקציות.","descEn":"A browser development environment with AI agents for building, running and deploying apps.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Devin","maker":"Cognition","url":"https://devin.ai","category":"Coding","pricing":"paid","student":false,"tags":["coding","agent","developer"],"descHe":"סוכן תוכנה אוטונומי שמסוגל לעבוד על משימות פיתוח מורכבות.","descEn":"An autonomous software engineering agent for complex development tasks.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"JetBrains AI Assistant","maker":"JetBrains","url":"https://www.jetbrains.com/ai","category":"Coding","pricing":"freemium","student":true,"tags":["coding","ide","developer","jetbrains"],"descHe":"יכולות AI בתוך IDEs של JetBrains לכתיבה, הסבר ושינוי קוד.","descEn":"AI features inside JetBrains IDEs for writing, explaining and modifying code.","platforms":["windows","macos","linux"],"platformNoteHe":"לא אפליקציה עצמאית — פועל מתוך IDEs של JetBrains במערכות שולחניות נתמכות.","platformNoteEn":"Not a standalone app — it runs inside supported JetBrains IDEs on desktop.","platformsUpdated":"2026-09-28","studentOfferHe":"JetBrains Student Pack חינמי לסטודנטים מאומתים וכולל את כלי הפיתוח המלאים. יכולות AI זמינות במסלול AI Free ובניסיון AI Pro מוגבל.","studentOfferEn":"JetBrains Student Pack is free for verified students and includes the full IDE suite. AI Free is available and a limited AI Pro trial is included.","israelStudent":true,"israelStudentStatus":"verified-global","israelStudentOfferHe":"מתאים לסטודנטים בישראל בכפוף לאימות JetBrains. אפשר לאמת עם אימייל אוניברסיטאי, כרטיס ISIC/ITIC או חשבון GitHub Student Developer Pack. הרישיון מיועד לשימוש לימודי ולא מסחרי.","israelStudentOfferEn":"Available to students in Israel subject to JetBrains verification using a university email, ISIC/ITIC, or GitHub Student Developer Pack. Educational licenses are for non-commercial study use.","israelStudentOfferUrl":"https://www.jetbrains.com/academy/student-pack/","israelVerifiedAt":"2026-09-30"},{"name":"Sourcegraph Cody","maker":"Sourcegraph","url":"https://sourcegraph.com/cody","category":"Coding","pricing":"freemium","student":false,"tags":["coding","codebase","developer","search"],"descHe":"עוזר קוד שמבין בסיסי קוד גדולים ומשלב חיפוש והקשר.","descEn":"A coding assistant built to understand large codebases with search and context.","platforms":["web","windows","macos","linux"],"platformNoteHe":"הגישה במחשב היא בעיקר דרך הרחבות לעורכי קוד ושילובי פיתוח.","platformNoteEn":"Desktop access is mainly through editor extensions and developer integrations.","platformsUpdated":"2026-09-28"},{"name":"Tabnine","maker":"Tabnine","url":"https://www.tabnine.com","category":"Coding","pricing":"freemium","student":false,"tags":["coding","autocomplete","developer"],"descHe":"השלמות קוד ועוזר AI למפתחים עם דגש על סביבת עבודה ארגונית.","descEn":"AI code completion and assistance with a focus on professional development workflows.","platforms":["windows","macos","linux"],"platformNoteHe":"פועל בעיקר כתוסף בתוך IDEs ועורכי קוד במחשב.","platformNoteEn":"Primarily runs as an extension inside desktop IDEs and code editors.","platformsUpdated":"2026-09-28"},{"name":"v0","maker":"Vercel","url":"https://v0.dev","category":"App & Website Builders","pricing":"freemium","student":false,"tags":["website","ui","react","code"],"descHe":"יצירת ממשקי web ואפליקציות באמצעות פרומפטים וקוד.","descEn":"Generate web interfaces and applications from prompts with editable code.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Lovable","maker":"Lovable","url":"https://lovable.dev","category":"App & Website Builders","pricing":"freemium","student":false,"tags":["website","app","code","no-code"],"descHe":"בניית אפליקציות ואתרים באמצעות שיחה עם AI.","descEn":"Build apps and websites by describing what you want to an AI.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Bolt","maker":"StackBlitz","url":"https://bolt.new","category":"App & Website Builders","pricing":"freemium","student":false,"tags":["website","app","code","browser"],"descHe":"בניית אפליקציות full-stack ישירות בדפדפן בעזרת AI.","descEn":"Build full-stack applications directly in the browser with AI.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Framer AI","maker":"Framer","url":"https://www.framer.com","category":"App & Website Builders","pricing":"freemium","student":false,"tags":["website","design","landing-page"],"descHe":"בניית אתרים ודפי נחיתה בעזרת AI וכלי עיצוב חזותיים.","descEn":"Build websites and landing pages with AI and visual design tools.","platforms":["web","macos"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Webflow AI","maker":"Webflow","url":"https://webflow.com/ai","category":"App & Website Builders","pricing":"freemium","student":false,"tags":["website","design","cms","ai"],"descHe":"יכולות AI לבניית אתרים, תוכן ועיצוב בתוך Webflow.","descEn":"AI features for website creation, content and design inside Webflow.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Canva Magic Studio","maker":"Canva","url":"https://www.canva.com/magic-studio","category":"Design","pricing":"freemium","student":true,"tags":["design","presentation","image","social"],"descHe":"כלי AI לעיצוב, מצגות, תמונות ותוכן לרשתות.","descEn":"AI tools for design, presentations, images and social content.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28","studentOfferHe":"Canva Education זמינה בחינם לתלמידי K-12 דרך מורה/מוסד זכאי. לסטודנטים באוניברסיטה ההטבה הזו אינה מסלול Student כללי.","studentOfferEn":"Canva Education is free for eligible K-12 students through a verified teacher or school. It is not a general higher-education student plan.","israelStudent":false,"israelStudentStatus":"school-only","israelStudentOfferHe":"בישראל זה רלוונטי בעיקר לתלמידי בתי ספר K-12 כאשר מורה מאומת מזמין אותם ל-Canva Education.","israelStudentOfferEn":"In Israel this is mainly relevant to K-12 students invited by a verified teacher to Canva Education.","israelStudentOfferUrl":"https://www.canva.com/education/","israelVerifiedAt":"2026-09-30"},{"name":"Figma AI","maker":"Figma","url":"https://www.figma.com/ai","category":"Design","pricing":"freemium","student":true,"tags":["design","ui","ux","prototype"],"descHe":"כלי AI בתוך Figma לעיצוב, עריכת תוכן ויצירת ממשקים.","descEn":"AI features inside Figma for design, content editing and interface creation.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28","studentOfferHe":"Figma for Education נותנת לסטודנטים ומרצים מאומתים גישה חינמית לתוכנית Education, כולל יכולות של תוכנית Professional.","studentOfferEn":"Figma for Education gives verified students and educators free Education access, including Professional-plan features.","israelStudent":true,"israelStudentStatus":"verified-global","israelStudentOfferHe":"מתאים גם לסטודנטים בישראל בכפוף לאימות Figma Education. סטודנטים בהשכלה גבוהה יכולים לקבל תוכנית Professional בחינם דרך Education.","israelStudentOfferEn":"Available to students in Israel subject to Figma Education verification. Higher-education students can receive the Professional plan for free.","israelStudentOfferUrl":"https://www.figma.com/education/higher-education/","israelVerifiedAt":"2026-09-30"},{"name":"Napkin AI","maker":"Napkin","url":"https://www.napkin.ai","category":"Design","pricing":"freemium","student":false,"tags":["diagram","visual","presentation"],"descHe":"הופך טקסט לתרשימים וויזואליזציות במהירות.","descEn":"Turn text into diagrams and visual explanations quickly.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Microsoft Designer","maker":"Microsoft","url":"https://designer.microsoft.com","category":"Design","pricing":"freemium","student":false,"tags":["design","image","social","microsoft"],"descHe":"כלי עיצוב של Microsoft עם יצירת תמונות ותוכן בעזרת AI.","descEn":"Microsoft's AI-powered design tool for images and visual content.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Adobe Firefly","maker":"Adobe","url":"https://firefly.adobe.com","category":"Image Generation","pricing":"freemium","student":true,"studentOfferHe":"Adobe מציעה תוכנית Creative Cloud Pro מוזלת לסטודנטים ומורים, הכוללת יכולות Firefly. המחיר והזכאות משתנים לפי מדינה.","studentOfferEn":"Adobe offers discounted Creative Cloud Pro plans for students and teachers that include Firefly features. Pricing and eligibility vary by country.","tags":["image","design","adobe","generative"],"descHe":"יצירת ועריכת תמונות, וידאו ואודיו בעזרת מודלים גנרטיביים של Adobe.","descEn":"Generate and edit images, video and audio with Adobe's generative AI models.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28","israelStudent":true,"israelStudentStatus":"verified","israelStudentOfferHe":"Adobe מציעה בישראל Creative Cloud Pro לתלמידים ומורים. נכון ל-29.09.2026 המחיר המוצג באתר הישראלי הוא 88.99 ₪ לחודש בשנה הראשונה ו-179.99 ₪ לחודש לאחר מכן, וכולל יכולות Adobe Firefly וקרדיטים גנרטיביים.","israelStudentOfferEn":"Adobe offers Creative Cloud Pro for students and teachers in Israel. As of 2026-09-29, Adobe Israel lists NIS 88.99/month for the first year and NIS 179.99/month afterward, including Adobe Firefly AI features and generative credits.","israelStudentOfferUrl":"https://www.adobe.com/il_he/education/students/creativecloud.html","israelVerifiedAt":"2026-09-29"},{"name":"Midjourney","maker":"Midjourney","url":"https://www.midjourney.com","category":"Image Generation","pricing":"paid","student":false,"tags":["image","art","design"],"descHe":"מחולל תמונות פופולרי ליצירה אמנותית ואיכות חזותית גבוהה.","descEn":"A popular image generator known for artistic output and strong visual quality.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Leonardo AI","maker":"Leonardo","url":"https://leonardo.ai","category":"Image Generation","pricing":"freemium","student":false,"tags":["image","art","game-assets","design"],"descHe":"יצירת תמונות, נכסים למשחקים ועיצובים בעזרת AI.","descEn":"Create images, game assets and visual designs with AI.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Ideogram","maker":"Ideogram","url":"https://ideogram.ai","category":"Image Generation","pricing":"freemium","student":false,"tags":["image","text-in-image","poster","design"],"descHe":"יצירת תמונות עם דגש על טקסט קריא בתוך העיצוב.","descEn":"Generate images with a strong focus on readable text inside visuals.","platforms":["web","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Krea","maker":"Krea","url":"https://www.krea.ai","category":"Image Generation","pricing":"freemium","student":false,"tags":["image","realtime","enhance","design"],"descHe":"יצירה ושיפור תמונות בזמן אמת עם מגוון מודלים.","descEn":"Generate and enhance visuals in real time using multiple AI models.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"ComfyUI","maker":"Open Source","url":"https://github.com/comfyanonymous/ComfyUI","category":"Image Generation","pricing":"free","student":false,"tags":["image","local","open-source","workflow"],"descHe":"ממשק node-based מתקדם להרצת תהליכי יצירת תמונות מקומיים.","descEn":"An advanced node-based interface for local image-generation workflows.","platforms":["windows","macos","linux"],"platformNoteHe":"רץ מקומית על המחשב ומציג ממשק בדפדפן המקומי; אין אפליקציית מובייל רשמית.","platformNoteEn":"Runs locally on your computer with a local browser UI; no official mobile app.","platformsUpdated":"2026-09-28","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"ComfyUI המקומי הוא קוד פתוח ורץ על המחשב שלך ללא מכסת יצירות מצד השירות. מודלים או Nodes חיצוניים בענן יכולים להיות בתשלום.","unlimitedNoteEn":"Local ComfyUI is open source and runs on your own computer without a service generation quota. External cloud models or nodes may cost money."},{"name":"Stable Diffusion WebUI","maker":"Open Source","url":"https://github.com/AUTOMATIC1111/stable-diffusion-webui","category":"Image Generation","pricing":"free","student":false,"tags":["image","local","open-source"],"descHe":"ממשק מקומי פופולרי להרצת מודלי Stable Diffusion.","descEn":"A popular local interface for running Stable Diffusion models.","platforms":["windows","macos","linux"],"platformNoteHe":"רץ מקומית דרך המחשב וממשק דפדפן מקומי; אין אפליקציית מובייל רשמית.","platformNoteEn":"Runs locally on desktop through a local browser UI; no official mobile app.","platformsUpdated":"2026-09-28","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"הממשק המקומי חינמי וקוד פתוח, ולכן אין מכסת יצירות מצד השירות. השימוש בפועל תלוי בחומרה וברישיונות של המודלים.","unlimitedNoteEn":"The local interface is free and open source, so there is no service-side generation quota. Actual use depends on your hardware and model licenses."},{"name":"Runway","maker":"Runway","url":"https://runwayml.com","category":"Video Generation","pricing":"freemium","student":false,"tags":["video","editing","generation","film"],"descHe":"יצירת ועריכת וידאו עם מודלים גנרטיביים מתקדמים.","descEn":"Generate and edit video with advanced generative AI models.","platforms":["web","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Pika","maker":"Pika","url":"https://pika.art","category":"Video Generation","pricing":"freemium","student":false,"tags":["video","animation","generation"],"descHe":"יצירת קליפים ואנימציות מפרומפטים ותמונות.","descEn":"Create short clips and animations from prompts and images.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Luma Dream Machine","maker":"Luma AI","url":"https://lumalabs.ai/dream-machine","category":"Video Generation","pricing":"freemium","student":false,"tags":["video","generation","cinematic"],"descHe":"יצירת וידאו קולנועי קצר בעזרת AI.","descEn":"Generate short cinematic video with AI.","platforms":["web","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Kling AI","maker":"Kuaishou","url":"https://klingai.com","category":"Video Generation","pricing":"freemium","student":false,"tags":["video","generation","image-to-video"],"descHe":"פלטפורמה ליצירת וידאו ותמונה-לווידאו בעזרת AI.","descEn":"An AI platform for text-to-video and image-to-video generation.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"HeyGen","maker":"HeyGen","url":"https://www.heygen.com","category":"Video & Avatars","pricing":"freemium","student":false,"tags":["avatar","video","translation","presenter"],"descHe":"אווטארים מדברים, תרגום וידאו ויצירת סרטוני פרזנטציה.","descEn":"Talking avatars, video translation and AI presenter videos.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Synthesia","maker":"Synthesia","url":"https://www.synthesia.io","category":"Video & Avatars","pricing":"paid","student":false,"tags":["avatar","video","training","presenter"],"descHe":"יצירת סרטוני הדרכה עם מגישי AI ואווטארים.","descEn":"Create training and presentation videos with AI avatars.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"ElevenLabs","maker":"ElevenLabs","url":"https://elevenlabs.io","category":"Audio & Voice","pricing":"freemium","student":false,"tags":["voice","tts","audio","dubbing"],"descHe":"טקסט לדיבור, קולות סינתטיים ודיבוב רב-לשוני.","descEn":"Text-to-speech, synthetic voices and multilingual dubbing.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Murf","maker":"Murf AI","url":"https://murf.ai","category":"Audio & Voice","pricing":"freemium","student":false,"tags":["voice","tts","audio"],"descHe":"יצירת קריינות וקולות AI לסרטונים, מצגות ותוכן.","descEn":"Create AI voiceovers for videos, presentations and content.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Speechify","maker":"Speechify","url":"https://speechify.com","category":"Audio & Voice","pricing":"freemium","student":false,"tags":["voice","tts","reading","audio"],"descHe":"המרת טקסט לדיבור והאזנה למסמכים, אתרים ותוכן.","descEn":"Turn text into speech and listen to documents, websites and other content.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Suno","maker":"Suno","url":"https://suno.com","category":"Music","pricing":"freemium","student":false,"tags":["music","song","audio"],"descHe":"יצירת שירים ומוזיקה מלאה באמצעות תיאור טקסטואלי.","descEn":"Generate complete songs and music from text descriptions.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Udio","maker":"Udio","url":"https://www.udio.com","category":"Music","pricing":"freemium","student":false,"tags":["music","song","audio"],"descHe":"מחולל מוזיקה ושירים מבוסס AI.","descEn":"An AI-powered music and song generator.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Descript","maker":"Descript","url":"https://www.descript.com","category":"Audio & Video Editing","pricing":"freemium","student":false,"tags":["podcast","video","transcription","editing"],"descHe":"עריכת וידאו ופודקאסטים דרך עריכת הטקסט המתומלל.","descEn":"Edit video and podcasts by editing their transcript.","platforms":["web","windows","macos"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"VEED AI","maker":"VEED","url":"https://www.veed.io/tools/ai","category":"Audio & Video Editing","pricing":"freemium","student":false,"tags":["video","editing","captions","ai"],"descHe":"כלי עריכת וידאו בדפדפן עם כתוביות, יצירה ועזרי AI.","descEn":"Browser video editing with captions, generation and AI-assisted tools.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Otter.ai","maker":"Otter","url":"https://otter.ai","category":"Meetings & Transcription","pricing":"freemium","student":false,"tags":["meeting","transcription","notes"],"descHe":"תמלול פגישות, סיכומים והפקת נקודות פעולה.","descEn":"Meeting transcription, summaries and action items.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Fireflies.ai","maker":"Fireflies","url":"https://fireflies.ai","category":"Meetings & Transcription","pricing":"freemium","student":false,"tags":["meeting","transcription","notes"],"descHe":"עוזר לפגישות שמקליט, מתמלל ומסכם שיחות.","descEn":"A meeting assistant that records, transcribes and summarizes conversations.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Grammarly","maker":"Grammarly","url":"https://www.grammarly.com","category":"Writing","pricing":"freemium","student":false,"tags":["writing","grammar","english","rewrite"],"descHe":"שיפור כתיבה, דקדוק, ניסוח וטון בעזרת AI.","descEn":"Improve writing, grammar, rewriting and tone with AI.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"QuillBot","maker":"QuillBot","url":"https://quillbot.com","category":"Writing","pricing":"freemium","student":false,"tags":["writing","paraphrase","grammar","study"],"descHe":"ניסוח מחדש, סיכום ובדיקת כתיבה.","descEn":"Paraphrase, summarize and improve written content.","platforms":["web","windows","macos"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"DeepL Write","maker":"DeepL","url":"https://www.deepl.com/write","category":"Writing","pricing":"freemium","student":false,"tags":["writing","translation","rewrite"],"descHe":"שיפור וניסוח טקסטים עם דגש על שפה טבעית.","descEn":"Refine and rewrite text with an emphasis on natural language.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"DeepL","maker":"DeepL","url":"https://www.deepl.com/translator","category":"Translation","pricing":"freemium","student":false,"tags":["translation","language","writing"],"descHe":"תרגום מבוסס AI בין שפות רבות.","descEn":"AI-powered translation across many languages.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Notion AI","maker":"Notion","url":"https://www.notion.com/product/ai","category":"Productivity","pricing":"paid","student":true,"studentOfferHe":"Notion מציעה תוכנית Education חינמית לסטודנטים זכאים במוסדות להשכלה גבוהה. הזמינות והתמחור של יכולות AI תלויים בתוכנית הנוכחית.","studentOfferEn":"Notion offers a free Education plan to eligible higher-education students. AI availability and pricing depend on the current workspace plan.","tags":["notes","writing","productivity","study"],"descHe":"AI בתוך Notion לכתיבה, סיכום, חיפוש ועבודה עם ידע.","descEn":"AI inside Notion for writing, summaries, search and knowledge work.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"יכולות Notion AI זמינות בתוך Notion ב-Web, Windows, macOS, Android ו-iPhone/iPad.","platformNoteEn":"Notion AI features are available inside Notion on web, Windows, macOS, Android and iPhone/iPad.","platformsUpdated":"2026-09-28","israelStudent":true,"israelStudentStatus":"verified","israelStudentOfferHe":"מתאים לסטודנטים בישראל אם מוסד הלימודים מוכר ב-WHED ויש לך אימייל מוסדי תקף. תוכנית Education של Notion ניתנת בחינם לסטודנטים זכאים; יש לאמת את הסטטוס פעם בשנה. יכולות AI תלויות בתוכנית הנוכחית.","israelStudentOfferEn":"Available to students in Israel when the institution is recognized in WHED and you have a valid institutional email. Notion's Education plan is free for eligible students and requires yearly verification; AI availability depends on the current plan.","israelStudentOfferUrl":"https://www.notion.com/he/help/notion-for-education","israelVerifiedAt":"2026-09-29"},{"name":"Miro AI","maker":"Miro","url":"https://miro.com/ai","category":"Productivity","pricing":"freemium","student":false,"tags":["whiteboard","brainstorm","team"],"descHe":"AI ללוחות עבודה, סיעור מוחות, סיכום וארגון רעיונות.","descEn":"AI for whiteboards, brainstorming, summaries and organizing ideas.","platforms":["web","windows","macos","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Gamma","maker":"Gamma","url":"https://gamma.app","category":"Presentations","pricing":"freemium","student":false,"tags":["presentation","slides","design"],"descHe":"יצירת מצגות, מסמכים ודפי web באמצעות AI.","descEn":"Create presentations, documents and web pages with AI.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Beautiful.ai","maker":"Beautiful.ai","url":"https://www.beautiful.ai","category":"Presentations","pricing":"paid","student":false,"tags":["presentation","slides","design"],"descHe":"בניית מצגות עם עיצוב חכם ואוטומטי.","descEn":"Build presentations with smart, automated slide design.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Wolfram Alpha","maker":"Wolfram","url":"https://www.wolframalpha.com","category":"Math & Science","pricing":"freemium","student":false,"tags":["math","science","calculation","study"],"descHe":"מנוע ידע חישובי לפתרון בעיות מתמטיקה ומדע.","descEn":"A computational knowledge engine for mathematics and science.","platforms":["web","android","ios"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Zapier AI","maker":"Zapier","url":"https://zapier.com/ai","category":"Automation","pricing":"freemium","student":false,"tags":["automation","workflow","agent"],"descHe":"בניית אוטומציות ותהליכי עבודה בעזרת AI.","descEn":"Build AI-assisted automations and workflows across apps.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Make","maker":"Make","url":"https://www.make.com","category":"Automation","pricing":"freemium","student":false,"tags":["automation","workflow","integrations"],"descHe":"אוטומציות וזרימות עבודה בין אפליקציות עם יכולות AI.","descEn":"Visual automations and workflows across apps with AI integrations.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"n8n","maker":"n8n","url":"https://n8n.io","category":"Automation","pricing":"freemium","student":false,"tags":["automation","workflow","self-hosted","agent"],"descHe":"פלטפורמת אוטומציה גמישה עם self-hosting ושילוב סוכני AI.","descEn":"A flexible automation platform with self-hosting and AI agent integrations.","platforms":["web","windows","macos","linux"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Hugging Face","maker":"Hugging Face","url":"https://huggingface.co","category":"Models & Developer Tools","pricing":"freemium","student":false,"tags":["models","developer","open-source","dataset"],"descHe":"קהילה ופלטפורמה למודלים, datasets ויישומי AI פתוחים.","descEn":"A platform and community for models, datasets and open AI applications.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Replicate","maker":"Replicate","url":"https://replicate.com","category":"Models & Developer Tools","pricing":"paid","student":false,"tags":["api","models","developer"],"descHe":"הרצת מודלי AI דרך API ללא ניהול תשתית מורכבת.","descEn":"Run AI models through an API without managing complex infrastructure.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"OpenRouter","maker":"OpenRouter","url":"https://openrouter.ai","category":"Models & Developer Tools","pricing":"paid","student":false,"tags":["api","models","developer","llm"],"descHe":"גישה מאוחדת למודלי שפה מספקים שונים דרך API אחד.","descEn":"Unified API access to language models from multiple providers.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"Google AI Studio","maker":"Google","url":"https://aistudio.google.com","category":"Models & Developer Tools","pricing":"freemium","student":false,"tags":["api","models","developer","gemini"],"descHe":"סביבת פיתוח בדפדפן לניסוי ובנייה עם מודלי Gemini ו-API.","descEn":"A browser developer environment for experimenting and building with Gemini models and APIs.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"GroqCloud","maker":"Groq","url":"https://console.groq.com","category":"Models & Developer Tools","pricing":"freemium","student":false,"tags":["api","models","developer","inference"],"descHe":"פלטפורמת inference מהירה להרצת מודלים דרך API.","descEn":"A fast inference platform for running supported AI models through an API.","platforms":["web"],"platformNoteHe":"","platformNoteEn":"","platformsUpdated":"2026-09-28"},{"name":"LM Studio","maker":"LM Studio","url":"https://lmstudio.ai","category":"Local AI","pricing":"free","student":false,"tags":["local","offline","llm","privacy"],"descHe":"הרצת מודלי LLM מקומית במחשב עם ממשק גרפי.","descEn":"Run large language models locally with a desktop graphical interface.","platforms":["windows","macos","linux"],"platformNoteHe":"אפליקציית מחשב מקומית להרצת מודלים על Windows, macOS ו-Linux.","platformNoteEn":"A local desktop app for running models on Windows, macOS and Linux.","platformsUpdated":"2026-09-28","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"חינם לשימוש בבית ובעבודה. בהרצת מודלים מקומיים אין מכסת הודעות של שירות ענן — המגבלה היא בעיקר החומרה שלך ורישיון המודל שבחרת.","unlimitedNoteEn":"Free to use at home and at work. Local models have no cloud-service message quota; practical limits are your hardware and the selected model's license."},{"name":"Ollama","maker":"Ollama","url":"https://ollama.com","category":"Local AI","pricing":"free","student":false,"tags":["local","offline","llm","developer"],"descHe":"הרצה וניהול של מודלי AI מקומיים דרך פקודות ו-API.","descEn":"Run and manage local AI models through a CLI and API.","platforms":["windows","macos","linux"],"platformNoteHe":"כלי מקומי למחשב עם תמיכה ב-Windows, macOS ו-Linux.","platformNoteEn":"A local desktop tool supporting Windows, macOS and Linux.","platformsUpdated":"2026-09-28","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"מודלים שרצים מקומית ב-Ollama הם תמיד בחינם וללא מכסת שימוש מצד Ollama. המגבלה היא החומרה שלך ורישיון המודל.","unlimitedNoteEn":"Models run locally in Ollama are always free with no Ollama usage quota. Limits come from your hardware and the model license."},{"name":"Jan","maker":"Jan","url":"https://jan.ai","category":"Local AI","pricing":"free","student":false,"tags":["local","offline","open-source","llm"],"descHe":"אפליקציית AI מקומית ופתוחה להרצת מודלים על המחשב.","descEn":"An open local AI desktop app for running models on your computer.","platforms":["windows","macos","linux"],"platformNoteHe":"אפליקציית AI מקומית ופתוחה ל-Windows, macOS ו-Linux.","platformNoteEn":"An open local AI desktop app for Windows, macOS and Linux.","platformsUpdated":"2026-09-28","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"הרצה מקומית ב-Jan היא ללא חשבון ענן וללא דמי שימוש. אפשר להשתמש במודלים המקומיים לפי יכולת המחשב ורישיון המודל.","unlimitedNoteEn":"Local use in Jan requires no cloud account and has no usage fees. Usage is limited by your computer and the model license."},{"name":"Google Flow","maker":"Google","url":"https://flow.google","category":"Video Generation","pricing":"freemium","student":false,"platforms":["web"],"platformNoteHe":"כלי יצירה קולנועי מבוסס Web לעבודה עם מודלי הווידאו של Google.","platformNoteEn":"A web-based filmmaking tool for creating with Google's video models.","tags":["video","generation","filmmaking","google"],"descHe":"כלי יצירה קולנועי של Google ליצירת קליפים וסצנות בעזרת AI.","descEn":"Google's AI filmmaking tool for creating clips and scenes.","platformsUpdated":"2026-09-28","linkUpdated":"2026-10-04"},{"name":"Manus","maker":"Manus","url":"https://manus.im","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agent","research","automation"],"descHe":"סוכן AI שמבצע משימות רב־שלביות, מחקר, יצירת מסמכים ואתרים.","descEn":"An AI agent for multi-step tasks, research, documents and websites.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Genspark","maker":"Genspark","url":"https://www.genspark.ai","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web","windows","macos"],"tags":["agent","research","workspace"],"descHe":"סביבת עבודה עם Super Agent, מחקר, מצגות, מסמכים וכלי יצירה.","descEn":"AI workspace with a Super Agent, research, slides, documents and creation tools.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Lindy","maker":"Lindy","url":"https://www.lindy.ai","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agent","automation","assistant"],"descHe":"בניית סוכני AI אישיים לאימייל, פגישות ותהליכי עבודה.","descEn":"Build personal AI agents for email, meetings and workflows.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Gumloop","maker":"Gumloop","url":"https://www.gumloop.com","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agent","automation","workflow"],"descHe":"אוטומציות AI וזרימות עבודה ללא צורך בקוד.","descEn":"No-code AI automations and workflows.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Relay.app","maker":"Relay","url":"https://www.relay.app","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agent","automation","workflow"],"descHe":"אוטומציות עם AI ואישור אנושי בשלבים חשובים.","descEn":"AI automations with human-in-the-loop approval steps.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Bardeen","maker":"Bardeen","url":"https://www.bardeen.ai","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["automation","browser","agent"],"descHe":"אוטומציות לדפדפן ולעבודה עם אפליקציות ומידע.","descEn":"Browser and app automation powered by AI.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Fathom","maker":"Fathom","url":"https://fathom.video","category":"Meetings & Transcription","pricing":"freemium","student":false,"platforms":["web","windows","macos"],"tags":["meeting","notes","transcription"],"descHe":"עוזר פגישות שמקליט, מתמלל ומסכם שיחות.","descEn":"Meeting assistant that records, transcribes and summarizes calls.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Krisp","maker":"Krisp","url":"https://krisp.ai","category":"Meetings & Transcription","pricing":"freemium","student":false,"platforms":["windows","macos","android","ios"],"tags":["meeting","noise","transcription"],"descHe":"סינון רעשים, תמלול, הקלטה וסיכומי פגישות עם AI.","descEn":"Noise cancellation, transcription, recording and AI meeting notes.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Granola","maker":"Granola","url":"https://www.granola.ai","category":"Meetings & Transcription","pricing":"freemium","student":false,"platforms":["macos","ios"],"tags":["meeting","notes","productivity"],"descHe":"פנקס AI לפגישות שמארגן ומשפר את ההערות שלך.","descEn":"AI meeting notepad that organizes and enhances your notes.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Read AI","maker":"Read AI","url":"https://www.read.ai","category":"Meetings & Transcription","pricing":"freemium","student":false,"platforms":["web"],"tags":["meeting","summary","analytics"],"descHe":"סיכומי פגישות, תמלול וניתוח שיחות ופגישות.","descEn":"Meeting summaries, transcription and conversation analytics.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Julius AI","maker":"Julius","url":"https://julius.ai","category":"Data & Analytics","pricing":"freemium","student":false,"platforms":["web"],"tags":["data","analytics","charts"],"descHe":"אנליסט AI לקבצי Excel, CSV, בסיסי נתונים ותרשימים.","descEn":"AI data analyst for spreadsheets, databases and charts.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Hex","maker":"Hex","url":"https://hex.tech","category":"Data & Analytics","pricing":"freemium","student":false,"platforms":["web"],"tags":["data","sql","notebook"],"descHe":"סביבת עבודה לניתוח נתונים עם SQL, Python ויכולות AI.","descEn":"Data workspace combining SQL, Python and AI.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Akkio","maker":"Akkio","url":"https://www.akkio.com","category":"Data & Analytics","pricing":"paid","student":false,"platforms":["web"],"tags":["data","prediction","analytics"],"descHe":"ניתוח, חיזוי ודוחות AI לעסקים ללא צורך בקוד כבד.","descEn":"AI analytics and prediction for business teams.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Rows AI","maker":"Rows","url":"https://rows.com/ai","category":"Data & Analytics","pricing":"freemium","student":false,"platforms":["web"],"tags":["spreadsheet","data","analysis"],"descHe":"גיליון עבודה עם AI לניתוח, מחקר ונוסחאות.","descEn":"AI-powered spreadsheets for analysis, research and formulas.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Meshy","maker":"Meshy","url":"https://www.meshy.ai","category":"3D & Assets","pricing":"freemium","student":false,"platforms":["web"],"tags":["3d","model","game"],"descHe":"יצירת מודלי 3D וטקסטורות מטקסט או תמונות.","descEn":"Generate 3D models and textures from text or images.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Tripo AI","maker":"Tripo","url":"https://www.tripo3d.ai","category":"3D & Assets","pricing":"freemium","student":false,"platforms":["web"],"tags":["3d","model","image-to-3d"],"descHe":"יצירת נכסי 3D מתמונה או טקסט במהירות.","descEn":"Create 3D assets from images or text.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Spline AI","maker":"Spline","url":"https://spline.design/ai","category":"3D & Assets","pricing":"freemium","student":false,"platforms":["web"],"tags":["3d","design","web"],"descHe":"יצירת סצנות ואובייקטים תלת־ממדיים בתוך Spline.","descEn":"Create 3D scenes and objects inside Spline.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Kaedim","maker":"Kaedim","url":"https://www.kaedim3d.com","category":"3D & Assets","pricing":"paid","student":false,"platforms":["web"],"tags":["3d","game","asset"],"descHe":"המרת תמונות ורעיונות לנכסי 3D מוכנים לעבודה.","descEn":"Turn images and concepts into production-ready 3D assets.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Harvey","maker":"Harvey","url":"https://www.harvey.ai","category":"Legal AI","pricing":"paid","student":false,"platforms":["web"],"tags":["legal","research","documents"],"descHe":"פלטפורמת AI מקצועית למחקר, ניסוח ועבודה משפטית.","descEn":"Professional AI platform for legal research, drafting and workflows.","platformsUpdated":"2026-09-29","isNew":true},{"name":"CoCounsel","maker":"Thomson Reuters","url":"https://legal.thomsonreuters.com/en/products/cocounsel","category":"Legal AI","pricing":"paid","student":false,"platforms":["web"],"tags":["legal","research","review"],"descHe":"עוזר AI משפטי למחקר, בדיקת מסמכים וניסוח.","descEn":"Legal AI assistant for research, document review and drafting.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Spellbook","maker":"Spellbook","url":"https://www.spellbook.legal","category":"Legal AI","pricing":"paid","student":false,"platforms":["web","windows","macos"],"tags":["legal","contracts","word"],"descHe":"AI לחוזים שעובד בתוך Microsoft Word.","descEn":"AI contract drafting and review inside Microsoft Word.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Robin AI","maker":"Robin AI","url":"https://www.robinai.com","category":"Legal AI","pricing":"paid","student":false,"platforms":["web"],"tags":["legal","contracts","review"],"descHe":"סקירה וניהול של חוזים בעזרת AI.","descEn":"AI-powered contract review and management.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Jasper","maker":"Jasper","url":"https://www.jasper.ai","category":"Marketing & SEO","pricing":"paid","student":false,"platforms":["web"],"tags":["marketing","writing","brand"],"descHe":"פלטפורמת AI ליצירת תוכן שיווקי בהתאם למותג.","descEn":"AI marketing platform for on-brand content creation.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Writesonic","maker":"Writesonic","url":"https://writesonic.com","category":"Marketing & SEO","pricing":"freemium","student":false,"platforms":["web"],"tags":["marketing","seo","writing"],"descHe":"כתיבה, SEO ותוכן שיווקי עם AI.","descEn":"AI writing, SEO and marketing content tools.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Copy.ai","maker":"Copy.ai","url":"https://www.copy.ai","category":"Marketing & SEO","pricing":"freemium","student":false,"platforms":["web"],"tags":["marketing","sales","writing"],"descHe":"אוטומציות ותוכן AI לצוותי שיווק ומכירות.","descEn":"AI content and workflows for marketing and sales teams.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Surfer AI","maker":"Surfer","url":"https://surferseo.com/ai","category":"Marketing & SEO","pricing":"paid","student":false,"platforms":["web"],"tags":["seo","writing","content"],"descHe":"כתיבת תוכן SEO עם המלצות אופטימיזציה.","descEn":"AI SEO writing with optimization guidance.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Frase","maker":"Frase","url":"https://www.frase.io","category":"Marketing & SEO","pricing":"paid","student":false,"platforms":["web"],"tags":["seo","research","writing"],"descHe":"מחקר, כתיבה ואופטימיזציה של תוכן ל־SEO.","descEn":"Research, write and optimize SEO content.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Clay","maker":"Clay","url":"https://www.clay.com","category":"Sales & CRM","pricing":"freemium","student":false,"platforms":["web"],"tags":["sales","crm","research"],"descHe":"מחקר לידים, העשרת נתונים ואוטומציות מכירה עם AI.","descEn":"Lead research, enrichment and AI sales automation.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Lavender","maker":"Lavender","url":"https://www.lavender.ai","category":"Sales & CRM","pricing":"freemium","student":false,"platforms":["web"],"tags":["sales","email","writing"],"descHe":"עוזר AI לשיפור אימיילים ומסרים במכירות.","descEn":"AI assistant for improving sales emails and outreach.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Apollo.io","maker":"Apollo","url":"https://www.apollo.io","category":"Sales & CRM","pricing":"freemium","student":false,"platforms":["web"],"tags":["sales","leads","crm"],"descHe":"מאגר לידים, outreach ואוטומציות מכירה עם AI.","descEn":"Lead database, outreach and AI-powered sales workflows.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Gong","maker":"Gong","url":"https://www.gong.io","category":"Sales & CRM","pricing":"paid","student":false,"platforms":["web"],"tags":["sales","calls","analytics"],"descHe":"ניתוח שיחות מכירה ו־Revenue Intelligence עם AI.","descEn":"AI-powered sales conversation and revenue intelligence.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Intercom Fin","maker":"Intercom","url":"https://www.intercom.com/fin","category":"Customer Support","pricing":"paid","student":false,"platforms":["web"],"tags":["support","chatbot","customer"],"descHe":"סוכן תמיכה AI שמענה ללקוחות מתוך מאגר הידע.","descEn":"AI customer support agent grounded in your help content.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Zendesk AI","maker":"Zendesk","url":"https://www.zendesk.com/ai","category":"Customer Support","pricing":"paid","student":false,"platforms":["web"],"tags":["support","customer","agent"],"descHe":"יכולות AI לסוכני תמיכה, אוטומציה ומענה ללקוחות.","descEn":"AI for support agents, automation and customer service.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Ada","maker":"Ada","url":"https://www.ada.cx","category":"Customer Support","pricing":"paid","student":false,"platforms":["web"],"tags":["support","agent","customer"],"descHe":"סוכני שירות AI לשיחות ותמיכה אוטומטית.","descEn":"AI customer service agents for automated support.","platformsUpdated":"2026-09-29","isNew":true},{"name":"ChatPDF","maker":"ChatPDF","url":"https://www.chatpdf.com","category":"PDF & Documents","pricing":"freemium","student":false,"platforms":["web"],"tags":["pdf","chat","study"],"descHe":"שיחה עם קובצי PDF, שאלות, סיכומים והסברים.","descEn":"Chat with PDFs for questions, summaries and explanations.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Humata","maker":"Humata","url":"https://www.humata.ai","category":"PDF & Documents","pricing":"freemium","student":false,"platforms":["web"],"tags":["pdf","documents","research"],"descHe":"שאלות וסיכום של מסמכים וקבצים ארוכים.","descEn":"Ask questions and summarize long documents.","platformsUpdated":"2026-09-29","isNew":true},{"name":"AskYourPDF","maker":"AskYourPDF","url":"https://askyourpdf.com","category":"PDF & Documents","pricing":"freemium","student":false,"platforms":["web"],"tags":["pdf","chat","documents"],"descHe":"צ׳אט עם PDF ומסמכים בעזרת AI.","descEn":"AI chat and analysis for PDFs and documents.","platformsUpdated":"2026-09-29","isNew":true},{"name":"PDFgear","maker":"PDFgear","url":"https://www.pdfgear.com","category":"PDF & Documents","pricing":"free","student":false,"platforms":["windows","macos","ios"],"tags":["pdf","editor","chat"],"descHe":"עורך PDF עם כלי AI לסיכום ושיחה עם מסמכים.","descEn":"PDF editor with AI chat and summarization tools.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Teal","maker":"Teal","url":"https://www.tealhq.com","category":"Career & Resume","pricing":"freemium","student":false,"platforms":["web"],"tags":["resume","career","jobs"],"descHe":"בניית קורות חיים, מעקב משרות וכלי AI לקריירה.","descEn":"Resume building, job tracking and AI career tools.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Kickresume","maker":"Kickresume","url":"https://www.kickresume.com","category":"Career & Resume","pricing":"freemium","student":false,"platforms":["web","android","ios"],"tags":["resume","career","writing"],"descHe":"יצירת קורות חיים ומכתבים עם AI.","descEn":"Create resumes and cover letters with AI.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Rezi","maker":"Rezi","url":"https://www.rezi.ai","category":"Career & Resume","pricing":"freemium","student":false,"platforms":["web"],"tags":["resume","ats","career"],"descHe":"בניית קורות חיים מותאמי ATS עם AI.","descEn":"AI resume builder focused on ATS compatibility.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Recraft","maker":"Recraft","url":"https://www.recraft.ai","category":"Image Generation","pricing":"freemium","student":false,"platforms":["web"],"tags":["image","vector","design"],"descHe":"יצירת תמונות, וקטורים ועיצובים עם שליטה חזקה בסגנון.","descEn":"Generate images, vectors and designs with strong style control.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Magnific AI","maker":"Magnific","url":"https://magnific.ai","category":"Image Generation","pricing":"paid","student":false,"platforms":["web"],"tags":["image","upscale","enhance"],"descHe":"שיפור והגדלת תמונות עם הוספת פרטים בעזרת AI.","descEn":"AI image upscaling and enhancement with added detail.","platformsUpdated":"2026-09-29","isNew":true},{"name":"remove.bg","maker":"Kaleido","url":"https://www.remove.bg","category":"Image Generation","pricing":"freemium","student":false,"platforms":["web","windows","macos"],"tags":["image","background","editing"],"descHe":"הסרת רקע מתמונות בצורה אוטומטית.","descEn":"Automatically remove image backgrounds.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Clipdrop","maker":"Clipdrop","url":"https://clipdrop.co","category":"Image Generation","pricing":"freemium","student":false,"platforms":["web"],"tags":["image","editing","cleanup"],"descHe":"אוסף כלי AI לעריכה, ניקוי, תאורה והרחבת תמונות.","descEn":"AI tools for image cleanup, relighting and expansion.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Adobe Podcast","maker":"Adobe","url":"https://podcast.adobe.com","category":"Audio & Voice","pricing":"freemium","student":false,"platforms":["web"],"tags":["audio","podcast","enhance"],"descHe":"שיפור קול והקלטות פודקאסט בעזרת AI.","descEn":"AI voice and podcast audio enhancement.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Cleanvoice AI","maker":"Cleanvoice","url":"https://cleanvoice.ai","category":"Audio & Voice","pricing":"freemium","student":false,"platforms":["web"],"tags":["audio","podcast","cleanup"],"descHe":"ניקוי רעשים, מילים מיותרות והפסקות מהקלטות.","descEn":"Clean filler words, noise and pauses from recordings.","platformsUpdated":"2026-09-29","isNew":true},{"name":"Open WebUI","maker":"Open WebUI","url":"https://openwebui.com","category":"Local AI","pricing":"free","student":false,"platforms":["web","windows","macos","linux","android","ios"],"tags":["local","self-hosted","open-source","llm"],"descHe":"ממשק AI עצמי וגמיש למודלים מקומיים ולספקים שונים.","descEn":"Self-hosted AI interface for local and cloud models.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"בהתקנה עצמית עם מודל מקומי אין מכסת שימוש מצד שירות ענן.","unlimitedNoteEn":"When self-hosted with a local model, there is no cloud-provider usage quota.","isNew":true},{"name":"AnythingLLM","maker":"Mintplex Labs","url":"https://anythingllm.com","category":"Local AI","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["local","documents","agent","privacy"],"descHe":"אפליקציית AI מקומית למסמכים, צ׳אט וסוכנים ללא צורך בחשבון.","descEn":"Local-first AI app for documents, chat and agents with no account required.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"האפליקציה המקומית עובדת ללא חשבון ויכולה להריץ מודלים מקומיים ללא מגבלת שימוש של ספק.","unlimitedNoteEn":"The local app works without an account and can run local models without a provider usage quota.","isNew":true},{"name":"GPT4All","maker":"Nomic AI","url":"https://gpt4all.io","category":"Local AI","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["local","offline","llm","privacy"],"descHe":"הרצת מודלי שפה מקומיים במחשב עם ממשק פשוט.","descEn":"Run local language models on your computer with a simple interface.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"בהרצה מקומית אין מכסת הודעות של ספק; המגבלה היא החומרה ורישיון המודל.","unlimitedNoteEn":"Local use has no provider message quota; limits are hardware and model licensing.","isNew":true},{"name":"LocalAI","maker":"LocalAI","url":"https://localai.io","category":"Local AI","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["local","api","open-source","developer"],"descHe":"Runtime פתוח להרצת טקסט, קול, תמונה וסוכנים על החומרה שלך.","descEn":"Open runtime for text, voice, image and agent workloads on your hardware.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"Runtime מקומי וקוד פתוח; בשימוש מקומי אין מכסת שירות חיצונית.","unlimitedNoteEn":"Open local runtime; local use has no external service quota.","isNew":true},{"name":"InvokeAI","maker":"Invoke","url":"https://invoke.ai/","category":"Image Generation","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["image","local","open-source"],"descHe":"סביבת יצירה מקומית וקוד פתוח ל־Stable Diffusion ומודלים נוספים.","descEn":"Open-source local creative platform for Stable Diffusion-style models.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"בהרצה מקומית עם מודלים שהורדת אין מכסת יצירות של שירות ענן.","unlimitedNoteEn":"When running downloaded models locally, there is no cloud-service generation quota.","isNew":true,"linkUpdated":"2026-10-04"},{"name":"Fooocus","maker":"Open Source","url":"https://github.com/lllyasviel/Fooocus","category":"Image Generation","pricing":"free","student":false,"platforms":["windows"],"tags":["image","local","offline","open-source"],"descHe":"מחולל תמונות מקומי, חינמי וקוד פתוח עם הפעלה פשוטה.","descEn":"Free, open-source offline image generator designed for simple prompting.","platformsUpdated":"2026-09-29","unlimitedFree":true,"unlimitedScope":"local","unlimitedNoteHe":"תוכנה מקומית, חינמית וקוד פתוח; אין מכסת יצירות מצד השירות.","unlimitedNoteEn":"Offline, free and open-source software with no service-side generation quota.","isNew":true},{"name":"Cline","maker":"Cline","url":"https://cline.bot","category":"Coding","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agent","open-source","vscode","terminal"],"descHe":"סוכן קוד פתוח לכתיבה, עריכה והרצת קוד מתוך IDE, טרמינל או אפליקציית Desktop.","descEn":"Open-source coding agent for writing, editing and running code from the IDE, terminal or desktop app.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Continue","maker":"Continue","url":"https://www.continue.dev","category":"Coding","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agent","open-source","vscode","jetbrains"],"descHe":"עוזר קוד פתוח ל-VS Code ו-JetBrains עם Agent, Chat, Edit והשלמה אוטומטית.","descEn":"Open-source coding assistant for VS Code and JetBrains with Agent, Chat, Edit and autocomplete modes.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Aider","maker":"Aider","url":"https://aider.chat","category":"Coding","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["coding","terminal","git","open-source","pair-programming"],"descHe":"כלי Pair Programming מבוסס AI בטרמינל שעובד ישירות עם מאגרי Git ותומך במודלים מקומיים וענניים.","descEn":"Terminal AI pair programmer that works directly with Git repositories and supports local and cloud models.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Open Interpreter","maker":"Open Interpreter","url":"https://www.openinterpreter.com","category":"AI Agents","pricing":"free","student":false,"platforms":["windows","macos","linux"],"tags":["agent","desktop","terminal","local","open-source","automation"],"descHe":"סוכן קוד פתוח שמסוגל לעבוד עם קבצים, קוד ואפליקציות במחשב, עם sandbox ואישורים לפעולות.","descEn":"Open-source agent for working with files, code and desktop apps, with sandboxing and approval controls.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Dify","maker":"Dify","url":"https://dify.ai","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agents","workflow","rag","low-code","self-hosted"],"descHe":"פלטפורמה לבניית אפליקציות AI, סוכנים ו-workflows עם RAG, כלים, תנאים ופריסה כ-Web/API.","descEn":"Platform for building AI apps, agents and workflows with RAG, tools, branching and web/API deployment.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Flowise","maker":"Flowise","url":"https://flowiseai.com","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web"],"tags":["agents","workflow","visual-builder","open-source","rag"],"descHe":"Builder ויזואלי בקוד פתוח ליצירת AI Agents, Chatflows ו-Agentflows עם RAG וכלים.","descEn":"Open-source visual builder for AI agents, chatflows and agentflows with RAG and tools.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"Langflow","maker":"Langflow","url":"https://www.langflow.org","category":"AI Agents","pricing":"freemium","student":false,"platforms":["web","windows","macos","linux"],"tags":["agents","workflow","mcp","rag","low-code","open-source"],"descHe":"פלטפורמת Low-code לבנייה ופריסה של סוכני AI, מערכות RAG ושרתי MCP בעזרת זרימות ויזואליות.","descEn":"Low-code platform for building and deploying AI agents, RAG applications and MCP servers with visual flows.","isNew":true,"platformsUpdated":"2026-09-30"},{"name":"OpenAI Codex","maker":"OpenAI","url":"https://openai.com/codex/","category":"Coding","pricing":"freemium","student":false,"platforms":["windows","macos","web"],"tags":["coding","agent","multi-agent","ide","cli","automation"],"descHe":"סוכן פיתוח של OpenAI לעבודה עם קוד דרך אפליקציה, CLI, הרחבת IDE והענקת משימות לסוכנים במקביל.","descEn":"OpenAI coding agent for working through the desktop app, CLI, IDE extension and parallel agent workflows.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://openai.com/index/introducing-the-codex-app/"},{"name":"Claude Code","maker":"Anthropic","url":"https://www.anthropic.com/claude-code","category":"Coding","pricing":"paid","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agent","terminal","ide","vscode","jetbrains"],"descHe":"סוכן תכנות של Anthropic שעובד בטרמינל וב־IDE, מטפל במשימות פיתוח מורכבות ויכול לבצע שינויים על פני בסיסי קוד גדולים.","descEn":"Anthropic's coding agent for terminal and IDE workflows, designed for substantial engineering tasks across large codebases.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://www.anthropic.com/news/claude-4"},{"name":"Gemini CLI","maker":"Google","url":"https://github.com/google-gemini/gemini-cli","category":"Coding","pricing":"freemium","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agent","terminal","open-source","cli","automation"],"descHe":"סוכן AI בקוד פתוח של Google לטרמינל, להבנת קוד, עריכת קבצים, הרצת פקודות ובניית workflows עם הקשר מהפרויקט המקומי.","descEn":"Google's open-source terminal AI agent for understanding code, editing files, running commands and building workflows with local project context.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://github.com/google-gemini/gemini-cli"},{"name":"Jules","maker":"Google","url":"https://jules.google","category":"Coding","pricing":"freemium","student":false,"platforms":["web"],"tags":["coding","agent","github","automation","async"],"descHe":"סוכן תכנות אסינכרוני של Google שמתחבר למאגרים, מתכנן שינויים ומבצע משימות פיתוח ברקע עם אינטגרציית GitHub.","descEn":"Google's asynchronous coding agent that connects to repositories, plans changes and completes development tasks with GitHub integration.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://blog.google/innovation-and-ai/models-and-research/google-labs/jules-now-available/"},{"name":"Google Stitch","maker":"Google Labs","url":"https://stitch.withgoogle.com","category":"Design","pricing":"freemium","student":false,"platforms":["web"],"tags":["design","ui","prototype","frontend","agent"],"descHe":"Canvas עיצוב מבוסס AI ליצירת ממשקי UI, אבטיפוס וזרימות משתמש מטקסט, קול, תמונות וקוד.","descEn":"AI-native design canvas for creating UI, prototypes and user flows from text, voice, images and code.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/"},{"name":"Google Antigravity","maker":"Google","url":"https://antigravity.google","category":"Coding","pricing":"freemium","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agents","ide","cli","automation","multi-agent"],"descHe":"פלטפורמת פיתוח אג׳נטית של Google עם אפליקציה עצמאית, IDE, CLI וניהול כמה סוכנים מקומיים במקביל.","descEn":"Google's agentic development platform with standalone app, IDE, CLI and orchestration of multiple local agents.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://codelabs.developers.google.com/getting-started-google-antigravity"},{"name":"Kiro","maker":"Kiro","url":"https://kiro.dev","category":"Coding","pricing":"freemium","student":false,"platforms":["windows","macos","linux"],"tags":["coding","agent","ide","specs","mcp","automation"],"descHe":"IDE מבוסס VS Code עם סוכנים, Specs, Hooks, MCP ו-Custom Agents לתכנון וביצוע משימות פיתוח.","descEn":"VS Code-based IDE with agents, Specs, Hooks, MCP and Custom Agents for planning and implementing software work.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://kiro.dev/docs/ide/"},{"name":"OpenHands","maker":"OpenHands","url":"https://www.openhands.dev","category":"Coding","pricing":"freemium","student":false,"platforms":["web","windows","macos","linux"],"tags":["coding","agent","open-source","local","automation","model-agnostic"],"descHe":"פלטפורמת קוד פתוח להרצה וניהול של סוכני תכנות, כולל הרצה מקומית, Cloud, תכנון ואוטומציות.","descEn":"Open-source platform for running and managing coding agents with local and cloud options, planning and automations.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://www.openhands.dev/about"},{"name":"tl;dv","maker":"tl;dv","url":"https://tldv.io","category":"Meetings & Transcription","pricing":"freemium","student":false,"platforms":["web"],"tags":["meetings","transcription","notes","summaries","crm","automation"],"descHe":"עוזר פגישות AI ל-Zoom, Google Meet ו-Teams שמייצר תמלול, סיכומים, משימות ואוטומציות המשך.","descEn":"AI meeting assistant for Zoom, Google Meet and Teams with transcription, summaries, action items and workflow automation.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://tldv.io/"},{"name":"Photoroom","maker":"Photoroom","url":"https://www.photoroom.com","category":"Image Generation","pricing":"freemium","student":false,"platforms":["web","android","ios"],"tags":["image","editing","background","product-photo","ai-editor"],"descHe":"עורך תמונות AI ליצירת רקעים, הסרת אובייקטים, הרחבת תמונות ויצירת תמונות מוצר דרך Web, Android ו-iOS.","descEn":"AI photo editor for backgrounds, object removal, image expansion and product imagery on web, Android and iOS.","isNew":true,"addedAt":"2026-10-01","platformsUpdated":"2026-10-01","sourceUrl":"https://help.photoroom.com/en/articles/9626719-what-is-photoroom"}];

const state={
  tools:[],filtered:[],
  lang:readString("aiatlas-lang","he"),
  favorites:new Set(readArray("aiatlas-favs")),
  compare:readArray("aiatlas-compare"),
  recent:readArray("aiatlas-recent"),
  commandIndex:0,
  onlyNew:false,
  installPrompt:null
};

const els={
  grid:$("#toolsGrid"),search:$("#searchInput"),heroSearch:$("#heroSearch"),
  cat:$("#categoryFilter"),price:$("#pricingFilter"),platform:$("#platformFilter"),sort:$("#sortFilter"),
  student:$("#studentFilter"),fav:$("#favoriteFilter"),openSource:$("#openSourceFilter"),count:$("#resultCount"),
  empty:$("#emptyState"),dialog:$("#toolDialog"),dialogContent:$("#dialogContent"),
  compareDialog:$("#compareDialog"),compareDialogContent:$("#compareDialogContent"),
  categories:$("#categoryGrid"),platformGrid:$("#platformGrid"),featured:$("#featuredRail"),studentSpotlight:$("#studentSpotlight"),studentBenefits:$("#studentBenefitsGrid"),newTools:$("#newToolsRail"),
  compareDock:$("#compareDock"),compareChips:$("#compareChips"),compareCount:$("#compareCount"),
  recentTools:$("#recentToolsRail"),recentSection:$("#recently-viewed"),
  finderDialog:$("#finderDialog"),finderResults:$("#finderResults"),finderTask:$("#finderTask"),finderBudget:$("#finderBudget"),finderPlatform:$("#finderPlatform"),finderPrivacy:$("#finderPrivacy"),
  commandDialog:$("#commandDialog"),commandInput:$("#commandInput"),commandResults:$("#commandResults"),
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
    featuredTitle:"כלים שכדאי להכיר",featuredDesc:"קיצורי דרך לכמה מהכלים הבולטים בקטלוג.",surprise:"הפתע אותי",newNowTitle:"חדש עכשיו ב-AI Atlas",newNowDesc:"כלים שנוספו לאחרונה כדי שתוכל לראות ישר מה התחדש.",showNew:"הצג את כל החדשים",recentTitle:"חזרת לבדוק משהו?",recentDesc:"הכלים שפתחת לאחרונה נשמרים רק בדפדפן שלך.",clearRecent:"נקה היסטוריה",
    discoverTitle:"כל כלי ה-AI במקום אחד",discoverDesc:"חפש בשם, שימוש, חברה או קטגוריה וסנן בדיוק מה שאתה צריך.",
    filterStudents:"🇮🇱 סטודנטים בישראל",filterFavorites:"מועדפים",filterOpenSource:"קוד פתוח",clear:"נקה סינונים",shareSearch:"שתף חיפוש",shared:"הקישור לחיפוש הועתק",emptyTitle:"לא מצאנו כלי מתאים",emptyDesc:"נסה חיפוש או סינון אחר.",
    footerTag:"מגלים AI בלי רעש מיותר.",footerNote:"מחירים והטבות משתנים. לפני הרשמה או רכישה תמיד כדאי לבדוק את התנאים באתר הרשמי.",
    allCategories:"כל הקטגוריות",allPrices:"כל המחירים",allPlatforms:"כל הפלטפורמות",mobileApps:"אפליקציות לפלאפון",free:"חינם",freemium:"חינם + בתשלום",paid:"בתשלום",unlimitedFree:"100% חינם + ללא הגבלה",unlimitedBadge:"∞ חינם ללא הגבלה",unlimitedTitle:"100% חינם וללא הגבלה",unlimitedDesc:"כלים שאפשר להריץ מקומית בלי מכסת הודעות או יצירות מצד השירות.",unlimitedLocal:"ללא מכסת שירות בהרצה מקומית",
    sortDefault:"סדר מומלץ",sortNew:"חדשים קודם",sortAZ:"א׳ → ת׳ / A → Z",sortZA:"ת׳ → א׳ / Z → A",sortFree:"חינם קודם",newBadge:"חדש",
    found:"כלים נמצאו",details:"פרטים",category:"קטגוריה",pricing:"מחיר",studentOffer:"הטבת סטודנט",israelStudentOffer:"מתאים לסטודנטים בישראל",checkEligibility:"לבדיקת הזכאות הרשמית",israelVerified:"אומת לישראל",
    official:"לאתר הרשמי",copyLink:"העתק קישור",copied:"הקישור הועתק",appAvailability:"אפליקציות ופלטפורמות",platformUpdated:"מידע על פלטפורמות עודכן",favoritesOnly:"מועדפים",verified:"מאומת",toolsInCategory:"כלים",bestFor:"מתאים ל",compare:"השווה",compareTitle:"השוואת כלים",compareClear:"נקה",compareOpen:"השווה עכשיו",compareLimit:"אפשר להשוות עד 3 כלים",compareNeedTwo:"בחר לפחות 2 כלים להשוואה",compareCategory:"קטגוריה",comparePrice:"מחיר",comparePlatforms:"פלטפורמות",compareStudent:"סטודנטים בישראל",compareUnlimited:"ללא הגבלה",compareOpenSource:"קוד פתוח",compareUses:"שימושים",yes:"כן",no:"לא",
    finderButton:"מצא לי AI",finderTitle:"מה אתה רוצה שה-AI יעשה?",finderDesc:"בחר כמה דברים ואני אמצא לך התאמות מתוך הקטלוג.",finderTask:"משימה",finderBudget:"מחיר",finderPlatform:"פלטפורמה",finderPrivacy:"פרטיות",finderRun:"מצא לי כלים",finderMatches:"ההתאמות הכי טובות",installApp:"התקן אפליקציה",installing:"פותח התקנה...",commandTitle:"חיפוש מהיר בכל כלי ה-AI",commandPlaceholder:"חפש כלי, חברה או משימה...",commandHint:"Enter פותח את התוצאה הראשונה • ↑ ↓ לניווט",noDescription:"כלי AI בקטלוג AI Atlas.",siteTitle:"AI Atlas — כל כלי ה-AI במקום אחד"
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
    featuredTitle:"Tools worth discovering",featuredDesc:"Quick access to a selection of notable tools in the directory.",surprise:"Surprise me",newNowTitle:"Just added to AI Atlas",newNowDesc:"Recently added tools so you can instantly see what\'s new.",showNew:"Show all new tools",recentTitle:"Coming back to something?",recentDesc:"Tools you opened recently are stored only in your browser.",clearRecent:"Clear history",
    discoverTitle:"Every AI tool in one place",discoverDesc:"Search by name, use case, company or category and filter down to exactly what you need.",
    filterStudents:"🇮🇱 Students in Israel",filterFavorites:"Favorites",filterOpenSource:"Open source",clear:"Clear filters",shareSearch:"Share search",shared:"Search link copied",emptyTitle:"No matching tools found",emptyDesc:"Try a different search or filter.",
    footerTag:"Discover AI without the noise.",footerNote:"Prices and offers change. Always check the official website before signing up or purchasing.",
    allCategories:"All categories",allPrices:"All pricing",allPlatforms:"All platforms",mobileApps:"Mobile apps",free:"Free",freemium:"Free + paid",paid:"Paid",unlimitedFree:"100% free + unlimited",unlimitedBadge:"∞ Free & unlimited",unlimitedTitle:"100% free and unlimited",unlimitedDesc:"Tools you can run locally without a provider message or generation quota.",unlimitedLocal:"No provider quota when running locally",
    sortDefault:"Recommended order",sortNew:"Newest first",sortAZ:"A → Z",sortZA:"Z → A",sortFree:"Free first",newBadge:"NEW",
    found:"tools found",details:"Details",category:"Category",pricing:"Pricing",studentOffer:"Student offer",israelStudentOffer:"Available to students in Israel",checkEligibility:"Check official eligibility",israelVerified:"Verified for Israel",
    official:"Official website",copyLink:"Copy link",copied:"Link copied",appAvailability:"Apps & platforms",platformUpdated:"Platform info updated",favoritesOnly:"Favorites",verified:"Verified",toolsInCategory:"tools",bestFor:"Best for",compare:"Compare",compareTitle:"Compare tools",compareClear:"Clear",compareOpen:"Compare now",compareLimit:"You can compare up to 3 tools",compareNeedTwo:"Choose at least 2 tools to compare",compareCategory:"Category",comparePrice:"Pricing",comparePlatforms:"Platforms",compareStudent:"Students in Israel",compareUnlimited:"Unlimited",compareOpenSource:"Open source",compareUses:"Use cases",yes:"Yes",no:"No",
    finderButton:"Find my AI",finderTitle:"What do you want AI to do?",finderDesc:"Choose a few preferences and I’ll match tools from the directory.",finderTask:"Task",finderBudget:"Pricing",finderPlatform:"Platform",finderPrivacy:"Privacy",finderRun:"Find tools",finderMatches:"Best matches",installApp:"Install app",installing:"Opening install...",commandTitle:"Quick search across every AI tool",commandPlaceholder:"Search tool, company or task...",commandHint:"Enter opens the first result • ↑ ↓ to navigate",noDescription:"An AI tool in the AI Atlas directory.",siteTitle:"AI Atlas — Every AI tool in one place"
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
function localDesc(tool){return (state.lang==="he"?(tool.descHe||tool.desc||tool.descEn):(tool.descEn||tool.desc||tool.descHe))||t("noDescription")}
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
function saveFavorites(){writeStorage("aiatlas-favs",JSON.stringify([...state.favorites]))}
function isOpenSource(tool){return (tool.tags||[]).some(x=>String(x).toLowerCase()==="open-source")}
function saveCompare(){writeStorage("aiatlas-compare",JSON.stringify(state.compare))}
function saveRecent(){writeStorage("aiatlas-recent",JSON.stringify(state.recent))}
function addRecent(name){state.recent=[name,...state.recent.filter(x=>x!==name)].slice(0,8);saveRecent();buildRecentlyViewed()}
function bestFor(tool){return (tool.tags||[]).filter(x=>!["open-source","local","offline"].includes(String(x).toLowerCase())).slice(0,3)}

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
  const comparing=state.compare.includes(tool.name);
  const uses=bestFor(tool);
  return `<article class="tool-card ${comparing?"comparing":""}">
    <div class="tool-top">
      <div class="tool-ident">
        ${logo(tool)}
        <div style="min-width:0"><div class="tool-name">${esc(tool.name)}</div><div class="tool-maker">${esc(tool.maker)}</div></div>
      </div>
      <div class="tool-actions">
        <button class="compare-btn ${comparing?"active":""}" data-compare="${esc(tool.name)}" aria-label="${esc(t("compare"))}">⇄</button>
        <button class="fav-btn ${favorite?"active":""}" data-fav="${esc(tool.name)}" aria-label="${esc(t("favoritesOnly"))}">★</button>
      </div>
    </div>
    <p class="tool-desc">${esc(localDesc(tool))}</p>
    ${uses.length?`<div class="tool-best"><span>${esc(t("bestFor"))}</span>${uses.map(x=>`<b>#${esc(x)}</b>`).join("")}</div>`:""}
    <div class="badges">
      <span class="badge ${esc(tool.pricing)}">${esc(priceLabel(tool.pricing))}</span>
      ${tool.student?'<span class="badge student">🎓 Student</span>':""}
      ${tool.israelStudent?`<span class="badge israel">🇮🇱 ${esc(t("israelVerified"))}</span>`:""}${tool.isNew?`<span class="badge new">${esc(t("newBadge"))}</span>`:""}
      ${tool.unlimitedFree?`<span class="badge unlimited">∞ ${esc(t("unlimitedBadge").replace(/^∞\s*/, ""))}</span>`:""}
      ${isOpenSource(tool)?'<span class="badge opensource">◫ Open Source</span>':""}
    </div>
    ${platformBadges(tool,true)}
    <div class="card-bottom">
      <span class="category-label">${esc(localCategory(tool.category))}</span>
      <a class="details-btn" data-tool-link="${esc(tool.name)}" href="${esc(tool.url)}" target="_blank" rel="noopener noreferrer">${esc(t("official"))} ↗</a>
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
      &&(!els.fav.checked||state.favorites.has(tool.name))
      &&(!els.openSource.checked||isOpenSource(tool))
      &&(!state.onlyNew||tool.isNew);
  });

  if(els.sort.value==="new") results.sort((a,b)=>String(b.addedAt||"").localeCompare(String(a.addedAt||""))||Number(!!b.isNew)-Number(!!a.isNew));
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
  $$("[data-compare]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();toggleCompare(btn.dataset.compare)});
  // Details are handled by one delegated click listener on the grid.
  attachImageFallbacks(els.grid);
  renderCompareDock();
}

function commandSearch(query=""){
  const q=String(query||"").trim().toLowerCase();
  const scored=state.tools.map(tool=>{
    const name=tool.name.toLowerCase();
    const maker=String(tool.maker||"").toLowerCase();
    const cat=String(tool.category||"").toLowerCase();
    const desc=String(localDesc(tool)||"").toLowerCase();
    const tags=(tool.tags||[]).join(" ").toLowerCase();
    let score=0;
    if(!q)score=tool.isNew?6:1;
    else{
      if(name===q)score+=100;
      if(name.startsWith(q))score+=60;
      else if(name.includes(q))score+=40;
      if(maker.includes(q))score+=20;
      if(cat.includes(q))score+=15;
      if(tags.includes(q))score+=12;
      if(desc.includes(q))score+=7;
    }
    if(tool.isNew)score+=2;
    return {tool,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.tool.name.localeCompare(b.tool.name)).slice(0,9);
  return scored.map(x=>x.tool);
}

function renderCommandPalette(){
  if(!els.commandResults)return;
  const tools=commandSearch(els.commandInput.value);
  if(state.commandIndex>=tools.length)state.commandIndex=0;
  els.commandResults.innerHTML=tools.map((tool,i)=>`<a class="command-result ${i===state.commandIndex?"active":""}" data-command-tool="${esc(tool.name)}" href="${esc(tool.url)}" target="_blank" rel="noreferrer">
    ${logo(tool,"command-result-logo")}
    <span class="command-result-copy"><strong>${esc(tool.name)}</strong><small>${esc(tool.maker)} • ${esc(localCategory(tool.category))}</small></span>
    <span class="command-result-price">${esc(priceLabel(tool.pricing))}</span>
    <b>↗</b>
  </a>`).join("");
  $$("[data-command-tool]").forEach(link=>link.onclick=()=>{
    addRecent(link.dataset.commandTool);
    els.commandDialog.close();
  });
  attachImageFallbacks(els.commandResults);
}

function openCommandPalette(){
  state.commandIndex=0;
  els.commandInput.value="";
  renderCommandPalette();
  try{els.commandDialog.showModal()}catch{els.commandDialog.setAttribute("open","")}
  setTimeout(()=>els.commandInput.focus(),0);
}

function buildRecentlyViewed(){
  if(!els.recentTools||!els.recentSection)return;
  const tools=state.recent.map(name=>state.tools.find(x=>x.name===name)).filter(Boolean).slice(0,8);
  els.recentSection.classList.toggle("hidden",tools.length===0);
  els.recentTools.innerHTML=tools.map(tool=>`<button class="new-tool-card" data-recent-view="${esc(tool.name)}">
    ${logo(tool,"new-tool-logo")}
    <span class="new-tool-copy"><strong>${esc(tool.name)}</strong><small>${esc(localCategory(tool.category))}</small><em>${esc(priceLabel(tool.pricing))}</em></span>
    <span class="new-tool-arrow">↗</span>
  </button>`).join("");
  $$("[data-recent-view]").forEach(btn=>btn.onclick=()=>openTool(state.tools.find(x=>x.name===btn.dataset.recentView)));
  attachImageFallbacks(els.recentTools);
}

const FINDER_TASKS={
  chat:{cat:"Chat & Assistants",tags:["chat","assistant"]},
  coding:{cat:"Coding",tags:["coding","code","developer"]},
  research:{cat:"Research & Search",tags:["research","search"]},
  image:{cat:"Image Generation",tags:["image","design"]},
  video:{cats:["Video Generation","Video & Avatars","Audio & Video Editing"],tags:["video"]},
  audio:{cats:["Audio & Voice","Music"],tags:["audio","voice","music"]},
  study:{cat:"Study & Learning",tags:["study","learning","education"]},
  productivity:{cat:"Productivity",tags:["productivity","notes","workspace"]},
  automation:{cats:["Automation","AI Agents"],tags:["automation","agent","workflow"]},
  design:{cats:["Design","App & Website Builders"],tags:["design","ui","website","builder"]},
  meetings:{cat:"Meetings & Transcription",tags:["meeting","transcription","notes"]}
};

function fillFinder(){
  if(!els.finderTask)return;
  const he=state.lang==="he";
  const taskLabels=he
    ? [["all","כל דבר"],["chat","צ׳אט ועוזר אישי"],["coding","תכנות"],["research","מחקר וחיפוש"],["image","תמונות"],["video","וידאו"],["audio","קול ומוזיקה"],["study","לימודים"],["productivity","פרודוקטיביות"],["automation","אוטומציות וסוכנים"],["design","עיצוב ובניית אתרים"],["meetings","פגישות ותמלול"]]
    : [["all","Anything"],["chat","Chat & assistant"],["coding","Coding"],["research","Research & search"],["image","Images"],["video","Video"],["audio","Audio & music"],["study","Study"],["productivity","Productivity"],["automation","Automation & agents"],["design","Design & websites"],["meetings","Meetings & transcription"]];
  const budgets=he?[["any","לא משנה"],["free","חינם בלבד"],["freemium","חינם או Freemium"],["paid","גם בתשלום"]]:[["any","Any"],["free","Free only"],["freemium","Free or freemium"],["paid","Paid is okay"]];
  const platforms=he?[["all","לא משנה"],["web","Web"],["windows","Windows"],["macos","macOS"],["linux","Linux"],["mobile","Android / iPhone"]]:[["all","Any"],["web","Web"],["windows","Windows"],["macos","macOS"],["linux","Linux"],["mobile","Android / iPhone"]];
  const privacy=he?[["any","לא משנה"],["local","שירוץ מקומית"],["opensource","קוד פתוח"],["unlimited","חינם ללא הגבלה"]]:[["any","Any"],["local","Runs locally"],["opensource","Open source"],["unlimited","Free & unlimited"]];
  const opts=a=>a.map(([v,l])=>`<option value="${v}">${esc(l)}</option>`).join("");
  els.finderTask.innerHTML=opts(taskLabels);
  els.finderBudget.innerHTML=opts(budgets);
  els.finderPlatform.innerHTML=opts(platforms);
  els.finderPrivacy.innerHTML=opts(privacy);
}

function finderScore(tool){
  let score=0;
  const task=els.finderTask.value,budget=els.finderBudget.value,platform=els.finderPlatform.value,privacy=els.finderPrivacy.value;
  const spec=FINDER_TASKS[task];
  const tags=(tool.tags||[]).map(x=>String(x).toLowerCase());
  if(spec){
    if(spec.cat&&tool.category===spec.cat)score+=8;
    if(spec.cats&&spec.cats.includes(tool.category))score+=8;
    if((spec.tags||[]).some(x=>tags.includes(x)))score+=4;
  }
  if(task==="all")score+=1;
  if(budget==="free"){if(tool.pricing==="free")score+=7;else return -99}
  if(budget==="freemium"){if(tool.pricing!=="paid")score+=5;else return -99}
  if(budget==="paid")score+=1;
  if(platform!=="all"){
    const ok=platform==="mobile"?((tool.platforms||[]).includes("android")||(tool.platforms||[]).includes("ios")):(tool.platforms||[]).includes(platform);
    if(ok)score+=5;else return -99;
  }
  if(privacy==="local"){if(tool.category==="Local AI"||tags.includes("local")||tags.includes("offline"))score+=8;else return -99}
  if(privacy==="opensource"){if(isOpenSource(tool))score+=8;else return -99}
  if(privacy==="unlimited"){if(tool.unlimitedFree)score+=8;else return -99}
  if(tool.isNew)score+=1;
  if(tool.unlimitedFree)score+=1;
  return score;
}

function runFinder(){
  const ranked=state.tools.map(tool=>({tool,score:finderScore(tool)})).filter(x=>x.score>-90).sort((a,b)=>b.score-a.score||a.tool.name.localeCompare(b.tool.name)).slice(0,6);
  els.finderResults.innerHTML=`<div class="finder-results-title">${esc(t("finderMatches"))}</div>`+(ranked.length?ranked.map(({tool,score})=>`<button class="finder-result" data-finder-tool="${esc(tool.name)}">
    ${logo(tool,"finder-result-logo")}
    <span><strong>${esc(tool.name)}</strong><small>${esc(localDesc(tool))}</small></span>
    <b>${score}</b>
  </button>`).join(""):`<div class="finder-none">${esc(t("emptyTitle"))}</div>`);
  $$("[data-finder-tool]").forEach(btn=>btn.onclick=()=>openTool(state.tools.find(x=>x.name===btn.dataset.finderTool)));
  attachImageFallbacks(els.finderResults);
}

async function copyText(value,successMessage=""){
  try{
    if(navigator.clipboard&&typeof navigator.clipboard.writeText==="function"){
      await navigator.clipboard.writeText(value);
      if(successMessage)showToast(successMessage);
      return true;
    }
  }catch{}
  try{
    const area=document.createElement("textarea");
    area.value=value;
    area.setAttribute("readonly","");
    area.style.position="fixed";
    area.style.opacity="0";
    document.body.appendChild(area);
    area.select();
    const ok=document.execCommand("copy");
    area.remove();
    if(ok&&successMessage)showToast(successMessage);
    return ok;
  }catch{return false}
}

async function shareFilters(){
  const url=new URL(location.href);
  url.search="";
  const p=url.searchParams;
  if(els.search.value)p.set("q",els.search.value);
  if(els.cat.value!=="all")p.set("cat",els.cat.value);
  if(els.price.value!=="all")p.set("price",els.price.value);
  if(els.platform.value!=="all")p.set("platform",els.platform.value);
  if(els.sort.value!=="default")p.set("sort",els.sort.value);
  if(els.student.checked)p.set("student","1");
  if(els.openSource.checked)p.set("open","1");
  if(state.onlyNew)p.set("new","1");
  const value=url.toString();
  const copied=await copyText(value,t("shared"));
  if(!copied)window.prompt(state.lang==="he"?"העתק את הקישור:":"Copy this link:",value);
}

function applySharedFilters(){
  const p=new URLSearchParams(location.search);
  const q=p.get("q")||"";
  els.search.value=q;els.heroSearch.value=q;
  const setSelect=(el,v)=>{if(v&&[...el.options].some(o=>o.value===v))el.value=v};
  setSelect(els.cat,p.get("cat"));
  setSelect(els.price,p.get("price"));
  setSelect(els.platform,p.get("platform"));
  setSelect(els.sort,p.get("sort"));
  els.student.checked=p.get("student")==="1";
  els.openSource.checked=p.get("open")==="1";
  state.onlyNew=p.get("new")==="1";
}

function setupPWA(){
  if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js?v=1").catch(()=>{});
  window.addEventListener("beforeinstallprompt",e=>{
    e.preventDefault();
    state.installPrompt=e;
    const btn=$("#installBtn");
    if(btn)btn.classList.remove("hidden");
  });
  const btn=$("#installBtn");
  if(btn)btn.onclick=async()=>{
    if(!state.installPrompt)return;
    const label=btn.querySelector("[data-i18n]");
    if(label)label.textContent=t("installing");
    state.installPrompt.prompt();
    await state.installPrompt.userChoice.catch(()=>null);
    state.installPrompt=null;
    btn.classList.add("hidden");
  };
  window.addEventListener("appinstalled",()=>{state.installPrompt=null;if(btn)btn.classList.add("hidden")});
}

function buildRecent(){
  if(!els.newTools)return;
  const items=state.tools.filter(x=>x.isNew).sort((a,b)=>String(b.addedAt||"").localeCompare(String(a.addedAt||""))).slice(0,8);
  els.newTools.innerHTML=items.map(tool=>`<button class="new-tool-card" data-recent="${esc(tool.name)}">
    ${logo(tool,"new-tool-logo")}
    <span class="new-tool-copy"><strong>${esc(tool.name)}</strong><small>${esc(localCategory(tool.category))}</small><em>${esc(priceLabel(tool.pricing))}</em></span>
    <span class="new-tool-arrow">↗</span>
  </button>`).join("");
  $$("[data-recent]").forEach(btn=>btn.onclick=()=>openTool(state.tools.find(x=>x.name===btn.dataset.recent)));
  attachImageFallbacks(els.newTools);
}

function toggleCompare(name){
  const i=state.compare.indexOf(name);
  if(i>=0)state.compare.splice(i,1);
  else{
    if(state.compare.length>=3){showToast(t("compareLimit"));return}
    state.compare.push(name);
  }
  saveCompare();
  renderTools();
  renderCompareDock();
}

function renderCompareDock(){
  if(!els.compareDock)return;
  state.compare=state.compare.filter(name=>state.tools.some(x=>x.name===name)).slice(0,3);
  saveCompare();
  els.compareDock.classList.toggle("hidden",state.compare.length===0);
  els.compareCount.textContent=state.compare.length+"/3";
  els.compareChips.innerHTML=state.compare.map(name=>`<button data-remove-compare="${esc(name)}"><span>${esc(name)}</span><b>×</b></button>`).join("");
  $$("[data-remove-compare]").forEach(btn=>btn.onclick=()=>toggleCompare(btn.dataset.removeCompare));
}

function openCompareDialog(){
  const tools=state.compare.map(name=>state.tools.find(x=>x.name===name)).filter(Boolean);
  if(tools.length<2){showToast(t("compareNeedTwo"));return}
  const row=(label,values)=>`<div class="compare-row"><strong>${esc(label)}</strong>${values.map(v=>`<div>${v}</div>`).join("")}</div>`;
  els.compareDialogContent.innerHTML=`<div class="compare-head"><span class="kicker">COMPARE</span><h2>${esc(t("compareTitle"))}</h2></div>
    <div class="compare-table" style="--compare-count:${tools.length}">
      <div class="compare-row compare-names"><strong></strong>${tools.map(tool=>`<div>${logo(tool,"compare-logo")}<b>${esc(tool.name)}</b><small>${esc(tool.maker)}</small></div>`).join("")}</div>
      ${row(t("compareCategory"),tools.map(x=>esc(localCategory(x.category))))}
      ${row(t("comparePrice"),tools.map(x=>`<span class="badge ${esc(x.pricing)}">${esc(priceLabel(x.pricing))}</span>`))}
      ${row(t("comparePlatforms"),tools.map(x=>`<span class="compare-text">${esc((x.platforms||[]).map(platformLabel).join(", "))}</span>`))}
      ${row(t("compareStudent"),tools.map(x=>x.israelStudent?`<span class="compare-yes">✓ ${esc(t("yes"))}</span>`:`<span class="compare-no">— ${esc(t("no"))}</span>`))}
      ${row(t("compareUnlimited"),tools.map(x=>x.unlimitedFree?`<span class="compare-yes">✓ ${esc(t("yes"))}</span>`:`<span class="compare-no">— ${esc(t("no"))}</span>`))}
      ${row(t("compareOpenSource"),tools.map(x=>isOpenSource(x)?`<span class="compare-yes">✓ ${esc(t("yes"))}</span>`:`<span class="compare-no">— ${esc(t("no"))}</span>`))}
      ${row(t("compareUses"),tools.map(x=>`<span class="compare-text">${esc(bestFor(x).join(", ")||"—")}</span>`))}
    </div>
    <div class="compare-links">${tools.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noreferrer">${esc(x.name)} ↗</a>`).join("")}</div>`;
  attachImageFallbacks(els.compareDialog);
  els.compareDialog.showModal();
}

function openTool(tool){
  if(!tool)return;
  addRecent(tool.name);
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
  $("#copyToolLink").onclick=async()=>{const copied=await copyText(tool.url,t("copied"));if(!copied)window.prompt("Copy:",tool.url)};
  try{
    if(els.dialog.open)els.dialog.close();
    if(typeof els.dialog.showModal==="function")els.dialog.showModal();
    else els.dialog.setAttribute("open","");
  }catch(error){
    els.dialog.setAttribute("open","");
  }
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
  $$("[data-i18n-placeholder]").forEach(el=>{const value=t(el.dataset.i18nPlaceholder);if(value)el.placeholder=value});
  $("#heBtn").classList.toggle("active",state.lang==="he");
  $("#enBtn").classList.toggle("active",state.lang==="en");
  els.heroSearch.placeholder=state.lang==="he"?"חפש ChatGPT, קוד, וידאו, לימודים...":"Search ChatGPT, coding, video, studying...";
  els.search.placeholder=state.lang==="he"?"חיפוש לפי שם או שימוש...":"Search by name or use case...";
  fillFilters();fillFinder();buildCategories();buildPlatforms();buildFeatured();buildStudentSpotlight();buildStudentBenefits();buildHeroPreview();buildRecent();buildRecentlyViewed();renderTools();renderCompareDock();
}

function setLanguage(lang){
  state.lang=lang==="en"?"en":"he";
  writeStorage("aiatlas-lang",state.lang);
  applyLanguage();
}
function resetFilters(){
  els.search.value="";els.heroSearch.value="";els.cat.value="all";els.price.value="all";els.platform.value="all";els.sort.value="default";els.student.checked=false;els.fav.checked=false;els.openSource.checked=false;state.onlyNew=false;renderTools();
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
  if(kind==="opensource")els.openSource.checked=true;
  if(kind==="new"){state.onlyNew=true;els.sort.value="new";}
  renderTools();$("#discover").scrollIntoView({behavior:"smooth"});
}
function showToast(message){els.toast.textContent=message;els.toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>els.toast.classList.remove("show"),1800)}

function setupEvents(){
  document.addEventListener("click",e=>{
    const official=e.target.closest("[data-tool-link]");
    if(official)addRecent(official.dataset.toolLink);
    const retry=e.target.closest("#retryCatalog");
    if(retry){e.preventDefault();loadCatalog()}
  });
  [els.search].forEach(el=>el.addEventListener("input",renderTools));
  [els.cat,els.price,els.platform,els.sort,els.student,els.fav,els.openSource].forEach(el=>el.addEventListener("change",()=>{state.onlyNew=false;renderTools()}));
  els.heroSearch.addEventListener("input",()=>{els.search.value=els.heroSearch.value;renderTools()});
  els.heroSearch.addEventListener("keydown",e=>{if(e.key==="Enter")$("#discover").scrollIntoView({behavior:"smooth"})});
  $("#clearFilters").onclick=resetFilters;
  $("#shareFilters").onclick=shareFilters;
  $("#clearRecent").onclick=()=>{state.recent=[];saveRecent();buildRecentlyViewed()};
  $("#finderBtn").onclick=()=>{els.finderResults.innerHTML="";els.finderDialog.showModal()};
  $("#finderDialogClose").onclick=()=>els.finderDialog.close();
  els.finderDialog.addEventListener("click",e=>{if(e.target===els.finderDialog)els.finderDialog.close()});
  $("#runFinder").onclick=runFinder;
  $("#commandLaunch").onclick=openCommandPalette;
  $("#commandClose").onclick=()=>els.commandDialog.close();
  els.commandDialog.addEventListener("click",e=>{if(e.target===els.commandDialog)els.commandDialog.close()});
  els.commandInput.addEventListener("input",()=>{state.commandIndex=0;renderCommandPalette()});
  els.commandInput.addEventListener("keydown",e=>{
    const count=els.commandResults.querySelectorAll("[data-command-tool]").length;
    if(e.key==="ArrowDown"){e.preventDefault();state.commandIndex=count?((state.commandIndex+1)%count):0;renderCommandPalette()}
    if(e.key==="ArrowUp"){e.preventDefault();state.commandIndex=count?((state.commandIndex-1+count)%count):0;renderCommandPalette()}
    if(e.key==="Enter"){
      e.preventDefault();
      const links=[...els.commandResults.querySelectorAll("[data-command-tool]")];
      const link=links[state.commandIndex]||links[0];
      if(link){addRecent(link.dataset.commandTool);window.open(link.href,"_blank","noopener,noreferrer");els.commandDialog.close()}
    }
  });
  $("#heBtn").onclick=()=>setLanguage("he");$("#enBtn").onclick=()=>setLanguage("en");
  $("#themeBtn").onclick=()=>{
    document.body.classList.toggle("theme-red");
    writeStorage("aiatlas-theme-color",document.body.classList.contains("theme-red")?"red":"blue");
  };
  $("#dialogClose").onclick=()=>els.dialog.close();
  els.dialog.addEventListener("click",e=>{if(e.target===els.dialog)els.dialog.close()});
  $("#compareDialogClose").onclick=()=>els.compareDialog.close();
  els.compareDialog.addEventListener("click",e=>{if(e.target===els.compareDialog)els.compareDialog.close()});
  $("#openCompare").onclick=openCompareDialog;
  $("#clearCompare").onclick=()=>{state.compare=[];saveCompare();renderTools();renderCompareDock()};
  $("#surpriseBtn").onclick=()=>{const pool=state.filtered.length?state.filtered:state.tools;if(pool.length)openTool(pool[Math.floor(Math.random()*pool.length)])};
  $$("[data-quick]").forEach(btn=>btn.onclick=()=>quickFilter(btn.dataset.quick));
  document.addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCommandPalette();return}
    if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();els.heroSearch.focus()}
    if(e.key==="Escape"&&els.dialog.open)els.dialog.close();
    if(e.key==="Escape"&&els.compareDialog.open)els.compareDialog.close();
    if(e.key==="Escape"&&els.finderDialog.open)els.finderDialog.close();
    if(e.key==="Escape"&&els.commandDialog.open)els.commandDialog.close();
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

async function loadCatalog(){
  // Embedded data is the primary boot source so the UI can render instantly.
  state.tools=Array.isArray(EMBEDDED_TOOLS)?EMBEDDED_TOOLS.filter(tool=>tool&&tool.name&&tool.url):[];

  document.body.classList.remove("catalog-loading");
  if(els.grid)els.grid.removeAttribute("aria-busy");

  try{
    updateStats();
    applyLanguage();
    applySharedFilters();
    renderTools();
  }catch(error){
    console.error("AI Atlas initial render failed",error);
    if(els.grid){
      els.grid.removeAttribute("aria-busy");
      els.grid.innerHTML="";
    }
  }

  // Refresh the JSON in the background. It must never block the visible catalog.
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),4500);
  try{
    const response=await fetch("data/tools.json?v=19",{
      cache:"no-store",
      signal:controller.signal
    });
    if(!response.ok)throw new Error("tools.json "+response.status);
    const fresh=await response.json();
    if(Array.isArray(fresh)&&fresh.length){
      state.tools=fresh.filter(tool=>tool&&tool.name&&tool.url);
      updateStats();
      applyLanguage();
      applySharedFilters();
      renderTools();
    }
  }catch(error){
    console.warn("AI Atlas is using the embedded catalog fallback",error);
  }finally{
    clearTimeout(timeout);
  }
}

async function init(){
  if(readString("aiatlas-theme-color","blue")==="red")document.body.classList.add("theme-red");
  setupEvents();setupReveal();setupVisualEffects();setupPWA();
  await loadCatalog();
}
init();