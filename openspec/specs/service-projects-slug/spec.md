## Purpose

Define the behavior of `/service-projects/:slug` (`app/routes/service-projects.$slug.tsx`): the project detail template for a single service project, including Contentful lookup by slug, related projects, gallery/lightbox behavior, share affordances, and dynamic metadata from the project record.

## Requirements

### Requirement: Project detail loads by slug with related projects

The route loader SHALL read `params.slug`, SHALL fetch the project with `fetchProjectBySlug`, and SHALL fetch all projects with `fetchAllProjects` to derive related entries. Related projects SHALL exclude the current project by slug comparison and SHALL cap the list length for display. On failure, the loader SHALL return `project: null` and an empty related list.

#### Scenario: Unknown slug

- **WHEN** no project matches the slug
- **THEN** the loader SHALL return `project: null` so the UI can render a not-found style project view

### Requirement: Dynamic metadata reflects the loaded project

The route SHALL export `meta` that uses loader data when a project exists (title, description, keywords, `og:type` article, canonical URL including `project.slug`, OG image from project header image or fallback). When `project` is null, meta SHALL indicate the project was not found.

#### Scenario: Successful project

- **WHEN** a project is loaded
- **THEN** the document title SHALL include the project title and the canonical URL SHALL match `https://rotaryzcwest.org` plus `project.slug`

### Requirement: Detail page renders rich project body and media

The page SHALL render long-form project content (including markdown where used), imagery, badges, external links, and optional lightbox galleries. The UI SHALL provide navigation back to the project list and affordances for sharing consistent with the implementation.

#### Scenario: Visitor shares or opens gallery

- **WHEN** the user invokes share or opens images
- **THEN** the corresponding modals or lightbox flows SHALL function without requiring a full page reload
