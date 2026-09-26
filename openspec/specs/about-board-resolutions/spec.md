## Purpose

Define the behavior of `/about/board-resolutions` (`app/routes/about.board-resolutions.tsx`): listing only official board resolutions supplied by Contentful (`fetchBoardResolutions`) with links to external document storage.

## Requirements

### Requirement: Board resolutions load from Contentful without fabricated fallback records

The route loader SHALL call `fetchBoardResolutions` and SHALL return `{ boardResolutions }` with the CMS array when successful. When the loader catches an error, it SHALL log the error and return an empty array. It SHALL NOT substitute example resolution titles or placeholder document links.

#### Scenario: CMS failure

- **WHEN** `fetchBoardResolutions` throws
- **THEN** the loader SHALL return an empty array and the UI SHALL explain that no records are currently published

### Requirement: Empty CMS result shows a coming-soon state

When the CMS returns an empty array, the UI SHALL treat that as “no published resolutions” and SHALL render `ComingSoon` (or equivalent) rather than invented records.

#### Scenario: No resolutions in CMS

- **WHEN** `boardResolutionsFromCms` is an empty array
- **THEN** the page SHALL show the coming-soon experience

### Requirement: Metadata references board resolutions

The route SHALL export `meta` with title and description for board resolutions, Open Graph fields including `og:url`, and canonical URL `https://rotaryzcwest.org/about/board-resolutions`.

#### Scenario: SEO canonical

- **WHEN** metadata is resolved for this route
- **THEN** the canonical link SHALL target the production board-resolutions path

### Requirement: Resolution entries link to external documents

Each listed resolution SHALL expose an action that opens its `googleDriveLink` (or equivalent URL) in a new browsing context when provided.

#### Scenario: User opens a resolution

- **WHEN** a resolution row includes a document link
- **THEN** the UI SHALL navigate to that URL when activated
