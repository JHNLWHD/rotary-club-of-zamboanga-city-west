## Purpose

Define the behavior of `/new-generation/interact-zamboanga-city-west` (`app/routes/new-generation.interact-zamboanga-city-west.tsx`): the Interact Club of Zamboanga City West page with Contentful-backed content (`fetchInteractClubOfZamboangaCityWest`) and student-program-focused metadata.

## Requirements

### Requirement: Interact club content loads from Contentful

The route loader SHALL call `fetchInteractClubOfZamboangaCityWest` and SHALL return `{ interactData }` for the UI. The UI SHALL handle null or partial data using `ComingSoon` or equivalent when content is unavailable.

#### Scenario: Missing CMS entry

- **WHEN** Contentful returns no usable club payload
- **THEN** the page SHALL degrade to the coming-soon experience without a runtime error

### Requirement: Page presents Interact programs and leadership

The page SHALL render `PageHero`, officer or program sections as data allows, and external links consistent with the implementation, prioritizing readability on mobile and desktop breakpoints.

#### Scenario: Visitor reads Interact information

- **WHEN** data is present
- **THEN** the visitor SHALL see structured sections describing the Interact club and how students can participate

### Requirement: Metadata identifies Interact Zamboanga City West

The route SHALL export `meta` with title and description for the Interact Club of Zamboanga City West, Open Graph and Twitter fields, and `robots` suitable for public indexing.

#### Scenario: Social cards

- **WHEN** metadata is resolved for this route
- **THEN** Open Graph title and description SHALL match the Interact club positioning copy
