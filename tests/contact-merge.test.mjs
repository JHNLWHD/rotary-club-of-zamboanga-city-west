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
  runInNewContext(outputText, { exports, require: (id) => imports[id] ?? require(id) });
  return exports;
}

const section = load("../app/components/homepage/ContactSection.tsx");
const thankYou = load("../app/routes/thank-you.tsx");
const contactData = {
  meetingInfo: { day: "Friday", time: "6 PM", location: "Club venue", address: "Zamboanga City" },
  contactInfo: { email: "club@example.org", facebookUrl: "https://example.org/club", facebookHandle: "Club" },
};

function contactRoute(data = contactData, query = "") {
  return load("../app/routes/contact.tsx", {
    "../components/homepage/ContactSection": section,
    "../components/ui/ComingSoon": { ComingSoon: ({ title }) => createElement("h1", null, title) },
    "./thank-you": thankYou,
    "react-router": {
      useRouteLoaderData: () => ({ contactData: data }),
      useSearchParams: () => [new URLSearchParams(query)],
    },
  });
}

function render(Component) {
  return renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(Component)));
}

test("merged contact form retains Netlify fields and accessible labels", () => {
  const html = render(contactRoute().default);
  const form = html.match(/<form\b[\s\S]*?<\/form>/)?.[0];
  assert.ok(form);
  const staticForm = readFileSync(new URL("../public/forms.html", import.meta.url), "utf8");
  const fieldNames = (markup) => [...markup.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)]
    .map((match) => match[1]).sort();
  assert.deepEqual(fieldNames(form), ["bot-field", "email", "form-name", "message", "name"]);
  assert.deepEqual(fieldNames(form), fieldNames(staticForm));
  for (const markup of [form, staticForm]) {
    for (const attribute of ['name="contact"', 'method="POST"', 'action="/thank-you"', 'data-netlify="true"', 'data-netlify-honeypot="bot-field"']) {
      assert.ok(markup.includes(attribute), attribute);
    }
    assert.match(markup, /name="form-name"[^>]*value="contact"/);
  }
  for (const field of ["name", "email", "message"]) {
    assert.ok(form.includes(`for="contact-${field}"`));
    const control = form.match(new RegExp(`<(?:input|textarea)\\b[^>]*id="contact-${field}"[^>]*>`))?.[0];
    assert.ok(control, `Missing ${field} control`);
    assert.match(control, /required=""/);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});

test("native form submits to a static page before Netlify's SSR fallback", () => {
  const form = render(contactRoute().default).match(/<form\b[^>]*>/)?.[0];
  const action = form.match(/action="([^"]+)"/)[1];
  const confirmation = readFileSync(new URL(`../public${action}/index.html`, import.meta.url), "utf8");
  assert.match(confirmation, /Thank you for reaching out/);
  assert.match(confirmation, /name="robots" content="noindex, nofollow"/);
  assert.match(confirmation, /href="\/"/);
  const routing = readFileSync(new URL("../netlify.toml", import.meta.url), "utf8");
  assert.doesNotMatch(routing, /conditions\s*=\s*\{[^}]*Method\s*=/, "Netlify redirects cannot match HTTP methods");
  assert.match(routing, /force\s*=\s*false/, "Static files must take precedence over the SSR fallback");
});

test("legacy success URL uses the reviewed confirmation without an app POST handler", () => {
  const contact = contactRoute(contactData, "success=true");
  assert.equal(contact.action, undefined);
  assert.equal(thankYou.action, undefined);
  const html = render(contact.default);
  assert.equal(html, render(thankYou.default));
  assert.match(html, /Thank you for reaching out/);
  assert.match(html, /href="\/"/);
  assert.doesNotMatch(html, /<form\b|within (?:7 days|24 hours)/);
  assert.ok(thankYou.meta().some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
  assert.match(render(contactRoute(contactData, "success=false").default), /<form\b/);
});

test("missing contact data keeps the fallback, including the legacy success URL", () => {
  for (const data of [null, {}, { meetingInfo: contactData.meetingInfo }]) {
    const html = render(contactRoute(data, "success=true").default);
    assert.match(html, /Contact information is being updated/);
    assert.doesNotMatch(html, /<form\b/);
  }
});
