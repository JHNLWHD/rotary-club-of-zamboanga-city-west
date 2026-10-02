## Purpose

Define the behavior of `/contact` (`app/routes/contact.tsx`): the dedicated contact page that reuses the homepage `ContactSection` when root loader contact data is available, and otherwise shows a clear “coming soon” state.

## Requirements

### Requirement: Contact page depends on root contact data

The route SHALL read meeting and contact information from the root route loader via `useRouteLoaderData("root")`. When both `meetingInfo` and `contactInfo` are present, the page SHALL render `ContactSection` with that data.

#### Scenario: Full contact data available

- **WHEN** root loader provides `meetingInfo` and `contactInfo`
- **THEN** the contact page SHALL render the full contact section with an `h1`, visible form labels, meeting details, email, and Facebook contact

### Requirement: Contact form is accessible and avoids unsupported response promises

The form SHALL associate visible labels with the name, email, and message controls. Confirmation copy SHALL state that the club will review the message without promising an unverified response time.

#### Scenario: User completes the form

- **WHEN** a visitor reads or focuses a form control
- **THEN** its purpose SHALL be available from a persistent associated label rather than placeholder text alone

### Requirement: Legacy success URL retains the confirmation experience

When contact data is available, `/contact?success=true` SHALL render the same confirmation UI as `/thank-you`, with no response-time promise and a link to `/`.

#### Scenario: Visitor follows the legacy success URL

- **WHEN** the success parameter equals `true` and contact data is available
- **THEN** the route SHALL show the shared confirmation UI instead of the form

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
