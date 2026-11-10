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
    URL,
    require: id => imports[id] ?? (id.startsWith("~/lib/") ? load(`../app/lib/${id.slice(6)}.ts`) : require(id)),
    console: { error() {}, log() {} },
  });
  return exports;
}

async function leadership(entries, fail = false, failedOfficerType) {
  const api = load("../app/lib/contentful-api.ts", {
    "./contentful": { contentfulClient: { getEntries: async query => {
      if (query.content_type === "officers" && query["fields.type"] === failedOfficerType) {
        throw new Error("Officer group unavailable");
      }
      return { items: entries.filter(entry => entry.sys.contentType.sys.id === query.content_type && entry.fields.isActive &&
        (!query["fields.type"] || entry.fields.type === query["fields.type"])) };
    } } },
    "./service-project-contentful.server": {},
  });
  let data;
  const imports = { "~/lib/contentful-api": fail ? {
    fetchAllOfficers: async () => { throw new Error("CMS unavailable"); },
    fetchAllRotaryAnns: async () => ({ executives: [], directors: [] }),
  } : api, "react-router": { useLoaderData: () => data } };
  for (const name of ["PageHero", "OfficerCard", "ComingSoon"]) {
    imports[`~/components/ui/${name}`] = load(`../app/components/ui/${name}.tsx`);
  }
  const route = load("../app/routes/about.leadership.tsx", imports);
  data = await route.loader({});
  const html = renderToStaticMarkup(createElement(ChakraProvider, { value: defaultSystem }, createElement(route.default)));
  const tags = route.meta({ data, matches: [] });
  return { html, tags, data };
}

function person(contentType, type, rotaryYear, name = `${contentType} ${type}`) {
  return { sys: { id: name, contentType: { sys: { id: contentType } } }, fields: {
    name, role: type === "Executive" ? "PRESIDENT" : "DIRECTOR", type, isActive: true, rotaryYear,
  } };
}

test("leadership banners and metadata use the published CMS roster year", async () => {
  const { html, tags } = await leadership([
    person("officers", "Executive", "2028-2029"),
    person("officers", "Director", "2028-2029"),
    person("officers", "Adviser", undefined),
    person("rotaryAnns", "Executive", "2028-2029"),
    person("rotaryAnns", "Director", "2028-2029"),
  ]);
  assert.equal((html.match(/Rotary Year 2028–2029/g) || []).length, 2);
  assert.match(html, /officers Adviser/);
  assert.doesNotMatch(html, /2025[–-]2026|Published archive/);
  for (const tag of tags.filter(tag => tag.name === "description" || tag.property === "og:description")) {
    assert.match(tag.content, /Rotary Year 2028-2029/);
  }
});

test("officer and Ann rosters retain their own years without a shared metadata claim", async () => {
  const { html, tags } = await leadership([
    person("officers", "Executive", "2026-2027"),
    person("rotaryAnns", "Executive", "2027-2028"),
  ]);
  assert.match(html, /Rotary Year 2026–2027/);
  assert.match(html, /Rotary Year 2027–2028/);
  for (const tag of tags.filter(tag => tag.name === "description" || tag.property === "og:description")) {
    assert.doesNotMatch(tag.content, /2026|2027|2028/);
  }
});

test("missing, mixed, or invalid assignment years cannot date a whole roster", async () => {
  for (const directorYear of [undefined, "2027-2028", "2026-2028", "RY 2026-2027", 2026]) {
    const { html, tags } = await leadership([
      person("officers", "Executive", "2026-2027"),
      person("officers", "Director", directorYear),
      person("rotaryAnns", "Executive", "2026-2027"),
    ]);
    assert.match(html, /Rotary Year not provided/);
    assert.equal((html.match(/Rotary Year 2026–2027/g) || []).length, 1, "Only the confirmed Ann roster can show this year");
    assert.doesNotMatch(tags.find(tag => tag.name === "description").content, /2026-2027/);
  }
});

test("empty and failed leadership loads show neutral year text", async () => {
  for (const fail of [false, true]) {
    const { html, tags } = await leadership([], fail);
    assert.match(html, /Rotary Year not provided/);
    assert.match(html, /Roster being prepared/);
    assert.doesNotMatch(html, /Rotary Year \d{4}/);
    assert.doesNotMatch(tags.find(tag => tag.name === "description").content, /Rotary Year \d{4}/);
  }
});

test("a failed officer role request keeps the surviving roster but cannot confirm its year", async () => {
  for (const failedType of ["Executive", "Director"]) {
    const { html, tags, data } = await leadership([
      person("officers", "Executive", "2026-2027"),
      person("officers", "Director", "2026-2027"),
      person("rotaryAnns", "Executive", "2026-2027"),
    ], false, failedType);
    assert.equal(data.officerRotaryYear, null);
    assert.match(html, /Rotary Year not provided/);
    assert.equal((html.match(/Rotary Year 2026–2027/g) || []).length, 1, "Only the confirmed Ann roster may show the year");
    assert.match(html, failedType === "Executive" ? /officers Director/ : /officers Executive/);
    for (const tag of tags.filter(tag => tag.name === "description" || tag.property === "og:description")) {
      assert.doesNotMatch(tag.content, /2026-2027/);
    }
  }
});

test("confirmed empty role groups and unavailable advisers do not prevent a known roster year", async () => {
  for (const emptyType of ["Executive", "Director", "Adviser"]) {
    const entries = [
      person("officers", "Executive", "2026-2027"),
      person("officers", "Director", "2026-2027"),
      person("rotaryAnns", "Executive", "2026-2027"),
    ].filter(entry => entry.sys.contentType.sys.id !== "officers" || entry.fields.type !== emptyType);
    const { html, tags, data } = await leadership(entries, false, emptyType === "Adviser" ? "Adviser" : undefined);
    assert.equal(data.officerRotaryYear, "2026-2027");
    assert.equal((html.match(/Rotary Year 2026–2027/g) || []).length, 2);
    assert.match(tags.find(tag => tag.name === "description").content, /2026-2027/);
  }
});
