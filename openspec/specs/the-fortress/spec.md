## Purpose

Define the behavior of `/the-fortress` (`app/routes/the-fortress.tsx`): the club’s official publication (“The Fortress”), including listing issues from Contentful (`fetchTheFortress`), PDF viewing on the client, and rich interactive UI for browsing issues.

## Requirements

### Requirement: Fortress issues load from Contentful

The route loader SHALL call `fetchTheFortress` and SHALL return `fortressIssues` as an array (empty when none). On failure, the loader SHALL log and SHALL return `{ fortressIssues: [] }`.

#### Scenario: CMS unavailable

- **WHEN** the fortress query throws
- **THEN** the loader SHALL NOT fail the HTTP response and SHALL return an empty issue list

### Requirement: Publication UI supports reading and navigation

The page SHALL present fortress issues with controls appropriate to the implementation (for example download, inline reading, carousel or modal navigation). PDF-related behavior SHALL load client-only dependencies so server rendering remains stable.

#### Scenario: User opens an issue

- **WHEN** a visitor selects an issue or opens the reader
- **THEN** the UI SHALL provide a usable reading or download path without crashing when data is empty

### Requirement: Fortress metadata describes the publication

The route SHALL export `meta` identifying “The Fortress” as the club publication with suitable description and Open Graph fields for sharing.

#### Scenario: Link preview

- **WHEN** crawlers resolve metadata for `/the-fortress`
- **THEN** the title and description SHALL identify the publication and club context
