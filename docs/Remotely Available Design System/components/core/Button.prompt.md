Pill-shaped action button — use for any primary or secondary call to action.

```jsx
<Button variant="primary" size="md">Book a teardown</Button>
<Button variant="outline" trailing={<span>→</span>}>See results</Button>
```

Variants: `primary` (copper, default), `secondary` (lavender), `outline` (hairline → copper border on hover), `ghost` (transparent). Sizes: `sm` / `md` / `lg`. Always pill radius. Hover lightens the fill; press shrinks to 0.97 — both signature interaction cues. Use `leading` / `trailing` for icons.
