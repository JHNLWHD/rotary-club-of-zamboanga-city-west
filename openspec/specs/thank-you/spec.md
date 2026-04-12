## Purpose

Define the behavior of `/thank-you` (`app/routes/thank-you.tsx`): the post-submission confirmation page for contact or form flows, including a POST `action` that redirects to the same URL for hosting integrations (for example Netlify forms) and `noindex` metadata to avoid indexing thin confirmation pages.

## Requirements

### Requirement: Thank-you route supports form POST redirect

The route SHALL export an `action` that accepts POST requests and SHALL respond with a redirect to `/thank-you` so hosted form handlers can complete while the app controls the confirmation URL.

#### Scenario: Form POST to action

- **WHEN** a POST hits the route action as configured by the deployment
- **THEN** the handler SHALL redirect the client to GET `/thank-you`

### Requirement: Confirmation UI reassures the visitor

The page SHALL render confirmation messaging (success iconography, next steps, and links back to home or contact) consistent with the implementation, using accessible structure and readable contrast.

#### Scenario: Visitor lands after submitting

- **WHEN** a user reaches `/thank-you` after a successful flow
- **THEN** they SHALL see explicit confirmation that their message was received or processed

### Requirement: Thank-you metadata is non-indexed

The route SHALL export `meta` including `robots` with `noindex, nofollow` (or equivalent) so confirmation pages are not intended for search indexing, while still providing title and Open Graph fields for direct shares.

#### Scenario: Search engine policy

- **WHEN** crawlers read metadata for `/thank-you`
- **THEN** robots directives SHALL discourage indexing of the confirmation page
