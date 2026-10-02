---
name: publish-service-project
description: Draft, update, or publish Service Projects for the Rotary Club of Zamboanga City West website through Contentful. Use for project reports, source posts, and photo sets intended for the website; not website deployment or posting to social media.
---

# Publish a Service Project

Turn project notes, source links, and photographs into a factual club project record. Prepare it for review, then carry out the authorized Contentful action.

## Resolve the target

The website is `https://rotaryzcwest.org`. Use the repository that contains this skill; all source paths below are relative to its root. Read its applicable instructions and these source files before mapping content:

- `app/lib/contentful.ts`: configured Contentful space and environment.
- `app/lib/contentful-api.ts`: `serviceProject` queries and asset handling.
- `app/lib/contentful-types.ts`: project field names.
- `app/routes/service-projects.$slug.tsx`: rendered content and metadata.

Current code takes its target from `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ENVIRONMENT`; README examples use different names. Verify the actual target without displaying tokens. A Git branch named `develop` does not imply a separate CMS environment. Identify the selected space, environment, locale, and create-versus-update action before writing.

Prefer an available Contentful connector or configured management client. Otherwise use the authenticated Contentful web app with the available browser tools. An existing, authorized Content Management API token is another route; the site's Delivery API token is not a publishing credential. Keep management credentials outside `VITE_*`, source files, logs, and chat. If access is unavailable, finish the local content draft and ask for Contentful access. Do not claim it was saved in the CMS.

This skill is shared in a public repository. Each editor needs their own authorized CMS access. Keep skill files limited to reusable instructions; store local review packets and unpublished source material under the ignored `.agents/drafts/` directory, not beside this skill. Keep credentials outside the repository.

Inspect the live `serviceProject` content model for required fields, validation, and locale rules. Search all relevant entries, including drafts and archived entries, by slug and by title/date/location to detect duplicates. If multiple entries match, resolve the target with the user. For updates, read the complete current entry, its publication state, and pending changes.

## Prepare the content

Use supplied facts and inspect supplied source links. Ask only for facts that affect accuracy or publication. Keep missing required facts in a separate question list, not in publishable text. Preserve exact partner names and supported dates, quantities, and outcomes. Distinguish completed work from plans. Use short active sentences and a factual club voice; avoid unsupported impact claims.

The table records the current website contract, not a replacement for the live CMS schema. Recheck source files if behavior changes.

| Field | Publishing rule |
| --- | --- |
| `title` | State the activity and place clearly. Avoid unsupported superlatives. |
| `slug` | Save a unique lowercase hyphenated segment, without `/service-projects/`. The listing can derive a missing slug, but the detail query requires an exact stored slug. Preserve an existing published slug unless the user approves the URL change. |
| `shortDescription` | Write a concise plain-text summary. It supplies both card copy and page/OG descriptions. Follow live length validation. |
| `description` | Supply a Markdown string. The current detail renderer displays an empty body for Contentful Rich Text objects, despite the broader TypeScript type. If the live model only allows Rich Text, stop and report that mismatch; do not change the model or application during publishing. |
| `date` | Use the confirmed project date in the model's accepted format. The detail page formats it in UTC; verify the displayed calendar day, especially if a time is supplied. |
| `location` | Use the confirmed venue or community name. |
| `headerImage` | Link a real approved project photo. It is used on cards, the detail page, and as the detail page's OG image. Inspect its crop and legibility. |
| `gallery` | Link approved photos in a deliberate order. Asset titles provide accessible labels; descriptions provide lightbox captions. |
| `partners` | Use verified partner names as a list of strings. |
| `hashtags`, `facebookLink` | Include only relevant, supported values. A source Facebook link does not authorize a Facebook post. |
| `category` | Use a value accepted by the live model. If required but unclear, ask instead of inventing one. |
| `isActive` | Must be `true` for a published record to appear in the site's project queries. A saved draft remains unpublished regardless of this flag. |
| `isFeatured` | Preserve on updates. Default new records to `false` unless homepage placement is requested. The homepage shows at most three active featured records, newest project date first. |

Use the available facts to cover the activity, date/place, club role, partners, and documented result. Use Markdown sections only when the report needs them; the page already supplies the title. Keep editorial source notes separate from public copy unless a public source link is useful.

Inspect each proposed image and its context. Use real project photographs, not generated documentary evidence. Flag uncertain publication rights, sensitive personal information, or unclear consent before uploading. Reuse matching CMS assets where suitable; changing a shared asset can change other pages, so create a project-specific asset when that is the approved intent.

Present a compact review packet: new entry or existing entry link, target environment/locale, field values, Markdown body, ordered images/captions, intended URL, and active/featured flags. For an update, show the changes and identify any pre-existing unpublished edits. Keep unrelated fields and locales intact.

## Save or publish only the approved scope

Resolve the requested endpoint before remote writes:

- **Draft/prepare:** produce content in chat or a local file. Save a CMS draft only when the user requests or approves that remote save. Keep new entries and new assets unpublished. For an existing published entry, save changes without publishing them; leave its current live version available.
- **Publish:** proceed when the user has explicitly approved the exact content or identified existing draft for publication in the confirmed target. Otherwise ask for approval of the review packet. Approval to create this skill is not approval to publish a project.

When using the web app, treat edits as remote writes because autosave can persist them. When using the API, consult the current official [CMA update/version rules](https://www.contentful.com/developers/docs/references/content-management-api/overview/) and [entry publishing rules](https://www.contentful.com/developers/docs/references/content-management-api/entries/). Fetch before update, preserve all unaffected fields/locales and metadata, and use the current version. A full update does not merge omitted fields. On a version conflict, reread and reconcile; stop for approval if the scope changed. Publishing an existing entry can expose other pending edits, so include those in the approval or stop.

Upload only approved files. Follow [Contentful asset processing and publication](https://www.contentful.com/developers/docs/references/content-management-api/assets/): create or reuse assets, process new files, and verify processing completed. For a publish action, publish the required approved assets before publishing the entry. Apply the target's actual locale settings; do not assume `en-US`.

Record returned entry/asset IDs and versions. After a timeout or uncertain write result, read the same resource before retrying. Do not blindly repeat creation or publication. Report partial completion and stop if state cannot be established. Leave unrelated entries, shared assets, content models, Git branches, and deployments unchanged. No delete, unpublish, archive, or rollback without a separate request.

## Verify the result

For a CMS draft, reread the saved fields, image links, and publication state. Return the editor link. Label a new entry **draft, not live**; label edits to a published entry **unpublished changes; previous version remains live**. A preview is not publication evidence.

For publication:

1. Reread CMS publication state and confirm the approved fields and assets are available through the configured Delivery API when accessible.
2. Check the actual website's `/service-projects` listing and `/service-projects/{slug}`. Verify the detail response is successful, the body is present, and the date, place, partners, image URLs, and gallery match. Inspect desktop and narrow-screen rendering when browser tools are available.
3. Check the canonical URL, `og:title`, `og:description`, and `og:image`. If featured, check homepage eligibility against the three-record limit. Check `/sitemap.xml`; its current response has a one-hour public cache.

If the CMS is published but the website has not updated, report those states separately. Check the target environment and cache behavior; do not republish repeatedly or trigger a deployment as a workaround. End with the editor link, live URL or pending check, publication state, and verification gaps. Keep any required handoff local and free of credentials.
