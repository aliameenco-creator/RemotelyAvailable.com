import type { LineIconName } from "@/components/landing/LineIcon";
import type { PillTone } from "@/components/ui/Pill";

export interface CaseStudyStat {
  value: string;
  label: string;
  delta?: string;
}

export interface CaseStudyBuildItem {
  icon: LineIconName;
  title: string;
  desc: string;
}

export interface CaseStudyProseBlock {
  kicker: string;
  title: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  tag: string;
  tagTone: PillTone;
  client: string;
  industry: string;
  services: string;
  timeline: string;
  /** Listing card */
  cardTitle: string;
  cardStat: string;
  /** Detail hero */
  titleLead: string;
  titleAccent: string;
  titleTrail: string;
  heroStats: CaseStudyStat[];
  /** Body */
  prose: CaseStudyProseBlock[];
  built: CaseStudyBuildItem[];
  quote: {
    before: string;
    emphasis: string;
    after: string;
    author: string;
    role: string;
    initials: string;
  };
  results: CaseStudyStat[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "meridian-freight",
    tag: "Logistics",
    tagTone: "copper",
    client: "Meridian Freight Co.",
    industry: "Logistics & Freight",
    services: "AI Voice Agents · Automations",
    timeline: "6 weeks",
    cardTitle: "How Meridian Freight recovered $1.2M in missed loads with a 24/7 AI voice agent",
    cardStat: "+$1.2M recovered",
    titleLead: "How Meridian Freight recovered ",
    titleAccent: "$1.2M in missed loads",
    titleTrail: " with a 24/7 AI voice agent",
    heroStats: [
      { value: "+$1.2M", label: "Loads recovered / yr", delta: "prev. lost to voicemail" },
      { value: "100%", label: "Calls answered", delta: "was 61%" },
      { value: "8 min", label: "Avg. quote turnaround", delta: "was 3.5 hrs" },
      { value: "6 wks", label: "To full deployment", delta: "on time, on budget" },
    ],
    prose: [
      {
        kicker: "// The Challenge",
        title: "The phone kept ringing after hours",
        paragraphs: [
          "Meridian Freight ran a lean dispatch desk. After 6pm and on weekends, inbound load requests went to voicemail — and in freight, the first broker to quote usually wins the load.",
          "Leadership estimated they were losing several six-figure loads a quarter, but no one could quantify it because missed calls were never logged. Hiring a 24/7 desk was cost-prohibitive.",
        ],
      },
      {
        kicker: "// The Approach",
        title: "An always-on agent, wired into their stack",
        paragraphs: [
          "We started with a free teardown of two weeks of call logs. The pattern was clear: most after-hours calls were simple, quotable loads that a well-trained agent could handle end to end.",
          "Rather than a generic chatbot, we built a voice agent trained on Meridian's lanes, pricing rules, and tone — then wired it directly into their TMS so a captured load became a live quote in minutes.",
        ],
      },
    ],
    built: [
      { icon: "mic", title: "After-hours voice agent", desc: "Answers every inbound call, captures load details, and quotes instantly — in English and Spanish." },
      { icon: "bolt", title: "Dispatch automation", desc: "Pushes qualified loads straight into their TMS and pings the on-call dispatcher with full context." },
      { icon: "chat", title: "Carrier follow-up", desc: "Automated SMS + email sequences confirm pickups and chase missing paperwork." },
      { icon: "chart", title: "Live ops dashboard", desc: "Real-time view of calls, quotes, and recovered revenue for the leadership team." },
    ],
    quote: {
      before: "We were losing six-figure loads to voicemail every quarter. Now the phone is ",
      emphasis: "never",
      after: " unanswered, and quotes go out before a competitor even calls back.",
      author: "Dana Koval",
      role: "COO, Meridian Freight Co.",
      initials: "DK",
    },
    results: [
      { value: "+$1.2M", label: "Annual loads recovered" },
      { value: "39%", label: "More calls answered" },
      { value: "26×", label: "Faster quote turnaround" },
      { value: "11 mo", label: "Payback period" },
    ],
  },
  {
    slug: "scaleup-saas",
    tag: "SaaS",
    tagTone: "lavender",
    client: "ScaleUp SaaS",
    industry: "B2B Software",
    services: "Automations · Lead Routing",
    timeline: "4 weeks",
    cardTitle: "ScaleUp cut lead-qual time by 73% with an automation pipeline",
    cardStat: "+40% demos",
    titleLead: "How ScaleUp booked ",
    titleAccent: "40% more demos",
    titleTrail: " on autopilot with a lead-routing pipeline",
    heroStats: [
      { value: "+40%", label: "Demos booked", delta: "same ad spend" },
      { value: "-73%", label: "Lead-qual time", delta: "was 9 min / lead" },
      { value: "< 2 min", label: "Speed to first reply", delta: "was 4 hrs" },
      { value: "4 wks", label: "To full deployment", delta: "on time" },
    ],
    prose: [
      {
        kicker: "// The Challenge",
        title: "Hot leads went cold in the queue",
        paragraphs: [
          "ScaleUp's SDR team manually triaged every inbound form fill. By the time a rep replied, the best leads had already booked with a faster competitor.",
          "Routing rules lived in someone's head, so enterprise leads and tire-kickers got the same slow treatment.",
        ],
      },
      {
        kicker: "// The Approach",
        title: "Score, route, and reply in seconds",
        paragraphs: [
          "We built an enrichment + scoring pipeline that grades each lead the moment it arrives and routes it to the right rep with full context.",
          "High-intent leads get an instant, personalized reply and a one-click booking link before they leave the page.",
        ],
      },
    ],
    built: [
      { icon: "bolt", title: "Lead scoring engine", desc: "Enriches and grades every inbound lead in real time against your ICP." },
      { icon: "users", title: "Smart routing", desc: "Assigns leads to the right rep instantly, with full enrichment in the CRM." },
      { icon: "chat", title: "Instant reply sequences", desc: "Personalized first-touch within seconds, with a booking link baked in." },
      { icon: "chart", title: "Pipeline reporting", desc: "Live dashboards on speed-to-lead, conversion, and rep load." },
    ],
    quote: {
      before: "Our reps stopped doing data entry and started closing. Speed-to-lead went from hours to ",
      emphasis: "seconds",
      after: ", and the right rep gets the right lead every time.",
      author: "Marcus Reyes",
      role: "VP Sales, ScaleUp SaaS",
      initials: "MR",
    },
    results: [
      { value: "+40%", label: "More demos booked" },
      { value: "-73%", label: "Lead-qual time" },
      { value: "120×", label: "Faster first reply" },
      { value: "6 mo", label: "Payback period" },
    ],
  },
  {
    slug: "homerise-services",
    tag: "Home Services",
    tagTone: "success",
    client: "HomeRise Services",
    industry: "Home Services",
    services: "AI Voice Agents · Chatbots",
    timeline: "5 weeks",
    cardTitle: "HomeRise fields 200+ calls a day with an AI voice team",
    cardStat: "98% resolved",
    titleLead: "How HomeRise handles ",
    titleAccent: "200+ calls a day",
    titleTrail: " with zero missed and 98% resolved",
    heroStats: [
      { value: "200+", label: "Calls / day handled", delta: "zero missed" },
      { value: "98%", label: "Resolved without a human", delta: "first contact" },
      { value: "24/7", label: "Coverage", delta: "incl. weekends" },
      { value: "5 wks", label: "To full deployment", delta: "on budget" },
    ],
    prose: [
      {
        kicker: "// The Challenge",
        title: "More demand than the front desk could take",
        paragraphs: [
          "HomeRise's growth outpaced its phone lines. Customers calling to book or reschedule hit hold music — and many simply hung up and called a competitor.",
          "Every missed call was a missed job, but staffing a bigger call center wasn't viable at their margins.",
        ],
      },
      {
        kicker: "// The Approach",
        title: "A voice team that never sleeps",
        paragraphs: [
          "We deployed a multi-line AI voice agent that books, reschedules, and answers the top 30 questions — and hands off cleanly to staff for anything complex.",
          "It's wired into their scheduling software, so a call becomes a confirmed appointment with no human in the loop.",
        ],
      },
    ],
    built: [
      { icon: "mic", title: "Multi-line voice agent", desc: "Handles concurrent calls to book, reschedule, and answer FAQs." },
      { icon: "clock", title: "Live scheduling", desc: "Reads and writes to their booking calendar in real time." },
      { icon: "chat", title: "Web + SMS chatbot", desc: "Catches after-hours and overflow inquiries across channels." },
      { icon: "users", title: "Clean human handoff", desc: "Escalates edge cases to staff with full call context attached." },
    ],
    quote: {
      before: "We went from dropping calls at peak to answering every single one. Our team is finally ",
      emphasis: "ahead",
      after: " of the phones instead of buried under them.",
      author: "Priya Patel",
      role: "Owner, HomeRise Services",
      initials: "PP",
    },
    results: [
      { value: "200+", label: "Calls handled daily" },
      { value: "98%", label: "Resolved autonomously" },
      { value: "0", label: "Missed calls" },
      { value: "4 mo", label: "Payback period" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
