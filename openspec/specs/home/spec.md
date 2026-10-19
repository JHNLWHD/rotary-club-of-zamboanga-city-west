## Purpose

Define the behavior of the site index route (`/`), implemented in `app/routes/home_.tsx`. This is the club's proof-led homepage: it uses Contentful project records, imagery, and contact details while keeping claims derived from published evidence or verified club facts.

## Requirements

### Requirement: Homepage loads only displayed Contentful data with safe failure handling

The homepage route SHALL call `fetchAllHomepageSections` to load only hero data and the three latest active projects, ordered by project date descending without an `isFeatured` filter. It SHALL reuse root contact data for the contact section and organization structured data. A normal initial homepage load SHALL make three application-level Contentful fetch invocations: hero, latest projects, and root contact. If homepage loading fails, the loader SHALL return `homepageData: null` so the UI can apply local fallbacks without throwing.

#### Scenario: Initial homepage load

- **WHEN** the root and homepage loaders run
- **THEN** contact SHALL be fetched once, and the homepage SHALL NOT request statistics, service areas, featured events, or featured officers that it does not display

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

- **WHEN** Contentful supplies active projects
- **THEN** the latest project image SHALL support the hero and up to three latest project records SHALL be visible from the homepage, regardless of their featured flag

#### Scenario: Latest project image is unavailable

- **WHEN** no usable latest project image exists
- **THEN** the hero SHALL use the first usable carousel image, then the hero background image, then the existing local fallback

#### Scenario: Branded header appears in the hero

- **WHEN** the hero displays a project header at desktop or mobile width
- **THEN** the whole image SHALL remain visible, including its title and logo, and the hero labels and caption SHALL remain outside the image

The hero SHALL use responsive WebP derivatives for supported Contentful photos, with eager loading and high fetch priority. Its width descriptors SHALL not exceed a known original width. Project cards below the hero SHALL lazy-load their responsive images.

#### Scenario: Develop draft preview is enabled

- **WHEN** the develop branch build enables service-project draft preview
- **THEN** the homepage SHALL use the same project preview source as the listing, label draft content for review, and return `noindex, nofollow` metadata

#### Scenario: Selected hero image fails in the browser

- **WHEN** the selected hero image URL fails before or after hydration
- **THEN** the hero SHALL use the existing local fallback, without repeated source assignments if that fallback also fails

#### Scenario: Contact values appear in structured data

- **WHEN** root contact data is available or missing
- **THEN** organization structured data SHALL remain valid, and serialized contact values MUST NOT introduce HTML tokens or close the script element

### Requirement: Homepage metadata supports SEO and social sharing

The route SHALL export a `meta` function that sets document title, description, robots, Open Graph, Twitter Card, geo hints, theme color, and a canonical link pointing at `https://rotaryzcwest.org` for the home URL.

#### Scenario: Document head for home

- **WHEN** a client or crawler requests metadata for `/`
- **THEN** the returned meta tags SHALL include a primary title containing the club name, the verified 1971 charter reference where used, `og:url`, and an actual canonical link descriptor for the production home URL
