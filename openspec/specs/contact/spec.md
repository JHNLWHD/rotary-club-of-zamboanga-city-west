## Purpose

Define the behavior of `/contact` (`app/routes/contact.tsx`): the dedicated contact page that reuses the homepage `ContactSection` when root loader contact data is available, and otherwise shows a clear “coming soon” state.

## Requirements

### Requirement: Contact page depends on root contact data

The route SHALL read meeting and contact information from the root route loader via `useRouteLoaderData("root")`. When both `meetingInfo` and `contactInfo` are present, the page SHALL render `ContactSection` with that data.

#### Scenario: Full contact data available

- **WHEN** root loader provides `meetingInfo` and `contactInfo`
- **THEN** the contact page SHALL render the full contact section in the standard page padding layout

### Requirement: Missing contact data shows a coming-soon experience

When either `meetingInfo` or `contactInfo` is missing from root data, the route SHALL render `ComingSoon` with messaging that contact information is being set up, instead of a broken or empty contact form.

#### Scenario: Incomplete CMS contact payload

- **WHEN** root contact data is absent or incomplete
- **THEN** the user SHALL see the coming-soon component with accessible title and message

### Requirement: Contact route metadata

The route SHALL export `meta` with title and description for contacting the club, Open Graph fields, and canonical URL `https://rotaryzcwest.org/contact`.

#### Scenario: Canonical URL

- **WHEN** metadata is resolved for `/contact`
- **THEN** the canonical href SHALL point at the production contact URL
