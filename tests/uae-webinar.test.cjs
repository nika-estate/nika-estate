const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'uae-webinar/index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'uae-webinar/styles.css'), 'utf8');

test('webinar landing keeps the requested three-block structure', () => {
  assert.equal((html.match(/<section\b/g) || []).length, 3);
  assert.match(html, /class="webinar-hero"/);
  assert.match(html, /class="webinar-gallery"/);
  assert.match(html, /class="webinar-program"/);
  assert.match(html, /Зарегистрироваться бесплатно/);
});

test('webinar uses approved local visuals and no copied Astons identity', () => {
  const visibleMarkup = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, '');
  assert.doesNotMatch(html, /ASTONS|estate\.astons\.com|greece-live/i);
  assert.doesNotMatch(visibleMarkup, /<img[^>]+src="https?:\/\//i);
  assert.ok((html.match(/<img\b/g) || []).length >= 8);
  for (const source of [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1])) {
    if (source.includes('facebook.com/tr')) continue;
    assert.ok(fs.existsSync(path.resolve(root, 'uae-webinar', source)), source);
  }
});

test('visa wording is conditional and links official sources', () => {
  assert.match(html, /может стать основанием/i);
  assert.match(html, /не гарантирует/i);
  assert.match(html, /icp\.gov\.ae/);
  assert.match(html, /dubailand\.gov\.ae/);
  assert.doesNotMatch(html, /покупка (?:недвижимости )?(?:автоматически )?да[её]т (?:ВНЖ|визу)/i);
});

test('registration remains short and confirmed lead delivery is configured', () => {
  assert.match(html, /class="lead-form registration-card"/);
  assert.match(html, /name="name" required/);
  assert.match(html, /name="phone" required/);
  assert.match(html, /name="privacy_consent" required/);
  assert.match(html, /script\.google\.com\/macros\/s\/AKfycbwioz7fVEzsnDXOz5EOG5f7Db1detqxZYDZF1T8OqyU2DAeUW-_P5envHK6vwCtcNKAbg\/exec/);
});

test('responsive layout provides dedicated mobile treatment', () => {
  assert.match(css, /@media \(max-width:820px\)/);
  assert.match(css, /\.hero-grid\{display:flex;flex-direction:column/);
  assert.match(css, /\.gallery-row\{display:flex/);
  assert.match(css, /\.mobile-register\{position:fixed/);
});
