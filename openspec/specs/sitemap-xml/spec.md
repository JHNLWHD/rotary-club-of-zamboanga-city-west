## Purpose

Define the behavior of the `GET /sitemap.xml` resource (`app/routes/sitemap[.]xml.tsx`): an XML sitemap enumerating important public URLs for search engines, including static routes and dynamic URLs derived from Contentful projects.

## Requirements

### Requirement: Sitemap responds with XML and correct content type

The route loader SHALL return a `Response` whose body is valid sitemap XML and whose headers include `Content-Type: application/xml` (or equivalent XML) and a public cache policy as implemented so crawlers can consume the document efficiently.

#### Scenario: Crawler requests sitemap

- **WHEN** a client requests `/sitemap.xml`
- **THEN** the server SHALL respond with status 200 and an XML content type suitable for sitemap consumers

### Requirement: Sitemap merges static routes and dynamic project URLs

The implementation SHALL include the static marketing URLs defined in the sitemap module (including home, about subpages, contact, the fortress, service-projects index, donate, thank-you, and new-generation club pages) with per-URL priority and `changefreq`. It SHALL append dynamic `loc` entries from `fetchAllProjects` so each project’s canonical path under the site origin appears when projects exist.

#### Scenario: Projects exist in CMS

- **WHEN** Contentful returns one or more projects with slugs
- **THEN** the sitemap SHALL contain `loc` entries for each corresponding `https://rotaryzcwest.org` project path

### Requirement: Site URL prefix is production

Generated `loc` values SHALL use the configured production site origin (`https://rotaryzcwest.org`) so staging builds do not accidentally emit alternate domains unless explicitly overridden by deployment configuration.

#### Scenario: Loc entries

- **WHEN** entries are written to the sitemap
- **THEN** each `loc` SHALL begin with the production site base URL used in the route module
