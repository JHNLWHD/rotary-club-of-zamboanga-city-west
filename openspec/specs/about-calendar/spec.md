## Purpose

Define the behavior of `/about/calendar` (`app/routes/about.calendar.tsx`): the club calendar backed by Contentful events (`fetchAllEvents`), with future dates separated from the past-event archive.

## Requirements

### Requirement: Events load for the calendar page

The route loader SHALL call `fetchAllEvents`, discard invalid date values, and SHALL return sorted `upcomingEvents` and `pastEvents` arrays. On failure, the loader SHALL return both arrays empty after logging.

#### Scenario: Loader error

- **WHEN** the events query throws
- **THEN** the loader SHALL return empty upcoming and past arrays without failing the document request

### Requirement: Past events are never presented as upcoming

The UI SHALL classify valid dated events against the current UTC day, list upcoming dates first, and show completed activities only inside a clearly labeled archive. A past `isFeatured` flag SHALL NOT make an event appear upcoming.

#### Scenario: Invalid event date

- **WHEN** an event has an invalid date string
- **THEN** the loader SHALL skip that row without breaking the entire list

### Requirement: Calendar metadata references activities

The route SHALL export `meta` with title and description for the calendar of activities, Open Graph fields including image where configured, and canonical URL `https://rotaryzcwest.org/about/calendar`.

#### Scenario: SEO

- **WHEN** metadata is resolved for `/about/calendar`
- **THEN** the canonical link SHALL target the production calendar path
