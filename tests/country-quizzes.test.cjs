const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const routes = ['uae-quiz', 'cyprus-quiz', 'greece-quiz'];

test('three English property quizzes use the shared confirmed-lead flow and real guides', () => {
  const behavior = read('assets/scripts/property-quiz.js');
  assert.match(behavior, /show\(next\.dataset\.next\)/);
  assert.match(behavior, /event\.detail\?\.confirmed && event\.detail\?\.formId === form\.id/);
  for (const route of routes) {
    const html = read(`${route}/index.html`);
    const guide = read(`${route}/guide.html`);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /data-property-quiz data-quiz-form data-bot-protection="true" data-language="en"/);
    assert.match(html, /name="purchase_goal"/);
    assert.match(html, /name="phone"[^>]*required/);
    assert.match(html, /name="messenger" value="Telegram" required/);
    assert.match(html, /name="messenger" value="WhatsApp"/);
    assert.match(html, /name="privacy_consent"[^>]*required/);
    assert.match(html, /data-step="success" hidden/);
    assert.match(html, /data-guide-popup data-guide-popup-form=/);
    assert.match(html, /assets\/scripts\/quiz-guide-popup\.js/);
    assert.match(html, /1758103622093263/);
    assert.match(html, /assets\/scripts\/analytics\.js/);
    assert.match(html, /assets\/scripts\/lead-capture\.js/);
    assert.match(html, /assets\/styles\/country-quiz\.css/);
    assert.match(guide, /Official starting points:/);
    assert.match(guide, /does not promise a legal status, approval or investment return/);
  }
  assert.match(read('uae-quiz/index.html'), /Dubai and Abu Dhabi/);
  assert.match(read('cyprus-quiz/guide.html'), /gov\.cy\/moi\/en\/purchasing-property/);
  assert.match(read('greece-quiz/guide.html'), /migration\.gov\.gr\/en\/golden-visa/);
  assert.match(read('greece-quiz/index.html'), /Explore EU residency through property investment in Greece/);
  assert.match(read('greece-quiz/index.html'), /data-step="budget"/);
  assert.match(read('assets/styles/country-quiz.css'), /max-height: 600px/);
});
