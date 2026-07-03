import { services } from "@/data/services";
import { pickVariant } from "@/lib/pickVariant";

/**
 * UK programmatic SEO location data.
 *
 * 75 cities x 6 services are rendered from two dynamic routes:
 *   /locations/[city]            - city hub page
 *   /locations/[city]/[service]  - service-in-city landing page
 *
 * Copy is assembled from per-city facts (hook, industries, population) and
 * deterministic template variants so every page reads differently - this is
 * what keeps the pages out of "doorway page" territory with Google.
 */

export interface UkCity {
  slug: string;
  name: string;
  region: string;
  population: string;
  industries: [string, string, string];
  hook: string;
}

export const ukRegions = [
  "London",
  "South East",
  "South West",
  "East of England",
  "East Midlands",
  "West Midlands",
  "Yorkshire & the Humber",
  "North West",
  "North East",
  "Scotland",
  "Wales",
  "Northern Ireland",
] as const;

export const ukCities: UkCity[] = [
  // London
  {
    slug: "london",
    name: "London",
    region: "London",
    population: "8.9 million",
    industries: ["finance", "tech startups", "professional services"],
    hook: "London is home to Europe's largest tech and finance ecosystem, from Canary Wharf institutions to Shoreditch startups, and the most competitive search results in the UK.",
  },
  // South East
  {
    slug: "brighton",
    name: "Brighton",
    region: "South East",
    population: "290,000",
    industries: ["digital and creative agencies", "tourism and hospitality", "tech startups"],
    hook: "Brighton has one of the highest densities of digital and creative businesses in the UK, so standing out online here takes more than a template website.",
  },
  {
    slug: "portsmouth",
    name: "Portsmouth",
    region: "South East",
    population: "210,000",
    industries: ["marine and defence technology", "engineering", "retail"],
    hook: "Portsmouth's economy is anchored by naval, marine and defence technology firms alongside a busy island-city retail and services scene.",
  },
  {
    slug: "southampton",
    name: "Southampton",
    region: "South East",
    population: "250,000",
    industries: ["maritime services", "logistics", "retail"],
    hook: "As the UK's leading cruise port, Southampton runs on maritime services, logistics and a large regional retail catchment.",
  },
  {
    slug: "reading",
    name: "Reading",
    region: "South East",
    population: "175,000",
    industries: ["software and IT", "professional services", "fintech"],
    hook: "Reading sits at the heart of the Thames Valley tech corridor, hosting UK bases for some of the world's biggest software companies.",
  },
  {
    slug: "milton-keynes",
    name: "Milton Keynes",
    region: "South East",
    population: "290,000",
    industries: ["logistics", "corporate head offices", "autonomous technology"],
    hook: "Milton Keynes is one of the UK's fastest-growing business hubs, packed with head offices, logistics operations and autonomous-tech pilots.",
  },
  {
    slug: "oxford",
    name: "Oxford",
    region: "South East",
    population: "160,000",
    industries: ["life sciences", "university spinouts", "publishing"],
    hook: "Oxford's economy blends world-class life sciences and university spinouts with a historic publishing and visitor economy.",
  },
  {
    slug: "slough",
    name: "Slough",
    region: "South East",
    population: "165,000",
    industries: ["data centres", "logistics", "manufacturing"],
    hook: "Slough Trading Estate is one of Europe's largest business parks, and the town has become the UK's data-centre capital.",
  },
  {
    slug: "crawley",
    name: "Crawley",
    region: "South East",
    population: "120,000",
    industries: ["aviation", "logistics", "professional services"],
    hook: "Crawley's economy revolves around Gatwick Airport, with aviation, logistics and service businesses clustered around it.",
  },
  {
    slug: "guildford",
    name: "Guildford",
    region: "South East",
    population: "80,000",
    industries: ["video game development", "professional services", "corporate head offices"],
    hook: "Guildford is one of the UK's best-known video game development hubs and a base for Surrey's professional services firms.",
  },
  {
    slug: "basingstoke",
    name: "Basingstoke",
    region: "South East",
    population: "115,000",
    industries: ["insurance and fintech", "distribution", "IT services"],
    hook: "Basingstoke hosts major insurance, fintech and IT operations alongside one of the South's busiest distribution networks.",
  },
  // South West
  {
    slug: "bristol",
    name: "Bristol",
    region: "South West",
    population: "465,000",
    industries: ["aerospace", "creative and media", "tech startups"],
    hook: "Bristol combines aerospace engineering with one of the strongest creative and startup scenes outside London.",
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    region: "South West",
    population: "265,000",
    industries: ["marine science", "defence", "manufacturing"],
    hook: "Plymouth is Britain's Ocean City, with a marine science and defence cluster that anchors the far South West economy.",
  },
  {
    slug: "bournemouth",
    name: "Bournemouth",
    region: "South West",
    population: "195,000",
    industries: ["financial services", "digital agencies", "tourism and hospitality"],
    hook: "Bournemouth pairs a seaside visitor economy with a serious financial services and digital agency cluster.",
  },
  {
    slug: "swindon",
    name: "Swindon",
    region: "South West",
    population: "185,000",
    industries: ["distribution", "financial services", "engineering"],
    hook: "Swindon's rail engineering heritage lives on in a modern economy of distribution hubs, financial services and advanced engineering.",
  },
  {
    slug: "exeter",
    name: "Exeter",
    region: "South West",
    population: "130,000",
    industries: ["professional services", "education", "environmental science"],
    hook: "Exeter is Devon's commercial capital, home to the Met Office and a fast-growing professional services scene.",
  },
  {
    slug: "gloucester",
    name: "Gloucester",
    region: "South West",
    population: "135,000",
    industries: ["aerospace supply chain", "cyber security", "logistics"],
    hook: "Gloucester sits in the middle of the UK's aerospace supply chain and the growing Gloucestershire cyber corridor.",
  },
  {
    slug: "bath",
    name: "Bath",
    region: "South West",
    population: "95,000",
    industries: ["tourism and hospitality", "software and games", "publishing"],
    hook: "Bath's UNESCO-listed visitor economy sits alongside a quietly strong software, games and publishing sector.",
  },
  {
    slug: "cheltenham",
    name: "Cheltenham",
    region: "South West",
    population: "120,000",
    industries: ["cyber security", "professional services", "events and festivals"],
    hook: "With GCHQ on its doorstep, Cheltenham has become the centre of the UK's cyber security industry, alongside its famous festivals economy.",
  },
  // East of England
  {
    slug: "norwich",
    name: "Norwich",
    region: "East of England",
    population: "145,000",
    industries: ["insurance", "creative and media", "agri-food"],
    hook: "Norwich is one of the UK's historic insurance capitals and East Anglia's commercial and creative hub.",
  },
  {
    slug: "peterborough",
    name: "Peterborough",
    region: "East of England",
    population: "215,000",
    industries: ["environmental services", "insurance", "distribution"],
    hook: "Peterborough is a fast-growing city with a national reputation for environmental businesses, insurance operations and logistics.",
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "East of England",
    population: "145,000",
    industries: ["biotech and life sciences", "deep tech", "university spinouts"],
    hook: "Cambridge, Silicon Fen, has the highest concentration of science and tech companies per head anywhere in the UK.",
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    region: "East of England",
    population: "140,000",
    industries: ["insurance", "tech and telecoms", "port logistics"],
    hook: "Ipswich combines a long-standing insurance sector with a growing tech cluster and the UK's busiest container port nearby at Felixstowe.",
  },
  {
    slug: "colchester",
    name: "Colchester",
    region: "East of England",
    population: "195,000",
    industries: ["creative industries", "defence", "professional services"],
    hook: "Britain's oldest recorded town, Colchester today mixes a garrison economy with creative businesses and Essex professional services.",
  },
  {
    slug: "southend-on-sea",
    name: "Southend-on-Sea",
    region: "East of England",
    population: "180,000",
    industries: ["tourism and hospitality", "aviation", "professional services"],
    hook: "Southend-on-Sea blends a classic seafront visitor economy with an airport and a big base of London-facing service businesses.",
  },
  {
    slug: "chelmsford",
    name: "Chelmsford",
    region: "East of England",
    population: "180,000",
    industries: ["electronics and engineering", "financial services", "professional services"],
    hook: "The birthplace of radio, Chelmsford remains an electronics and engineering city and Essex's administrative capital.",
  },
  {
    slug: "luton",
    name: "Luton",
    region: "East of England",
    population: "225,000",
    industries: ["aviation", "aerospace manufacturing", "distribution"],
    hook: "Luton's economy is built around its airport, aerospace manufacturing and one of the South East's busiest distribution corridors.",
  },
  {
    slug: "watford",
    name: "Watford",
    region: "East of England",
    population: "100,000",
    industries: ["corporate head offices", "film and TV production", "retail"],
    hook: "Watford hosts major UK head offices and sits next to Leavesden's world-famous film studios.",
  },
  {
    slug: "st-albans",
    name: "St Albans",
    region: "East of England",
    population: "150,000",
    industries: ["professional services", "consultancies", "independent retail"],
    hook: "St Albans has one of the highest rates of entrepreneurship in the UK, full of consultancies and founder-led businesses serving London and beyond.",
  },
  // East Midlands
  {
    slug: "leicester",
    name: "Leicester",
    region: "East Midlands",
    population: "355,000",
    industries: ["textiles and manufacturing", "logistics", "food production"],
    hook: "Leicester is one of the UK's most diverse trading cities, with deep roots in textiles, food production and logistics.",
  },
  {
    slug: "nottingham",
    name: "Nottingham",
    region: "East Midlands",
    population: "330,000",
    industries: ["retail head offices", "fintech", "life sciences"],
    hook: "Nottingham is home to major retail head offices, a growing fintech scene and two large universities feeding local talent.",
  },
  {
    slug: "derby",
    name: "Derby",
    region: "East Midlands",
    population: "260,000",
    industries: ["aerospace engineering", "rail engineering", "advanced manufacturing"],
    hook: "Derby has the highest concentration of high-tech engineering jobs in the UK, anchored by aerospace and rail giants.",
  },
  {
    slug: "northampton",
    name: "Northampton",
    region: "East Midlands",
    population: "225,000",
    industries: ["logistics", "footwear and manufacturing", "financial services"],
    hook: "Northampton sits in the UK's logistics golden triangle and still carries its world-famous footwear-making heritage.",
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    region: "East Midlands",
    population: "105,000",
    industries: ["agri-tech", "engineering", "tourism and heritage"],
    hook: "Lincoln pairs a historic cathedral-city visitor economy with a modern agri-tech and engineering base.",
  },
  // West Midlands
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    population: "1.1 million",
    industries: ["professional services", "manufacturing", "retail"],
    hook: "The UK's second city, Birmingham has the largest business ecosystem outside London, and search competition to match.",
  },
  {
    slug: "coventry",
    name: "Coventry",
    region: "West Midlands",
    population: "345,000",
    industries: ["automotive engineering", "electric vehicle innovation", "manufacturing"],
    hook: "Coventry is the historic home of the British car industry and now a centre of electric vehicle and battery innovation.",
  },
  {
    slug: "stoke-on-trent",
    name: "Stoke-on-Trent",
    region: "West Midlands",
    population: "255,000",
    industries: ["ceramics and manufacturing", "logistics", "e-commerce operations"],
    hook: "Stoke-on-Trent's world-famous ceramics heritage now sits alongside major logistics and e-commerce operations.",
  },
  {
    slug: "wolverhampton",
    name: "Wolverhampton",
    region: "West Midlands",
    population: "265,000",
    industries: ["aerospace supply chain", "engineering", "construction"],
    hook: "Wolverhampton is a Black Country engineering city with a strong aerospace supply chain and construction sector.",
  },
  {
    slug: "telford",
    name: "Telford",
    region: "West Midlands",
    population: "185,000",
    industries: ["advanced manufacturing", "polymers and materials", "distribution"],
    hook: "Telford's new-town business parks host one of the Midlands' densest advanced manufacturing clusters.",
  },
  {
    slug: "walsall",
    name: "Walsall",
    region: "West Midlands",
    population: "285,000",
    industries: ["metal trades and manufacturing", "leather goods", "logistics"],
    hook: "Walsall's saddlery and leather-goods heritage lives on in a practical economy of metal trades, manufacturing and logistics.",
  },
  {
    slug: "worcester",
    name: "Worcester",
    region: "West Midlands",
    population: "105,000",
    industries: ["manufacturing", "professional services", "health technology"],
    hook: "Worcester mixes household-name manufacturing with a growing professional services scene serving the Three Counties.",
  },
  // Yorkshire & the Humber
  {
    slug: "leeds",
    name: "Leeds",
    region: "Yorkshire & the Humber",
    population: "800,000",
    industries: ["financial and legal services", "digital tech", "healthcare innovation"],
    hook: "Leeds is the financial and legal capital of the North, with one of the UK's fastest-growing digital and healthtech scenes.",
  },
  {
    slug: "sheffield",
    name: "Sheffield",
    region: "Yorkshire & the Humber",
    population: "585,000",
    industries: ["advanced manufacturing", "digital tech", "education"],
    hook: "Sheffield turned its steel heritage into a world-leading advanced manufacturing and materials research cluster.",
  },
  {
    slug: "bradford",
    name: "Bradford",
    region: "Yorkshire & the Humber",
    population: "540,000",
    industries: ["manufacturing", "financial services", "media"],
    hook: "Bradford is one of the UK's youngest cities by population, a huge, entrepreneurial market with deep manufacturing roots.",
  },
  {
    slug: "hull",
    name: "Hull",
    region: "Yorkshire & the Humber",
    population: "265,000",
    industries: ["renewable energy", "ports and logistics", "manufacturing"],
    hook: "Hull has reinvented itself as a renewables city, building offshore wind turbine blades beside one of the UK's busiest port complexes.",
  },
  {
    slug: "york",
    name: "York",
    region: "Yorkshire & the Humber",
    population: "210,000",
    industries: ["tourism and heritage", "bioscience", "rail and insurance"],
    hook: "York's world-class visitor economy sits alongside a serious bioscience, rail and insurance employment base.",
  },
  {
    slug: "huddersfield",
    name: "Huddersfield",
    region: "Yorkshire & the Humber",
    population: "145,000",
    industries: ["textiles", "precision engineering", "education"],
    hook: "Huddersfield's fine-worsted textile heritage continues alongside precision engineering firms and a large university.",
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    region: "Yorkshire & the Humber",
    population: "110,000",
    industries: ["rail engineering", "logistics", "e-commerce fulfilment"],
    hook: "Doncaster is a rail engineering town turned logistics powerhouse, with some of the UK's largest fulfilment operations.",
  },
  {
    slug: "rotherham",
    name: "Rotherham",
    region: "Yorkshire & the Humber",
    population: "110,000",
    industries: ["advanced manufacturing", "steel and materials", "logistics"],
    hook: "Rotherham hosts the Advanced Manufacturing Park, where aerospace-grade research meets South Yorkshire's industrial base.",
  },
  {
    slug: "wakefield",
    name: "Wakefield",
    region: "Yorkshire & the Humber",
    population: "110,000",
    industries: ["distribution", "manufacturing", "creative and cultural"],
    hook: "Wakefield combines a major distribution and manufacturing economy with a nationally known cultural scene.",
  },
  // North West
  {
    slug: "manchester",
    name: "Manchester",
    region: "North West",
    population: "550,000",
    industries: ["digital tech", "media", "professional services"],
    hook: "Manchester is the UK's largest tech hub outside London, with MediaCity, a booming startup scene and fierce local competition online.",
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "North West",
    population: "500,000",
    industries: ["maritime and logistics", "visitor economy", "digital and creative"],
    hook: "Liverpool's maritime trading heritage now powers a booming visitor economy and the Baltic Triangle digital cluster.",
  },
  {
    slug: "salford",
    name: "Salford",
    region: "North West",
    population: "270,000",
    industries: ["media production", "digital tech", "professional services"],
    hook: "Salford's MediaCityUK is home to the BBC and ITV, making it one of Europe's biggest media production hubs.",
  },
  {
    slug: "warrington",
    name: "Warrington",
    region: "North West",
    population: "210,000",
    industries: ["logistics", "nuclear engineering", "professional services"],
    hook: "Sitting between Manchester and Liverpool, Warrington is the logistics crossroads of the North West and a nuclear engineering centre.",
  },
  {
    slug: "blackpool",
    name: "Blackpool",
    region: "North West",
    population: "140,000",
    industries: ["tourism and hospitality", "events and entertainment", "retail"],
    hook: "Blackpool welcomes millions of visitors a year, making hospitality, events and seasonal trade the heart of its economy.",
  },
  {
    slug: "preston",
    name: "Preston",
    region: "North West",
    population: "145,000",
    industries: ["aerospace and defence", "professional services", "education"],
    hook: "Preston anchors Lancashire's aerospace and defence corridor and is one of the North West's fastest-improving city economies.",
  },
  {
    slug: "bolton",
    name: "Bolton",
    region: "North West",
    population: "200,000",
    industries: ["manufacturing", "logistics", "trades and construction"],
    hook: "Bolton has one of Greater Manchester's strongest SME bases, from manufacturers to family-run trades and logistics firms.",
  },
  {
    slug: "stockport",
    name: "Stockport",
    region: "North West",
    population: "295,000",
    industries: ["professional services", "digital and creative", "manufacturing"],
    hook: "Stockport is one of the UK's fastest-regenerating towns, drawing digital and professional firms out of central Manchester.",
  },
  {
    slug: "wigan",
    name: "Wigan",
    region: "North West",
    population: "110,000",
    industries: ["food manufacturing", "distribution", "trades and services"],
    hook: "Wigan is a proud working town with a big food manufacturing and distribution economy between Manchester and Liverpool.",
  },
  {
    slug: "chester",
    name: "Chester",
    region: "North West",
    population: "90,000",
    industries: ["financial services", "tourism and heritage", "professional services"],
    hook: "Chester pairs Roman-walled charm with one of the North West's biggest financial services employment bases.",
  },
  // North East
  {
    slug: "newcastle",
    name: "Newcastle upon Tyne",
    region: "North East",
    population: "300,000",
    industries: ["digital tech", "life sciences", "professional services"],
    hook: "Newcastle is the commercial heart of the North East, with a fast-growing digital, life sciences and professional services scene.",
  },
  {
    slug: "sunderland",
    name: "Sunderland",
    region: "North East",
    population: "275,000",
    industries: ["automotive manufacturing", "software", "advanced manufacturing"],
    hook: "Sunderland builds more cars than almost anywhere in Britain and has spent two decades growing a genuine software city alongside.",
  },
  {
    slug: "middlesbrough",
    name: "Middlesbrough",
    region: "North East",
    population: "140,000",
    industries: ["process industries", "digital startups", "engineering"],
    hook: "Middlesbrough's chemical and process industry heritage now sits beside the Boho zone, Teesside's digital startup quarter.",
  },
  {
    slug: "durham",
    name: "Durham",
    region: "North East",
    population: "50,000",
    industries: ["education", "heritage tourism", "professional services"],
    hook: "Durham's world heritage cathedral and university anchor a city economy of education, tourism and county-wide services.",
  },
  // Scotland
  {
    slug: "glasgow",
    name: "Glasgow",
    region: "Scotland",
    population: "635,000",
    industries: ["engineering", "financial services", "creative industries"],
    hook: "Glasgow is Scotland's biggest city and commercial engine, spanning engineering, finance and a famous creative sector.",
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "Scotland",
    population: "525,000",
    industries: ["fintech", "tourism and festivals", "professional services"],
    hook: "Edinburgh is the UK's second financial centre and a global festival city, with a thriving fintech and data science scene.",
  },
  {
    slug: "aberdeen",
    name: "Aberdeen",
    region: "Scotland",
    population: "200,000",
    industries: ["energy", "renewables transition", "engineering"],
    hook: "Europe's energy capital, Aberdeen is transitioning its world-class oil and gas expertise into offshore renewables.",
  },
  {
    slug: "dundee",
    name: "Dundee",
    region: "Scotland",
    population: "150,000",
    industries: ["video game development", "design", "life sciences"],
    hook: "Dundee is the birthplace of some of the world's biggest video games and a UNESCO City of Design.",
  },
  {
    slug: "inverness",
    name: "Inverness",
    region: "Scotland",
    population: "65,000",
    industries: ["tourism and hospitality", "renewables", "life sciences"],
    hook: "The capital of the Highlands, Inverness serves a vast rural region with tourism, renewables and life sciences leading its growth.",
  },
  // Wales
  {
    slug: "cardiff",
    name: "Cardiff",
    region: "Wales",
    population: "365,000",
    industries: ["media production", "financial services", "professional services"],
    hook: "Cardiff is Wales' capital and its media powerhouse, producing world-famous TV alongside a growing finance and services sector.",
  },
  {
    slug: "swansea",
    name: "Swansea",
    region: "Wales",
    population: "245,000",
    industries: ["university-led innovation", "retail", "tourism and hospitality"],
    hook: "Swansea combines a large university innovation economy with retail and tourism on the doorstep of the Gower peninsula.",
  },
  {
    slug: "newport",
    name: "Newport",
    region: "Wales",
    population: "160,000",
    industries: ["semiconductors", "data and statistics", "logistics"],
    hook: "Newport is the heart of the UK's compound semiconductor cluster and home to major national data institutions.",
  },
  {
    slug: "wrexham",
    name: "Wrexham",
    region: "Wales",
    population: "65,000",
    industries: ["manufacturing", "food production", "tourism"],
    hook: "Wrexham hosts one of the UK's largest industrial estates, and a football club that put the city on the world map.",
  },
  // Northern Ireland
  {
    slug: "belfast",
    name: "Belfast",
    region: "Northern Ireland",
    population: "345,000",
    industries: ["cyber security", "film and TV production", "fintech"],
    hook: "Belfast is one of the world's top cyber security investment locations and a major film and TV production centre.",
  },
  {
    slug: "derry",
    name: "Derry",
    region: "Northern Ireland",
    population: "85,000",
    industries: ["software", "creative industries", "manufacturing"],
    hook: "Derry~Londonderry has a fast-growing software and creative sector serving the North West of Ireland.",
  },
];

export function getCity(slug: string): UkCity | undefined {
  return ukCities.find((c) => c.slug === slug);
}

export function getNearbyCities(city: UkCity, count = 6): UkCity[] {
  const sameRegion = ukCities.filter(
    (c) => c.region === city.region && c.slug !== city.slug
  );
  if (sameRegion.length >= count) return sameRegion.slice(0, count);
  // Top up from the full list for small regions (e.g. London, NI)
  const topUp = ukCities.filter(
    (c) => c.slug !== city.slug && !sameRegion.includes(c)
  );
  return [...sameRegion, ...topUp].slice(0, count);
}

// ---------------------------------------------------------------------------
// Location services (the 5 core services + Shopify Automation)
// ---------------------------------------------------------------------------

export interface LocationService {
  slug: string;
  name: string;
  /** Keyword-rich variant of the name used in titles and H1s. */
  keyword: string;
  /** Canonical national service page for cross-linking. */
  parentHref: string;
  metaTitle: (city: UkCity) => string;
  metaDescription: (city: UkCity) => string;
  intro: (city: UkCity) => string;
  localParagraph: (city: UkCity) => string;
  deliverables: { title: string; description: string }[];
  faqs: (city: UkCity) => { question: string; answer: string }[];
}

function coreDeliverables(serviceSlug: string) {
  const service = services.find((s) => s.slug === serviceSlug);
  return service ? service.features : [];
}

export const locationServices: LocationService[] = [
  {
    slug: "web-development",
    name: "Web Development",
    keyword: "Web Design & Development",
    parentHref: "/services/web-development",
    metaTitle: (city) => `Web Design & Development in ${city.name}`,
    metaDescription: (city) =>
      `Fast, SEO-ready websites for ${city.name} businesses. Conversion-focused web design and development serving ${city.name} and the ${city.region}. Free strategy call.`,
    intro: (city) =>
      pickVariant(
        [
          `Looking for a web design and development partner in ${city.name}? We build fast, conversion-focused websites for ${city.name} businesses, from ${city.industries[0]} firms to ${city.industries[1]} companies. Every site is mobile-first, server-rendered, and engineered to rank on Google from day one.`,
          `Your website is the first impression most ${city.name} customers get of your business. We design and build high-performance sites for companies across ${city.name} and the wider ${city.region}, sites that load in under a second, rank for the searches that matter, and turn visitors into enquiries.`,
          `We help businesses in ${city.name} replace slow, dated websites with fast, modern ones built to convert. Whether you're in ${city.industries[0]}, ${city.industries[2]}, or anywhere in between, we build every page around one goal: getting ${city.name} customers to contact you.`,
        ],
        `${city.slug}-web-development`
      ),
    localParagraph: (city) =>
      `${city.hook} With around ${city.population} people in the area and strong ${city.industries[0]} and ${city.industries[1]} sectors, ${city.name} businesses that show up first on Google win a real advantage. A fast, well-structured website is the foundation, it's what every other channel, from ads to social, ultimately points back to.`,
    deliverables: coreDeliverables("web-development"),
    faqs: (city) => [
      {
        question: `Do you build websites for businesses in ${city.name}?`,
        answer: `Yes, we work with businesses across ${city.name} and the ${city.region} every week. We're a remote-first UK agency, which means you get senior-level work without paying city-centre agency overheads, and everything happens over quick calls and shared updates.`,
      },
      {
        question: `How much does a website cost for a ${city.name} business?`,
        answer: `It depends on scope, a lean, conversion-focused site starts lower than most ${city.name} agencies charge, while larger builds with booking systems, e-commerce or custom features cost more. Book a free call and we'll give you a clear, fixed quote with no surprises.`,
      },
      {
        question: `Will my website rank on Google in ${city.name}?`,
        answer: `Every site we build is SEO-first: server-rendered pages, structured data, fast Core Web Vitals and clean semantic markup. We also set up local SEO foundations so ${city.name} customers searching for what you do can actually find you.`,
      },
      {
        question: `Can you redesign my existing ${city.name} business website?`,
        answer: `Absolutely. We audit what's working, keep the SEO equity you've already earned (with proper redirects), and rebuild the rest for speed and conversions. Most redesigns for ${city.name} clients ship within a few weeks.`,
      },
      {
        question: `Do I need to meet you in person in ${city.name}?`,
        answer: `No, everything runs remotely over video calls, which keeps things fast and keeps costs down. You'll see progress at every milestone and can reach us any working day.`,
      },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    keyword: "Social Media Management",
    parentHref: "/services/social-media-management",
    metaTitle: (city) => `Social Media Management in ${city.name}`,
    metaDescription: (city) =>
      `Done-for-you social media management for ${city.name} businesses. Content, posting and growth across every platform, serving ${city.name} and the ${city.region}. Free strategy call.`,
    intro: (city) =>
      pickVariant(
        [
          `Running a business in ${city.name} leaves no time for daily posting, replying and content planning. We take social media completely off your plate (strategy, content creation, scheduling and community management) so your brand stays active while you run the business.`,
          `${city.name} customers check your social profiles before they call you. We manage social media end-to-end for businesses across ${city.name} and the ${city.region}: consistent, on-brand content that builds trust and sends a steady stream of followers to your website and contact form.`,
          `From ${city.industries[0]} firms to ${city.industries[1]} businesses, companies in ${city.name} use us as their outsourced social media team. We plan, create and publish content that actually reflects your business, and we report on what it's doing for you every month.`,
        ],
        `${city.slug}-social-media-management`
      ),
    localParagraph: (city) =>
      `${city.hook} In a market of roughly ${city.population} people, consistent social presence is how ${city.name} businesses stay top of mind, especially in sectors like ${city.industries[0]} and ${city.industries[2]}, where trust and familiarity drive who gets the call.`,
    deliverables: coreDeliverables("social-media-management"),
    faqs: (city) => [
      {
        question: `Do you manage social media for ${city.name} businesses?`,
        answer: `Yes, we run social media for UK businesses including many in ${city.name} and the ${city.region}. You get a dedicated content plan, on-brand posts, scheduling and monthly reporting, all handled remotely.`,
      },
      {
        question: `Which platforms should my ${city.name} business be on?`,
        answer: `It depends on your customers. For most ${city.name} businesses in ${city.industries[0]} or ${city.industries[1]}, we typically focus on two or three platforms done well rather than five done badly. We'll recommend the right mix on your free strategy call.`,
      },
      {
        question: `Can you create content without visiting us in ${city.name}?`,
        answer: `Yes, we build a content system around photos and clips you capture on your phone (we show you exactly what to shoot), plus branded graphics and copy we produce. Many of our best-performing clients we've never met in person.`,
      },
      {
        question: `How soon will social media bring in customers in ${city.name}?`,
        answer: `Expect steady growth in reach and engagement within the first month or two, with enquiries following as consistency compounds. Social works best feeding a fast website with clear calls to action, which we can also build.`,
      },
      {
        question: `What does social media management cost for a ${city.name} business?`,
        answer: `Packages scale with posting frequency and platforms. Because we're remote-first, you get agency-quality content without ${city.region} agency retainer prices. Book a call for a clear quote.`,
      },
    ],
  },
  {
    slug: "ai-automations",
    name: "AI Automation",
    keyword: "AI Automation Agency",
    parentHref: "/services/ai-automations",
    metaTitle: (city) => `AI Automation Agency in ${city.name}`,
    metaDescription: (city) =>
      `AI automation for ${city.name} businesses: chatbots, workflow automation and AI systems that save 40+ hours a week. Serving ${city.name} and the ${city.region}. Free strategy call.`,
    intro: (city) =>
      pickVariant(
        [
          `Businesses in ${city.name} are drowning in repetitive admin: quoting, follow-ups, data entry, scheduling. We build AI automations that handle that work for you: chatbots that qualify leads, workflows that run themselves, and systems that give ${city.name} business owners their time back.`,
          `AI isn't just for big ${city.region} corporates. We bring practical AI automation to ${city.name} businesses of every size, from ${city.industries[0]} firms to ${city.industries[1]} companies, automating the repetitive work that eats your week, without the enterprise price tag.`,
          `We're an AI automation agency serving ${city.name} and the wider ${city.region}. We map where your business loses hours to manual work, then build automations (AI chatbots, lead follow-up, document processing, reporting) that run 24/7 so your team doesn't have to.`,
        ],
        `${city.slug}-ai-automations`
      ),
    localParagraph: (city) =>
      `${city.hook} Sectors like ${city.industries[0]} and ${city.industries[1]} are full of repeatable processes, exactly where AI automation pays for itself fastest. For a ${city.name} business, automating quoting, booking and follow-up often frees up 40+ hours a week across a team.`,
    deliverables: coreDeliverables("ai-automations"),
    faqs: (city) => [
      {
        question: `What can AI automation actually do for my ${city.name} business?`,
        answer: `Practical things: answer enquiries 24/7 with an AI chatbot, chase and qualify leads automatically, generate quotes and documents, sync data between your tools, and send follow-ups without anyone lifting a finger. We focus on automations with measurable time savings for ${city.name} businesses.`,
      },
      {
        question: `Do I need to be technical to use AI automation?`,
        answer: `Not at all. We design, build and maintain everything, then hand you simple controls. Most of our ${city.name} clients just see the results: fewer manual tasks, faster responses and cleaner data.`,
      },
      {
        question: `How much does AI automation cost in ${city.name}?`,
        answer: `Most projects start with a single high-impact automation and expand from there. Because pricing is scoped per workflow, a ${city.name} business can start small and see ROI before committing further. Book a free call for a scoped quote.`,
      },
      {
        question: `Is AI automation relevant to ${city.industries[0]} businesses?`,
        answer: `Very. ${city.name}'s ${city.industries[0]} sector runs on enquiries, quotes, scheduling and paperwork, all highly automatable. We'll map your specific workflows on the strategy call and show you exactly where the hours are hiding.`,
      },
      {
        question: `How quickly can you build an automation for a ${city.name} business?`,
        answer: `A first automation typically ships in one to three weeks depending on complexity. We build, test with your real data, launch, and then monitor it, you'll see time savings within the first month.`,
      },
    ],
  },
  {
    slug: "seo-content",
    name: "SEO & Content",
    keyword: "SEO & Content Marketing",
    parentHref: "/services/seo-content",
    metaTitle: (city) => `SEO & Content Marketing in ${city.name}`,
    metaDescription: (city) =>
      `SEO agency for ${city.name} businesses. Local SEO, content marketing and technical SEO that gets you found on Google in ${city.name} and the ${city.region}. Free strategy call.`,
    intro: (city) =>
      pickVariant(
        [
          `When people in ${city.name} search for what you do, do they find you, or your competitors? We help ${city.name} businesses climb Google with technical SEO, local optimisation and content that answers what your customers are actually searching for.`,
          `SEO is the highest-leverage marketing channel for most ${city.name} businesses: customers searching for your service are already ready to buy. We combine local SEO, on-page optimisation and consistent content to get you in front of them, and keep you there.`,
          `We're an SEO and content agency working with businesses across ${city.name} and the ${city.region}. From ${city.industries[0]} companies to ${city.industries[2]} firms, we build search visibility the durable way: fast sites, genuinely useful content, and local signals Google trusts.`,
        ],
        `${city.slug}-seo-content`
      ),
    localParagraph: (city) =>
      `${city.hook} That makes search visibility in ${city.name} genuinely valuable: with a local market of around ${city.population} people, ranking for "your service + ${city.name}" searches puts you in front of buyers at the exact moment they're looking. Most local competitors still get the basics wrong, which is your opportunity.`,
    deliverables: coreDeliverables("seo-content"),
    faqs: (city) => [
      {
        question: `How long does SEO take to work in ${city.name}?`,
        answer: `Local rankings in ${city.name} often move within 4-12 weeks for well-targeted terms; broader competitive terms take longer. We prioritise quick wins first, fixing technical issues and targeting local searches, so you see momentum early.`,
      },
      {
        question: `What does local SEO for a ${city.name} business include?`,
        answer: `Optimising your Google Business Profile, building consistent local citations, creating location-relevant pages and content, earning reviews, and making sure your site is technically fast and crawlable. It's the full stack of signals Google uses to rank ${city.name} businesses.`,
      },
      {
        question: `Do you write the content, or do we?`,
        answer: `We do, researched, written and optimised for the searches your ${city.name} customers make. You review and approve; we handle everything else including publishing and internal linking.`,
      },
      {
        question: `Can you do SEO for my industry in ${city.name}?`,
        answer: `Almost certainly. We work across sectors including ${city.industries[0]}, ${city.industries[1]} and ${city.industries[2]}. The fundamentals are the same; the keyword research and content strategy are tailored to your market.`,
      },
      {
        question: `How do I know the SEO is working?`,
        answer: `Monthly reporting on rankings, traffic and, most importantly, enquiries. We track calls and form submissions from search so you see the pipeline SEO creates, not just vanity metrics.`,
      },
    ],
  },
  {
    slug: "design",
    name: "Design & Branding",
    keyword: "Graphic Design & Branding",
    parentHref: "/services/design",
    metaTitle: (city) => `Graphic Design & Branding in ${city.name}`,
    metaDescription: (city) =>
      `Graphic design and branding for ${city.name} businesses: logos, brand identity, marketing materials and social graphics. Serving ${city.name} and the ${city.region}. Free consultation.`,
    intro: (city) =>
      pickVariant(
        [
          `Your brand is what ${city.name} customers remember after they've seen your van, your website, your social posts or your shopfront. We design brands and marketing materials for ${city.name} businesses that look established, credible and worth calling.`,
          `Great design isn't decoration, it's why one ${city.name} business gets the enquiry and another gets scrolled past. From logos and full brand identities to social graphics and print, we give businesses across ${city.name} and the ${city.region} a look that matches the quality of their work.`,
          `We provide graphic design and branding for companies in ${city.name}, whether you're a ${city.industries[0]} firm that's outgrown a DIY logo or a new venture launching into ${city.name}'s ${city.industries[1]} scene. Consistent, professional design across everything your customers see.`,
        ],
        `${city.slug}-design`
      ),
    localParagraph: (city) =>
      `${city.hook} In a market like ${city.name}, where customers compare several providers before making contact, professional design is often the tiebreaker. A coherent brand across your website, social profiles and printed materials signals that you're established, before you've said a word.`,
    deliverables: coreDeliverables("design"),
    faqs: (city) => [
      {
        question: `Do you do branding for small businesses in ${city.name}?`,
        answer: `Yes, most of our design clients are small and mid-sized businesses, including many across ${city.name} and the ${city.region}. We scope packages to fit, from a logo refresh to a complete brand identity with guidelines.`,
      },
      {
        question: `What's included in a brand identity package?`,
        answer: `Typically: logo suite, colour palette, typography, brand guidelines, and templates for the materials you actually use, social posts, business cards, signage or vehicle livery. Everything a ${city.name} business needs to look consistent everywhere.`,
      },
      {
        question: `How long does a branding project take?`,
        answer: `A logo and core identity usually takes 2-4 weeks; full brand systems with collateral take longer. We work in structured revision rounds so ${city.name} clients always know what's next and when it lands.`,
      },
      {
        question: `Can you match designs to my existing ${city.name} business branding?`,
        answer: `Of course, if you have a brand you love, we design within it: social graphics, brochures, presentations, packaging and more, all consistent with your existing identity.`,
      },
      {
        question: `Do you design for print as well as digital?`,
        answer: `Yes. Signage, vehicle graphics, brochures, flyers and exhibition materials, print still matters for local visibility in ${city.name}, and we supply print-ready artwork to your chosen printer.`,
      },
    ],
  },
  {
    slug: "shopify-automation",
    name: "Shopify Automation",
    keyword: "Shopify Automation Experts",
    parentHref: "/services/shopify-automation",
    metaTitle: (city) => `Shopify Automation Experts in ${city.name}`,
    metaDescription: (city) =>
      `Shopify automation for ${city.name} e-commerce brands: automated fulfilment, inventory, customer flows and reporting. Serving ${city.name} and the ${city.region}. Free strategy call.`,
    intro: (city) =>
      pickVariant(
        [
          `Running a Shopify store from ${city.name} shouldn't mean nights spent on order admin, inventory updates and customer emails. We automate the operational side of Shopify (fulfilment workflows, stock syncing, customer flows and reporting) so your store scales without your workload scaling with it.`,
          `${city.name} e-commerce brands compete nationally from day one. We build Shopify automations that give smaller teams big-store operations: automatic order routing, inventory alerts, abandoned-cart recovery, review requests and clean reporting, all running while you sleep.`,
          `We help Shopify merchants in ${city.name} and across the ${city.region} automate the repetitive 80% of store operations. Fewer manual errors, faster fulfilment, better customer communication, and hours back every single week.`,
        ],
        `${city.slug}-shopify-automation`
      ),
    localParagraph: (city) =>
      `${city.hook} E-commerce lets ${city.name} businesses sell far beyond the local market of ${city.population} people, but only if operations keep up. Automation is how lean ${city.name} teams fulfil like enterprises, in sectors from ${city.industries[0]} to ${city.industries[2]}.`,
    deliverables: [
      {
        title: "Order & Fulfilment Automation",
        description:
          "Orders routed, tagged and pushed to fulfilment automatically, including split shipments, supplier notifications and tracking updates to customers.",
      },
      {
        title: "Inventory & Catalogue Syncing",
        description:
          "Stock levels, pricing and product data kept in sync across Shopify, suppliers and marketplaces, with low-stock alerts before you sell out.",
      },
      {
        title: "Customer Journey Flows",
        description:
          "Abandoned-cart recovery, post-purchase sequences, review requests and win-back campaigns that run automatically and drive repeat revenue.",
      },
      {
        title: "Reporting & Alerts",
        description:
          "Daily sales, margin and operations reports delivered to your inbox or Slack, plus instant alerts when something needs a human.",
      },
    ],
    faqs: (city) => [
      {
        question: `Do you work with Shopify stores based in ${city.name}?`,
        answer: `Yes, everything we do is remote, so we work with Shopify merchants across ${city.name}, the ${city.region} and the whole UK. Store size doesn't matter; the automations scale from first-hire teams to established brands.`,
      },
      {
        question: `What parts of a Shopify store can be automated?`,
        answer: `Most of the operational grind: order processing and tagging, fulfilment handoffs, inventory syncing, customer emails and SMS, review collection, reporting and finance exports. We audit your store and show you the highest-ROI automations first.`,
      },
      {
        question: `Will automation work with my existing apps?`,
        answer: `Almost always, we build around your current stack (Klaviyo, fulfilment apps, accounting tools and more) rather than forcing replacements. Where an app is costing more than it delivers, we'll tell you.`,
      },
      {
        question: `How much time can a ${city.name} Shopify store actually save?`,
        answer: `Merchants typically reclaim 10-30 hours a week depending on order volume, time that was going on manual order admin, stock updates and copy-paste customer service. The strategy call includes a quick estimate for your store.`,
      },
      {
        question: `How do we get started?`,
        answer: `Book a free call, give us read-only context on your store and current workflow, and we'll come back with a prioritised automation plan and fixed pricing. First automations usually go live within two weeks.`,
      },
    ],
  },
];

export function getLocationService(slug: string): LocationService | undefined {
  return locationServices.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// City hub copy
// ---------------------------------------------------------------------------

export function cityHubIntro(city: UkCity): string {
  return pickVariant(
    [
      `We're a UK digital agency working with businesses across ${city.name}, websites, social media, design, SEO and AI automation, all under one roof. ${city.hook}`,
      `${city.hook} We help ${city.name} businesses turn that market into growth: fast websites, consistent social media, professional branding, search visibility and automation that gives you your time back.`,
      `From ${city.industries[0]} firms to ${city.industries[1]} companies, businesses in ${city.name} use us as their outsourced digital team. One partner for web, social, design, SEO and AI automation, without big-agency retainers.`,
    ],
    `${city.slug}-hub`
  );
}

export function cityHubFaqs(city: UkCity): { question: string; answer: string }[] {
  return [
    {
      question: `Do you work with businesses in ${city.name}?`,
      answer: `Yes, we serve ${city.name} and the wider ${city.region} as a remote-first UK agency. That means senior-level work, fast turnarounds and no city-centre agency overheads built into your price.`,
    },
    {
      question: `Which services do you offer in ${city.name}?`,
      answer: `Everything a growing ${city.name} business needs digitally: web design and development, social media management, AI automation, SEO and content marketing, graphic design and branding, and Shopify automation for e-commerce.`,
    },
    {
      question: `How do we work together if you're not based in ${city.name}?`,
      answer: `Simple: a free strategy call to understand your goals, then a clear scope, fixed pricing and milestone updates. Everything happens over video calls and shared workspaces, most clients find it faster than working with a local office.`,
    },
    {
      question: `What kind of ${city.name} businesses do you work with?`,
      answer: `A wide range, locally that includes sectors like ${city.industries[0]}, ${city.industries[1]} and ${city.industries[2]}. If your customers search online, compare providers or expect fast responses, we can move the needle.`,
    },
  ];
}
