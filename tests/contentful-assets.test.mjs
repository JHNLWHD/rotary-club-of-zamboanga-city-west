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

function load(path, imports = {}) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (id) => imports[id] ?? require(id),
    console: { error() {}, log() {} },
  });
  return exports;
}

function apiFor(getEntries) {
  return load("../app/lib/contentful-api.ts", { "./contentful": { contentfulClient: { getEntries } } });
}

function render(Component, props) {
  return renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(Component, props)));
}

function routeView(path, imports = {}) {
  let loaderData;
  const route = load(path, {
    "react-router": {
      ...require("react-router"),
      useLoaderData: () => loaderData,
      useRouteLoaderData: () => ({ contactData: null }),
    },
    ...imports,
  });
  return {
    ...route,
    render(data) {
      loaderData = data;
      return render(route.default);
    },
  };
}

const imageUrl = "https://images.ctfassets.net/test/water.jpg";
const imageMetadata = { url: imageUrl, title: "Water handover", description: "A community project", width: 1200, height: 800 };
function asset(url = "//images.ctfassets.net/test/water.jpg") {
  return { fields: { title: imageMetadata.title, description: imageMetadata.description, file: { url, details: { image: { width: 1200, height: 800 } } } } };
}
const unresolvedAsset = { sys: { type: "Link", linkType: "Asset", id: "unpublished-image" } };
const unusableAssets = [undefined, null, unresolvedAsset, { fields: {} }, { fields: { file: {} } }, asset(""), asset("  \t\n"), asset(42)];
function entry(fields = {}) {
  return {
    sys: { id: "project-1" },
    fields: {
      title: "Clean Water", slug: "clean-water", shortDescription: "Project summary", description: "Project report",
      date: "2026-10-02", location: "Zamboanga City", category: "Water", partners: [], hashtags: [],
      isActive: true, isFeatured: true, ...fields,
    },
  };
}
const imageSources = (html) => Array.from(html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"/g), (match) => match[1]);

const projectFetches = [
  ["fetchFeaturedProjectHighlights", [], { content_type: "serviceProject", "fields.isActive": true, "fields.isFeatured": true, limit: 3, order: ["-fields.date"] }],
  ["fetchAllProjects", [], { content_type: "serviceProject", "fields.isActive": true, order: ["-fields.date"] }],
  ["fetchProjectBySlug", ["clean-water"], { content_type: "serviceProject", "fields.isActive": true, "fields.slug": "clean-water", limit: 1 }],
];

for (const [method, args, expectedQuery] of projectFetches) {
  test(`${method} preserves valid metadata, project fields, URLs, and query options`, async () => {
    for (const rawUrl of ["//images.ctfassets.net/test/water.jpg", imageUrl, "http://images.ctfassets.net/test/water.jpg"]) {
      const raw = entry({ headerImage: asset(rawUrl), gallery: [asset(rawUrl), unresolvedAsset, null] });
      const rawBefore = JSON.stringify(raw);
      const queries = [];
      const api = apiFor(async (query) => { queries.push(JSON.parse(JSON.stringify(query))); return { items: [raw] }; });
      const result = await api[method](...args);
      const project = Array.isArray(result) ? result[0] : result;
      const expectedImage = { ...imageMetadata, url: rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl };
      assert.deepEqual({ ...project.headerImage }, expectedImage);
      assert.deepEqual(Array.from(project.gallery, (image) => image && { ...image }), [expectedImage, null, null]);
      for (const [key, value] of Object.entries(raw.fields)) {
        if (!["headerImage", "gallery", "slug"].includes(key)) assert.deepEqual(project[key], value);
      }
      assert.equal(project.id, raw.sys.id);
      assert.equal(project.slug, "/service-projects/clean-water");
      assert.deepEqual(queries, [expectedQuery]);
      assert.equal(JSON.stringify(raw), rawBefore, "Raw CMS data must stay unchanged");
    }
  });

  test(`${method} returns null for unusable assets and keeps gallery positions and slug fallback`, async () => {
    for (const headerImage of unusableAssets) {
      const api = apiFor(async () => ({ items: [entry({ slug: undefined, headerImage, gallery: [asset(), ...unusableAssets] })] }));
      const result = await api[method](...args);
      const project = Array.isArray(result) ? result[0] : result;
      assert.equal(project.headerImage, null);
      assert.deepEqual({ ...project.gallery[0] }, imageMetadata);
      assert.deepEqual(Array.from(project.gallery.slice(1)), unusableAssets.map(() => null));
      assert.equal(project.slug, "/service-projects/clean-water");
    }
    const api = apiFor(async () => ({ items: [entry()] }));
    const result = await api[method](...args);
    const project = Array.isArray(result) ? result[0] : result;
    assert.equal(project.headerImage, null);
    assert.equal(project.gallery.length, 0);
  });
}

const imageFallback = load("../app/lib/project-image-fallback.ts");
const imageImports = { "~/lib/project-image-fallback": imageFallback };
const card = load("../app/components/ui/ProjectCard.tsx", imageImports);
const hero = load("../app/components/homepage/HeroSection.tsx", imageImports);
const highlights = load("../app/components/homepage/ProjectHighlightsSection.tsx", { "../ui/ProjectCard": card });

for (const [name, path] of [
  ["ProjectCard", "../app/components/ui/ProjectCard.tsx"],
  ["HeroSection", "../app/components/homepage/HeroSection.tsx"],
]) {
  test(`${name} recovers image errors before and after hydration without retrying a failed fallback`, () => {
    let imageProps;
    const observed = load(path, {
      ...imageImports,
      "@chakra-ui/react": {
        ...require("@chakra-ui/react"),
        Image: (props) => { imageProps = props; return createElement("img", { src: props.src, alt: props.alt }); },
      },
    });
    for (const phase of ["ref", "onError"]) {
      for (const source of [imageUrl, "/rotary-zc-west.jpg"]) {
        const props = name === "ProjectCard"
          ? { project: { ...entry().fields, headerImage: { url: source } } }
          : { image: source, imageAlt: "Featured project" };
        render(observed[name], props);
        assert.equal(typeof imageProps.onError, "function", "The rendered image must handle load failures");
        assert.equal(typeof imageProps.ref, "function", "Hydration must check for an earlier image failure");
        let currentSource = imageProps.src;
        let assignments = 0;
        const currentTarget = {
          complete: false,
          naturalWidth: 0,
          getAttribute: (name) => name === "src" ? currentSource : null,
          set src(value) { currentSource = value; assignments++; },
        };
        imageProps.ref(null);
        imageProps.ref(currentTarget);
        assert.equal(assignments, 0, "An image still loading must keep its source");
        currentTarget.complete = true;
        currentTarget.naturalWidth = 800;
        imageProps.ref(currentTarget);
        assert.equal(assignments, 0, "A loaded image must keep its source");
        currentTarget.naturalWidth = 0;
        if (phase === "ref") imageProps.ref(currentTarget);
        else imageProps.onError({ currentTarget });
        assert.equal(currentSource, "/rotary-zc-west.jpg");
        imageProps.onError({ currentTarget });
        assert.equal(assignments, source === "/rotary-zc-west.jpg" ? 0 : 1);
      }
    }
  });
}

test("featured project cards render the existing fallback for unusable header assets", async () => {
  for (const headerImage of unusableAssets) {
    const api = apiFor(async () => ({ items: [entry({ headerImage })] }));
    const projects = await api.fetchFeaturedProjectHighlights();
    const html = render(highlights.ProjectHighlightsSection, { projects, viewAllLink: "/service-projects" });
    assert.deepEqual(imageSources(html), ["/rotary-zc-west.jpg"]);
    assert.match(html, /href="\/service-projects\/clean-water"/);
  }
});

test("the project listing renders the existing fallback through its fetch and route interfaces", async () => {
  for (const headerImage of unusableAssets) {
    const api = apiFor(async () => ({ items: [entry({ headerImage })] }));
    const route = routeView("../app/routes/service-projects.tsx", {
      "../lib/contentful-api": api,
      "../components/ui/ProjectCard": card,
      "../components/ui/PageHero": { PageHero: () => null },
    });
    const data = await route.loader({ request: new Request("https://rotaryzcwest.org/service-projects") });
    assert.deepEqual(imageSources(route.render(data)), ["/rotary-zc-west.jpg"]);
  }
});

test("the homepage hero retains its project, carousel, background, and local image choices", async () => {
  const home = routeView("../app/routes/home_.tsx", {
    "../lib/contentful-api": {},
    "../components/homepage/HeroSection": hero,
    "../components/homepage/ProjectHighlightsSection": highlights,
    "../components/homepage/StatsSection": { StatsSection: () => null },
    "../components/homepage/ContactSection": { ContactSection: () => null },
  });
  for (const [headerImage, carouselImages, backgroundImage, expected] of [
    [asset(), [asset("//images.ctfassets.net/test/carousel.jpg")], asset("//images.ctfassets.net/test/background.jpg"), imageUrl],
    [unresolvedAsset, [unresolvedAsset, asset("//images.ctfassets.net/test/carousel.jpg")], asset(), "https://images.ctfassets.net/test/carousel.jpg"],
    [unresolvedAsset, [unresolvedAsset, asset("")], asset("//images.ctfassets.net/test/background.jpg"), "https://images.ctfassets.net/test/background.jpg"],
    [unresolvedAsset, [unresolvedAsset, asset("")], unresolvedAsset, "/rotary-zc-west.jpg"],
  ]) {
    const api = apiFor(async (query) => ({ items: [entry(query.content_type === "homepageHero" ? { carouselImages, backgroundImage } : { headerImage })] }));
    const homepageData = { hero: await api.fetchHomepageHeroSection(), projectHighlights: await api.fetchFeaturedProjectHighlights() };
    const html = home.render({ homepageData });
    const sources = imageSources(html);
    assert.equal(sources[0], expected);
    assert.equal(sources.length, 2);
    assert.ok(sources.every(Boolean));
  }
});

test("project detail images and lightbox slides retain valid images and missing-image fallbacks", async () => {
  let slides;
  const detail = routeView("../app/routes/service-projects.$slug.tsx", {
    "../lib/contentful-api": {},
    "../components/ui/ShareModal": { default: () => null },
    "yet-another-react-lightbox": { default: (props) => { slides = props.slides; return null; } },
    "yet-another-react-lightbox/plugins": {},
    "yet-another-react-lightbox/styles.css": {},
    "yet-another-react-lightbox/plugins/captions.css": {},
    "yet-another-react-lightbox/plugins/thumbnails.css": {},
    "react-markdown": { default: () => null },
    "remark-gfm": { default: () => null },
  });
  for (const headerImage of [asset(), ...unusableAssets]) {
    const api = apiFor(async () => ({ items: [entry({ headerImage, gallery: [asset(), ...unusableAssets] })] }));
    const project = await api.fetchProjectBySlug("clean-water");
    const html = detail.render({ project, relatedProjects: [] });
    assert.deepEqual(imageSources(html), [headerImage?.fields?.file?.url === "//images.ctfassets.net/test/water.jpg" ? imageUrl : "/logo.png", imageUrl, ...unusableAssets.map(() => "/logo.png")]);
    assert.deepEqual({ ...slides[0] }, { src: imageUrl, alt: imageMetadata.title, title: imageMetadata.title, description: imageMetadata.description });
    for (let index = 1; index < slides.length; index++) {
      assert.deepEqual({ ...slides[index] }, { src: "/logo.png", alt: `Clean Water - Photo ${index + 1}`, title: `Clean Water - Photo ${index + 1}`, description: "" });
    }
  }
});

test("other shared asset-converter callers preserve valid image metadata", async () => {
  const api = apiFor(async () => ({ items: [entry({
    backgroundImage: asset(), carouselImages: [asset()], image: asset(), photo: asset(), type: "Executive",
    serviceAreas: [entry({ icon: asset() })], clubLeadership: [entry({ photo: asset() })],
  })] }));
  const assets = [
    (await api.fetchHomepageHeroSection()).backgroundImage,
    (await api.fetchHomepageHeroSection()).carouselImages[0],
    (await api.fetchHomepageServiceAreasSection())[0].icon,
    (await api.fetchFeaturedEvents())[0].image,
    (await api.fetchAllEvents())[0].image,
    (await api.fetchFeaturedOfficers())[0].photo,
    (await api.fetchOfficersByType("Executive"))[0].photo,
    (await api.fetchRotaryAnnsByType("Executive"))[0].photo,
    (await api.fetchAllRotaryAnns()).executives[0].photo,
    (await api.fetchRotaractClubOfSouthernCityColleges()).clubLeadership[0].photo,
    (await api.fetchInteractClubOfZamboangaCityWest()).clubLeadership[0].photo,
  ];
  for (const image of assets) assert.deepEqual({ ...image }, imageMetadata);
});

test("Fortress downloads preserve valid file URLs and metadata without image dimensions", async () => {
  for (const rawUrl of ["//assets.ctfassets.net/test/fortress.pdf", "https://assets.ctfassets.net/test/fortress.pdf"]) {
    const api = apiFor(async () => ({ items: [entry({ file: { fields: { title: "October issue", description: "Club publication", file: { url: rawUrl, details: { size: 2048 } } } } })] }));
    const issue = (await api.fetchTheFortress())[0];
    assert.deepEqual({ ...issue.file }, { url: "https://assets.ctfassets.net/test/fortress.pdf", title: "October issue", description: "Club publication", width: undefined, height: undefined });
  }
});
