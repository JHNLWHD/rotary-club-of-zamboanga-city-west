## Purpose

Define the behavior of `/donate` (`app/routes/donate.tsx`): the donations landing page that explains how to support the club financially, with static marketing copy and SEO metadata for the donate URL.

## Requirements

### Requirement: Donate page presents support messaging

The page SHALL render a clear primary heading and supporting copy inviting donations for community service, using the shared container width and vertical spacing patterns of the site.

#### Scenario: Visitor opens donate

- **WHEN** a user navigates to `/donate`
- **THEN** they SHALL see donation-oriented content with an identifiable `h1` and explanatory text

### Requirement: Donate metadata supports discovery and previews

The route SHALL export `meta` with title and description focused on donating to the club, Open Graph fields, and canonical URL `https://rotaryzcwest.org/donate`.

#### Scenario: Canonical donate URL

- **WHEN** metadata is resolved for `/donate`
- **THEN** the canonical href SHALL target the production donate path
