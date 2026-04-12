## Purpose

Define the behavior of `/service-projects` (`app/routes/service-projects.tsx`): the index of all service projects from Contentful (`fetchAllProjects`), rendered as cards with a hero section and SEO tuned for the listing URL.

## Requirements

### Requirement: Project list loads from Contentful

The route loader SHALL call `fetchAllProjects` and SHALL return `{ projects }` where `projects` is an array (empty when none). On failure, the loader SHALL return `{ projects: [] }` after logging.

#### Scenario: Loader failure

- **WHEN** projects cannot be fetched
- **THEN** the route SHALL still render with an empty project grid rather than erroring

### Requirement: Listing presents each project as a card

The page SHALL render `PageHero` and a responsive grid of `ProjectCard` entries for each project returned. Empty state messaging SHALL remain clear when there are no projects.

#### Scenario: No projects

- **WHEN** the projects array is empty
- **THEN** the page SHALL remain coherent and MUST NOT assume at least one project exists

### Requirement: Listing metadata references service projects index

The route SHALL export `meta` with title and description for the service projects listing, Open Graph and Twitter fields, geo tags where present, and canonical URL `https://rotaryzcwest.org/service-projects`.

#### Scenario: Canonical

- **WHEN** metadata is resolved for `/service-projects`
- **THEN** the canonical href SHALL be the service-projects index on the production domain
