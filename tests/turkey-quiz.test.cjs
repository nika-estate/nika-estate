const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pages = [
  ['turkey-quiz/index.html', 'ru', '1aLbrKFkFgrIzcUNnYRYfgxWOnsrSH0tO'],
  ['turkey-quiz/en/index.html', 'en', '1A4H5nRsSZGB6Z9xmqe5tkWWAn1v2h6LZ']
];

test('Russian and English Turkey quizzes share four questions and deliver their own guide after confirmation', () => {
  for (const [file, language, guideId] of pages) {
    const html = read(file);
    assert.match(html, new RegExp(`<html lang="${language}">`));
    assert.match(html, new RegExp(`data-language="${language}"`));
    assert.match(html, /data-bot-protection="true"/);
    assert.match(html, /data-include-quiz-answers="true"/);
    assert.deepEqual([...html.matchAll(/<fieldset class="step" data-step="([^"]+)"/g)].map(match => match[1]),
      ['purpose', 'location', 'budget', 'timing']);
    assert.equal((html.match(/name="purchase_goal"/g) || []).length, 6);
    assert.equal((html.match(/type="checkbox" name="purchase_goal"/g) || []).length, 6);
    for (const field of ['preferred_market', 'investment_budget', 'purchase_timing']) assert.match(html, new RegExp(`name="${field}"`));
    assert.match(html, /name="phone"[^>]*required/);
    assert.match(html, /name="messenger" value="Telegram" required/);
    assert.match(html, /name="messenger" value="WhatsApp"/);
    assert.match(html, /name="privacy_consent" value="yes" required/);
    assert.match(html, /privacy\//);
    assert.match(html, /consent\//);
    assert.equal(html.split(`href="https://drive.google.com/file/d/${guideId}/view"`).length - 1, 2);
    assert.match(html, /data-guide-popup-form="turkey-quiz-(ru|en)-form"/);
    assert.match(html, /assets\/scripts\/quiz-guide-popup\.js/);
    assert.match(html, /assets\/scripts\/lead-capture\.js/);
    assert.match(html, /fbq\('init','1758103622093263'\)/);
    assert.match(html, /assets\/images\/turkey\/istanbul-bosphorus\.webp/);
  }
  assert.match(read('turkey-quiz/index.html'), /полную стоимость объекта/);
  assert.match(read('turkey-quiz/en/index.html'), /total property price/);
  assert.ok(fs.statSync(path.join(root, 'assets/images/turkey/istanbul-bosphorus.webp')).size < 400000);
  new vm.Script(read('assets/scripts/turkey-quiz.js'));
});
