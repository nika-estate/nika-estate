const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'invest-meeting/index.html'), 'utf8');

test('consultation hero prioritizes an existing Dubai exterior, not the old interior', () => {
  const hero = html.match(/<img class="meeting-hero-bg"[^>]+>/)[0];
  assert.match(hero, /official-exterior-06\.webp/);
  assert.match(hero, /fetchpriority="high"/);
  assert.doesNotMatch(hero, /loading="lazy"|abu-saadiyat/);
  assert.match(html, /rel="preload" as="image" href="[^"]+official-exterior-06\.webp"/);
});

test('two new photo breaks separate the text blocks and reuse valid project images', () => {
  const photos = [...html.matchAll(/<figure class="meeting-visual meeting-photo[^>]+>[\s\S]*?<\/figure>/g)];
  assert.equal(photos.length, 2);
  assert.ok(html.indexOf('id="benefits"') < html.indexOf('id="meeting-photo-park"'));
  assert.ok(html.indexOf('id="meeting-photo-park"') < html.indexOf('id="meeting"'));
  assert.ok(html.indexOf('id="projects"') < html.indexOf('id="meeting-photo-archive"'));
  assert.ok(html.indexOf('id="meeting-photo-archive"') < html.indexOf('id="nika"'));
  for (const [photo] of photos) {
    assert.match(photo, /loading="lazy"/);
    assert.match(photo, /width="\d+" height="\d+"/);
    assert.match(photo, /<figcaption class="meeting-photo-label">/);
    const src = photo.match(/src="([^"]+)"/)[1];
    assert.ok(fs.existsSync(path.resolve(root, 'invest-meeting', src)), src);
  }
  assert.match(html, /\.meeting-photo\{height:280px\}/);
});
