## Purpose

Define the behavior of `/thank-you` (`app/routes/thank-you.tsx`): the post-submission confirmation page for Netlify form flows, with `noindex` metadata to avoid indexing thin confirmation pages.

## Requirements

### Requirement: Netlify owns form submission processing

The form SHALL retain its Netlify attributes and `/thank-you` action URL. The route SHALL NOT export a POST action that reports success without storing the submission. Netlify SHALL handle the submission before showing the confirmation page.

#### Scenario: Form submission reaches the hosting integration

- **WHEN** a visitor submits the form on the Netlify deployment
- **THEN** Netlify SHALL process the named form and direct the visitor to `/thank-you`; an app-only local preview does not emulate that processing

### Requirement: Confirmation UI reassures the visitor

The page SHALL render concise confirmation messaging and a link back to the homepage using accessible structure and readable contrast. It SHALL NOT promise an unverified response time.

#### Scenario: Visitor lands after submitting

- **WHEN** a user reaches `/thank-you` after a successful flow
- **THEN** they SHALL see explicit confirmation that their message was received or processed

### Requirement: Thank-you metadata is non-indexed

The route SHALL export `meta` including `robots` with `noindex, nofollow` (or equivalent) so confirmation pages are not intended for search indexing, while still providing title and Open Graph fields for direct shares.

#### Scenario: Search engine policy

- **WHEN** crawlers read metadata for `/thank-you`
- **THEN** robots directives SHALL discourage indexing of the confirmation page
