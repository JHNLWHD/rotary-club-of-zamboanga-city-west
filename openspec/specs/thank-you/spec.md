## Purpose

Define the behavior of `/thank-you`: the static post-submission confirmation page at `public/thank-you/index.html`, with an equivalent app view in `app/routes/thank-you.tsx` for local and legacy client navigation. Both have `noindex` metadata to avoid indexing thin confirmation pages.

## Requirements

### Requirement: Netlify owns form submission processing

The form SHALL retain its Netlify attributes and `/thank-you` action URL. The build SHALL copy `public/thank-you/index.html` into the static output, and static files SHALL take precedence over SSR routing. Redirect rules SHALL NOT depend on unsupported HTTP-method conditions. The route SHALL NOT export a POST action that reports success without storing the submission. Netlify SHALL handle the submission before showing the confirmation page. The static and app views SHALL keep the same confirmation copy and homepage link.

#### Scenario: Form submission reaches the hosting integration

- **WHEN** a visitor submits the form on the Netlify deployment
- **THEN** Netlify SHALL process the named form and direct the visitor to `/thank-you`; an app-only local preview does not emulate that processing

### Requirement: Confirmation UI reassures the visitor

The page SHALL render concise confirmation messaging and a link back to the homepage using accessible structure and readable contrast. It SHALL NOT promise an unverified response time.

#### Scenario: Visitor lands after submitting

- **WHEN** a user reaches `/thank-you` after a successful flow
- **THEN** they SHALL see explicit confirmation that their message was received or processed

### Requirement: Thank-you metadata is non-indexed

Both the static page and app route SHALL include a title, description, production canonical URL, and `robots` with `noindex, nofollow` so confirmation pages are not intended for search indexing.

#### Scenario: Search engine policy

- **WHEN** crawlers read metadata for `/thank-you`
- **THEN** robots directives SHALL discourage indexing of the confirmation page
