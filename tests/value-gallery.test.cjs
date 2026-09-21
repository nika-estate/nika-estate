const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const valueGallery = fs.readFileSync(path.join(root, 'assets/scripts/value-gallery.js'), 'utf8');
const valueCss = fs.readFileSync(path.join(root, 'assets/styles/value-gallery.css'), 'utf8');

const publishedPaths = [
  '', 'cyprus/city-match', 'cyprus/eligibility', 'dubai', 'invest-meeting',
  'uae', 'real-estate', 'saudi-arabia', 'the-archive', 'central-park',
  'thyme', 'jadeel', 'havencia', 'valia', 'valia/en'
];

test('every published landing has price, first payment and yield benchmarks', () => {
  for (const page of publishedPaths) {
    const marker = page ? `'${page}':` : "'':";
    assert.match(valueGallery, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), page || 'root');
  }
  for (const label of ['Стоимость', 'Первый взнос', 'Доходность']) {
    assert.match(valueGallery, new RegExp(label));
  }
  assert.match(valueGallery, /gross/i);
  assert.match(valueGallery, /не гарантия|not a guarantee/i);
});

test('the shared component includes a responsive one-row gallery and readable mobile text', () => {
  assert.match(valueCss, /grid-template-columns:\s*repeat\(4/);
  assert.match(valueCss, /overflow-x:\s*auto/);
  assert.match(valueCss, /scroll-snap-type:\s*x mandatory/);
  assert.match(valueCss, /font-size:\s*16px/);
  assert.match(valueGallery, /loading = 'lazy'/);
  assert.match(valueGallery, /\^quiz\\\//);
  assert.match(valueGallery, /nika-quiz-signals/);
  assert.doesNotMatch(valueGallery, /nika-quiz-gallery/);
});

test('all analytics bundles load the shared value component', () => {
  for (const file of [
    'assets/scripts/analytics.js',
    'projects-app/public/project-assets/analytics.js',
    'valia-app/public/assets/analytics.js'
  ]) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(source, /value-gallery\.js\?v=20260921-1/, file);
    assert.match(source, /data-nika-value-gallery|dataset\.nikaValueGallery/, file);
  }
});

test('every local gallery image referenced by the component exists', () => {
  for (const match of valueGallery.matchAll(/image\('([^']+)'\)/g)) {
    assert.ok(fs.existsSync(path.join(root, 'assets/images', match[1])), match[1]);
  }
  for (const match of valueGallery.matchAll(/valiaImage\('([^']+)'\)/g)) {
    assert.ok(fs.existsSync(path.join(root, 'valia-app/public/assets', match[1])), match[1]);
  }
});
