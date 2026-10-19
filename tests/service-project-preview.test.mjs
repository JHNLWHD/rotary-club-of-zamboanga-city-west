import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);

function load(path, imports, env = {}, preview = false) {
  const original = readFileSync(new URL(path, import.meta.url), 'utf8');
  const source = path === '../vite.config.ts' ? original : original
    .replaceAll('import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW', JSON.stringify(String(preview)));
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (id) => imports[id] ?? require(id),
    process: { env },
    console: { error() {}, log() {} },
    Response,
  });
  return exports;
}

test('only the develop branch-deploy build enables draft preview', () => {
  const plugin = { default: () => ({}) };
  const imports = {
    vite: { defineConfig: (config) => config },
    '@react-router/dev/vite': { reactRouter: () => ({}) },
    autoprefixer: plugin,
    tailwindcss: plugin,
    'vite-tsconfig-paths': plugin,
    '@netlify/vite-plugin-react-router': plugin,
  };
  for (const [context, branch, expected] of [
    ['branch-deploy', 'develop', true],
    ['production', 'develop', false],
    ['production', 'main', false],
    ['branch-deploy', 'main', false],
    ['deploy-preview', 'develop', false],
    [undefined, undefined, false],
  ]) {
    const config = load('../vite.config.ts', imports, { CONTEXT: context, BRANCH: branch }).default;
    assert.equal(JSON.parse(config.define['import.meta.env.VITE_SERVICE_PROJECT_DRAFT_PREVIEW']), String(expected));
  }
});

test('published mode never creates a preview client even when a preview token exists', () => {
  const delivery = {};
  const client = load('../app/lib/service-project-contentful.server.ts', {
    contentful: { createClient: () => assert.fail('Preview must stay disabled') },
    './contentful': { contentfulClient: delivery },
  }, { CONTENTFUL_PREVIEW_ACCESS_TOKEN: 'test-preview-token' });
  assert.equal(client.getServiceProjectClient(), delivery);
});

test('draft mode uses the preview host and token and retains space and environment', () => {
  const created = [];
  const client = load('../app/lib/service-project-contentful.server.ts', {
    contentful: { createClient: (options) => { created.push(options); return { preview: true }; } },
    './contentful': {
      contentfulClient: {},
      getContentfulConfig: () => ({ spaceId: 'club-space', environment: 'master', accessToken: 'delivery-token' }),
    },
  }, { CONTENTFUL_PREVIEW_ACCESS_TOKEN: 'test-preview-token' }, true);
  assert.equal(client.getServiceProjectClient(), client.getServiceProjectClient());
  assert.equal(created.length, 1);
  assert.deepEqual({ ...created[0] }, {
    space: 'club-space', environment: 'master', host: 'preview.contentful.com', accessToken: 'test-preview-token',
  });
});

test('missing preview access fails instead of displaying published content as drafts', () => {
  const client = load('../app/lib/service-project-contentful.server.ts', {
    contentful: { createClient: () => assert.fail('No credential was supplied') },
    './contentful': { contentfulClient: {} },
  }, {}, true);
  assert.throws(() => client.getServiceProjectClient(), /draft preview is not configured/);
});

test('only service-project reads use the preview client', async () => {
  const deliveryQueries = [];
  const previewQueries = [];
  const api = load('../app/lib/contentful-api.ts', {
    './contentful': { contentfulClient: { getEntries: async (query) => { deliveryQueries.push(query); return { items: [] }; } } },
    './service-project-contentful.server': {
      getServiceProjectClient: () => ({ getEntries: async (query) => { previewQueries.push(query); return { items: [] }; } }),
    },
  });
  await Promise.all([
    api.fetchAllProjects(), api.fetchProjectBySlug('test-project'), api.fetchFeaturedProjectHighlights(),
    api.fetchHomepageHeroSection(), api.fetchHomepageContactSection(), api.fetchAllEvents(),
  ]);
  assert.deepEqual(previewQueries.map((query) => query.content_type), ['serviceProject', 'serviceProject', 'serviceProject']);
  assert.deepEqual(deliveryQueries.map((query) => query.content_type).sort(), ['event', 'homepageContact', 'homepageHero']);
});

test('draft preview does not emit a sitemap of unpublished production URLs', async () => {
  const route = load('../app/routes/sitemap[.]xml.tsx', {
    '../lib/contentful-api': { fetchAllProjects: () => assert.fail('Draft projects must not enter a sitemap') },
  }, {}, true);
  const response = await route.loader();
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(await response.text(), '');
});
