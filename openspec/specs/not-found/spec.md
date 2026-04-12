## Purpose

Define the behavior of the catch-all route (`*` → `app/routes/$.tsx`): the site-wide “not found” experience for unknown paths, with helpful contact options, branding, and metadata that discourages indexing of error URLs.

## Requirements

### Requirement: Unknown paths render a dedicated 404 experience

The default export SHALL render a centered 404 message with clear explanation, visual emphasis, and links or contact details so visitors can recover without using the browser back button alone.

#### Scenario: User visits a non-existent URL

- **WHEN** no more specific route matches the request path
- **THEN** the catch-all route SHALL render the not-found content with an accessible main heading

### Requirement: Not-found metadata is non-indexing

The route SHALL export `meta` with title indicating page not found, description explaining the error, and `robots` set to `noindex, nofollow` so soft-404 content is not promoted in search indexes.

#### Scenario: Search engine

- **WHEN** a crawler reads headers/meta for an unknown path
- **THEN** robots metadata SHALL discourage indexing of the error page

### Requirement: Support contact is visible on the error page

The page SHALL surface at least phone, email, and social contact methods consistent with the club’s public channels so users can report broken links or ask for help.

#### Scenario: Visitor needs help

- **WHEN** a user lands on the 404 page
- **THEN** they SHALL see actionable contact information without navigating away first
