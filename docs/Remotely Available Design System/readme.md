# Remotely Available — Design System

**Remotely Available** is a results-based agency. The work is measured in outcomes — pipeline, hours reclaimed, revenue — not in retainers or deliverable counts. AI is part of the toolkit and used where it actually moves the number, but it is *not* the headline. The brand voice is confident, plain-spoken, and a little wry: a senior operator in the room with you, not a vendor pitching automation.

This repository is the brand's design system: tokens, fonts, reusable React components, foundation specimen cards, and (in progress) product UI kits.

---

## Sources

- `uploads/color scheme and typo.svg` — the supplied brand spec. The complete source of truth for color and type used here: near-black base, copper primary, lavender secondary, cream text; Georgia (serif titles + italic accents), Plus Jakarta Sans (body), Space Mono (labels).
- `uploads/Georgia-Font.zip`, `uploads/Plus_Jakarta_Sans.zip`, `uploads/Space_Mono.zip` — supplied font binaries. **These were not accessible in the project filesystem**, so webfonts are currently loaded from Google Fonts (Plus Jakarta Sans, Space Mono) and Georgia resolves as a system serif. See *Caveats*.

No codebase or Figma file was provided. There is no existing product UI to recreate; the system is built from the brand spec.

---

## Content fundamentals

How Remotely Available writes.

- **Voice:** confident operator, second-person. Talk to the reader as "you"; the agency is "we." Never corporate-passive ("solutions are leveraged"). Say what you'll do and what it produced.
- **Outcome-first:** lead with the number or the result, then the method. "+318% qualified pipeline — here's how" beats "Our process for growth."
- **AI is a tool, not the pitch.** Don't headline "AI automation." Mention AI specifically, where it earned its place ("we use AI to triage inbound so your team only sees qualified leads"). Avoid buzzword stacking.
- **Casing:** sentence case for headings and body. **UPPERCASE only for mono eyebrow/kicker labels** (e.g. `// SERVICES`, `01 — DISCOVERY`) and badges. Never title-case full headlines.
- **Serif italics carry emphasis.** The signature move: a Georgia italic word in lavender inside an otherwise plain serif title — "Results, not *retainers*." Use sparingly, one accent per title.
- **The `//` motif.** Mono labels often lead with `//` or a zero-padded step number (`01 —`). It reads as technical, deliberate, a little terminal-flavored.
- **No emoji.** The brand does not use emoji in product or marketing surfaces.
- **Tone examples:** "The room where work *gets done*." · "We embed, we ship, we measure." · "Outcomes, not activity." · "+42 hours reclaimed every week."

---

## Visual foundations

- **Palette:** warm-technical dark. Near-black base (`#1a1a1a`) with a subtle vertical gradient (`#272727 → #1f1f1f`). **Copper** (`#e38c35`) is the primary accent — CTAs, eyebrows, key emphasis. **Lavender** (`#6e77cb`) is secondary, reserved mostly for serif italic accents and occasional highlights. **Cream** (`#f5f1e8`) is the text color; hierarchy is built from cream at opacities (70 / 55 / 40) rather than separate grays.
- **Backgrounds:** the signature surface is the near-black vertical gradient overlaid with a **faint copper grid** (40px, ~4.5% opacity) and, where focus is wanted, a soft **copper radial glow**. No photography is specified in the brand spec; surfaces are textural, not image-led. No bluish-purple gradients, no noise/grain.
- **Type:** Georgia for display titles and italic accents (letter-spacing −0.02em on large sizes); Plus Jakarta Sans for body and UI (400–800); Space Mono for eyebrows, labels, and technical/data. Big serif numbers are how metrics are shown.
- **Spacing:** 4px base scale (4/8/12/16/24/32/48/64/96/128). Generous vertical rhythm; sections breathe.
- **Corner radii:** default card radius is **14px** (`--radius-md`). Buttons and badges are **fully pill** (999px). Wells/inputs use 8px.
- **Cards:** raised surface (`#252525`) with a 1px hairline border (`cream @ 12%`) and a soft drop shadow. A **glow** variant swaps the border to a copper ring with a copper glow for featured/highlighted cards. An **outline** variant is hairline-only for lightweight grouping.
- **Shadows / elevation:** soft, low, dark drop shadows (sm/md/lg). Accent elevation comes from **copper and lavender glows** (ring + colored blur), not bright shadows.
- **Borders:** hairlines are `cream @ 12%`; stronger dividers `cream @ 25%`; accent borders use `copper @ 25%`.
- **Hover states:** buttons *lighten* their fill (copper → bright copper); ghost/outline buttons gain a faint cream wash and, for outline, a copper border. Interactive cards lift 3px and deepen their shadow.
- **Press states:** buttons **shrink to scale 0.97** and darken the fill (copper → deep copper). This shrink-on-press is a signature cue.
- **Motion:** gentle ease-out (`cubic-bezier(0.22, 1, 0.36, 1)`), fast (120ms) for interaction feedback, base (200ms) for hovers/lifts. No bounces, no infinite decorative loops. Respect `prefers-reduced-motion`.
- **Transparency & blur:** transparency is used for text-hierarchy tints and faint surface washes. No heavy glassmorphism / backdrop-blur in the spec.
- **Imagery vibe:** none supplied; if added, keep it warm and low-key to sit on the dark base. Default to typographic + textural compositions over photos.

---

## Iconography

No icon set, icon font, or SVG sprite was supplied (no codebase/Figma). Recommendation, to be confirmed:

- **Use [Lucide](https://lucide.dev) from CDN** as the icon system — thin (≈1.75px) stroked, rounded line icons that pair well with the technical-but-warm voice and Space Mono labels. Link `https://unpkg.com/lucide@latest` or use the per-icon SVGs.
- Icons are **monochrome**, inheriting `currentColor` — cream by default, copper when active/emphasized. Match stroke weight; don't mix filled and stroked styles.
- **Unicode arrows** (`→`) are acceptable inline in buttons/links and are used in component examples.
- **No emoji** as icons anywhere.

This is a **substitution** pending the brand's real icon direction — flag in *Caveats*.

---

## Index / manifest

**Root**
- `styles.css` — global entry point; `@import`s every token + base file. Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skills wrapper.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (radii/shadows/motion), `base.css` (element resets + brand surface utilities: `.ra-surface-grid`, `.ra-glow-copper`, `.ra-eyebrow`).

**`components/`** — reusable React primitives (namespace `RemotelyAvailableDesignSystem_66c958`):
- `core/` — `Button`, `Badge`, `Card`, `Eyebrow`, `Stat`
- `forms/` — `Input`

**`guidelines/`** — foundation specimen cards (Design System tab): colors (primary, secondary, neutrals, text, status), type (serif, sans, mono, scale), spacing (scale, radii, elevation), brand (signature surface, wordmark).

**UI kits** — *in progress* (marketing site).

---

## Caveats

- **Fonts are not self-hosted.** The uploaded font zips weren't reachable; Plus Jakarta Sans + Space Mono load from Google Fonts and Georgia is the system serif. Re-upload the binaries to self-host.
- **Iconography is a recommendation (Lucide), not confirmed** — no icon assets were supplied.
- **No logo file** — the wordmark is a typographic lockup. Provide a logo to replace it.
- **UI kit pending.**
