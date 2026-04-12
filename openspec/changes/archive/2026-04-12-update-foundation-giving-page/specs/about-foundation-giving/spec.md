## ADDED Requirements

### Requirement: Page section order and composition

The page SHALL present content in the following order: (1) page hero, (2) tabular foundation giving data by Rotary Year, (3) a chart summarizing foundation giving, (4) aggregate totals per fund type, (5) **Definition of terms** explanatory content for all four fund types.

#### Scenario: Visitor scrolls the page

- **WHEN** a user views `/about/foundation-giving`
- **THEN** the sections SHALL appear in the order hero, table, chart, totals, Definition of terms without inserting the previous large four-card fund grid or standalone SHARE / generic CTA blocks between them

### Requirement: Foundation giving data table

When foundation giving records are available, the page SHALL present the same numeric data for each Rotary Year and fund type in a form suitable for currency display, **including the per-year `total`** from each record (alongside the four fund amounts).

On **viewports from the `md` breakpoint upward**, the page SHALL display a **tabular** layout: rows per Rotary Year and columns for each fund (e.g. Annual Fund, Polio Plus, Other Fund, Endowment) **and a Total column** for the `total` field. Each **tbody** data row SHALL use **alternating backgrounds** by row index: **white**, **slate-50 at 80% opacity**, **white**, **slate-50 at 80%**, repeating for successive Rotary Years.

On **viewports below `md`**, the page SHALL use a **different presentation** than the wide columnar table so the primary reading path does not depend on horizontal scrolling. That layout SHALL use **one** outer container (“one big card”) listing **all** Rotary Years with **no** separate bordered card per year and **no** large gaps between years. For **each** Rotary Year section inside that container: a **bold `RY {startYear}-{endYear}`** title; four rows labeled **Annual Fund**, **PolioPlus Fund**, **Other Fund**, and **Endowment Fund** with amount **right-aligned**; a **thin separator** above a **bold** **Total** row (label + per-year `total` amount). **Stripe colors SHALL apply per year section** (entire section one background): alternate **white** and **slate-50 at 80% opacity** by **year order** (same sequence as desktop tbody rows). **Minimal** styling; optional thin dividers between year sections inside the card.

#### Scenario: Data is present (wide layout)

- **WHEN** the loader returns one or more foundation giving records and the viewport is at least `md`
- **THEN** the UI SHALL list each record’s Rotary Year, the four fund amounts, and **`total`**, in a column-aligned table

#### Scenario: Data is present (narrow layout)

- **WHEN** the loader returns one or more foundation giving records and the viewport is below `md`
- **THEN** the UI SHALL show each Rotary Year’s fund amounts and **`total`** in the alternate mobile-oriented layout without requiring horizontal scroll to read all values

#### Scenario: Data is empty

- **WHEN** the loader returns no records
- **THEN** the page SHALL show an empty or placeholder state for the table without throwing

### Requirement: Chart summarizes foundation giving

The page SHALL include at least one chart that visualizes foundation giving over Rotary Years using the loaded data. **Bar (or series) fills SHALL use neutral colors only**—distinct shades from the Chakra **`gray`** (or equivalent neutral) scale for the four fund types; **no** saturated hue fills (e.g. primary blue/green/red) for series bars.

#### Scenario: Chart matches data

- **WHEN** foundation giving records exist
- **THEN** the chart SHALL reflect the same underlying series as the table (per fund type over time)

#### Scenario: Chart uses neutral series colors

- **WHEN** the chart renders the four fund series
- **THEN** each series fill SHALL use a **neutral gray** token (e.g. `gray.700`–`gray.400`), not chromatic accent colors as the primary bar color

### Requirement: Aggregate totals

The page SHALL display aggregate totals across all loaded Rotary Years for each fund type (or an explicit zero when there is no data).

#### Scenario: Totals match table

- **WHEN** foundation giving records exist
- **THEN** the displayed total for each fund type SHALL equal the sum of that fund’s values across all table rows

### Requirement: Definition of terms

The page SHALL include a **Definition of terms** section (`h2` title **Definition of terms**) with four subsections (`h3`): **Annual Fund**, **Polio Plus Fund**, **Other Fund**, and **Endowment Fund**. The section SHALL present the club-approved Rotary Foundation points listed in the change **proposal** under **Definition of terms (canonical copy)** (Annual, Polio Plus, Other, Endowment bullets—including SHARE splits, goal/per-capita rules, SHARE Reports note, PolioPlus program lines, Other Fund approved programs, Endowment spendable-earnings designations, and recognition rules). Copy SHALL be stored as **Markdown** (e.g. `app/data/foundation-giving-definition-of-terms.ts`) and rendered with **`react-markdown`**, **`remark-gfm`**, and a shared prose wrapper so nested lists and emphasis parse correctly. Body text SHALL use **readable primary foreground** (e.g. slate-800 for paragraphs and list items, slate-900 for strong)—not muted gray (e.g. Chakra `gray.600`) as the default color for definition copy. **All explanatory text SHALL be visible by default**—**no** accordion, **no** `<details>`/`<summary>`, and **no** collapse-by-default disclosure for this content.

#### Scenario: Descriptions are always visible

- **WHEN** a user views the Definition of terms section
- **THEN** the full description for **each** of the four fund types SHALL be visible **without** expanding, toggling, or opening a collapsed control

#### Scenario: No accordion for fund types

- **WHEN** the Definition of terms section is rendered
- **THEN** the page SHALL NOT use an accordion, one-off disclosure widget, or `<details>` element whose primary purpose is to hide fund-type descriptions until opened

#### Scenario: Markdown and readable typography

- **WHEN** the Definition of terms section is rendered
- **THEN** intro and per-fund content SHALL be produced from Markdown source and SHALL NOT apply muted body gray as the default text color for paragraphs and list items (primary readable body color SHALL be used)

#### Scenario: Annual Fund terms are present

- **WHEN** the Definition of terms section is rendered
- **THEN** the Annual Fund subsection SHALL include: designations (SHARE, World Fund, Areas of Focus, Disaster Response); SHARE contributions split 47.5% District Designated Fund / 47.5% World Fund; counts toward Club and District Annual Fund Goal; counts toward Annual Fund Per Capita; PHF recognition available; and a statement that figures will not match the SHARE Reports

#### Scenario: Polio Plus Fund terms are present

- **WHEN** the Definition of terms section is rendered
- **THEN** the Polio Plus Fund subsection SHALL include PolioPlus, PolioPlus Partners, Ride to End Polio, and that giving does not count towards the Club or District Annual Fund Goal or Annual Fund Per Capita

#### Scenario: Other Fund terms are present

- **WHEN** the Definition of terms section is rendered
- **THEN** the Other Fund subsection SHALL include support for a donor-selected program; Matching Grants, Global Grants, and Other Approved Programs; and that giving does not count towards the Club or District Annual Fund Goal or Annual Fund Per Capita

#### Scenario: Endowment Fund terms are present

- **WHEN** the Definition of terms section is rendered
- **THEN** the Endowment Fund subsection SHALL include contributions invested in perpetuity; spendable earnings used on programs; donor designation of spendable earnings for Areas of Focus, Rotary Peace Centers, SHARE, and World Fund; benefactor recognition available; PHF recognition not available; and that giving does not count towards the Club or District Annual Fund Goal

### Requirement: Minimal visual treatment

The page SHALL use a restrained visual design: neutral backgrounds, subtle borders, and limited accent color use; it SHALL NOT use strong per-fund background colors for major content panels (e.g. full blue/red/green/purple section tints) as the primary layout device.

#### Scenario: Reduced visual noise

- **WHEN** a user compares the updated page to the prior implementation
- **THEN** fund-type information SHALL not rely on large saturated color blocks to separate sections

## MODIFIED Requirements

### Requirement: Page explains Rotary Foundation funds and impact

The page SHALL present foundation-related messaging with the standard brand `PageHero` (same gradient, pattern, title/description, and stat highlights pattern as other About pages) and SHALL explain Rotary Foundation fund types and contribution impact through the table, chart, totals, and **Definition of terms** section described in this change, so visitors understand fund types and how contributions behave over time.

#### Scenario: Visitor reads the page

- **WHEN** a user opens `/about/foundation-giving`
- **THEN** the layout SHALL communicate foundation giving topics with clear headings and readable sections in the order specified in **Requirement: Page section order and composition**
