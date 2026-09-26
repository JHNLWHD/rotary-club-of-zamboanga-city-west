## Context

The route `app/routes/about.foundation-giving.tsx` loads yearly foundation giving rows from Contentful, renders a gradient `PageHero` with stat chips, four color-coded fund-type explainer cards, up to four per-fund bar charts, four color-coded total tiles, a gold “Understanding SHARE” panel, and a closing CTA. The user wants a **minimal** look and a **fixed information sequence**: hero → table → chart → totals → **Definition of terms** (always-visible copy, no accordion).

## Goals / Non-Goals

**Goals:**

- Implement the section order: PageHero, table, chart, totals, Definition of terms.
- Present the same underlying numeric data (per Rotary Year: `annualFund`, `polioPlus`, `otherFund`, `endowment`) in a scannable table and a single primary chart that summarizes trends without four separate chart panels.
- Show **aggregate totals** across all loaded years per fund type in a compact, low-chrome block.
- Present **fund-type explanations and eligibility rules** in a **Definition of terms** section with four **always-visible** subsections (Annual, Polio Plus, Other, Endowment)—full body copy per club-approved bullets in the document flow, not behind accordion or disclosure.
- Apply a **restrained palette**: white/gray surfaces, `gray` borders; **foundation-giving chart bars use neutral (gray-scale) fills** (see chart decision). Avoid saturated **section** backgrounds (e.g. full red/green/purple panels).

**Non-Goals:**

- Changing Contentful content models, new fields, or API shapes.
- Backend or loader contract changes beyond presentational use of existing loader data.
- Changing `PageHero`’s API or default brand appearance for this page (hero remains the same standard gradient + pattern + stats pattern as other About pages).

## Decisions

1. **Table as source of truth for numbers**  
   - **Choice**: Use the same underlying row data everywhere, including the **`total`** field on each `FoundationGiving` record. On **`md` and wider**, render a semantic **wide table** (Rotary Year column + one column per fund + a **Total** column) with aligned currency.  
   - **Mobile (`< md`) — reference layout**: **One outer card** (single border + radius) containing **all** years—no per-year floating cards or large gaps between years. Each **Rotary Year** is a **vertical section** inside that card with **one shared stripe color** for the whole section (**bold `RY yyyy-yyyy`**, four fund lines, **Total**): alternate **white** / **slate-50/80** by **year index** (same order as desktop tbody). **Thin rule** above **Total**; **bold** Total; optional hairline **between year sections**; **minimal** chrome.  
   - **Rationale**: A columnar table is best on wide screens; narrow screens match the approved mobile mock: scannable, no horizontal scroll, clear hierarchy.  
   - **Alternatives**: Only `overflow-x: auto` on small screens (rejected as sole solution—proposal calls for a different mobile view).

2. **Single chart instead of four**  
   - **Choice**: One chart (e.g. grouped or stacked bars) with **neutral** bar fills: use the **Chakra `gray` palette** with **four distinct shades** (e.g. `gray.700` → `gray.400`) for the four fund series, plus a clear legend. **Do not** use saturated hue fills (blue/green/red) for series bars.  
   - **Rationale**: Matches “Chart” (singular), stays minimal and consistent with the table, and keeps series distinguishable.  
   - **Alternatives**: Keep four small multiples in a 2×2 (rejected for minimalism); sparklines only (rejected—less familiar for this audience); saturated brand-color bars (rejected—proposal requires neutral series colors).

3. **Definition of terms (no accordion)**  
   - **Choice**: Render four **always-visible** subsections (`h2` **Definition of terms**, `h3` per fund) using **Markdown** source (`app/data/foundation-giving-definition-of-terms.ts`) and **`react-markdown` + `remark-gfm` + `MarkdownProse`** (Tailwind Typography `prose-slate`, **slate-800** body, **slate-900** strong)—not Chakra `gray.600` as default body color. **Do not** use accordion, `<details>`, or collapse-by-default UI—descriptions stay in the document flow so nothing is hidden behind a toggle.  
   - **Rationale**: Proposal requires full fund-type text visible without interaction; headings provide scanability without collapsing content; Markdown preserves nested lists and emphasis with readable contrast.  
   - **Alternatives**: Accordion / disclosure (rejected—explicitly out of scope for this section).

4. **PageHero unchanged**  
   - **Choice**: Keep `PageHero` exactly in line with the existing site pattern—default brand gradient, background pattern, title and description, and the same style of stat chips as before this change (e.g. fund-impact highlights).  
   - **Rationale**: Visual restraint targets the scrollable content (table, chart, totals, Definition of terms), not the shared hero component or its look-and-feel.

5. **Removing legacy sections**  
   - **Choice**: Remove the four large tinted fund cards, the separate SHARE highlight card, and the generic “Choose Your Impact” CTA as standalone blocks; merge any must-keep copy into the **Definition of terms** section or a single short intro line under the hero.  
   - **Rationale**: Avoid duplication with the fund-types block and meet the new section list.

## Risks / Trade-offs

- [Risk] **Content density in fund types** — Long copy may feel heavy. → **Mitigation**: Short lead sentence per fund; bullet lists; typography and spacing; still no accordion per proposal.
- [Risk] **Chart readability with four series** — Small viewports may crowd labels. → **Mitigation**: Responsive height, angled X labels if needed, or toggle series (only if scope allows; prefer responsive layout first).
- [Risk] **Empty data** — Loader already returns `[]`. → **Mitigation**: Keep friendly empty state for table/chart/totals; Definition of terms still renders.

## Migration Plan

- Ship as a standard frontend deploy; no database migration. Rollback is reverting the route file (and any new small components) via version control.

## Open Questions

- Whether Rotary International trademark or disclaimer lines are required next to fund names (confirm with club content owner if needed).
