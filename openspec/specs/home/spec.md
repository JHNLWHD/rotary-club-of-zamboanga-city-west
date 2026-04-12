## Purpose

Define the behavior of the site index route (`/`), implemented in `app/routes/home_.tsx`. This is the primary marketing homepage: it aggregates Contentful-driven homepage sections (hero, stats, service areas, projects, events, officers, contact) and sets global SEO and social metadata for the canonical site URL.

## Requirements

### Requirement: Homepage loads aggregated Contentful data with safe failure handling

The homepage route SHALL load all homepage sections by calling `fetchAllHomepageSections` in the route loader. If loading fails, the loader SHALL return `homepageData: null` so the UI can apply local fallbacks without throwing.

#### Scenario: Loader succeeds

- **WHEN** the Contentful request completes successfully
- **THEN** the loader SHALL return the fetched homepage payload (or an empty-equivalent structure) as `homepageData`

#### Scenario: Loader fails

- **WHEN** the Contentful request throws or fails
- **THEN** the loader SHALL log the error and SHALL return `{ homepageData: null }`

### Requirement: Homepage renders all major sections with fallbacks

The homepage UI SHALL render the stacked homepage sections (including hero, statistics, service areas, project highlights, events, officers, and contact). For each section, when CMS data is missing, the UI SHALL use documented default or empty structures (for example default hero copy and imagery) so the page remains usable.

#### Scenario: Partial or missing CMS data

- **WHEN** `homepageData` is null or specific nested fields are absent
- **THEN** the page SHALL still render using fallbacks for those sections without breaking the layout

### Requirement: Homepage metadata supports SEO and social sharing

The route SHALL export a `meta` function that sets document title, description, robots, Open Graph, Twitter Card, geo hints, theme color, and a canonical link pointing at `https://rotaryzcwest.org` for the home URL.

#### Scenario: Document head for home

- **WHEN** a client or crawler requests metadata for `/`
- **THEN** the returned meta tags SHALL include a primary title containing the club name and SHALL include `og:url` and canonical href for the production home URL
