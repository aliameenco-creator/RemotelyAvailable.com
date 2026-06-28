"use client";

import { useState } from "react";
import Link from "next/link";
import { LineIcon, type LineIconName } from "@/components/landing/LineIcon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Pill, type PillTone } from "@/components/ui/Pill";

type SectionId = "overview" | "projects" | "cases" | "services" | "videos" | "blog";

const NAV: { id: SectionId; label: string; icon: LineIconName }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "cases", label: "Case Studies", icon: "doc" },
  { id: "services", label: "Services", icon: "layers" },
  { id: "videos", label: "Videos", icon: "video" },
  { id: "blog", label: "Blog Posts", icon: "chat" },
];

const STATUS: Record<string, PillTone> = {
  Live: "success",
  Published: "success",
  Active: "success",
  "In progress": "copper",
  Review: "warning",
  Scheduled: "lavender",
  Draft: "neutral",
  Hidden: "neutral",
};

function St({ s }: { s: string }) {
  return (
    <Pill tone={STATUS[s] || "neutral"} dot>
      {s}
    </Pill>
  );
}

const DATA: Record<Exclude<SectionId, "overview">, { cols: string[]; rows: string[][] }> = {
  projects: {
    cols: ["Project", "Client", "Service", "Status", "Updated"],
    rows: [
      ["Voice agent rollout", "Meridian Freight", "Voice Agents", "Live", "2h ago"],
      ["Lead-routing automation", "ScaleUp SaaS", "Automations", "In progress", "Today"],
      ["Support bot v2", "HomeRise Services", "Chatbots", "Review", "Yesterday"],
      ["Content pipeline", "Apex Digital", "Content Systems", "Live", "3d ago"],
      ["Store ops automation", "Nimbus Goods", "Shopify", "In progress", "4d ago"],
      ["Site rebuild", "Cedar & Co.", "AI Websites", "Scheduled", "5d ago"],
    ],
  },
  cases: {
    cols: ["Title", "Client", "Status", "Views", "Updated"],
    rows: [
      ["Recovered $1.2M in missed loads", "Meridian Freight", "Published", "4,210", "2h ago"],
      ["40% more demos on autopilot", "ScaleUp SaaS", "Published", "3,180", "1w ago"],
      ["200+ calls a day, zero missed", "HomeRise Services", "Published", "2,640", "2w ago"],
      ["1 to 5 posts a week, on-brand", "Apex Digital", "Draft", "—", "3d ago"],
    ],
  },
  services: {
    cols: ["Service", "Tier shown", "Status", "Inquiries (30d)", "Updated"],
    rows: [
      ["AI Automations", "All", "Active", "38", "1w ago"],
      ["AI Voice Agents", "System+", "Active", "27", "1w ago"],
      ["AI Websites", "All", "Active", "19", "2w ago"],
      ["AI Chatbots", "All", "Active", "22", "2w ago"],
      ["AI Content Systems", "System+", "Active", "14", "1mo ago"],
      ["Shopify Automation", "Sprint+", "Hidden", "6", "1mo ago"],
    ],
  },
  videos: {
    cols: ["Title", "Category", "Duration", "Status", "Views"],
    rows: [
      ["The 90-day AI roadmap", "AI Playbooks", "23:10", "Published", "12,400"],
      ["The 40-hour audit", "AI Playbooks", "14:22", "Published", "8,910"],
      ["Build your first automation", "Tutorials", "21:40", "Published", "6,330"],
      ["Designing a voice agent", "Voice & Chat", "17:12", "Scheduled", "—"],
      ["AI vocabulary for owners", "Getting Started", "6:40", "Draft", "—"],
    ],
  },
  blog: {
    cols: ["Title", "Author", "Status", "Published"],
    rows: [
      ["Why most AI pilots never ship", "Dana K.", "Published", "Jun 12, 2026"],
      ["The economics of an AI voice desk", "Marcus R.", "Published", "Jun 5, 2026"],
      ["Automations we tell clients to skip", "Priya P.", "Review", "—"],
      ["A field guide to RAG for owners", "Sarah C.", "Draft", "—"],
    ],
  },
};

const NEW_LABEL: Record<SectionId, string> = {
  projects: "New project",
  cases: "New case study",
  services: "Add service",
  videos: "Upload video",
  blog: "New post",
  overview: "Quick add",
};

function Table({ section }: { section: Exclude<SectionId, "overview"> }) {
  const d = DATA[section];
  const template = `2fr repeat(${d.cols.length - 1}, 1fr) 40px`;
  return (
    <Card hover={false} className="!p-0 overflow-hidden">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: template,
          padding: "14px 20px",
          borderBottom: "1px solid var(--ra-cream-08)",
          background: "var(--ra-ink)",
        }}
      >
        {d.cols.map((c) => (
          <span key={c} className="ra-eyebrow" style={{ fontSize: 11 }}>
            {c}
          </span>
        ))}
        <span />
      </div>
      {d.rows.map((r, i) => (
        <div
          key={i}
          className="adm-row"
          style={{
            display: "grid",
            gridTemplateColumns: template,
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: i < d.rows.length - 1 ? "1px solid var(--ra-cream-08)" : "none",
            transition: "background var(--dur-fast)",
            cursor: "pointer",
          }}
        >
          {r.map((cell, j) => (
            <span
              key={j}
              style={{
                fontSize: 14,
                color: j === 0 ? "var(--ra-cream)" : "var(--ra-cream-55)",
                fontWeight: j === 0 ? 600 : 400,
                fontFamily: /^[\d,]+$|^—$/.test(cell) ? "var(--font-mono)" : "var(--font-body)",
              }}
            >
              {STATUS[cell] ? <St s={cell} /> : cell}
            </span>
          ))}
          <span style={{ color: "var(--ra-cream-40)", display: "inline-flex", justifyContent: "flex-end" }}>
            <LineIcon name="settings" size={15} />
          </span>
        </div>
      ))}
    </Card>
  );
}

const OVERVIEW_STATS: { value: string; label: string; delta: string; tone: "success" | "lavender" }[] = [
  { value: "6", label: "Active projects", delta: "2 in review", tone: "success" },
  { value: "23", label: "New leads / 7d", delta: "+18% vs last wk", tone: "success" },
  { value: "41", label: "Published assets", delta: "3 scheduled", tone: "lavender" },
  { value: "512", label: "Client hrs saved / wk", delta: "across all clients", tone: "lavender" },
];

const ACTIVITY: { who: string; what: string; when: string; icon: LineIconName; tone: string }[] = [
  { who: "Voice agent", what: "went live for Meridian Freight", when: "2h ago", icon: "mic", tone: "var(--ra-success)" },
  { who: "New lead", what: "Cedar & Co. requested a teardown", when: "4h ago", icon: "users", tone: "var(--ra-copper)" },
  { who: "Case study", what: '"Recovered $1.2M" published', when: "Today", icon: "doc", tone: "var(--ra-lavender)" },
  { who: "Video", what: '"90-day AI roadmap" crossed 12k views', when: "Yesterday", icon: "video", tone: "var(--ra-copper)" },
  { who: "Automation", what: "lead-routing build moved to QA", when: "2d ago", icon: "bolt", tone: "var(--ra-success)" },
];

function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="adm-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {OVERVIEW_STATS.map((s) => (
          <Card key={s.label} hover={false}>
            <Stat value={s.value} label={s.label} delta={s.delta} deltaTone={s.tone} />
          </Card>
        ))}
      </div>
      <div className="adm-overview" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--ra-cream)" }}>Active projects</h3>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ra-copper)" }}>View all</span>
          </div>
          <Table section="projects" />
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 14, color: "var(--ra-cream)" }}>Recent activity</h3>
          <Card hover={false} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {ACTIVITY.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 13,
                  padding: "12px 4px",
                  borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--ra-cream-08)" : "none",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    flex: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--ra-ink)",
                    border: "1px solid var(--ra-cream-08)",
                    color: a.tone,
                  }}
                >
                  <LineIcon name={a.icon} size={16} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: "var(--ra-cream-70)", lineHeight: 1.45 }}>
                    <strong style={{ color: "var(--ra-cream)", fontWeight: 600 }}>{a.who}</strong> {a.what}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ra-cream-40)", marginTop: 3 }}>
                    {a.when}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export function DashboardClient() {
  const [active, setActive] = useState<SectionId>("overview");
  const current = NAV.find((n) => n.id === active)!;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        className="adm-sidebar"
        style={{
          width: 248,
          flex: "none",
          background: "var(--ra-ink)",
          borderRight: "1px solid var(--ra-cream-08)",
          display: "flex",
          flexDirection: "column",
          padding: "22px 16px",
        }}
      >
        <div style={{ padding: "0 8px 8px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--ra-copper)",
                boxShadow: "0 0 12px var(--ra-copper)",
                flex: "none",
              }}
            />
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--ra-cream)", letterSpacing: "-0.01em" }}>
              Remotely Available
            </span>
          </Link>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ra-cream-40)",
            padding: "20px 8px 10px",
          }}
        >
          // manage
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((n) => {
            const on = n.id === active;
            return (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: "1px solid " + (on ? "var(--ra-copper-25)" : "transparent"),
                  background: on ? "var(--ra-copper-08)" : "transparent",
                  color: on ? "var(--ra-cream)" : "var(--ra-cream-55)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  textAlign: "left",
                  transition: "all var(--dur-fast)",
                }}
              >
                <span style={{ color: on ? "var(--ra-copper)" : "var(--ra-cream-40)", display: "inline-flex" }}>
                  <LineIcon name={n.icon} size={17} />
                </span>
                {n.label}
              </button>
            );
          })}
        </nav>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: "12px 8px",
            borderTop: "1px solid var(--ra-cream-08)",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              flex: "none",
              background: "var(--ra-lavender)",
              color: "var(--ra-cream)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            RA
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "var(--ra-cream)", fontWeight: 600 }}>Admin</div>
            <div
              style={{
                fontSize: 11.5,
                color: "var(--ra-cream-40)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              team@remotelyavailable.com
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "18px 32px",
            borderBottom: "1px solid var(--ra-cream-08)",
            flex: "none",
          }}
        >
          <div>
            <div className="ra-eyebrow" style={{ fontSize: 10.5, marginBottom: 3 }}>
              {active === "overview" ? "Dashboard" : "Manage"}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 400, color: "var(--ra-cream)" }}>
              {current.label}
            </h1>
          </div>
          <div className="adm-search" style={{ marginLeft: "auto", width: 280, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--ra-cream-40)",
              }}
            >
              <LineIcon name="search" size={16} />
            </span>
            <input
              placeholder="Search…"
              className="w-full rounded-[var(--radius-button)] border border-bg-subtle bg-bg-card py-2.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
            />
          </div>
          <Button size="sm" icon={<LineIcon name="plus" size={15} />}>
            {NEW_LABEL[active]}
          </Button>
          <Link
            href="/"
            title="View site"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid var(--ra-cream-12)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ra-cream-55)",
              flex: "none",
            }}
          >
            <LineIcon name="external" size={16} />
          </Link>
        </header>
        <div className="adm-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {active === "overview" ? (
            <Overview />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--ra-cream-40)" }}>
                  {DATA[active].rows.length} items
                </span>
                <span style={{ marginLeft: "auto" }} />
                <Button variant="ghost" size="sm" icon={<LineIcon name="search" size={14} />}>
                  Filter
                </Button>
              </div>
              <Table section={active} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
