const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const routes = [
  ['permanent residency', 'cyprus/eligibility/index.html', 'ПМЖ через'],
  ['new-build selection', 'cyprus/city-match/index.html', 'Новостройки'],
  ['investment consultation', 'cyprus/investment-memo/index.html', 'Онлайн-консультация']
];

test('three Cyprus prototypes keep independent offers and shared lead routing', () => {
  for (const [name, relativePath, offer] of routes) {
    const html = fs.readFileSync(path.join(root, relativePath), 'utf8');
    assert.match(html, new RegExp(offer));
    assert.match(html, /assets\/scripts\/lead-capture\.js/);
    assert.match(html, /assets\/scripts\/analytics\.js/);
    assert.match(html, /fbq\('track','PageView'\)/);
    assert.match(html, /class="lead-form cyprus-form"/);
    assert.match(html, /data-landing-name="cyprus-/);
    assert.match(html, /data-offer-name=/);
    const sections = (html.match(/<section\b/g) || []).length;
    assert.ok(sections >= 5 && sections <= 6, `${name} should explain the offer in 5–6 blocks`);
  }
});

test('Cyprus prototype assets and shared interaction code are present', () => {
  for (const image of ['eligibility-hero.jpg', 'city-match-hero.jpg', 'investment-memo-hero.jpg']) {
    assert.ok(fs.statSync(path.join(root, 'assets/images/cyprus', image)).size > 200000, `${image} should be a usable visual asset`);
  }
  const styles = fs.readFileSync(path.join(root, 'assets/styles/site.css'), 'utf8') + fs.readFileSync(path.join(root, 'assets/styles/cyprus.css'), 'utf8');
  assert.match(styles, /@media\(max-width:680px\)/);
  assert.match(styles, /prefers-reduced-motion/);
});

test('offers show a concrete product and decision criteria above the form', () => {
  const residency = fs.readFileSync(path.join(root, 'cyprus/eligibility/index.html'), 'utf8');
  const selection = fs.readFileSync(path.join(root, 'cyprus/city-match/index.html'), 'utf8');
  const meeting = fs.readFileSync(path.join(root, 'cyprus/investment-memo/index.html'), 'utf8');
  assert.match(residency, /Консультация по ПМЖ/);
  assert.match(residency, /€300 000 \+ VAT/);
  assert.match(residency, /граждан стран вне ЕС/);
  assert.match(residency, /Marelia Valley/);
  assert.match(selection, /Новостройки на Южном Кипре/);
  assert.match(selection, /от €220 000/);
  assert.match(selection, /Cypress Park/);
  assert.match(selection, /Seaside Residence/);
  assert.match(meeting, /Инвестиции и ПМЖ/);
  assert.match(meeting, /Цена объекта, VAT, платежи/);
});

test('prototype copy avoids prohibited outcome promises', () => {
  const copy = routes.map(([, relativePath]) => fs.readFileSync(path.join(root, relativePath), 'utf8')).join('\n');
  for (const pattern of [/гарантир(?:уем|ованн)/i, /паспорт ЕС/i, /нулев(?:ые|ой) налог/i, /ПМЖ за\s*\d/i]) {
    assert.doesNotMatch(copy, pattern);
  }
});
