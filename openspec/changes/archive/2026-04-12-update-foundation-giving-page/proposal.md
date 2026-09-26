## Why

The `/about/foundation-giving` page currently mixes four heavily tinted fund-type cards, four separate charts, and multiple promotional blocks, which makes the story harder to scan and feels visually loud. We want a calmer, minimal presentation with a predictable flow: hero, tabular data, a focused chart, totals, and a **Definition of terms** section that explains each fund using the club-approved Rotary Foundation language below—so members and visitors can compare years and understand fund rules without visual fatigue.

## What Changes

- Restructure the page into a clear vertical order: **PageHero**, **data table** (Rotary Year rows and per-fund columns), **chart** (visual summary of the same or derived data), **totals** (aggregate amounts per fund type), then **Definition of terms** (explanatory content for the four fund types; section `h2` title **Definition of terms**).
- **Per-year Total in the table**: Each Rotary Year row SHALL include the **`total`** value from `FoundationGiving` (CMS per-year aggregate) as its own column on wide layouts and as a labeled row in the mobile card layout—alongside the four fund columns—so the giving table is complete and matches the content model. (This is separate from the later **Totals (all years)** section, which sums across years per fund type.)
- **Responsive table presentation**: On **small viewports** (mobile), use a **different view** than the wide grid table so users are not forced into horizontal scrolling. From **`md` breakpoint upward**, keep the **full columnar table** (headers + aligned numeric columns) for quick scanning and comparison across years.
- **Mobile layout reference (target look)** — Below `md`, each Rotary Year SHALL appear as a **vertically stacked block** with this structure (minimal chrome: light/white surfaces, dark text, no heavy colored panels):
  - **Section title**: Bold line reading **`RY {startYear}-{endYear}`** (e.g. `RY 2021-2022`).
  - **Four fund rows**, each a single line: **fund label** left (regular weight, muted gray) and **currency amount** right (regular weight, dark/black), amounts **right-aligned**.
  - Fund labels (exact copy for mobile): **Annual Fund**, **PolioPlus Fund**, **Other Fund**, **Endowment Fund** (mapping to `annualFund`, `polioPlus`, `otherFund`, `endowment`).
  - **Separator**: A thin horizontal rule between the four fund rows and the **Total** row (within each year).
  - **Total row**: **Total** label and amount both **bold**, same left/right alignment pattern as fund rows.
  - **One mobile card, stripe per year**: On small viewports, the giving table SHALL appear as **a single bordered container** (“one big card”) listing **all** Rotary Years—**not** separate cards per year and **not** large gaps between years. **Stripe colors apply per Rotary Year section**: year 1 (first RY block) **white**, year 2 **`bg-slate-50/80`**, year 3 **white**, year 4 **`bg-slate-50/80`**, repeating—so the **entire** RY header, four fund lines, and **Total** for that year share **one** background. Optional **thin dividers** between year sections inside the card are allowed; fund lines within a year do **not** alternate colors independently.
  - **Desktop striping** (unchanged): Each **tbody** row (one Rotary Year) alternates **white** / **slate-50/80** by row index, matching the same year order as mobile.
- **PageHero stays the same** as the rest of the site: keep the standard brand hero treatment—the default gradient, pattern, title/description pattern, and stat chips (same visual language as other About pages using `PageHero`). Do **not** introduce a separate “minimal” hero variant or change the shared `PageHero` API for this page; any calmer styling applies to the **body** below the hero (table, chart, totals, Definition of terms), not the hero itself.
- Replace the large four-card “Fund Types Overview” grid and the separate gold SHARE / generic CTA blocks with the **Definition of terms** section (content follows the canonical bullets below; SHARE splits and goal rules are spelled out per fund).
- **Definition of terms (always visible)**: The block SHALL **always show the full description** for each fund type using the **terms and bullet structure** in **Definition of terms (canonical copy)** below. Minor edits for punctuation, line breaks, or house style are allowed; meaning and required points SHALL remain. **Accordion, `<details>`/`<summary>`, or any collapse-by-default pattern is not allowed**—users must see all explanatory text without expanding controls. Use clear **headings**: section **`h2` “Definition of terms”**, per-fund **`h3`** for **Annual Fund**, **Polio Plus Fund**, **Other Fund**, and **Endowment Fund**.
- **Definition of terms rendering and readability**: Intro and per-fund body copy SHALL be authored as **Markdown** (stored in `app/data/foundation-giving-definition-of-terms.ts` or the successor data module) and rendered with **`react-markdown`** and **`remark-gfm`** (same stack as other markdown surfaces in the app, e.g. service projects) via a shared **`MarkdownProse`** wrapper so lists, nested lists, and **bold** parse correctly. Body text SHALL use **primary readable foreground** (e.g. Tailwind Typography **`prose-slate`** with **`text-slate-800`** for paragraphs and list items, **`text-slate-900`** for strong)—**not** muted body gray (e.g. `gray.600`) as the default color for definition copy.
- **Chart colors (neutral)**: The foundation-giving **chart** (grouped bars per fund type) SHALL use **neutral** series fills only—distinct **Chakra `gray` (or equivalent neutral) scale** shades so each fund series is distinguishable in the legend **without** saturated hues (no primary blue/green/red bar fills for series).
- **Reduce color usage** in the main content: neutral table, chart, and foundation-fund-types surfaces; subtle borders; avoid strong per-fund **panel** tints (full-width red/green/purple blocks).
- Keep existing **loader** behavior (`fetchFoundationGiving` with empty fallback) and **metadata** (title, description, OG, canonical) unless copy tweaks are required for alignment with the new layout.

### Definition of terms (canonical copy)

The **Definition of terms** section SHALL cover at least the following points per fund (implementation uses Markdown with nested lists where helpful; wording MAY be adjusted for grammar without changing meaning):

**ANNUAL FUND**

- Designations include SHARE, World Fund, Areas of Focus, and Disaster Response
- SHARE contributions
  - 47.5% to District Designated Fund
  - 47.5% to World Fund
- Counts toward Club and District Annual Fund Goal
- Counts toward Annual Fund Per Capita
- PHF recognition available
- Will not match the SHARE Reports

**POLIO PLUS FUND**

- PolioPlus
- PolioPlus Partners
- Ride to End Polio
- Does not count towards Club or District Annual Fund Goal
- Does not count towards Annual Fund Per Capita

**OTHER FUND**

- Supports program selected by donor
  - Matching Grants
  - Global Grants
  - Other Approved Programs
- Does not count towards Club or District Annual Fund Goal
- Does not count towards Annual Fund Per Capita

**ENDOWMENT FUND**

- Contributions are invested in perpetuity
- Spendable Earnings are used on programs
- Donor can designate spendable earnings for
  - Areas of Focus
  - Rotary Peace Centers
  - SHARE
  - World Fund
- Benefactor recognition available
- PHF recognition is not available
- Does not count towards Club or District Annual Fund Goal

## Capabilities

### New Capabilities

- (none—all behavior extends the existing foundation-giving capability)

### Modified Capabilities

- `about-foundation-giving`: Requirements for page layout, section order, responsive table (**one mobile card** with per-year stripes, full table on `md+`), chart (**neutral** bar fills for fund series) + totals + **Definition of terms** (canonical Annual / Polio Plus / Other / Endowment bullets per proposal, Markdown-rendered via `react-markdown` + `remark-gfm` with readable prose, not muted gray body copy, always-visible copy, **no** accordion), and minimal visual styling in the main content; clarifies how the page explains funds and impact compared to the previous multi-card / multi-chart layout.

## Impact

- **Primary**: `app/routes/about.foundation-giving.tsx` (layout, components, styling), `app/data/foundation-giving-definition-of-terms.ts` (Markdown source for Definition of terms), `app/components/ui/MarkdownProse.tsx` (shared markdown + readable prose styling).
- **PageHero / `app/components/ui/PageHero.tsx`**: No behavioral or API change required for this change beyond using the existing default hero (same as other pages); avoid hero-specific refactors unless a separate initiative covers them.
- **Possible**: Small reusable UI in `app/components/ui/` if the table or fund-types pattern should be shared (optional, only if it avoids duplication).
- **Data**: No Contentful schema change; same `fetchFoundationGiving` / `FoundationGiving` types.
- **Dependencies**: Existing Chakra UI, `@chakra-ui/charts` / Recharts, **`react-markdown`** + **`remark-gfm`** + **Tailwind Typography** (`@tailwindcss/typography`, `prose` classes) for Definition of terms; no accordion package required for the Definition of terms block (static sections only).
