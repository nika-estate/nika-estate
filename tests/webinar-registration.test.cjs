const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const pages = ['uae', 'cyprus', 'greece'];

test('all webinar pages show the same Dubai start time and require an explicit goal', () => {
  for (const market of pages) {
    const html = fs.readFileSync(path.join(root, 'webinar', market, 'index.html'), 'utf8');
    assert.equal((html.match(/datetime="2026-10-01T15:00:00\+04:00"/g) || []).length, 2, market);
    assert.equal((html.match(/по времени Дубая \(UTC\+4\)/g) || []).length, 2, market);
    assert.match(html, /data-webinar-registration data-form-name="Регистрация на вебинар:/, market);
    assert.match(html, /<select name="goal" required><option value="" selected disabled>Выберите цель участия<\/option>/, market);
    assert.match(html, /Инвестиции и аренда/, market);
    assert.match(html, /Квартира для жизни|Переезд и жизнь|Второй дом/, market);
    assert.match(html, /webinar-assets\/app\.js\?v=20260924-date-goal/, market);
  }
});

test('webinar form name follows the selected goal without accumulating old values', () => {
  const listeners = {};
  const goal = { value: '', addEventListener: (name, callback) => { listeners[name] = callback; } };
  const form = {
    dataset: { formName: 'Регистрация на вебинар: ОАЭ' },
    querySelector: () => goal,
    addEventListener: (name, callback) => { listeners[name] = callback; }
  };
  const document = { querySelectorAll: selector => selector === 'form[data-webinar-registration]' ? [form] : [] };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'webinar-assets/app.js'), 'utf8'), { document, window: {} });
  assert.equal(form.dataset.formName, 'Регистрация на вебинар: ОАЭ');
  goal.value = 'Инвестиции и аренда';
  listeners.change();
  assert.equal(form.dataset.formName, 'Регистрация на вебинар: ОАЭ — цель: Инвестиции и аренда');
  goal.value = 'Квартира для жизни';
  listeners.submit();
  assert.equal(form.dataset.formName, 'Регистрация на вебинар: ОАЭ — цель: Квартира для жизни');
});

test('short webinar variant keeps the existing confirmed lead flow', () => {
  const html = fs.readFileSync(path.join(root, 'webinar/passive-income/index.html'), 'utf8');
  assert.match(html, /datetime="2026-10-01T15:00:00\+04:00"/);
  assert.match(html, /form class="lead-form" data-webinar-registration/);
  assert.match(html, /<select name="goal" required><option value="" selected disabled>/);
  assert.match(html, /name="phone"[^>]*required/);
  assert.match(html, /name="privacy_consent" required/);
  assert.match(html, /assets\/scripts\/lead-capture\.js\?v=20260917-forms-only/);
  assert.match(html, /data-endpoint="https:\/\/script\.google\.com\/macros\/s\//);
  assert.doesNotMatch(html, /href="(?:tel:|mailto:|https:\/\/(?:wa\.me|t\.me))/);
  assert.doesNotMatch(html, /гарантированн(?:ая|ый|ое) доходност/i);
});
