import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(path, imports = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8")
    .replaceAll("import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW", '"false"');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports, URL,
    require: (id) => imports[id] ?? require(id),
    console: { error() {} },
  });
  return exports;
}

const { contentfulImageUrl, responsiveImage } = load("../app/lib/contentful-image.ts");
const photo = "https://images.ctfassets.net/space/asset/photo.jpg";

test("responsive photos use Contentful WebP derivatives and preserve unrelated query parameters", () => {
  const result = responsiveImage(`${photo}?focus=faces`, [400, 800, 1200], "100vw");
  const url = new URL(result.src);
  assert.equal(url.searchParams.get("w"), "1200");
  assert.equal(url.searchParams.get("fm"), "webp");
  assert.equal(url.searchParams.get("q"), "80");
  assert.equal(url.searchParams.get("focus"), "faces");
  assert.equal(result.sizes, "100vw");
  assert.equal(result.srcSet.split(", ").length, 3);
  assert.match(result.srcSet, /400w, .*800w, .*1200w$/);
  assert.match(contentfulImageUrl("//images.eu.ctfassets.net/a/photo.PNG", 400), /^https:/);
  assert.equal(responsiveImage(result.src, [400, 800, 1200], "100vw").srcSet.split(", ").length, 3);
});

test("responsive width descriptors never exceed the original photo width", () => {
  const result = responsiveImage(photo, [400, 800, 1200], "100vw", 600);
  assert.equal(new URL(result.src).searchParams.get("w"), "600");
  assert.match(result.srcSet, /400w, .*600w$/);
  assert.equal(result.srcSet.split(", ").length, 2);
});

test("local, external, animated, vector, and malformed image sources keep their existing behavior", () => {
  for (const source of ["/logo.png", "https://example.com/photo.jpg", "https://images.ctfassets.net.evil.test/a.jpg", photo.replace("jpg", "gif"), photo.replace("jpg", "svg"), "bad url", ""]) {
    const result = responsiveImage(source, [400, 800], "100vw");
    assert.equal(result.src, source);
    assert.equal(result.srcSet, undefined);
    assert.equal(result.sizes, undefined);
  }
});

test("failed responsive project images clear candidate URLs before using the local fallback once", () => {
  const { showProjectImageFallback } = load("../app/lib/project-image-fallback.ts");
  const operations = [];
  let src = photo;
  const image = {
    complete: true, naturalWidth: 0,
    getAttribute: () => src,
    removeAttribute: (attribute) => operations.push(attribute),
    set src(value) { operations.push(value); src = value; },
  };
  showProjectImageFallback(image);
  assert.deepEqual(operations, ["srcset", "sizes", "/rotary-zc-west.jpg"]);
  showProjectImageFallback(image);
  assert.equal(operations.length, 3);
});

test("reviewed gallery labels replace numeric titles without overriding editorial labels", () => {
  const { projectImageAlt } = load("../app/lib/project-image-alt.ts");
  const image = { url: "https://images.ctfassets.net/ts3253qccucl/4XmT2iAdhf4rpNRj8Fq7jq/hash/photo.jpg", title: "2", description: "" };
  assert.equal(projectImageAlt(image, "Siembra Mangle", 1), "Volunteers plant mangrove propagules along the Talabaan coastline.");
  assert.equal(projectImageAlt({ ...image, title: "A reviewed CMS title" }, "Siembra Mangle", 1), "A reviewed CMS title");
  assert.equal(projectImageAlt({ ...image, description: "A reviewed CMS description" }, "Siembra Mangle", 1), "A reviewed CMS description");
  assert.equal(projectImageAlt(null, "Clean Water", 2), "Clean Water - Photo 3");
});

test("empty board archive describes its state and stays out of search until records exist", () => {
  const route = load("../app/routes/about.board-resolutions.tsx", {
    "~/lib/contentful-api": {}, "~/components/ui/PageHero": {}, "~/components/ui/ComingSoon": {},
  });
  for (const data of [undefined, { boardResolutions: [] }]) {
    const meta = route.meta({ data });
    assert.equal(meta.find((item) => item.name === "robots").content, "noindex, follow");
    assert.match(meta.find((item) => item.name === "description").content, /No board resolutions are currently published/);
  }
  const meta = route.meta({ data: { boardResolutions: [{ title: "An actual resolution" }] } });
  assert.equal(meta.find((item) => item.name === "robots").content, "index, follow");
  assert.match(meta.find((item) => item.name === "description").content, /Read the published board resolutions/);
});

for (const [path, field, fetchName] of [
  ["the-fortress", "fortressIssues", "fetchTheFortress"],
  ["service-projects", "projects", "fetchAllProjects"],
]) {
  test(`${path} social image follows the serving origin while its canonical stays on the public site`, async () => {
    const route = load(`../app/routes/${path}.tsx`, {
      "../lib/contentful-api": { [fetchName]: async () => [] },
      "../components/ui/PageHero": {}, "../components/ui/ProjectCard": {},
      "../styles/react-pdf.css": {},
    });
    for (const origin of ["https://develop--rotaryzcwest.netlify.app", "https://deploy-preview-8--rotaryzcwest.netlify.app", "https://rotaryzcwest.org"]) {
      const data = await route.loader({ request: { url: `${origin}/${path}` } });
      assert.equal(data[field].length, 0);
      const meta = route.meta({ data });
      for (const tag of ["og:image", "twitter:image"]) {
        assert.equal(meta.find((item) => item.property === tag || item.name === tag).content, `${origin}/og/${path}-redesign.jpg`);
      }
      assert.equal(meta.find((item) => item.rel === "canonical").href, `https://rotaryzcwest.org/${path}`);
    }
  });
}

test("project schema uses the canonical article and breadcrumb without invented publication dates", () => {
  const { projectStructuredData } = load("../app/lib/project-seo.ts");
  const project = { title: "Clean Water", slug: "/service-projects/clean-water", shortDescription: "A water project", date: "2026-10-01", gallery: [null, { url: photo }], headerImage: { url: "https://example.com/header.jpg" } };
  const schema = projectStructuredData(project);
  const [article, breadcrumb] = schema["@graph"];
  assert.equal(article.url, "https://rotaryzcwest.org/service-projects/clean-water");
  assert.equal(article.headline, project.title);
  assert.equal(article.image[0], photo);
  assert.equal(article.datePublished, undefined);
  assert.equal(article.dateModified, undefined);
  assert.equal(breadcrumb.itemListElement[1].item, article.url);
  assert.equal(breadcrumb.itemListElement[1].name, article.headline);
  const withoutImage = projectStructuredData({ ...project, gallery: [], headerImage: null });
  assert.equal(withoutImage["@graph"][0].image, undefined);
});
