## Purpose

Define the behavior of the `GET /robots.txt` resource (`app/routes/robots[.]txt.tsx`): robots policy and sitemap discovery hints for crawlers, including allowances for public sections and disallow rules for sensitive path prefixes.

## Requirements

### Requirement: Robots route returns plain text

The loader SHALL return a `Response` with `Content-Type: text/plain` and a reasonable cache policy so robots.txt can be cached at the edge without stale behavior beyond the configured TTL.

#### Scenario: Crawler fetches robots

- **WHEN** a client requests `/robots.txt`
- **THEN** the response SHALL be plain text readable as a robots file

### Requirement: Robots file references the XML sitemap

The robots content SHALL include a `Sitemap:` line pointing at `https://rotaryzcwest.org/sitemap.xml` (or the same origin’s sitemap path) so search engines discover the sitemap automatically.

#### Scenario: Sitemap discovery

- **WHEN** parsers read the robots file
- **THEN** they SHALL find a sitemap URL on the production domain

### Requirement: Policy balances crawl access and protected prefixes

The file SHALL `Allow` public marketing content (including service projects, about, new-generation, contact, donate, fortress paths as implemented) and SHALL `Disallow` administrative or infrastructure paths such as `/admin/`, `/.netlify/`, and `/api/` to reduce accidental exposure.

#### Scenario: Sensitive paths

- **WHEN** a crawler evaluates disallowed paths
- **THEN** `/admin/` and similar prefixes SHALL be listed under `Disallow` rules as defined in the route
