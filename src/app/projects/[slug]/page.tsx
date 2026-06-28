import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHead, AccentTitle, Glow } from "@/components/landing/primitives";
import { LineIcon } from "@/components/landing/LineIcon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Stat } from "@/components/ui/Stat";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.cardTitle} | Case Study`;
  return {
    title,
    description: cs.prose[0]?.paragraphs[0] ?? cs.cardTitle,
    openGraph: {
      title,
      description: cs.prose[0]?.paragraphs[0] ?? cs.cardTitle,
      url: `${siteConfig.url}/projects/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const related = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.cardTitle,
    about: cs.industry,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <Glow style={{ top: -260, left: "60%" }} size={620} />
        <Glow color="lavender" style={{ top: 120, left: -160 }} size={360} />
        <Section style={{ position: "relative", paddingTop: 128 }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              color: "var(--ra-cream-40)",
              marginBottom: 28,
            }}
          >
            <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
              <LineIcon name="arrow" size={14} />
            </span>{" "}
            All projects
          </Link>
          <div style={{ marginBottom: 20 }}>
            <Pill tone="copper" dot>
              Case Study
            </Pill>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.3rem, 4.8vw, 3.9rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              maxWidth: 880,
              textWrap: "balance",
              color: "var(--ra-cream)",
            }}
          >
            {cs.titleLead}
            <AccentTitle>{cs.titleAccent}</AccentTitle>
            {cs.titleTrail}
          </h1>
          <div className="cs-split" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { k: "Client", v: cs.client },
                { k: "Industry", v: cs.industry },
                { k: "Services", v: cs.services },
                { k: "Timeline", v: cs.timeline },
              ].map((m) => (
                <div key={m.k}>
                  <div className="ra-eyebrow" style={{ marginBottom: 6 }}>
                    {m.k}
                  </div>
                  <div style={{ fontSize: 15, color: "var(--ra-cream)", fontWeight: 500 }}>
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
            <Card glow style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {cs.heroStats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} delta={s.delta} deltaTone="copper" />
              ))}
            </Card>
          </div>
        </Section>
      </div>

      {/* Prose */}
      <Section style={{ paddingTop: 48 }}>
        {cs.prose.map((block) => (
          <div
            key={block.kicker}
            className="cs-split"
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: 40,
              padding: "52px 0",
              borderTop: "1px solid var(--ra-cream-08)",
            }}
          >
            <div>
              <span className="ra-eyebrow">{block.kicker}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  marginTop: 14,
                  color: "var(--ra-cream)",
                }}
              >
                {block.title}
              </h2>
            </div>
            <div
              style={{
                maxWidth: 640,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                color: "var(--ra-cream-70)",
                fontSize: 16.5,
                lineHeight: 1.75,
              }}
            >
              {block.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* The Build */}
      <Section>
        <SectionHead kicker="The Build" title={<>What we <AccentTitle>shipped</AccentTitle></>} align="left" />
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }} className="cs-built">
          {cs.built.map((b) => (
            <Card key={b.title} style={{ display: "flex", gap: 16 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--ra-copper-08)",
                  border: "1px solid var(--ra-copper-25)",
                  color: "var(--ra-copper)",
                }}
              >
                <LineIcon name={b.icon} size={19} />
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--ra-cream)" }}>
                  {b.title}
                </h3>
                <p style={{ marginTop: 6, color: "var(--ra-cream-55)", fontSize: 14.5, lineHeight: 1.6 }}>
                  {b.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pull quote */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--ra-cream-08)",
          borderBottom: "1px solid var(--ra-cream-08)",
          background: "var(--ra-ink)",
        }}
      >
        <Section style={{ position: "relative", textAlign: "center" }} maxWidth={820}>
          <span style={{ color: "var(--ra-copper)", display: "inline-flex", marginBottom: 20 }}>
            <LineIcon name="quote" size={30} />
          </span>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              lineHeight: 1.4,
              color: "var(--ra-cream)",
              textWrap: "balance",
            }}
          >
            {cs.quote.before}
            <em>{cs.quote.emphasis}</em>
            {cs.quote.after}
          </p>
          <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "var(--ra-lavender)",
                color: "var(--ra-cream)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {cs.quote.initials}
            </span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ra-cream)" }}>
                {cs.quote.author}
              </div>
              <div style={{ fontSize: 13, color: "var(--ra-cream-40)" }}>{cs.quote.role}</div>
            </div>
          </div>
        </Section>
      </div>

      {/* Results */}
      <Section>
        <SectionHead
          kicker="The Results"
          title={<>Numbers that <AccentTitle>moved</AccentTitle></>}
          lead="Tracked over the first two quarters post-launch against the client's own baseline."
        />
        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="cs-results">
          {cs.results.map((r) => (
            <Card key={r.label} style={{ textAlign: "center" }}>
              <Stat value={r.value} label={r.label} align="center" />
            </Card>
          ))}
        </div>
      </Section>

      {/* Related */}
      <div style={{ background: "var(--ra-ink)", borderTop: "1px solid var(--ra-cream-08)" }}>
        <Section>
          <SectionHead kicker="More Work" title="Related case studies" align="left" />
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="cs-related">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="block h-full">
                <Card style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
                  <div>
                    <Pill tone={r.tagTone}>{r.tag}</Pill>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.3, color: "var(--ra-cream)" }}>
                    {r.cardTitle}
                  </h3>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 8,
                      borderTop: "1px solid var(--ra-cream-08)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ra-copper)" }}>
                      {r.cardStat}
                    </span>
                    <span style={{ color: "var(--ra-cream-40)" }}>
                      <LineIcon name="arrow" size={16} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* CTA band */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--ra-cream-08)" }}>
        <Glow style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} size={560} />
        <Section style={{ position: "relative", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
              maxWidth: 600,
              margin: "0 auto",
              textWrap: "balance",
              color: "var(--ra-cream)",
            }}
          >
            Want results like <AccentTitle>{cs.client.split(" ")[0]}&apos;s?</AccentTitle>
          </h2>
          <div style={{ marginTop: 28 }}>
            <Button href="/contact" size="lg" icon={<LineIcon name="arrow" size={16} />}>
              Book your discovery call
            </Button>
          </div>
        </Section>
      </div>
    </>
  );
}
