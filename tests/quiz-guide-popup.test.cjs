const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const guideIds = {
  'uae-quiz': '1h3xfdqiPjRZ2qm_s6lffNInzGjT0oUa-',
  'saudi-quiz': '1JSx1zBQZDRsTCxqAwjv4VLouF22BOpKK',
  'cyprus-quiz': '1x1Cz9FoF0CQeX3CQhU0lDhdqpoucWtyb',
  'greece-quiz': '1b3IguBGXnz7bEchn9UgtE4E8ZBtripPA'
};

test('each quiz offers its matching PDF in the success state and popup', () => {
  for (const [route, id] of Object.entries(guideIds)) {
    const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
    const url = `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
    assert.equal(html.split(`href="${url}"`).length - 1, 2, route);
    assert.match(html, new RegExp(`data-guide-popup-form="${route}-form"`));
    assert.match(html, /<dialog[^>]*aria-labelledby="guide-popup-title"/);
    assert.match(html, /assets\/styles\/quiz-guide-popup\.css/);
    assert.match(html, /assets\/scripts\/quiz-guide-popup\.js/);
  }
});

test('popup opens only for a confirmed lead from its own form', () => {
  const listeners = {};
  let opens = 0;
  let closes = 0;
  const dialog = {
    dataset: { guidePopupForm: 'uae-quiz-form' },
    open: false,
    querySelector: () => ({ addEventListener: () => { closes += 1; } }),
    addEventListener: (name, fn) => { listeners[`dialog:${name}`] = fn; },
    showModal() { opens += 1; this.open = true; },
    close() { this.open = false; }
  };
  const document = {
    querySelector: () => dialog,
    addEventListener: (name, fn) => { listeners[name] = fn; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/scripts/quiz-guide-popup.js'), 'utf8'), { document });
  assert.equal(closes, 1);
  listeners['nika:lead-sent']({ detail: { confirmed: false, formId: 'uae-quiz-form' } });
  listeners['nika:lead-sent']({ detail: { confirmed: true, formId: 'greece-quiz-form' } });
  assert.equal(opens, 0);
  listeners['nika:lead-sent']({ detail: { confirmed: true, formId: 'uae-quiz-form' } });
  assert.equal(opens, 1);
  listeners['nika:lead-sent']({ detail: { confirmed: true, formId: 'uae-quiz-form' } });
  assert.equal(opens, 1);
  dialog.open = false;
  listeners['nika:lead-duplicate']({ detail: { formId: 'greece-quiz-form' } });
  assert.equal(opens, 1);
  listeners['nika:lead-duplicate']({ detail: { formId: 'uae-quiz-form' } });
  assert.equal(opens, 2);
});
