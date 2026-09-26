## Purpose

Define the behavior of `/donate` (`app/routes/donate.tsx`): a cautious giving-inquiry page used while the club has no verified online payment flow published on the website.

## Requirements

### Requirement: Donate page requires direct verification

The page SHALL state that no online payment flow is currently published, warn visitors to confirm project and receiving-account details, and link to the contact and project pages.

#### Scenario: Visitor opens donate

- **WHEN** a user navigates to `/donate`
- **THEN** they SHALL see an identifiable `h1`, a verification warning, and no account number or unsupported payment instruction

### Requirement: Donate metadata avoids search promotion while incomplete

The route SHALL export `meta` with an accurate giving-inquiry title and description, canonical URL `https://rotaryzcwest.org/donate`, and `robots` set to `noindex, follow` while no verified payment flow exists.

#### Scenario: Canonical donate URL

- **WHEN** metadata is resolved for `/donate`
- **THEN** the canonical href SHALL target the production donate path
