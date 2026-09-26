## Purpose

Define the behavior of the site index route (`/`), implemented in `app/routes/home_.tsx`. This is the club's proof-led homepage: it uses Contentful project records, imagery, and contact details while keeping claims derived from published evidence or verified club facts.

## Requirements

### Requirement: Homepage loads aggregated Contentful data with safe failure handling

The homepage route SHALL load all homepage sections by calling `fetchAllHomepageSections` in the route loader. If loading fails, the loader SHALL return `homepageData: null` so the UI can apply local fallbacks without throwing.

#### Scenario: Loader succeeds

- **WHEN** the Contentful request completes successfully
- **THEN** the loader SHALL return the fetched homepage payload (or an empty-equivalent structure) as `homepageData`

#### Scenario: Loader fails

- **WHEN** the Contentful request throws or fails
- **THEN** the loader SHALL log the error and SHALL return `{ homepageData: null }`

### Requirement: Homepage prioritizes verifiable club evidence

The homepage SHALL render a concise sequence: proof-led hero, record-derived facts, links to project/leadership/giving records, project highlights, and contact. It SHALL NOT promote unsupported vanity metrics, stale events, an undated officer roster, unfinished donation options, or generic service-area filler as primary homepage content.

#### Scenario: Partial or missing CMS data

- **WHEN** `homepageData` is null or a selected nested field is absent
- **THEN** the page SHALL still render its core narrative with a local image or concise contact fallback and SHALL use only values derived from available project records plus the verified 1971 charter year

#### Scenario: Project evidence exists

- **WHEN** Contentful supplies featured projects
- **THEN** the first project image SHALL support the hero and up to three project records SHALL be visible from the homepage

### Requirement: Homepage metadata supports SEO and social sharing

The route SHALL export a `meta` function that sets document title, description, robots, Open Graph, Twitter Card, geo hints, theme color, and a canonical link pointing at `https://rotaryzcwest.org` for the home URL.

#### Scenario: Document head for home

- **WHEN** a client or crawler requests metadata for `/`
- **THEN** the returned meta tags SHALL include a primary title containing the club name, the verified 1971 charter reference where used, `og:url`, and an actual canonical link descriptor for the production home URL
