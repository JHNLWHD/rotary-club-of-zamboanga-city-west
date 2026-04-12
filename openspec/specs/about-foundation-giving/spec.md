## Purpose

Define the behavior of `/about/foundation-giving` (`app/routes/about.foundation-giving.tsx`): explaining The Rotary Foundation giving programs with data from Contentful (`fetchFoundationGiving`) and rich on-page visualization (including charts) for fund impact.

## Requirements

### Requirement: Foundation giving data loads with empty fallback

The route loader SHALL call `fetchFoundationGiving`. On success, the loader SHALL return the foundation giving records for the UI. On failure, the loader SHALL return `{ foundationGiving: [] }` after logging the error.

#### Scenario: CMS failure

- **WHEN** the Contentful request throws
- **THEN** the loader SHALL NOT throw past the route boundary and SHALL supply an empty array for `foundationGiving`

### Requirement: Page explains Rotary Foundation funds and impact

The page SHALL present foundation-related messaging with `PageHero` and supporting sections (including statistical highlights and charts where implemented) so visitors understand fund types and contribution impact.

#### Scenario: Visitor reads the page

- **WHEN** a user opens `/about/foundation-giving`
- **THEN** the layout SHALL communicate foundation giving topics with clear headings and readable sections

### Requirement: Metadata targets the foundation-giving URL

The route SHALL export `meta` with title and description appropriate to Rotary Foundation giving, Open Graph fields, and a canonical URL for `https://rotaryzcwest.org/about/foundation-giving`.

#### Scenario: Canonical link

- **WHEN** metadata is resolved for this route
- **THEN** the canonical href SHALL match the production `/about/foundation-giving` path
