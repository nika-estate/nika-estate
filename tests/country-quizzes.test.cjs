const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const routes = ['uae-quiz', 'cyprus-quiz', 'greece-quiz'];

test('three English property quizzes use the shared confirmed-lead flow and real guides', () => {
  const behavior = read('assets/scripts/property-quiz.js');
  assert.match(behavior, /show\(input\.dataset\.quizDisqualify \|\| next\.dataset\.next\)/);
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
  assert.match(read('greece-quiz/index.html'), /EU residency through property investment in Greece/);
  assert.match(read('greece-quiz/index.html'), /data-step="budget"/);
  assert.match(read('assets/styles/country-quiz.css'), /max-height: 600px/);
});

test('Russian UAE quiz mirrors English questions, lead flow and guide delivery', () => {
  const english = read('uae-quiz/index.html');
  const russian = read('uae-quiz/ru/index.html');
  const behavior = read('assets/scripts/property-quiz.js');
  for (const field of ['purchase_goal', 'preferred_market', 'messenger']) {
    const values = (html) => [...html.matchAll(new RegExp(`name="${field}" value="([^"]+)"`, 'g'))].map((match) => match[1]);
    assert.deepEqual(values(russian), values(english), field);
  }
  assert.match(russian, /<html lang="ru">/);
  assert.match(russian, /data-property-quiz data-quiz-form data-bot-protection="true" data-language="ru"[^>]*data-include-quiz-answers="true"/);
  assert.match(russian, /data-step="purpose"[\s\S]*data-next="purchase"/);
  assert.match(russian, /data-step="purchase"[\s\S]*data-next="human"/);
  assert.match(russian, /data-step="human"[\s\S]*data-next="contact"/);
  assert.match(russian, /name="phone"[^>]*required/);
  assert.match(russian, /name="phone"[^>]*maxlength="40"[^>]*aria-describedby="uae-phone-hint"/);
  assert.doesNotMatch(russian, /placeholder="\+7 999 000 00 00"/);
  assert.match(russian, /номер любой страны/);
  assert.match(russian, /Получить консультацию/);
  assert.match(russian, /data-intro-progress-label="Консультация начинается здесь"/);
  assert.match(behavior, /form\.dataset\.introProgressLabel \|\| 'Ваша подборка начинается здесь'/);
  assert.match(russian, /name="privacy_consent"[^>]*required/);
  assert.match(russian, /href="\.\.\/\.\.\/privacy\/"/);
  assert.match(russian, /href="\.\.\/\.\.\/consent\/"/);
  assert.equal((russian.match(/1h3xfdqiPjRZ2qm_s6lffNInzGjT0oUa-/g) || []).length, 2);
  assert.match(russian, /data-guide-popup-form="uae-quiz-ru-form"/);
  assert.match(russian, /1758103622093263/);
  assert.match(russian, /lead-capture\.js\?v=20261013-phone-text/);
  assert.match(russian, /AKfycbwioz7fVEzsnDXOz5EOG5f7Db1detqxZYDZF1T8OqyU2DAeUW-_P5envHK6vwCtcNKAbg/);
  assert.match(behavior, /const questionCount = hasWorkVisaStep \? 4 : hasBudgetStep \|\| hasPropertyTypeStep \? 3 : 2/);
  assert.match(english, /href="ru\/" hreflang="ru"/);
  assert.match(russian, /href="\.\.\/" hreflang="en"/);
});

test('Greek quizzes ask about Golden Visa knowledge and residence plans in all three languages', () => {
  const english = read('greece-quiz/index.html');
  const turkish = read('greece-quiz/tr/index.html');
  const russian = read('greece-quiz/ru/index.html');
  assert.match(english, /TOP PROPERTIES SELECTION \+ CONSULTATION/);
  assert.match(turkish, /ÖZENLE SEÇİLMİŞ GAYRİMENKULLER \+ DANIŞMANLIK/);
  assert.match(english, /Do you already know the Golden Visa program requirements\?/);
  assert.match(turkish, /Golden Visa programının koşullarını biliyor musunuz\?/);
  assert.match(english, /Are you looking for a work visa in Greece\?/);
  assert.match(turkish, /Yunanistan’da çalışma vizesi mi arıyorsunuz\?/);
  assert.match(english, /Do you plan to reside permanently in Greece\?/);
  assert.match(turkish, /Yunanistan’da kalıcı olarak yaşamayı planlıyor musunuz\?/);
  assert.match(russian, /Знакомы ли вы с требованиями программы Golden Visa\?/);
  assert.match(russian, /Вам нужна рабочая виза в Грецию\?/);
  assert.match(russian, /Планируете постоянно жить в Греции\?/);
  assert.match(russian, /data-language="ru"/);
  assert.match(russian, /1KQ1HwWJLdznJ6Xx214b7zTccZ8yaV96Q/g);
  assert.match(russian, /href="\.\.\/\.\.\/privacy\/"/);
  assert.match(russian, /href="\.\.\/\.\.\/consent\/"/);
  for (const page of [english, turkish, russian]) {
    assert.match(page, /<ul class="visa-benefits">(?:<li>.*?<\/li>){3}<\/ul>/);
    assert.match(page, /name="purchase_goal" value="Knows Golden Visa requirements" required/);
    assert.match(page, /data-step="work-visa"/);
    assert.match(page, /name="work_visa" value="yes" data-quiz-disqualify="ineligible" required/);
    assert.match(page, /data-step="ineligible" hidden/);
    assert.match(page, /data-disqualify-field="work_visa" data-disqualify-value="yes"/);
    assert.match(page, /name="purchase_approach" value="Plans to reside in Greece permanently" required/);
    assert.match(page, /Golden Visa/);
    assert.doesNotMatch(page, /FREE STARTER GUIDE \+ CONSULTATION|ÜCRETSİZ REHBER \+ DANIŞMANLIK/);
  }
  assert.match(english, /5-year Greek residence permit, renewable/);
  assert.match(turkish, /5 yıllık, yenilenebilir Yunanistan oturma izni/);
  assert.match(russian, /ВНЖ Греции на 5 лет с возможностью продления/);
  assert.doesNotMatch(english + turkish + russian, /Not every property qualifies|Her gayrimenkul uygun değildir|не каждый объект подходит/);
  assert.match(turkish, /1QD0qNyPtnAPBdlz7c5M8aZ9Y6Qju9e3o/g);
  assert.match(read('assets/styles/quiz-offers.css'), /\.greece-quiz \.visual img \{ object-position: center 54%/);
});

test('Cyprus quiz requires a budget and a property type before contact', () => {
  const html = read('cyprus-quiz/index.html');
  assert.match(html, /data-step="purpose"[\s\S]*?data-next="budget"/);
  assert.match(html, /data-step="budget"[\s\S]*?name="investment_budget" value="€350,000–€600,000" required/);
  assert.match(html, /name="investment_budget" value="€600,000–€1,000,000"/);
  assert.match(html, /name="investment_budget" value="€1,000,000\+"/);
  assert.match(html, /data-step="budget"[\s\S]*?data-next="property-type"/);
  assert.match(html, /data-step="property-type"[\s\S]*?name="property_type" value="Apartment" required/);
  assert.match(html, /name="property_type" value="Villa"/);
  assert.match(html, /name="property_type" value="Not sure yet"/);
  assert.match(html, /data-step="property-type"[\s\S]*?data-next="human"/);
  assert.match(html, /data-step="human"[\s\S]*?data-back="property-type"/);
  assert.doesNotMatch(html, /data-step="purchase"|name="purchase_approach"/);
  assert.match(read('assets/scripts/property-quiz.js'), /'property-type': \['Question 3 of 3', 80, 'Step 3 of 3'\]/);
});
