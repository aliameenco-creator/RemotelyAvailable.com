"use client";

import { useState } from "react";
import { Section, SectionHead, AccentTitle, Glow } from "@/components/landing/primitives";
import { LineIcon } from "@/components/landing/LineIcon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import {
  resourceCategories,
  videos,
  playbooks,
  featuredVideo,
  type ResourceCategory,
  type VideoGuide,
} from "@/data/resources";

function Thumb({
  tone,
  dur,
  big = false,
}: {
  tone: "copper" | "lavender";
  dur: string;
  big?: boolean;
}) {
  return (
    <div
      className="vid-thumb"
      style={{
        position: "relative",
        aspectRatio: big ? "16 / 9" : "16 / 10",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--ra-cream-08)",
        transition: "border-color var(--dur-base)",
        background:
          tone === "lavender"
            ? "radial-gradient(120% 100% at 20% 0%, rgba(110,119,203,0.32), transparent 60%), var(--ra-surface)"
            : "radial-gradient(120% 100% at 20% 0%, rgba(227,140,53,0.30), transparent 60%), var(--ra-surface)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--ra-copper-045) 1px, transparent 1px), linear-gradient(90deg, var(--ra-copper-045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="vid-play"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: big ? 72 : 52,
          height: big ? 72 : 52,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(20,20,20,0.7)",
          border: "1px solid var(--ra-cream-25)",
          color: "var(--ra-cream)",
          backdropFilter: "blur(4px)",
          transition: "transform var(--dur-base) var(--ease-standard), background var(--dur-base)",
        }}
      >
        <LineIcon name="play" size={big ? 26 : 18} />
      </div>
      <span
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 6,
          background: "rgba(20,20,20,0.78)",
          color: "var(--ra-cream)",
        }}
      >
        {dur}
      </span>
    </div>
  );
}

function VideoCard({ v }: { v: VideoGuide }) {
  return (
    <div className="vid-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Thumb tone={v.tone} dur={v.dur} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Pill tone={v.tone}>{v.cat}</Pill>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16.5, lineHeight: 1.35, color: "var(--ra-cream)" }}>
          {v.title}
        </h3>
      </div>
    </div>
  );
}

export function ResourcesClient() {
  const [cat, setCat] = useState<ResourceCategory>("All");
  const shown = cat === "All" ? videos : videos.filter((v) => v.cat === cat);

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Glow style={{ top: -240, left: "50%", transform: "translateX(-50%)" }} size={640} />
        <Section style={{ position: "relative", paddingTop: 128, textAlign: "center" }}>
          <span style={{ display: "inline-flex", gap: 8, marginBottom: 20 }}>
            <Pill tone="success" dot>
              Free · No signup
            </Pill>
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.3rem, 5vw, 3.9rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              maxWidth: 820,
              margin: "0 auto",
              textWrap: "balance",
              color: "var(--ra-cream)",
            }}
          >
            AI video guides for <AccentTitle>business owners</AccentTitle>
          </h1>
          <p style={{ margin: "22px auto 0", maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: "var(--ra-cream-55)" }}>
            Short, practical walkthroughs on putting AI to work in your business, free for anyone, no email required.
          </p>
        </Section>
      </div>

      {/* Featured */}
      <Section style={{ paddingTop: 0 }}>
        <div className="res-feat" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "center" }}>
          <div className="vid-card">
            <Thumb tone={featuredVideo.tone} dur={featuredVideo.dur} big />
          </div>
          <div>
            <Pill tone="copper">Featured</Pill>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                letterSpacing: "-0.02em",
                marginTop: 16,
                lineHeight: 1.15,
                color: "var(--ra-cream)",
              }}
            >
              {featuredVideo.title}
            </h2>
            <p style={{ marginTop: 14, color: "var(--ra-cream-55)", fontSize: 16, lineHeight: 1.65, maxWidth: 460 }}>
              {featuredVideo.description}
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button icon={<LineIcon name="play" size={15} />}>Watch now</Button>
              <Button variant="secondary">Add to list</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Category filter + grid */}
      <Section style={{ paddingTop: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 34,
            borderTop: "1px solid var(--ra-cream-08)",
            paddingTop: 32,
          }}
        >
          {resourceCategories.map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-pill)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  background: on ? "var(--ra-copper)" : "transparent",
                  color: on ? "var(--ra-base)" : "var(--ra-cream-55)",
                  border: on ? "1px solid transparent" : "1px solid var(--ra-cream-12)",
                  transition: "all var(--dur-fast)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
        <div className="vid-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {shown.map((v, i) => (
            <VideoCard key={i} v={v} />
          ))}
        </div>
      </Section>

      {/* Downloadable playbooks */}
      <div style={{ background: "var(--ra-ink)", borderTop: "1px solid var(--ra-cream-08)" }}>
        <Section>
          <SectionHead kicker="Take it with you" title={<>Free <AccentTitle>playbooks</AccentTitle> &amp; templates</>} align="left" />
          <div className="res-playbooks" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {playbooks.map((p) => (
              <Card key={p.title} style={{ display: "flex", flexDirection: "column", gap: 14, cursor: "pointer" }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--ra-copper-08)",
                    border: "1px solid var(--ra-copper-25)",
                    color: "var(--ra-copper)",
                  }}
                >
                  <LineIcon name={p.icon} size={19} />
                </span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--ra-cream)" }}>{p.title}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ra-cream-40)", marginTop: 6 }}>
                    {p.meta}
                  </div>
                </div>
                <span
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12.5,
                    color: "var(--ra-copper)",
                  }}
                >
                  Download <LineIcon name="arrow" size={13} />
                </span>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      {/* Newsletter CTA */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--ra-cream-08)" }}>
        <Glow style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} size={520} />
        <Section style={{ position: "relative", textAlign: "center" }} maxWidth={640}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              letterSpacing: "-0.02em",
              textWrap: "balance",
              color: "var(--ra-cream)",
            }}
          >
            New guides, <AccentTitle>every week</AccentTitle>
          </h2>
          <p style={{ margin: "16px auto 0", maxWidth: 460, color: "var(--ra-cream-55)", fontSize: 16, lineHeight: 1.6 }}>
            Optional, drop your email to get new videos and playbooks. Everything here stays free without it.
          </p>
          <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "26px auto 0", flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 min-w-[200px] rounded-[var(--radius-button)] border border-bg-subtle bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
            />
            <Button size="lg">Subscribe</Button>
          </div>
        </Section>
      </div>
    </>
  );
}
