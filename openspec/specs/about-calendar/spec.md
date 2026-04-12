## Purpose

Define the behavior of `/about/calendar` (`app/routes/about.calendar.tsx`): the club calendar of activities backed by Contentful events (`fetchAllEvents`), including grouping by month and separation of featured versus regular events.

## Requirements

### Requirement: Events load for the calendar page

The route loader SHALL call `fetchAllEvents` and SHALL return an `events` array (empty when none). On failure, the loader SHALL return `{ events: [] }` after logging.

#### Scenario: Loader error

- **WHEN** the events query throws
- **THEN** the loader SHALL return an empty `events` array without failing the document request

### Requirement: Events are grouped and displayed predictably

The UI SHALL separate featured and non-featured events and SHALL group events by month for listing. Date parsing SHALL tolerate invalid values by skipping problematic rows or substituting safe display tokens so the page does not crash.

#### Scenario: Invalid event date

- **WHEN** an event has an invalid date string
- **THEN** grouping SHALL skip or isolate that row without breaking the entire list

### Requirement: Calendar metadata references activities

The route SHALL export `meta` with title and description for the calendar of activities, Open Graph fields including image where configured, and canonical URL `https://rotaryzcwest.org/about/calendar`.

#### Scenario: SEO

- **WHEN** metadata is resolved for `/about/calendar`
- **THEN** the canonical link SHALL target the production calendar path
