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
  'uae-quiz/index.html',
  'cyprus-quiz/index.html',
  'greece-quiz/index.html',
  'real-estate/index.html',
  'uae-webinar/index.html',
  'meeting-dubai/index.html',
  'uae/index.html',
  'dubai/index.html',
  'meeting-cyprus/index.html',
  'meeting-cyprus/en/index.html',
  'invest-meeting/index.html'
];

test('every landing form links to the matching bilingual policy and consent', () => {
  let formsChecked = 0;
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const english = /<html\b[^>]*lang="en"/.test(html);
    const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map(([form]) => form);
    assert.ok(forms.length, `${page}: no forms found`);
    for (const form of forms) {
      assert.match(form, /<input\b[^>]*name="privacy_consent"[^>]*required[^>]*value="yes"|<input\b[^>]*name="privacy_consent"[^>]*value="yes"[^>]*required/, `${page}: consent must be active and explicit`);
      const prefix = english ? 'en/' : '';
      for (const doc of ['privacy', 'consent']) {
        const links = [...form.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
        const link = links.find(href => href.endsWith(`${prefix}${doc}/`));
        assert.ok(link, `${page}: missing ${prefix}${doc}`);
        assert.equal(fs.existsSync(path.resolve(root, path.dirname(page), link, 'index.html')), true, `${page}: broken ${link}`);
      }
      formsChecked += 1;
    }
  }
  assert.equal(formsChecked, 26);
});

test('both languages describe enquiry, webinar and guide forms rather than the digest subscription', () => {
  for (const file of ['privacy/index.html', 'consent/index.html', 'en/privacy/index.html', 'en/consent/index.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(html, /вебинар|guide|consultation|заявк/i, file);
    assert.doesNotMatch(html, /распространяется только.*видео-дайджест|applies only.*weekly digest/i, file);
  }
});

test('legal documents retain the full section structure and disclose the actual lead route', () => {
  const expectations = [
    ['privacy/index.html', 19, 20000],
    ['consent/index.html', 10, 9000],
    ['en/privacy/index.html', 19, 16000],
    ['en/consent/index.html', 10, 8000]
  ];
  for (const [file, sections, minimumLength] of expectations) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.equal((html.match(/<h2>/g) || []).length, sections, `${file}: section count`);
    assert.ok(html.replace(/<[^>]+>/g, '').length >= minimumLength, `${file}: unusually short`);
    assert.match(html, /Google Apps Script/i, file);
    assert.match(html, /Google Sheets|Google Sheet/i, file);
    assert.match(html, /Telegram/i, file);
    assert.match(html, /amoCRM/i, file);
  }
});
