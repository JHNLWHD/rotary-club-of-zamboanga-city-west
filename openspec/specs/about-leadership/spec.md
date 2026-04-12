## Purpose

Define the behavior of `/about/leadership` (`app/routes/about.leadership.tsx`): club leadership and Rotary Ann listings sourced from Contentful, grouped for display (executives, directors, advisers), with SEO metadata for the leadership page.

## Requirements

### Requirement: Leadership data loads from Contentful with graceful empty states

The route loader SHALL fetch officers and Rotary Ann records in parallel (`fetchAllOfficers`, `fetchAllRotaryAnns`). On failure, the loader SHALL return empty grouped arrays for each role bucket so the page still renders.

#### Scenario: Successful load

- **WHEN** both Contentful queries succeed
- **THEN** the loader SHALL return officer and Rotary Ann collections partitioned for UI consumption

#### Scenario: Load failure

- **WHEN** either query throws
- **THEN** the loader SHALL log the error and SHALL return empty structures for all groups

### Requirement: Page presents leadership content with hierarchy

The page SHALL render leadership content using shared presentation components (for example `PageHero`, `OfficerCard`, and `ComingSoon` where applicable) and SHALL sort or group officers according to the club’s role hierarchy utilities when data exists.

#### Scenario: Non-empty roster

- **WHEN** officers or Rotary Anns exist for a group
- **THEN** the UI SHALL list them in the intended sections with accessible headings and cards

### Requirement: Metadata identifies the leadership page

The route SHALL export `meta` tags including page title and description focused on club leadership, plus Open Graph fields and a canonical URL for `https://rotaryzcwest.org/about/leadership`.

#### Scenario: Canonical leadership URL

- **WHEN** metadata is resolved for this route
- **THEN** the canonical link SHALL target `/about/leadership` on the production domain
