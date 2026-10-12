const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pages = [
  ['turkey-quiz/index.html', 'ru'],
  ['turkey-quiz/en/index.html', 'en']
];

test('Russian and English Istanbul quizzes offer consultation from $400,000 without a guide or coast option', () => {
  for (const [file, language] of pages) {
    const html = read(file);
    assert.match(html, new RegExp(`<html lang="${language}">`));
    assert.match(html, new RegExp(`data-language="${language}"`));
    assert.match(html, /data-bot-protection="true"/);
    assert.match(html, /data-include-quiz-answers="true"/);
    assert.deepEqual([...html.matchAll(/<fieldset class="step" data-step="([^"]+)"/g)].map(match => match[1]),
      ['purpose', 'budget', 'timing']);
    assert.equal((html.match(/name="purchase_goal"/g) || []).length, 6);
    assert.equal((html.match(/type="checkbox" name="purchase_goal"/g) || []).length, 6);
    assert.match(html, /type="hidden" name="preferred_market" value="Istanbul"/);
    for (const field of ['investment_budget', 'purchase_timing']) assert.match(html, new RegExp(`name="${field}"`));
    assert.match(html, /value="\$400,000–\$500,000" required/);
    assert.doesNotMatch(html, /\$350,000|\$350 000/);
    assert.doesNotMatch(html, /coast|побереж|selection|подборк|PDF|гайд|guide-popup|drive\.google\.com/i);
    assert.match(html, /data-next="budget" disabled/);
    assert.match(html, /data-back="purpose"/);
    assert.match(html, /data-step="success"/);
    assert.match(html, /name="phone"[^>]*required/);
    assert.match(html, /name="messenger" value="Telegram" required/);
    assert.match(html, /name="messenger" value="WhatsApp"/);
    assert.match(html, /name="privacy_consent" value="yes" required/);
    assert.match(html, /privacy\//);
    assert.match(html, /consent\//);
    assert.match(html, /assets\/scripts\/lead-capture\.js/);
    assert.match(html, /fbq\('init','1758103622093263'\)/);
    assert.match(html, /assets\/images\/turkey\/istanbul-bosphorus\.webp/);
  }
  assert.match(read('turkey-quiz/index.html'), /полную стоимость объекта/);
  assert.match(read('turkey-quiz/en/index.html'), /total property price/);
  assert.ok(fs.statSync(path.join(root, 'assets/images/turkey/istanbul-bosphorus.webp')).size < 400000);
  const quizScript = read('assets/scripts/turkey-quiz.js');
  assert.match(quizScript, /\['purpose', 'budget', 'timing'\]/);
  assert.doesNotMatch(quizScript, /location|из 4|of 4/);
  new vm.Script(quizScript);
});
