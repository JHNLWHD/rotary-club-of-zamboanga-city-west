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
  const { outputText } = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (id) => imports[id] ?? require(id),
    console: { error() {}, log() {} },
    ...globals,
  });
  return exports;
}

function projectApi(getEntries) {
  return load("../app/lib/contentful-api.ts", { "./contentful": { contentfulClient: { getEntries } } });
}

function projectRoute(getEntries, path = "../app/routes/service-projects.$slug.tsx") {
  // Use the actual CMS adapter as well as the loader: a swallowed CMS error is the regression.
  const api = projectApi(getEntries);
  let loaderData;
  const route = load(path, {
    "../lib/contentful-api": api,
    "react-router": { ...require("react-router"), useLoaderData: () => loaderData },
    "../components/ui/PageHero": load("../app/components/ui/PageHero.tsx"),
    "../components/ui/ProjectCard": load("../app/components/ui/ProjectCard.tsx"),
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
  const response = await route.loader({});
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
  const response = await route.loader({});
  assert.equal(response.init?.status ?? 200, 200);
  assert.equal(response.projects.length, 1);
  const html = route.render(response);
  assert.match(html, /A real project/);
  assert.match(html, /href="\/service-projects\/valid-project"/);
  assert.doesNotMatch(html, /No project records are published|temporarily unavailable/i);
});

test("a failed project listing returns 503 without claiming zero published records", async () => {
  const route = projectRoute(async () => { throw new Error("Private CMS error details"); }, "../app/routes/service-projects.tsx");
  const response = await route.loader({});
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

test("a successful sitemap keeps escaped project URLs and valid source dates", async () => {
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
  assert.equal((xml.match(/<lastmod>/g) || []).length, 1);
  assert.match(xml, /<lastmod>2026-10-03T00:00:00\.000Z<\/lastmod>/);
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
