const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('all seven landings refresh their typography stylesheet cache', () => {
  for (const file of ['index.html', 'dubai/index.html', 'uae/index.html', 'saudi-arabia/index.html', 'real-estate/index.html', 'invest-meeting/index.html', 'the-archive/index.html']) {
    const links = read(file).match(/<link[^>]+rel="stylesheet"[^>]+>/g);
    assert.ok(links?.length, file);
    for (const link of links) assert.match(link, /\.css\?v=20260916-7/, file);
  }
});

test('consultation hero uses the visible viewport and responsive header height, not a fixed block height', () => {
  const html = read('invest-meeting/index.html');
  const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
  assert.match(css, /--meeting-header-height:78px/);
  assert.match(css, /--meeting-header-height:67px/);
  const hero = css.match(/\.meeting-hero\{([^}]+)\}/)[1];
  assert.match(hero, /min-height:calc\(100vh - var\(--meeting-header-height\)\)/);
  assert.match(hero, /min-height:calc\(100svh - var\(--meeting-header-height\)\)/);
  assert.doesNotMatch(hero, /(?:^|;)height:/);
  assert.doesNotMatch(css, /\.meeting-hero\{[^}]*min-height:\d+px/);
});

test('supporting copy is enlarged and mobile grid tracks can shrink', () => {
  const base = read('assets/styles/site.css');
  const city = read('styles.css');
  const archive = read('the-archive/archive.css');
  assert.match(base, /body\{[^}]*font:400 18px\/1\.5/);
  assert.match(city, /body\{[^}]*font-size:18px/);
  assert.match(base, /\.project-metrics dd[^}]*font-size:16px/);
  assert.match(archive, /\.layout-card dt\{font-size:16px/);
  assert.match(city, /\.intro,\.consultation\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(base, /\.uae-page \.projects-heading\{grid-template-columns:minmax\(0,1fr\)/);
});
