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

function projectRoute(getEntries) {
  // Use the actual CMS adapter as well as the loader: a swallowed CMS error is the regression.
  const api = load("../app/lib/contentful-api.ts", { "./contentful": { contentfulClient: { getEntries } } });
  let loaderData;
  const route = load("../app/routes/service-projects.$slug.tsx", {
    "../lib/contentful-api": api,
    "react-router": { ...require("react-router"), useLoaderData: () => loaderData },
    "../components/ui/ShareModal": { default: () => null },
    "yet-another-react-lightbox": { default: () => null },
    "yet-another-react-lightbox/plugins": {},
    "yet-another-react-lightbox/styles.css": {},
    "yet-another-react-lightbox/plugins/captions.css": {},
    "yet-another-react-lightbox/plugins/thumbnails.css": {},
    "react-markdown": { default: () => null },
    "remark-gfm": { default: () => null },
  });
  return {
    ...route,
    render(data) {
      loaderData = data;
      return renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(route.default)));
    },
  };
}

test("a failed CMS lookup returns 503, not a permanent project 404", async () => {
  const route = projectRoute(async () => { throw new Error("CMS unavailable"); });
  const response = await route.loader({ params: { slug: "valid-project" } });
  assert.equal(response.init.status, 503);
  assert.equal(response.data.project, null);
  assert.match(route.meta({ data: response.data })[0].title, /temporarily unavailable/i);
  const html = route.render(response.data);
  assert.match(html, /temporarily unavailable/i);
  assert.doesNotMatch(html, /Project Not Found|doesn&#x27;t exist|has been removed/);
});

test("a confirmed missing project still returns a non-indexed 404", async () => {
  const route = projectRoute(async () => ({ items: [] }));
  const response = await route.loader({ params: { slug: "unknown-project" } });
  assert.equal(response.init.status, 404);
  assert.ok(route.meta({ data: response.data }).some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
  assert.match(route.render(response.data), /Project Not Found/);
});

test("a loaded project stays available when only the related-project query fails", async () => {
  const route = projectRoute(async (query) => {
    if (!query["fields.slug"]) throw new Error("Related projects unavailable");
    return { items: [{ sys: { id: "project-1" }, fields: { title: "A real project", slug: "valid-project" } }] };
  });
  const response = await route.loader({ params: { slug: "valid-project" } });
  assert.equal(response.project.slug, "/service-projects/valid-project");
  assert.equal(response.relatedProjects.length, 0);
  assert.ok(route.meta({ data: response }).some((entry) => entry.rel === "canonical" && entry.href.endsWith("/valid-project")));
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
