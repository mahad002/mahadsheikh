// All project facts come from the 2026-11-14 Complete Portfolio. Nothing here is invented:
// no stack is listed where the portfolio doesn't name one, and no metrics are shown.
window.PROJECTS = [
  {
    id: "gwm", title: "GWM Pakistan", kind: "Brand platform", tag: "web", where: "Pakistan", sector: "Automotive",
    img: "img/gwm.jpg", gallery: ["img/gwm-set.jpg"], full: "img/gwm-full.jpg", size: "tall",
    url: "https://www.gwm-pakistan.com/", urlLabel: "gwm-pakistan.com", live: true,
    line: "The official site for the GWM and Haval brands in Pakistan, won through Sazgar Engineering.",
    built: ["Model range and a page for every model", "Test-drive booking and dealer finder", "News, events and newsletter sign-up", "Built for desktop and phone"],
    stack: ["Next.js", "Node.js", "AWS", "Automation"], role: "Sole developer"
  },
  {
    id: "guru", title: "GuruIsOnline", kind: "Learning platform", tag: "platform", where: "Singapore", sector: "EdTech",
    img: "img/guru-set.jpg", gallery: ["img/guru.jpg"], size: "wide",
    url: "https://guruisonline.com/", urlLabel: "guruisonline.com", live: true,
    line: "A Mandarin-tutoring business with a custom learning-management platform behind it.",
    built: ["Role-based admin for super-admins, admins, teachers and students", "Session and timetable scheduling", "Finance and teacher payroll", "Public course site and student dashboards"],
    stack: ["React", "Node.js", "Supabase", "Cloud"], role: "Sole developer",
    note: "Admin screens aren't shown because they hold student and teacher data. Demo on request."
  },
  {
    id: "somara", title: "Somara Labs", kind: "Online store", tag: "store", where: "Pakistan", sector: "Health devices",
    img: "img/somara.jpg", gallery: ["img/somara-set.jpg"], full: "img/somara-full.jpg", size: "tall",
    url: "https://somaralabs.com/", urlLabel: "somaralabs.com", live: true,
    line: "A store for red-light-therapy devices, with side-by-side comparison, spec sheets and a research page.",
    built: ["Product comparison and spec sheets", "Research page", "Dark and light themes"],
    stack: [], role: "Design and build"
  },
  {
    id: "bunai", title: "Bunai Silai", kind: "Online store", tag: "store", where: "Pakistan", sector: "Handmade knitwear",
    img: "img/bunai-set.jpg", gallery: ["img/bunai.jpg"], size: "wide",
    url: "https://bunaisilai.com/", urlLabel: "bunaisilai.com", live: true,
    line: "A handmade-knitwear store, in Urdu and English, with WhatsApp enquiries and cash on delivery.",
    built: ["Catalogue", "WhatsApp enquiries", "Cash on delivery", "Bilingual: Urdu and English"],
    stack: [], role: "Design and build"
  },
  {
    id: "emotiverse", title: "EmotiVerse", kind: "AI product", tag: "ai", where: "Own product", sector: "AI companions",
    img: "img/emotiverse.jpg", gallery: [], full: "img/emotiverse-full.jpg", size: "tall",
    url: "https://emoti-verse.vercel.app/", urlLabel: "emoti-verse.vercel.app", live: true,
    line: "Emotion-aware AI companions: chat, voice and images with characters that keep a consistent personality.",
    built: ["Chat, voice and image generation", "Characters that hold one personality across a conversation", "Structured API routing and cloud deployment"],
    stack: ["Next.js", "Gemini", "LangChain", "Firebase", "AWS S3", "Vercel"], role: "Design and build"
  },
  {
    id: "exec", title: "Exec Chauffeur Group", kind: "Company site", tag: "web", where: "United Kingdom", sector: "Chauffeur service",
    img: "img/exec-set.jpg", gallery: ["img/exec.jpg"], full: "img/exec-full.jpg", size: "wide",
    url: "https://execchauffeurgroup.co.uk/", urlLabel: "execchauffeurgroup.co.uk", live: true,
    line: "A UK chauffeur service: the fleet, the services and a booking flow.",
    built: ["Fleet and service pages", "Booking flow"],
    stack: [], role: "Design and build"
  },
  {
    id: "isra", title: "ISRA AI", kind: "Company site", tag: "ai", where: "United Kingdom", sector: "AI venture studio",
    img: "img/isra.jpg", gallery: [], full: "img/isra-full.jpg", size: "tall",
    url: "https://isra-ai.co/", urlLabel: "isra-ai.co", live: true,
    line: "The site for an AI company: its method, its technology, its services.",
    built: ["Methodology and technology pages", "Services and contact", "Dark and light themes"],
    stack: [], role: "Design and build"
  },
  {
    id: "majorwerks", title: "MajorWerks", kind: "Company site", tag: "web", where: "UAE", sector: "AI services",
    img: "img/majorwerks-set.jpg", gallery: [], size: "wide",
    url: "", urlLabel: "", live: false,
    line: "A company site for an AI services firm in the UAE.",
    built: ["Services and team", "Blog", "Contact"],
    stack: [], role: "Design and build"
  },
  {
    id: "wecarhire", title: "WeCarHire", kind: "Booking site", tag: "web", where: "United Kingdom", sector: "Luxury car hire",
    img: "img/wecarhire-set.jpg", gallery: [], size: "wide",
    url: "", urlLabel: "", live: false,
    line: "A luxury car-rental site with a booking bar up front and the fleet behind it.",
    built: ["Booking bar", "Fleet pages"],
    stack: [], role: "Design and build"
  },
  {
    id: "phone2door", title: "Phone2Door", kind: "Online store", tag: "store", where: "Germany", sector: "Phone accessories",
    img: "img/phone2door-set.jpg", gallery: [], size: "wide",
    url: "", urlLabel: "", live: false,
    line: "A phone-accessory store for Germany, in German, with Stripe Checkout.",
    built: ["Catalogue", "Help centre", "Stripe Checkout"],
    stack: ["Stripe"], role: "Design and build"
  },
  {
    id: "housing", title: "Housing Disrepair", kind: "Lead generation", tag: "web", where: "United Kingdom", sector: "Legal claims",
    img: "img/housing-set.jpg", gallery: [], size: "wide",
    url: "", urlLabel: "", live: false,
    line: "A lead-generation site for housing-disrepair claims: a claim form and the answers people look for first.",
    built: ["Claim form", "FAQ"],
    stack: ["Next.js", "Firebase", "AWS"], role: "Design and build"
  },
  {
    id: "weather", title: "Weather Pipeline", kind: "ML pipeline", tag: "ai", where: "Open source", sector: "Data and MLOps",
    img: "img/weather.jpg", gallery: [], size: "tall",
    url: "https://github.com/mahad002/weather-pipeline", urlLabel: "github.com/mahad002/weather-pipeline", live: true,
    line: "A live weather-data ML pipeline with versioned data, tracked experiments and CI.",
    built: ["Orchestration with Airflow", "Data versioning with DVC", "Experiment tracking with MLflow", "CI with Jenkins and GitHub Actions"],
    stack: ["Airflow", "MLflow", "DVC", "Docker", "Jenkins", "GitHub Actions"], role: "Sole developer"
  }
];
