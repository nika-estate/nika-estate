const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'saudi-quiz/index.html'), 'utf8');
const quiz = fs.readFileSync(path.join(root, 'saudi-quiz/quiz.js'), 'utf8');
const guide = fs.readFileSync(path.join(root, 'saudi-quiz/guide.html'), 'utf8');

test('Saudi quiz qualifies investment goal, USD budget, timing and property stage before a required phone and messenger choice', () => {
  assert.match(page, /name="purchase_goal"/);
  assert.match(page, /name="purchase_approach"/);
  assert.match(page, /name="investment_budget"/);
  assert.match(page, /name="purchase_timing"/);
  assert.match(page, /full property price, not a down payment/);
  assert.match(page, /USD 250,000/);
  assert.equal((page.match(/fieldset class="step" data-step=/g) || []).length, 4);
  assert.doesNotMatch(page, /name="(?:buyer_status|residency_status|nationality)"|remote purchase|Guaranteed rental income/i);
  assert.match(page, /name="phone"[^>]*required/);
  assert.match(page, /name="messenger" value="Telegram" required/);
  assert.match(page, /name="messenger" value="WhatsApp"/);
  assert.match(page, /name="privacy_consent"[^>]*required/);
  assert.match(page, /data-quiz-form/);
  assert.match(page, /data-language="en"/);
});

test('guide is shown only after a confirmed lead event and includes primary-source checks', () => {
  assert.match(quiz, /event\.detail\?\.confirmed && event\.detail\?\.formId === form\.id/);
  assert.match(page, /data-step="success" hidden/);
  assert.match(page, /data-guide-popup data-guide-popup-form="saudi-quiz-form"/);
  assert.match(guide, /rega\.gov\.sa\/en\/rega-services\/platforms\/non-saudi-real-estate-ownership/);
  assert.doesNotMatch(page, /citizenship|guaranteed return/i);
});
