import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const projectLink = 'https://rotaryzcwest.org/service-projects/clean-water';

async function clickCopy({ clipboardApi = false, commandSucceeds = true } = {}) {
  let copied = 'clipboard-sentinel';
  let selected = '';
  let closed = false;
  const notices = [];
  const elements = [];
  function element(type, props) {
    const node = { type, props };
    elements.push(node);
    return node;
  }
  const primitives = new Proxy({}, { get: (_, name) => String(name) });
  const imports = {
    react: { useState: () => [true], useEffect() {}, useRef: () => ({ current: null }) },
    'react/jsx-runtime': { jsx: element, jsxs: element },
    '@chakra-ui/react': new Proxy({}, { get: (_, name) => name === 'Dialog' ? primitives : String(name) }),
    'react-share': primitives,
    'lucide-react': primitives,
    sonner: { toast: { success: message => notices.push(['success', message]), error: message => notices.push(['error', message]) } },
  };
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(new URL('../app/components/ui/ShareModal.tsx', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  runInNewContext(outputText, {
    exports,
    require: id => imports[id],
    navigator: clipboardApi ? { clipboard: { writeText: async text => { copied = text; } } } : {},
    document: {
      // Controls outside the modal cannot receive focus while its focus trap is active.
      createElement: () => ({ select() {} }),
      body: { appendChild() {}, removeChild() {} },
      execCommand() {
        if (commandSucceeds && selected) copied = selected;
        return commandSucceeds;
      },
    },
  });
  exports.default({
    isOpen: true,
    onClose: () => { closed = true; },
    contentType: 'project',
    content: { title: 'Clean Water', description: 'A documented project', date: '2026-10-02', venue: 'Zamboanga City', shareableLink: projectLink },
  });
  const input = elements.find(node => node.props['aria-label'] === 'Share link');
  if (input.props.ref) input.props.ref.current = { select: () => { selected = input.props.value; } };
  const copyButton = elements.find(node => node.type === 'Button' && node.props.children?.includes('Copy'));
  await copyButton.props.onClick();
  return { copied, notices, closed };
}

test('Copy retains the project link when the clipboard fallback runs inside a dialog', async () => {
  assert.deepEqual(await clickCopy(), {
    copied: projectLink,
    notices: [['success', 'Project link copied to clipboard!']],
    closed: true,
  });
});

test('Copy reports a failed fallback without a success notice', async () => {
  assert.deepEqual(await clickCopy({ commandSucceeds: false }), {
    copied: 'clipboard-sentinel',
    notices: [['error', 'Failed to copy link to clipboard']],
    closed: true,
  });
});

test('Copy retains the project link with the Clipboard API', async () => {
  assert.deepEqual(await clickCopy({ clipboardApi: true }), {
    copied: projectLink,
    notices: [['success', 'Project link copied to clipboard!']],
    closed: true,
  });
});
