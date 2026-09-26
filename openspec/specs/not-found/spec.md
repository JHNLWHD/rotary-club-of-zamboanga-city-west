## Purpose

Define the behavior of the catch-all route (`*` → `app/routes/$.tsx`): the site-wide “not found” experience for unknown paths, with recovery links, an HTTP 404 response, and metadata that discourages indexing.

## Requirements

### Requirement: Unknown paths render a dedicated 404 experience

The default export SHALL render a centered 404 message with clear explanation, visual emphasis, and links or contact details so visitors can recover without using the browser back button alone.

#### Scenario: User visits a non-existent URL

- **WHEN** no more specific route matches the request path
- **THEN** the catch-all route SHALL render the not-found content with an accessible main heading

### Requirement: Unknown paths return HTTP 404

The catch-all loader SHALL set response status 404 while still rendering the dedicated not-found UI.

#### Scenario: Crawler requests an unknown URL

- **WHEN** no specific route matches
- **THEN** the server response SHALL use status 404 rather than 200

### Requirement: Not-found metadata is non-indexing

The route SHALL export `meta` with title indicating page not found, description explaining the error, and `robots` set to `noindex, nofollow` so soft-404 content is not promoted in search indexes.

#### Scenario: Search engine

- **WHEN** a crawler reads headers/meta for an unknown path
- **THEN** robots metadata SHALL discourage indexing of the error page

### Requirement: Recovery actions are visible on the error page

The page SHALL provide links to the homepage and project index plus a verified email address for assistance.

#### Scenario: Visitor needs help

- **WHEN** a user lands on the 404 page
- **THEN** they SHALL see clear recovery actions without relying on browser history
