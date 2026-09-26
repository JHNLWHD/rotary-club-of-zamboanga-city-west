## 1. Layout and content removal

- [x] 1.1 Remove the four tinted fund-type card grid, gold SHARE highlight block, and closing “Choose Your Impact” CTA from `about.foundation-giving.tsx` (preserve any copy that must move into Definition of terms or hero intro).
- [x] 1.2 Keep `PageHero` usage aligned with other About pages: default brand gradient, pattern, title, description, and stat chips (no minimal hero variant).

## 2. Table and data presentation

- [x] 2.1 Add a responsive data table listing each Rotary Year row with columns for Annual Fund, Polio Plus, Other Fund, Endowment, and **Total** (`FoundationGiving.total`) using loader data; format currency consistently.
- [x] 2.4 Ensure **`total`** appears in both the `md+` table and the mobile card layout for each year.
- [x] 2.2 Implement an empty state when `foundationGiving` is empty (friendly message, no runtime errors).
- [x] 2.3 Below the `md` breakpoint: **one** bordered card containing **all** years (no per-year cards / no large gaps); **stripe per Rotary Year section** (whole block white or slate-50@80%, same order as desktop); bold **`RY`**, fund labels, thin rule, bold Total; **`md+` tbody** unchanged (stripe per year row).

## 3. Chart and totals

- [x] 3.1 Replace four separate per-fund charts with a single summary chart (multi-series or grouped/stacked) using the same data as the table, with **neutral** Chakra series fills (`gray.700`–`gray.400`) and legend.
- [x] 3.2 Add an aggregate totals section (sums per fund type across all years) styled with neutral surfaces and subtle borders.

## 4. Definition of terms and accessibility

- [x] 4.1 Implement a **Definition of terms** section (`h2`) with subsections for Annual Fund, Polio Plus Fund, Other Fund, and Endowment Fund; source copy as **Markdown** in `app/data/foundation-giving-definition-of-terms.ts`, render with **`react-markdown`** + **`remark-gfm`** and **`MarkdownProse`** (readable slate foreground, not gray.600 body); **all** descriptions **always visible** (no accordion / no `<details>`).
- [x] 4.2 Use semantic headings (`h2`/`h3`) and logical reading order; **no** expand/collapse requirement for fund-type copy.

## 5. Visual pass and verification

- [x] 5.1 Apply minimal styling across the page: reduce saturated backgrounds and align chart/table/totals/Definition of terms with Chakra tokens (gray scales, optional single accent).
- [x] 5.2 Manually verify loader success and empty-array paths, metadata unchanged unless copy updates were intentional, and no console errors.
