## Purpose

Define the behavior of the `/under-construction` route, implemented in `app/routes/_index.tsx`. This route presents a standalone “website under construction” experience with club branding and a path back to the main site, distinct from the live homepage at `/`.

## Requirements

### Requirement: Under-construction page is self-contained and branded

The route SHALL render a full-page layout with Rotary Club of Zamboanga City West branding (including logo and club name) and primary calls-to-action that help visitors reach the active homepage or related content.

#### Scenario: Visitor opens the route

- **WHEN** a user navigates to `/under-construction`
- **THEN** the page SHALL display the construction messaging and branded header content without relying on the main homepage layout’s unique behaviors

### Requirement: Metadata describes the construction state

The route SHALL export a `meta` function whose title and description clearly state that the site or experience is under construction, with Open Graph fields suitable for link previews.

#### Scenario: Social preview

- **WHEN** metadata is resolved for `/under-construction`
- **THEN** the title SHALL indicate an under-construction state and SHALL include Open Graph title and description consistent with that message
