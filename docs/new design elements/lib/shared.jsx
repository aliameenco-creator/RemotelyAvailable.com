/* Remotely Available — shared chrome (Nav, Footer, surface + layout helpers).
 * Exposes components on window for every standalone page to consume.
 * Built on the bound design system (window.RemotelyAvailableDesignSystem_66c958).
 */
const DS = window.RemotelyAvailableDesignSystem_66c958;
const { Button, Badge, Eyebrow } = DS;

/* ---------- tiny line-icon set (stroke = currentColor) ---------- */
function Icon({ name, size = 18, style }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
    strokeLinejoin: 'round', style,
  };
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
    spark: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
    bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
    globe: <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" /></g>,
    chat: <path d="M21 12a8 8 0 01-11.3 7.3L3 21l1.7-6.7A8 8 0 1121 12z" />,
    mic: <g><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></g>,
    check: <path d="M20 6L9 17l-5-5" />,
    cart: <g><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.5 13h11l2-9H6" /></g>,
    layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
    clock: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    doc: <g><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /></g>,
    video: <g><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></g>,
    users: <g><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0112 0M16 5.5a3.2 3.2 0 010 5M21 20a6 6 0 00-4-5.6" /></g>,
    grid: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
    settings: <g><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19 5l-2 2M7 17l-2 2M19 19l-2-2M7 7L5 5" /></g>,
    search: <g><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></g>,
    plus: <path d="M12 5v14M5 12h14" />,
    external: <g><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" /></g>,
    x: <path d="M18 6L6 18M6 6l12 12" />,
    linkedin: <g><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4" /></g>,
    quote: <path d="M7 7h4v4c0 3-2 5-4 5M15 7h4v4c0 3-2 5-4 5" />,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

/* ---------- brand wordmark ---------- */
function Wordmark({ size = 19 }) {
  return (
    <a href="Landing Page.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--ra-copper)', boxShadow: '0 0 12px var(--ra-copper)', flex: 'none' }} />
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: size, color: 'var(--ra-cream)', letterSpacing: '-0.01em' }}>
        Remotely Available
        <sup style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ra-copper)', marginLeft: 3, top: '-0.7em' }}>.com</sup>
      </span>
    </a>
  );
}

/* ---------- top navigation ---------- */
const NAV_LINKS = [
  { label: 'Home', href: 'Landing Page.html' },
  { label: 'Services', href: 'Services.html' },
  { label: 'Case Studies', href: 'Case Study.html' },
  { label: 'Resources', href: 'Resources.html' },
];

function Nav({ active, extra }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: scrolled ? '1px solid var(--ra-cream-08)' : '1px solid transparent',
      background: scrolled ? 'rgba(20,20,20,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Wordmark />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          {NAV_LINKS.map((l) => {
            const on = l.label === active;
            return (
              <a key={l.label} href={l.href} style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
                color: on ? 'var(--ra-cream)' : 'var(--ra-cream-55)',
                padding: '8px 14px', borderRadius: 'var(--radius-pill)',
                background: on ? 'var(--ra-cream-08)' : 'transparent',
                transition: 'color var(--dur-fast), background var(--dur-fast)',
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = 'var(--ra-cream)'; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = 'var(--ra-cream-55)'; }}
              >{l.label}</a>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 }}>
          {extra}
          <Button size="sm" trailing={<Icon name="arrow" size={15} />}>Contact Us</Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- section scaffold ---------- */
function Section({ children, style, maxWidth = 1200, pad = 'var(--space-9)', id }) {
  return (
    <section id={id} style={{ padding: `${pad} 32px`, ...style }}>
      <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

/* Centered section header: eyebrow badge + serif title + lead */
function SectionHead({ kicker, title, lead, align = 'center', maxWidth = 620 }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? maxWidth : 'none', margin: align === 'center' ? '0 auto' : 0 }}>
      {kicker ? (
        <span style={{ display: 'inline-block', marginBottom: 18 }}>
          <Badge tone="lavender" variant="soft">{kicker}</Badge>
        </span>
      ) : null}
      <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--ls-tight)', textWrap: 'balance' }}>{title}</h2>
      {lead ? <p style={{ marginTop: 16, color: 'var(--ra-cream-55)', fontSize: 17, lineHeight: 1.6, textWrap: 'pretty' }}>{lead}</p> : null}
    </div>
  );
}

/* Title where a span is set in italic lavender serif — brand signature */
function AccentTitle({ children, style }) {
  return <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ra-lavender)', ...style }}>{children}</span>;
}

/* ---------- footer ---------- */
function Footer() {
  const cols = [
    { head: 'Services', items: ['AI Automations', 'AI Websites', 'AI Voice Agents', 'AI Chatbots', 'AI Consulting', 'AI Content Systems', 'Shopify Automation'] },
    { head: 'Company', items: ['About', 'Services', 'Case Studies', 'Resources', 'Contact'] },
    { head: 'Resources', items: ['Video Guides', 'Playbooks', 'Blog', 'Admin Login'] },
  ];
  const hrefFor = (item) => {
    const m = { 'Services': 'Services.html', 'Case Studies': 'Case Study.html', 'Resources': 'Resources.html',
      'Video Guides': 'Resources.html', 'Admin Login': 'Admin Dashboard.html', 'About': 'Landing Page.html', 'Contact': 'Landing Page.html' };
    return m[item] || '#';
  };
  return (
    <footer style={{ borderTop: '1px solid var(--ra-cream-08)', background: 'var(--ra-ink)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 40px', display: 'grid', gridTemplateColumns: '1.6fr repeat(3, 1fr)', gap: 40 }}>
        <div style={{ maxWidth: 320 }}>
          <Wordmark />
          <p style={{ marginTop: 18, color: 'var(--ra-cream-55)', fontSize: 14, lineHeight: 1.7 }}>
            We build AI systems that save businesses 40+ hours a week. Automations, voice agents, chatbots, and intelligent websites — engineered for results.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            {['x', 'linkedin'].map((n) => (
              <a key={n} href="#" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid var(--ra-cream-12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ra-cream-55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ra-copper)'; e.currentTarget.style.borderColor = 'var(--ra-copper)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ra-cream-55)'; e.currentTarget.style.borderColor = 'var(--ra-cream-12)'; }}>
                <Icon name={n} size={16} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.head}>
            <div className="ra-eyebrow" style={{ marginBottom: 18 }}>{c.head}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {c.items.map((it) => (
                <li key={it}>
                  <a href={hrefFor(it)} style={{ color: 'var(--ra-cream-55)', fontSize: 14, transition: 'color var(--dur-fast)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ra-cream)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ra-cream-55)'}>{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--ra-cream-08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '22px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ra-cream-40)' }}>© 2026 RemotelyAvailable. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ fontSize: 13, color: 'var(--ra-cream-40)' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 13, color: 'var(--ra-cream-40)' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- decorative copper glow blob ---------- */
function Glow({ color = 'copper', size = 640, style }) {
  return <div className={color === 'lavender' ? 'ra-glow-lavender' : 'ra-glow-copper'} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(8px)', ...style }} />;
}

Object.assign(window, { Icon, Wordmark, Nav, Section, SectionHead, AccentTitle, Footer, Glow, NAV_LINKS });
