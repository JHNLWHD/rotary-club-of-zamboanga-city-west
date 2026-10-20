import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const { ChakraProvider, defaultSystem } = require("@chakra-ui/react");

function load(path, imports = {}, globals = {}) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8").replaceAll("import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW", '"false"'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    URL,
    Headers,
    require: (id) => imports[id] ?? (id.startsWith("~/lib/") ? load(`../app/lib/${id.slice(6)}.ts`) : require(id)),
    console: { error() {}, log() {} },
    ...globals,
  });
  return exports;
}

function projectApi(getEntries) {
  return load("../app/lib/contentful-api.ts", {
    "./contentful": { contentfulClient: { getEntries } },
    "./service-project-contentful.server": { getServiceProjectClient: () => ({ getEntries }) },
  });
}

function projectRoute(getEntries, path = "../app/routes/service-projects.$slug.tsx") {
  // Use the actual CMS adapter as well as the loader: a swallowed CMS error is the regression.
  const api = projectApi(getEntries);
  let loaderData;
  const route = load(path, {
    "../lib/contentful-api": api,
    "~/lib/contentful-api": api,
    "react-router": { ...require("react-router"), useLoaderData: () => loaderData },
    "../components/ui/PageHero": load("../app/components/ui/PageHero.tsx"),
    "~/components/ui/PageHero": load("../app/components/ui/PageHero.tsx"),
    "~/components/ui/ComingSoon": load("../app/components/ui/ComingSoon.tsx"),
    "../components/ui/ProjectCard": load("../app/components/ui/ProjectCard.tsx", {
      "~/lib/project-image-fallback": load("../app/lib/project-image-fallback.ts"),
    }),
    "../components/ui/ShareModal": { default: () => null },
    "yet-another-react-lightbox": { default: () => null },
    "yet-another-react-lightbox/plugins": {},
    "yet-another-react-lightbox/styles.css": {},
    "yet-another-react-lightbox/plugins/captions.css": {},
    "yet-another-react-lightbox/plugins/thumbnails.css": {},
    "react-markdown": { default: () => null },
    "remark-gfm": { default: () => null },
  }, { Response });
  return {
    ...route,
    render(data) {
      loaderData = data;
      return renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(route.default)));
    },
  };
}

test("a failed board archive query returns an uncached 503 without claiming an empty archive or requesting deindexing", async () => {
  const route = projectRoute(async () => { throw new Error("Private CMS failure details"); }, "../app/routes/about.board-resolutions.tsx");
  const response = await route.loader();
  assert.equal(response.init?.status ?? 200, 503);
  assert.equal(new Headers(response.init.headers).get("Cache-Control"), "no-store");
  for (const parentHeaders of [new Headers(), new Headers({ "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" })]) {
    const documentHeaders = route.headers({ loaderHeaders: new Headers(response.init.headers), parentHeaders });
    assert.equal(documentHeaders.get("Cache-Control"), "no-store");
    assert.equal(documentHeaders.get("X-Robots-Tag"), parentHeaders.get("X-Robots-Tag"));
  }
  const metadata = route.meta({ data: response.data });
  assert.equal(metadata.find((item) => item.name === "robots").content, "index, follow");
  assert.match(metadata.find((item) => item.name === "description").content, /temporarily unavailable/i);
  assert.equal(metadata.find((item) => item.rel === "canonical").href, "https://rotaryzcwest.org/about/board-resolutions");
  const html = route.render(response.data);
  assert.match(html, /role="status"/);
  assert.match(html, /temporarily unavailable/i);
  assert.doesNotMatch(html + JSON.stringify(metadata), /no (board )?resolutions are (currently )?published|archive is being prepared|Private CMS failure details/i);
});

test("successful board archive queries preserve records, empty states, and their indexing policy", async () => {
  const record = { sys: { id: "resolution-1" }, fields: {
    resolutionNumber: "2026-001", title: "An actual governance record", dateSigned: "2026-10-01", googleDriveLink: "https://example.com/resolution.pdf",
  } };
  for (const items of [[], [record]]) {
    const route = projectRoute(async () => ({ items }), "../app/routes/about.board-resolutions.tsx");
    const response = await route.loader();
    assert.equal(response.init?.status ?? 200, 200);
    assert.equal(response.boardResolutions.length, items.length);
    const metadata = route.meta({ data: response });
    assert.equal(metadata.find((item) => item.name === "robots").content, items.length ? "index, follow" : "noindex, follow");
    const html = route.render(response);
    assert.match(html, items.length ? /An actual governance record/ : /No resolutions are currently published/);
    assert.doesNotMatch(html, /temporarily unavailable/i);
    if (items.length) assert.equal(response.boardResolutions[0].googleDriveLink, record.fields.googleDriveLink);
  }
});

test("project social metadata keeps its CMS photo and uses the serving site's artwork only as a fallback", () => {
  const route = projectRoute(async () => ({ items: [] }));
  for (const siteOrigin of ["https://develop--rotaryzcwest.netlify.app", "https://rotaryzcwest.org"]) {
    for (const headerImage of [null, { url: "https://images.ctfassets.net/space/project/header.jpg" }]) {
      const metadata = route.meta({
        data: { project: { title: "Clean Water", slug: "/service-projects/clean-water", shortDescription: "Water supply project", headerImage } },
        matches: [{ id: "root", data: { siteOrigin } }],
      });
      assert.equal(metadata.find((tag) => tag.property === "og:image").content,
        headerImage?.url || `${siteOrigin}/og-image.jpg?v=redesign-2026`);
      assert.equal(metadata.find((tag) => tag.rel === "canonical").href, "https://rotaryzcwest.org/service-projects/clean-water");
    }
  }
});

test("rendered project structured data cannot close its script element from CMS text", async () => {
  const title = 'Clean Water </script><script>alert("test")</script>';
  const route = projectRoute(async () => ({ items: [{ sys: { id: "project-1" }, fields: { title, slug: "clean-water", date: "2026-10-01" } }] }));
  const data = await route.loader({ params: { slug: "clean-water" } });
  const html = route.render(data);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  assert.equal(scripts.length, 1);
  assert.equal(JSON.parse(scripts[0][1])["@graph"][0].headline, title);
  assert.doesNotMatch(html, /<script>alert/);
});

test("all-project fetch distinguishes empty records, published records, and CMS failure", async () => {
  const empty = await projectApi(async () => ({ items: [] })).fetchAllProjects();
  assert.equal(empty.length, 0);
  const projects = await projectApi(async () => ({
    items: [{ sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project" } }],
  })).fetchAllProjects();
  assert.equal(projects.length, 1);
  assert.equal(projects[0].slug, "/service-projects/valid-project");
  const error = new Error("CMS unavailable");
  await assert.rejects(projectApi(async () => { throw error; }).fetchAllProjects(), (failure) => failure === error);
});

test("an empty project listing keeps HTTP 200 and its normal empty view", async () => {
  const route = projectRoute(async () => ({ items: [] }), "../app/routes/service-projects.tsx");
  const response = await route.loader({ request: { url: "https://rotaryzcwest.org/service-projects" } });
  assert.equal(response.init?.status ?? 200, 200);
  assert.equal(response.projects.length, 0);
  const html = route.render(response);
  assert.match(html, /No project records are published on this page yet/);
  assert.match(html, /Published projects/);
  assert.doesNotMatch(html, /temporarily unavailable/i);
  assert.ok(route.meta({ data: response }).some((entry) => entry.rel === "canonical" && entry.href === "https://rotaryzcwest.org/service-projects"));
});

test("a successful project listing keeps project cards and HTTP 200", async () => {
  const route = projectRoute(async () => ({
    items: [{ sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project", location: "Zamboanga City", date: "2026-10-03" } }],
  }), "../app/routes/service-projects.tsx");
  const response = await route.loader({ request: { url: "https://rotaryzcwest.org/service-projects" } });
  assert.equal(response.init?.status ?? 200, 200);
  assert.equal(response.projects.length, 1);
  const html = route.render(response);
  assert.match(html, /A real project/);
  assert.match(html, /href="\/service-projects\/valid-project"/);
  assert.doesNotMatch(html, /No project records are published|temporarily unavailable/i);
});

test("a failed project listing returns 503 without claiming zero published records", async () => {
  const route = projectRoute(async () => { throw new Error("Private CMS error details"); }, "../app/routes/service-projects.tsx");
  const response = await route.loader({ request: { url: "https://rotaryzcwest.org/service-projects" } });
  assert.equal(response.init.status, 503);
  assert.equal(response.data.projects.length, 0);
  const metadata = route.meta({ data: response.data });
  assert.match(metadata[0].title, /temporarily unavailable/i);
  assert.ok(metadata.some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
  const html = route.render(response.data);
  assert.match(html, /temporarily unavailable/i);
  assert.match(html, /role="status"/);
  assert.doesNotMatch(html, /No project records are published|Published projects|Locations represented|Private CMS error details/);
  assert.doesNotMatch(JSON.stringify(metadata), /Private CMS error details/);
});

test("an empty project query keeps the successful static sitemap and cache policy", async () => {
  const route = projectRoute(async () => ({ items: [] }), "../app/routes/sitemap[.]xml.tsx");
  const response = await route.loader();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "application/xml; charset=utf-8");
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=3600");
  const xml = await response.text();
  assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [
    "https://rotaryzcwest.org/",
    "https://rotaryzcwest.org/service-projects",
    "https://rotaryzcwest.org/about/leadership",
    "https://rotaryzcwest.org/about/foundation-giving",
    "https://rotaryzcwest.org/about/calendar",
    "https://rotaryzcwest.org/about/history",
    "https://rotaryzcwest.org/contact",
    "https://rotaryzcwest.org/the-fortress",
    "https://rotaryzcwest.org/new-generation/rotaract-southern-city-colleges",
    "https://rotaryzcwest.org/new-generation/interact-zamboanga-city-west",
  ]);
  assert.doesNotMatch(xml, /<lastmod>/);
});

test("a successful sitemap escapes URLs without treating activity dates as modifications", async () => {
  const route = projectRoute(async () => ({ items: [
    { sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project", date: "2026-10-03" } },
    { sys: { id: "project-2" }, fields: { title: "Another project", slug: "a&b<'\">", date: "not a date" } },
  ] }), "../app/routes/sitemap[.]xml.tsx");
  const response = await route.loader();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=3600");
  const xml = await response.text();
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(xml, /<loc>https:\/\/rotaryzcwest\.org\/service-projects\/valid-project<\/loc>/);
  assert.match(xml, /<loc>https:\/\/rotaryzcwest\.org\/service-projects\/a&amp;b&lt;&apos;&quot;&gt;<\/loc>/);
  assert.equal((xml.match(/<url>/g) || []).length, 12);
  assert.doesNotMatch(xml, /<lastmod>/);
  assert.match(xml, /<\/urlset>$/);
});

test("a failed project query returns an uncached 503 instead of a partial sitemap", async () => {
  const route = projectRoute(async () => { throw new Error("Private CMS error details"); }, "../app/routes/sitemap[.]xml.tsx");
  const response = await route.loader();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  const body = await response.text();
  assert.match(body, /temporarily unavailable/i);
  assert.doesNotMatch(body, /<urlset|<url>|Private CMS error details/);
});

test("a failed CMS lookup returns 503, not a permanent project 404", async () => {
  const route = projectRoute(async () => { throw new Error("CMS unavailable"); });
  const response = await route.loader({ params: { slug: "valid-project" } });
  assert.equal(response.init.status, 503);
  assert.equal(response.data.project, null);
  assert.match(route.meta({ data: response.data })[0].title, /temporarily unavailable/i);
  assert.ok(route.meta({ data: response.data }).some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
  const html = route.render(response.data);
  assert.match(html, /temporarily unavailable/i);
  assert.doesNotMatch(html, /Project Not Found|doesn&#x27;t exist|has been removed/);
});

test("a confirmed missing project still returns a non-indexed 404", async () => {
  for (const failRelated of [false, true]) {
    const route = projectRoute(async (query) => {
      if (failRelated && !query["fields.slug"]) throw new Error("Related projects unavailable");
      return { items: [] };
    });
    const response = await route.loader({ params: { slug: "unknown-project" } });
    assert.equal(response.init.status, 404);
    assert.ok(route.meta({ data: response.data }).some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
    assert.match(route.render(response.data), /Project Not Found/);
  }
});

test("a loaded project stays available when only the related-project query fails", async () => {
  const route = projectRoute(async (query) => {
    if (!query["fields.slug"]) throw new Error("Related projects unavailable");
    return { items: [{ sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project", date: "2026-10-03" } }] };
  });
  const response = await route.loader({ params: { slug: "valid-project" } });
  assert.equal(response.init?.status ?? 200, 200);
  assert.equal(response.project.slug, "/service-projects/valid-project");
  assert.equal(response.relatedProjects.length, 0);
  assert.ok(route.meta({ data: response }).some((entry) => entry.rel === "canonical" && entry.href.endsWith("/valid-project")));
  assert.match(route.render(response), /A real project/);
});

test("successful related projects exclude the current project and retain the limit", async () => {
  const current = { sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project", date: "2026-10-03" } };
  const route = projectRoute(async (query) => ({
    items: query["fields.slug"] ? [current] : [current, ...Array.from({ length: 10 }, (_, index) => ({
      sys: { id: `related-${index}` }, fields: { title: `Related project ${index}`, slug: `related-${index}` },
    }))],
  }));
  const response = await route.loader({ params: { slug: "valid-project" } });
  assert.equal(response.init?.status ?? 200, 200);
  assert.equal(response.relatedProjects.length, 8);
  assert.ok(response.relatedProjects.every((project) => project.slug !== response.project.slug));
  assert.equal(response.relatedProjects[7].slug, "/service-projects/related-7");
  const html = route.render(response);
  assert.match(html, /Related project 4/);
  assert.doesNotMatch(html, /Related project [5-9]/);
});

test("footer year agrees across server and browser timezones at Manila New Year", () => {
  const previousTimezone = process.env.TZ;
  try {
    for (const [now, expected] of [
      ["2026-12-31T15:59:59.999Z", "2026"],
      ["2026-12-31T16:00:00.000Z", "2027"],
      ["2027-01-01T00:00:00.000Z", "2027"],
    ]) {
      for (const timezone of ["UTC", "Asia/Manila", "America/Los_Angeles"]) {
        process.env.TZ = timezone;
        class Clock extends Date {
          constructor(...args) { super(...(args.length ? args : [now])); }
        }
        const { GlobalLayout } = load("../app/components/ui/GlobalLayout.tsx", {
          "react-router": { useLocation: () => ({ pathname: "/" }) },
        }, { Date: Clock });
        const html = renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(GlobalLayout)));
        assert.equal(html.match(/©\s*(\d{4})/)?.[1], expected, `${now} in ${timezone}`);
      }
    }
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }
});

test("calendar archives yesterday at Manila midnight, independent of UTC midnight", async () => {
  const events = [
    { slug: "tomorrow", date: "2026-10-03", isFeatured: false },
    { slug: "yesterday", date: "2026-10-01T00:00:00.000Z", isFeatured: true },
    { slug: "invalid", date: "not a date" },
    { slug: "today", date: "2026-10-02", isFeatured: false },
  ];
  for (const [now, upcoming, past] of [
    ["2026-10-01T15:59:59.999Z", ["yesterday", "today", "tomorrow"], []],
    ["2026-10-01T16:00:00.000Z", ["today", "tomorrow"], ["yesterday"]],
    ["2026-10-02T00:00:00.000Z", ["today", "tomorrow"], ["yesterday"]],
    ["2026-10-02T16:00:00.000Z", ["tomorrow"], ["today", "yesterday"]],
  ]) {
    class Clock extends Date {
      constructor(...args) { super(...(args.length ? args : [now])); }
      static now() { return Date.parse(now); }
    }
    const route = load("../app/routes/about.calendar.tsx", {
      "../lib/contentful-api": { fetchAllEvents: async () => events },
      "../components/ui/PageHero": { PageHero: () => null },
    }, { Date: Clock });
    const data = await route.loader();
    assert.deepEqual(data.upcomingEvents.map((event) => event.slug), upcoming, now);
    assert.deepEqual(data.pastEvents.map((event) => event.slug), past, now);
  }
});
