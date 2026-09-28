const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const markets = ['passive-income', 'uae', 'cyprus', 'greece'];
const botLink = 'https://t.me/nika_estate_webinar_bot?start=income_20261001';

test('all compact webinar pages collect contacts before showing the Telegram link', () => {
  for (const market of markets) {
    const html = fs.readFileSync(path.join(root, 'webinar', market, 'index.html'), 'utf8');
    assert.match(html, /Как выстроить пассивный доход на недвижимости/, market);
    assert.match(html, /1 или 2 октября/, market);
    assert.match(html, /время выберем вместе в Telegram/, market);
    assert.equal((html.match(new RegExp(botLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 1, market);
    assert.match(html, /PDF-гайд за регистрацию/, market);
    assert.match(html, /PDF-гайд пришлём туда после подготовки/, market);
    assert.match(html, /<form id="webinar-registration"/, market);
    for (const field of ['name', 'phone', 'email']) assert.match(html, new RegExp(`name="${field}"[^>]+required`), market);
    assert.match(html, /name="privacy_consent" value="yes" required/, market);
    assert.match(html, /data-registration-success hidden/, market);
    assert.match(html, /data-endpoint="https:\/\/script\.google\.com\/macros\/s\//, market);
    assert.match(html, /lead-capture\.js/, market);
    assert.match(html, /href="\.\.\/\.\.\/privacy\/"/, market);
    assert.match(html, /href="\.\.\/\.\.\/consent\/"/, market);
  }
});

test('Telegram step appears only after this form receives a confirmed lead acknowledgement', () => {
  let listener;
  const formStep = { hidden: false };
  const botStep = { hidden: true, scrollIntoView() {} };
  const document = {
    addEventListener(type, callback) { if (type === 'nika:lead-sent') listener = callback; },
    querySelector(selector) {
      return selector === '[data-registration-form]' ? formStep
        : selector === '[data-registration-success]' ? botStep : null;
    }
  };
  const script = fs.readFileSync(path.join(root, 'webinar-assets/registration-step.js'), 'utf8');
  vm.runInNewContext(script, { document });
  listener({ detail: { confirmed: false, formId: 'webinar-registration' } });
  listener({ detail: { confirmed: true, formId: 'other-form' } });
  assert.equal(formStep.hidden, false);
  assert.equal(botStep.hidden, true);
  listener({ detail: { confirmed: true, formId: 'webinar-registration' } });
  assert.equal(formStep.hidden, true);
  assert.equal(botStep.hidden, false);
});
