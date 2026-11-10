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

The page SHALL render leadership content using shared presentation components (for example `PageHero`, `OfficerCard`, and `ComingSoon` where applicable), sort or group officers according to the club’s role hierarchy utilities, and label the lists as published rosters. Officer and Rotary Ann records SHALL provide an optional `rotaryYear` field in Contentful, using `YYYY-YYYY` for consecutive years.

#### Scenario: Non-empty roster

- **WHEN** officers or Rotary Anns exist for a group
- **THEN** the UI SHALL list them in the intended sections with accessible headings and cards

Entries without a usable photo SHALL use a compact text layout without a large placeholder image panel.

#### Scenario: Visitor checks roster currency

- **WHEN** all published officer executive and director assignments have the same valid Rotary Year
- **THEN** their banner SHALL show that Contentful year, without claiming it is the current year
- **AND** adviser records SHALL remain separate from that dated roster
- **AND** the Rotary Ann banner SHALL derive its year independently from its executive and director assignments

#### Scenario: Roster year is unknown

- **WHEN** a roster is empty or has missing, invalid, or mixed Rotary Years
- **THEN** its banner SHALL show neutral text and SHALL NOT infer a year from the clock or unrelated Contentful records

#### Scenario: One officer role query is unavailable

- **WHEN** the executive or director Contentful query fails
- **THEN** the page SHALL keep successfully loaded groups visible
- **AND** the officer banner and shared metadata SHALL NOT confirm a Rotary Year from the incomplete roster
- **AND** a failed request SHALL remain distinct from a successful query with no entries until the route decides the roster year

### Requirement: Metadata identifies the leadership page

The route SHALL export `meta` tags including page title and description focused on club leadership, plus Open Graph fields and a canonical URL for `https://rotaryzcwest.org/about/leadership`.

The description and Open Graph description SHALL include a Rotary Year only when both rosters have the same confirmed year. Otherwise, they SHALL use a description without a year.

#### Scenario: Canonical leadership URL

- **WHEN** metadata is resolved for this route
- **THEN** the canonical link SHALL target `/about/leadership` on the production domain
