## Purpose

Define the behavior of `/about/history` (`app/routes/about.history.tsx`): the club history area of the site. The route combines a standard page hero with a “coming soon” style body until full historical content is authored in the UI.

## Requirements

### Requirement: History route exposes dedicated SEO metadata

The route SHALL export a `meta` function with title and description referencing club history (including founding year where stated in copy) and SHALL include Open Graph tags and a canonical URL for `https://rotaryzcwest.org/about/history`.

#### Scenario: Document head

- **WHEN** metadata is resolved for `/about/history`
- **THEN** the canonical href SHALL point at the production history URL

### Requirement: History page uses shared hero and placeholder content pattern

The page SHALL render `PageHero` with history-oriented messaging and SHALL use `ComingSoon` (or equivalent) for the main content region when detailed history content is not yet presented.

#### Scenario: Default visit

- **WHEN** a user opens `/about/history`
- **THEN** they SHALL see a consistent hero and a clear placeholder indicating expanded history content is forthcoming
