## Purpose

Define the behavior of `/about/history` (`app/routes/about.history.tsx`): a factual club-history page anchored to the verified June 2, 1971 charter date while the full source-backed archive is prepared.

## Requirements

### Requirement: History route exposes dedicated SEO metadata

The route SHALL export a `meta` function with title and description referencing club history (including founding year where stated in copy) and SHALL include Open Graph tags and a canonical URL for `https://rotaryzcwest.org/about/history`.

#### Scenario: Document head

- **WHEN** metadata is resolved for `/about/history`
- **THEN** the canonical href SHALL point at the production history URL

### Requirement: History page separates verified history from work in progress

The page SHALL render `PageHero`, prominently state the June 2, 1971 charter date, and explain that the extended timeline is being assembled. It SHALL NOT publish a contradictory founding year or a hard-coded elapsed-year claim.

#### Scenario: Default visit

- **WHEN** a user opens `/about/history`
- **THEN** they SHALL see the verified charter fact and a transparent archive-in-progress notice
