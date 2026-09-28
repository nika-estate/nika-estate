const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pages = [
  'index.html',
  'saudi-arabia/index.html',
  'cyprus/city-match/index.html',
  'cyprus/eligibility/index.html',
  'webinar/cyprus/index.html',
  'webinar/passive-income/index.html',
  'webinar/uae/index.html',
  'webinar/greece/index.html',
  'the-archive/index.html',
  'saudi-quiz/index.html',
  'real-estate/index.html',
  'uae-webinar/index.html',
  'meeting-dubai/index.html',
  'uae/index.html',
  'dubai/index.html',
  'meeting-cyprus/index.html',
  'invest-meeting/index.html'
];

test('every landing form requires consent and links to its language-specific policy', () => {
  let formsChecked = 0;
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const english = /<html\b[^>]*lang="en"/.test(html);
    const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map(([form]) => form);
    assert.ok(forms.length, `${page}: no forms found`);
    for (const form of forms) {
      assert.match(form, /<input\b[^>]*name="privacy_consent"[^>]*required/, `${page}: required consent missing`);
      assert.match(form, new RegExp(`https://nikaestate\\.${english ? 'com' : 'ru'}/privacy`), `${page}: privacy link missing`);
      if (!english) assert.match(form, /https:\/\/nikaestate\.ru\/personal-data-consent/, `${page}: processing consent link missing`);
      formsChecked += 1;
    }
  }
  assert.equal(formsChecked, 23);
});
