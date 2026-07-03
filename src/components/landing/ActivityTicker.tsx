import {
  Bot,
  FileText,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Workflow,
  Zap,
} from "lucide-react";

const ITEMS = [
  { icon: Phone, text: "Voice agent answered 24 calls overnight" },
  { icon: FileText, text: "Proposal generated & sent in 90 seconds" },
  { icon: Workflow, text: "Lead routed to CRM automatically" },
  { icon: Mail, text: "142 follow-up emails sent while the team slept" },
  { icon: Bot, text: "Support bot resolved a ticket, no human needed" },
  { icon: Search, text: "SEO brief drafted from live keyword data" },
  { icon: RefreshCw, text: "Invoices reconciled without a spreadsheet" },
  { icon: Zap, text: "New enquiry qualified & booked in 3 minutes" },
];

// Infinite marquee of the kind of work our automations do all day. Static
// server component — the loop is pure CSS (animate-marquee-left moves -25%,
// so the list is repeated 4x for a seamless wrap).
export function ActivityTicker() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-bg-card/60 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-base to-transparent" />
      <div className="flex w-max animate-marquee-left gap-10">
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-10"
            aria-hidden={copy > 0}
          >
            {ITEMS.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-2.5 whitespace-nowrap font-mono text-xs tracking-wide text-text-muted"
              >
                <Icon size={14} className="text-primary-400" aria-hidden="true" />
                {text}
                <span className="ml-6 text-white/[0.15]">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
