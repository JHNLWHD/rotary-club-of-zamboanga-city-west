## Purpose

Define the behavior of `/new-generation/rotaract-southern-city-colleges` (`app/routes/new-generation.rotaract-southern-city-colleges.tsx`): the Rotaract Club of Southern City Colleges page with Contentful-backed club content (`fetchRotaractClubOfSouthernCityColleges`) and youth-program-focused metadata.

## Requirements

### Requirement: Rotaract club content loads from Contentful

The route loader SHALL call `fetchRotaractClubOfSouthernCityColleges` and SHALL return `{ rotaractData }` for the UI. The UI SHALL handle null or partial data using `ComingSoon` or equivalent when content is unavailable.

#### Scenario: Missing CMS entry

- **WHEN** Contentful returns no usable club payload
- **THEN** the page SHALL degrade to the coming-soon experience without a runtime error

### Requirement: Page promotes Rotaract leadership and service

The page SHALL render `PageHero`, officer or club sections as data allows, and external links (for example social) consistent with the implementation, using Chakra layout components for responsive reading.

#### Scenario: Visitor reviews the club

- **WHEN** data is present
- **THEN** the visitor SHALL see structured sections describing the Rotaract club identity and activities

### Requirement: Metadata identifies Rotaract Southern City Colleges

The route SHALL export `meta` (via `MetaFunction`) with title and description for the Rotaract Club of Southern City Colleges, Open Graph and Twitter fields, and `robots` suitable for public indexing.

#### Scenario: Link preview

- **WHEN** metadata is resolved for this route
- **THEN** the title SHALL name the Rotaract club and the description SHALL summarize youth leadership and service
