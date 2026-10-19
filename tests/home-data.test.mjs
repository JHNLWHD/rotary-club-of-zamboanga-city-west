import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { Children, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const { ChakraProvider, defaultSystem } = require("@chakra-ui/react");

function load(path, imports = {}, preview = false) {
  // Stub Vite's development flag so the real root module can run as CommonJS.
  const source = readFileSync(new URL(path, import.meta.url), "utf8").replaceAll("import.meta.env.DEV", "false").replaceAll("import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW", JSON.stringify(String(preview)));
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    URL,
    require: (id) => imports[id] ?? (id === "~/lib/contentful-image" ? load("../app/lib/contentful-image.ts") : require(id)),
    console: { error() {}, log() {} },
  });
  return exports;
}

const sections = {};
for (const name of ["ContactSection", "HeroSection", "ProjectHighlightsSection", "StatsSection"]) {
  sections[`../components/homepage/${name}`] = load(`../app/components/homepage/${name}.tsx`, {
    "../ui/ProjectCard": { ProjectCard: () => null },
    "~/lib/project-image-fallback": load("../app/lib/project-image-fallback.ts"),
  });
}

const contactData = {
  meetingInfo: { day: "Friday", time: "6 PM", location: "Root club venue", address: "Zamboanga City" },
  contactInfo: { email: "root@example.org", facebookUrl: "https://example.org/root", facebookHandle: "Root club" },
};

function homepage(homepageData = null, rootContact = contactData, api = {}, preview = false) {
  return load("../app/routes/home_.tsx", {
    ...sections,
    "../lib/contentful-api": api,
    "react-router": {
      useLoaderData: () => ({ homepageData }),
      useRouteLoaderData: (routeId) => {
        assert.equal(routeId, "root");
        return { contactData: rootContact };
      },
    },
  }, preview);
}

function contentfulApi(getEntries) {
  return load("../app/lib/contentful-api.ts", {
    "./contentful": { contentfulClient: { getEntries } },
    "./service-project-contentful.server": { getServiceProjectClient: () => ({ getEntries }) },
  });
}

function render(Component) {
  return renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(Component)));
}

test("initial homepage loaders query only hero, latest projects, and root contact once", async () => {
  const queries = [];
  const entry = (id, fields) => ({ sys: { id }, fields });
  const entries = {
    homepageHero: [entry("hero", { title: "Club hero" })],
    serviceProject: [entry("project", { title: "Featured project", slug: "featured-project", location: "Zamboanga City" })],
    homepageContact: [entry("contact", contactData)],
  };
  const api = contentfulApi(async (query) => {
    queries.push(query);
    return { items: entries[query.content_type] ?? [] };
  });
  const root = load("../app/root.tsx", {
    "./lib/contentful-api": api,
    "./app.css?url": {},
    "./components/ui/Provider": {},
    "./components/ui/PostHogProvider": {},
    "./components/ui/GlobalLayout": {},
    sonner: {},
  });
  const [rootData, homeData] = await Promise.all([root.loader({}), homepage(null, null, api).loader({})]);
  assert.equal(queries.length, 3);
  assert.deepEqual(queries.map((query) => query.content_type).sort(), ["homepageContact", "homepageHero", "serviceProject"]);
  for (const query of queries) assert.equal(query["fields.isActive"], true);
  const latestQuery = queries.find((query) => query.content_type === "serviceProject");
  assert.equal(latestQuery["fields.isFeatured"], undefined);
  assert.equal(latestQuery.limit, 3);
  assert.deepEqual(Array.from(latestQuery.order), ["-fields.date"]);
  assert.deepEqual(Object.keys(homeData.homepageData).sort(), ["hero", "projectHighlights"]);
  assert.equal(homeData.homepageData.hero.title, "Club hero");
  assert.equal(homeData.homepageData.projectHighlights[0].slug, "/service-projects/featured-project");
  assert.equal(rootData.contactData.contactInfo, contactData.contactInfo);
  const html = render(homepage(homeData.homepageData, rootData.contactData).default);
  assert.match(html, /mailto:root@example\.org/);
  assert.equal(queries.length, 3, "Rendering must reuse loader data without another CMS read");
});

test("homepage includes the latest active projects even when they are not featured", async () => {
  const entry = (id, date, isFeatured, isActive = true) => ({
    sys: { id },
    fields: { title: id, slug: id, date, isActive, isFeatured,
      headerImage: { fields: { file: { url: `//images.ctfassets.net/test/${id}.png` } } } },
  });
  const entries = [
    entry("old-featured", "2025-07-23", true),
    entry("second", "2026-09-23", false),
    entry("third", "2026-08-20", false),
    entry("inactive", "2026-10-19", true, false),
    entry("latest", "2026-09-26", false),
  ];
  const api = contentfulApi(async (query) => ({
    items: query.content_type === "serviceProject" ? entries
      .filter(({ fields }) => fields.isActive === query["fields.isActive"])
      .filter(({ fields }) => query["fields.isFeatured"] === undefined || fields.isFeatured === query["fields.isFeatured"])
      .sort((a, b) => query.order?.[0] === "-fields.date" ? b.fields.date.localeCompare(a.fields.date) : 0)
      .slice(0, query.limit) : [],
  }));
  const data = await homepage(null, null, api).loader({});
  assert.deepEqual(Array.from(data.homepageData.projectHighlights, (project) => project.id), ["latest", "second", "third"]);
  const html = render(homepage(data.homepageData, null).default);
  assert.equal(new URL(html.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1]).pathname, "/test/latest.png");
});

test("homepage draft preview labels unpublished project content and blocks indexing", () => {
  const data = { projectHighlights: [{ title: "New project", headerImage: { url: "https://example.org/project.png" } }] };
  const route = homepage(data, null, {}, true);
  const html = render(route.default);
  assert.match(html, /Project \/ Draft preview/);
  assert.match(html, /Latest projects \/ Draft preview/);
  assert.doesNotMatch(html, /Project \/ Published|Published initiatives/);
  assert.equal(route.meta().find((tag) => tag.name === "robots").content, "noindex, nofollow");
});

test("dedicated content reads remain available outside the homepage aggregate", async () => {
  const types = [];
  const api = contentfulApi(async (query) => {
    types.push(query.content_type);
    return { items: [] };
  });
  await Promise.all([
    api.fetchAllEvents(),
    api.fetchAllOfficers(),
    api.fetchFeaturedEvents(),
    api.fetchFeaturedOfficers(),
    api.fetchHomepageStatisticsSection(),
    api.fetchHomepageServiceAreasSection(),
  ]);
  assert.deepEqual(types.sort(), ["event", "event", "homepageServiceAreas", "homepageStats", "officers", "officers", "officers", "officers"]);
});

test("hero renders the latest project, usable carousel, background, and local image fallbacks in order", () => {
  const hero = {
    carouselImages: [null, { url: "" }, { url: "https://example.org/carousel.jpg" }],
    backgroundImage: { url: "https://example.org/background.jpg" },
  };
  const project = { title: "Featured project", headerImage: { url: "https://example.org/project.jpg" } };
  for (const [data, expected] of [
    [{ hero, projectHighlights: [project] }, project.headerImage.url],
    [{ hero, projectHighlights: [{ ...project, headerImage: null }] }, hero.carouselImages[2].url],
    [{ hero: { ...hero, carouselImages: [null, { url: "" }] } }, hero.backgroundImage.url],
    [{ hero: { carouselImages: [], backgroundImage: null } }, "/rotary-zc-west.jpg"],
    [null, "/rotary-zc-west.jpg"],
  ]) {
    const html = render(homepage(data, null).default);
    assert.equal(html.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1], expected);
    assert.match(html, /Service,/);
  }
});

test("latest records and statistics still use the same project data", () => {
  const projects = [
    { title: "First", location: " Barangay One " },
    { title: "Second", location: "Barangay One" },
    { title: "Third", location: " Barangay Two " },
  ];
  const children = Children.toArray(homepage({ projectHighlights: projects }).default().props.children);
  const stats = children.find((child) => child.type === sections["../components/homepage/StatsSection"].StatsSection);
  assert.deepEqual(Array.from(stats.props.stats, (stat) => [stat.value, stat.label]), [
    ["3", "Latest project records"], ["2", "Locations represented"], ["1971", "Charter year"],
  ]);
  const highlights = children.find((child) => child.type === sections["../components/homepage/ProjectHighlightsSection"].ProjectHighlightsSection);
  assert.equal(highlights.props.projects, projects);
  assert.equal(highlights.props.viewAllLink, "/service-projects");
});

test("root contact renders on the homepage with the native accessible inquiry form", () => {
  const html = render(homepage({ contact: {
    meetingInfo: contactData.meetingInfo,
    contactInfo: { ...contactData.contactInfo, email: "route@example.org" },
  } }).default);
  assert.match(html, /Root club venue/);
  assert.match(html, /href="mailto:root@example\.org"/);
  assert.match(html, /href="https:\/\/example\.org\/root"/);
  assert.doesNotMatch(html, /route@example\.org/);
  const form = html.match(/<form\b[\s\S]*?<\/form>/)?.[0];
  assert.ok(form);
  for (const attribute of ['name="contact"', 'method="POST"', 'action="/thank-you"', 'data-netlify="true"', 'data-netlify-honeypot="bot-field"']) {
    assert.ok(form.includes(attribute), attribute);
  }
  const names = [...form.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)].map((match) => match[1]).sort();
  assert.deepEqual(names, ["bot-field", "email", "form-name", "message", "name"]);
  for (const field of ["name", "email", "message"]) {
    assert.ok(form.includes(`for="contact-${field}"`));
    assert.match(form.match(new RegExp(`<(?:input|textarea)\\b[^>]*id="contact-${field}"[^>]*>`))?.[0] ?? "", /required=""/);
  }
  assert.match(readFileSync(new URL("../public/thank-you/index.html", import.meta.url), "utf8"), /Thank you for reaching out/);
});

test("missing or partial root contact keeps the homepage contact fallback", () => {
  for (const rootContact of [null, {}, { meetingInfo: contactData.meetingInfo }, { contactInfo: contactData.contactInfo }]) {
    const html = render(homepage({ contact: contactData }, rootContact).default);
    assert.match(html, /Contact the club/);
    assert.match(html, /href="mailto:rotaryzcwest@gmail\.com"/);
    assert.doesNotMatch(html, /<form\b/);
  }
  const html = render(homepage(null, null).default);
  assert.match(html, /Project records are being prepared for publication/);
});

test("homepage loader failure keeps local content and available root contact", async () => {
  const route = homepage(null, contactData, { fetchAllHomepageSections: async () => { throw new Error("CMS unavailable"); } });
  const data = await route.loader({});
  assert.equal(data.homepageData, null);
  const html = render(homepage(data.homepageData).default);
  assert.match(html, /src="\/rotary-zc-west\.jpg"/);
  assert.match(html, /<form\b/);
  assert.match(html, /mailto:root@example\.org/);
});
