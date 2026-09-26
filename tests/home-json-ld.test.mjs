import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { Children } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Exercise the real route without a router, CMS requests, or unrelated UI.
const { outputText } = ts.transpileModule(
  readFileSync(new URL("../app/routes/home_.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
);
const imports = {
  "react/jsx-runtime": jsxRuntime,
  "@chakra-ui/react": { Box: "div", Flex: "div", Heading: "h2", Link: "a", Text: "p" },
  "lucide-react": { ArrowUpRight: () => null },
  "../lib/contentful-api": {},
};
for (const name of ["ContactSection", "HeroSection", "ProjectHighlightsSection", "StatsSection"]) {
  imports[`../components/homepage/${name}`] = { [name]: () => null };
}

function renderJsonLd(homepageData) {
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require(id) {
      if (id === "react-router") return { useLoaderData: () => ({ homepageData }) };
      assert.ok(Object.hasOwn(imports, id), `Unexpected route import: ${id}`);
      return imports[id];
    },
  });
  const script = Children.toArray(exports.default().props.children)
    .find((child) => child.type === "script" && child.props.type === "application/ld+json");
  assert.ok(script, "Homepage must render JSON-LD");
  const html = renderToStaticMarkup(script);
  const json = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</script>"));
  assert.doesNotMatch(json, /</, "CMS values must not introduce HTML tokens inside JSON-LD");
  assert.equal((html.match(/<\/script\s*>/gi) || []).length, 1);
  return JSON.parse(json);
}

test("homepage JSON-LD safely round-trips CMS contact values", () => {
  for (const value of [
    "club@example.org",
    "https://example.org/</script><script>alert(1)</script>",
    "</ScRiPt ><img src=x onerror=alert(1)>",
    "<!--<script>double-escaped HTML state</script>",
    'Quotes " and \\ backslashes & café \u2028\u2029',
  ]) {
    const data = renderJsonLd({ contact: { contactInfo: { email: value, facebookUrl: value } } });
    assert.equal(data.contactPoint.email, value);
    assert.deepEqual(data.sameAs, [value]);
    assert.equal(data["@type"], "Organization");
  }
});

test("homepage JSON-LD remains valid without CMS contact data", () => {
  for (const homepageData of [null, {}, { contact: {} }]) {
    const data = renderJsonLd(homepageData);
    assert.equal(data.name, "Rotary Club of Zamboanga City West");
    assert.equal(data.foundingDate, "1971-06-02");
    assert.equal(data.contactPoint, undefined);
    assert.equal(data.sameAs, undefined);
  }
});
