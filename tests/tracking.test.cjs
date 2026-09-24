const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const analytics = fs.readFileSync(path.join(root, 'assets/scripts/analytics.js'), 'utf8');
const capture = fs.readFileSync(path.join(root, 'assets/scripts/lead-capture.js'), 'utf8');
const pixelId = '1758103622093263';
const pages = ['index.html', 'dubai/index.html', 'uae/index.html',
  'real-estate/index.html', 'invest-meeting/index.html',
  'saudi-arabia/index.html', 'the-archive/index.html',
  'uae-webinar/index.html', 'meeting-dubai/index.html',
  'meeting-cyprus/index.html', 'webinar/uae/index.html',
  'webinar/cyprus/index.html', 'webinar/greece/index.html'];

class Form {
  constructor(quiz = false) {
    this.quiz = quiz;
    this.valid = true;
    this.id = quiz ? 'quiz-test' : 'mini-test';
    this.className = quiz ? 'quiz-form' : 'lead-form';
    this.dataset = { offerName: 'Test offer' };
    this.fields = { name: 'Synthetic test', phone: '+971000000000', messenger: 'WhatsApp' };
    this.listeners = [];
    this.status = { textContent: '' };
    this.buttons = [{ disabled: false }];
    this.attributes = {};
    this.elements = { namedItem: name => name in this.fields ? { value: this.fields[name] } : null };
  }
  checkValidity() { return this.valid; }
  reportValidity() { this.reported = true; }
  setAttribute(name, value) { this.attributes[name] = value; }
  querySelectorAll() { return this.buttons; }
  matches() { return this.quiz; }
  getAttribute() { return ''; }
  addEventListener(type, callback, capture) { this.listeners.push({ type, callback, capture }); }
  querySelector(selector) {
    if (selector.includes('data-form-status')) return this.status;
    if (selector.includes('data-quiz-next')) return null;
    const names = [...selector.matchAll(/\[name="([^"]+)"\]/g)].map(match => match[1]);
    const name = names.find(item => item in this.fields);
    return name ? { value: this.fields[name], labels: [{ textContent: name }] } : null;
  }
}

test('every landing exposes only lead forms, without agency phones or direct contacts', () => {
  const allPages = [...pages, 'cyprus/eligibility/index.html', 'cyprus/city-match/index.html'];
  for (const page of allPages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.doesNotMatch(html, /href=["'](?:tel:|mailto:|https?:\/\/(?:wa\.me|t\.me|api\.whatsapp\.com|web\.whatsapp\.com))/i, page);
    assert.doesNotMatch(html, /97145574496|971508698020|\+971 4 557 4496|Удобнее связаться|class="[^"]*\b(?:direct-contact|request-direct|request-contacts)\b/, page);
    assert.match(html, /name="phone"/, 'client contact stays on ' + page);
    assert.match(html, page === 'invest-meeting/index.html'
      ? /lead-capture\.js\?v=20260924-bot-check/
      : /lead-capture\.js\?v=20260917-forms-only/, page);
    assert.doesNotMatch(html, /(?:Откроется|откроется)[^<]*WhatsApp/, page);
  }
  for (const file of ['script.js', 'assets/scripts/site.js', 'assets/scripts/lead-capture.js']) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /window\.open|wa\.me|WHATSAPP_NUMBER|971508698020/, file);
  }
});

test('meeting pages have no published schedule and keep editable speaker slots', () => {
  for (const page of ['meeting-dubai/index.html', 'meeting-cyprus/index.html']) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.doesNotMatch(html, /\b(?:[0-2]?\d:[0-5]\d|январ[ья]|феврал[ья]|март[ае]?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|август[ае]?|сентябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])\b/i, page);
    assert.equal((html.match(/Скоро объявим/g) || []).length, 3, page);
    assert.match(html, /id="register"/);
    assert.match(html, /data-endpoint="https:\/\/script\.google\.com\/macros\/s\//);
  }
});

test('three webinar funnels promise a concrete lead magnet and use official residency sources', () => {
  const expected = {
    'webinar/uae/index.html': /icp\.gov\.ae\/en\/services\/uae-golden-residency/,
    'webinar/cyprus/index.html': /mip\.gov\.cy\/dmmip\/md\.nsf\/all\/8690459673E7A011C2258782003A8AB4/,
    'webinar/greece/index.html': /enterprisegreece\.gov\.gr\/newsletter-articles\/greece-adjusts-golden-visa-program/
  };
  for (const [page, sourcePattern] of Object.entries(expected)) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    if (page.includes('/uae/')) {
      assert.match(html, /Гайд для участников/, page);
      assert.match(html, /Прогноз аренды/, page);
      assert.doesNotMatch(html, /class="gift-strip"/, page);
    } else {
      assert.match(html, /5 (?:подходящих объектов|новых проектов|объектов)/, page);
      assert.match(html, /памятк/i, page);
    }
    assert.match(html, sourcePattern, page);
    assert.match(html, /Решение о визе принимает государственный орган|не гарантирует разрешение|Разрешение выдаётся государственными органами/, page);
    assert.doesNotMatch(html, /гарантированн(?:ая|ый|ое) доходност/i, page);
  }
});

test('three webinar funnels show location and lifestyle imagery beyond the hero', () => {
  const minimumPhotos = {
    'webinar/uae/index.html': 3,
    'webinar/cyprus/index.html': 2,
    'webinar/greece/index.html': 3
  };
  for (const [page, minimum] of Object.entries(minimumPhotos)) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(html, /class="card place-card"/, page);
    assert.match(html, /Жизнь (?:в ОАЭ|на Кипре|в Греции)/, page);
    const localImages = [...html.matchAll(/<img[^>]+src="(\.\.\/\.\.\/assets\/images\/[^"]+)"[^>]*>/g)]
      .map(match => match[1].replace('../../', ''));
    const storyImages = [...html.matchAll(/class="place-photo[^"]*"[^>]*><img[^>]+src="(\.\.\/\.\.\/assets\/images\/[^"]+)"/g)]
      .map(match => match[1].replace('../../', ''));
    assert.ok(storyImages.length >= minimum, page);
    for (const image of localImages) assert.equal(fs.existsSync(path.join(root, image)), true, image);
    assert.match(html, /webinar-assets\/styles\.css\?v=20260924-offer-photo/, page);
    assert.match(html, /assets\/images\/portfolio\/nika-team\.jpg/, page);
  }
});

for (const quiz of [false, true]) {
  test('submit ' + (quiz ? 'quiz' : 'mini form') + ' stays on page and shows success only after acknowledgement', async () => {
    const form = new Form(quiz);
    const h = harness([form]);
    let acknowledge;
    h.respond((url, options) => new Promise(resolve => {
      acknowledge = () => resolve({ ok: true, type: 'cors', json: async () => ({ ok: true, lead_id: JSON.parse(options.body).lead_id }) });
    }));
    const event = { prevented: false, stopped: false, preventDefault() { this.prevented = true; }, stopImmediatePropagation() { this.stopped = true; } };
    const submit = form.listeners.find(listener => listener.type === 'submit').callback;
    const pending = submit(event);
    assert.equal(event.prevented, true);
    assert.equal(event.stopped, true);
    assert.equal(form.buttons[0].disabled, true);
    assert.equal(form.attributes['aria-busy'], 'true');
    assert.equal(form.status.textContent, 'Отправляем заявку…');
    assert.equal(h.calls.meta.length, 0);
    await submit(event);
    assert.equal(h.calls.fetch.length, 1);
    acknowledge();
    await pending;
    assert.match(form.status.textContent, /^Заявка отправлена/);
    assert.equal(form.buttons[0].disabled, false);
    assert.equal(form.attributes['aria-busy'], 'false');
    assert.equal(h.calls.meta[0][1], 'Lead');
  });
}

test('failed form submission allows retry and invalid contact never sends', async () => {
  const form = new Form();
  const h = harness([form]);
  const submit = form.listeners.find(listener => listener.type === 'submit').callback;
  const event = { preventDefault() {}, stopImmediatePropagation() {} };
  h.respond(() => Promise.reject(new Error('Offline')));
  await submit(event);
  assert.match(form.status.textContent, /^Не удалось подтвердить/);
  assert.equal(form.buttons[0].disabled, false);
  assert.equal(form.dataset.nikaSubmitting, 'false');
  assert.equal(h.calls.meta.length, 0);
  form.valid = false;
  await submit(event);
  assert.equal(form.reported, true);
  assert.equal(h.calls.fetch.length, 1);
});

function harness(forms = []) {
  const listeners = new Map();
  const calls = { meta: [], metrika: [], fetch: [], events: [] };
  let nextId = 0;
  let clock = 0;
  let responder = (url, options) => {
    const payload = JSON.parse(options.body);
    return Promise.resolve({ ok: true, type: 'cors', json: async () => ({ ok: true, lead_id: payload.lead_id }) });
  };
  const document = {
    title: 'Synthetic landing', referrer: '', readyState: 'complete',
    currentScript: { dataset: { endpoint: 'https://example.test/leads', landingName: 'Test landing', offerName: 'Test offer' } },
    scripts: [{ src: 'https://mc.yandex.ru/metrika/tag.js?id=112565381' }],
    querySelectorAll: () => forms,
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(callback);
    },
    dispatchEvent(event) {
      calls.events.push(event);
      (listeners.get(event.type) || []).forEach(callback => callback(event));
    }
  };
  const context = vm.createContext({
    document, console, URL, URLSearchParams, Intl,
    location: { search: '?utm_source=test', origin: 'https://example.test', pathname: '/landing/', href: 'https://example.test/landing/?utm_source=test' },
    crypto: { randomUUID: () => 'test-lead-' + (++nextId) },
    File: class File {},
    FormData: class FormData { constructor(form) { this.form = form; } forEach(callback) { Object.entries(this.form.fields).forEach(([key, value]) => callback(value, key)); } },
    CustomEvent: class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    ym: (...args) => calls.metrika.push(args),
    fbq: (...args) => calls.meta.push(args),
    performance: { now: () => clock },
    setInterval: () => 1,
    clearInterval: () => {},
    fetch: (url, options) => { calls.fetch.push({ url, options }); return responder(url, options); }
  });
  context.window = context;
  vm.runInContext(analytics, context);
  vm.runInContext(capture, context);
  return { context, document, calls, listeners, respond: fn => { responder = fn; }, advance: ms => { clock += ms; } };
}

test('all static pages start the same async pixel in head, with valid body fallback', () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.equal((head.match(/fbq\('init', '1758103622093263'\)/g) || []).length, 1, page);
    assert.equal((head.match(/fbq\('track', 'PageView'\)/g) || []).length, 1, page);
    assert.ok(head.indexOf('Meta Pixel Code') < head.indexOf('stylesheet'), page);
    assert.match(head, /fbq\('set', 'autoConfig', false, '1758103622093263'\)/);
    assert.doesNotMatch(head, /<noscript>.*<img/);
    assert.match(html, /<body[^>]*>\s*<noscript><img[^>]*tr\?id=1758103622093263&amp;ev=PageView&amp;noscript=1/);
    assert.equal((html.match(/assets\/scripts\/analytics\.js\?v=20260923-time-goals/g) || []).length, 1);
    const captureVersion = page === 'invest-meeting/index.html' ? '20260924-bot-check' : '20260917-forms-only';
    assert.equal((html.match(new RegExp(`assets/scripts/lead-capture\\.js\\?v=${captureVersion}`, 'g')) || []).length, 1);
    new vm.Script(head.match(/<script>([\s\S]*?)<\/script>/)[1]);
  }
});

test('head bootstrap queues PageView immediately and loads fbevents asynchronously', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const inserted = [];
  const context = vm.createContext({ document: {
    createElement: () => ({}),
    getElementsByTagName: () => [{ parentNode: { insertBefore: tag => inserted.push(tag) } }]
  } });
  context.window = context;
  vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
  assert.equal(inserted.length, 1);
  assert.equal(inserted[0].async, true);
  assert.equal(inserted[0].src, 'https://connect.facebook.net/en_US/fbevents.js');
  assert.deepEqual(Array.from(context.fbq.queue, args => Array.from(args)), [
    ['set', 'autoConfig', false, pixelId], ['init', pixelId], ['track', 'PageView']
  ]);
});

for (const quiz of [false, true]) {
  test('confirmed ' + (quiz ? 'quiz' : 'mini form') + ' emits exactly one Lead plus its secondary event', async () => {
    const form = new Form(quiz);
    const h = harness([form]);
    assert.equal(await h.context.NikaLeadCapture.send(form), true);
    assert.equal(h.calls.fetch.length, 1);
    assert.equal(h.calls.fetch[0].options.mode, 'cors');
    assert.equal(h.calls.fetch[0].options.headers['Content-Type'], 'text/plain;charset=UTF-8');
    assert.deepEqual(h.calls.meta.map(args => args.slice(0, 2)), [
      ['track', 'Lead'], ['trackCustom', quiz ? 'QuizLead' : 'MiniFormLead']
    ]);
    assert.equal(h.calls.meta[0][3].eventID, 'test-lead-1');
    assert.deepEqual(Object.keys(h.calls.meta[0][2]).sort(), ['form_id', 'form_type', 'landing', 'offer']);
    assert.deepEqual(h.calls.metrika.filter(args => args[1] === 'reachGoal').map(args => args[2]),
      ['lead_sent', quiz ? 'quiz_sent' : 'mini_form_sent']);
    assert.equal(h.calls.events[0].detail.confirmed, true);
    assert.equal(h.calls.events[0].detail.leadId, 'test-lead-1');
  });
}

test('invalid forms do not send or convert', async () => {
  const form = new Form();
  form.valid = false;
  const h = harness([form]);
  assert.equal(await h.context.NikaLeadCapture.send(form), false);
  assert.equal(h.calls.fetch.length, 0);
  assert.equal(h.calls.meta.length, 0);
});

test('network errors, opaque responses, HTTP errors and nonmatching acknowledgements never convert', async () => {
  const failures = [
    () => Promise.reject(new Error('offline')),
    () => Promise.resolve({ ok: true, type: 'opaque' }),
    () => Promise.resolve({ ok: false, type: 'cors' }),
    () => Promise.resolve({ ok: true, type: 'cors', json: async () => { throw new Error('not JSON'); } }),
    () => Promise.resolve({ ok: true, type: 'cors', json: async () => ({ ok: false }) }),
    () => Promise.resolve({ ok: true, type: 'cors', json: async () => ({ ok: true }) }),
    () => Promise.resolve({ ok: true, type: 'cors', json: async () => ({ ok: true, lead_id: 'wrong-lead' }) })
  ];
  for (const failure of failures) {
    const h = harness();
    h.respond(failure);
    assert.equal(await h.context.NikaLeadCapture.send(new Form()), false);
    assert.equal(h.calls.meta.length, 0);
    assert.equal(h.calls.events.length, 0);
    assert.equal(h.calls.metrika.filter(args => args[1] === 'reachGoal').length, 0);
  }
});

test('double click shares one pending request; conversion waits for acknowledgement', async () => {
  const h = harness();
  const form = new Form();
  let resolve;
  h.respond(() => new Promise(done => { resolve = done; }));
  const first = h.context.NikaLeadCapture.send(form);
  const second = h.context.NikaLeadCapture.send(form);
  assert.equal(first, second);
  assert.equal(h.calls.fetch.length, 1);
  assert.equal(h.calls.meta.length, 0);
  resolve({ ok: true, type: 'cors', json: async () => ({ ok: true, lead_id: 'test-lead-1' }) });
  assert.equal(await first, true);
  assert.equal(h.calls.meta.length, 2);
  h.document.dispatchEvent(h.calls.events[0]);
  assert.equal(h.calls.meta.length, 2);
});

test('unconfirmed success events and repeated module initialization cannot duplicate tracking', () => {
  const form = new Form();
  const h = harness([form]);
  h.context.NikaLeadCapture.init(h.document);
  vm.runInContext(analytics, h.context);
  vm.runInContext(capture, h.context);
  assert.equal(form.listeners.length, 1);
  assert.equal(h.listeners.get('nika:lead-sent').length, 1);
  h.document.dispatchEvent({ type: 'nika:lead-sent', detail: { leadId: 'legacy' } });
  h.document.dispatchEvent({ type: 'nika:lead-sent', detail: { confirmed: true } });
  assert.equal(h.calls.meta.length, 0);
});

test('a blocked Meta pixel does not prevent acknowledged lead delivery or Metrika goals', async () => {
  const h = harness();
  delete h.context.fbq;
  assert.equal(await h.context.NikaLeadCapture.send(new Form()), true);
  assert.equal(h.calls.metrika.filter(args => args[1] === 'reachGoal').length, 2);
});

test('webinar goal is included in the existing form-name column and answers', () => {
  const form = new Form();
  form.fields.goal = 'Инвестиции и аренда';
  form.dataset.formName = 'Регистрация на вебинар: ОАЭ — цель: Инвестиции и аренда';
  const h = harness();
  const payload = h.context.NikaLeadCapture.buildPayload(form);
  assert.equal(payload.form_name, form.dataset.formName);
  assert.equal(payload.answers.find(answer => answer.field === 'goal').answer, 'Инвестиции и аренда');
});

test('investment meeting rejects automatic submissions before the endpoint and analytics', async () => {
  const form = new Form();
  form.dataset.botProtection = 'true';
  form.fields.website = '';
  form.fields.human_check = '';
  const question = { textContent: '' };
  const originalQuery = form.querySelector.bind(form);
  form.querySelector = selector => selector === '[data-human-question]' ? question : originalQuery(selector);
  const h = harness([form]);
  const answer = question.textContent.match(/(\d+) \+ (\d+)/);
  assert.ok(answer);
  assert.equal(await h.context.NikaLeadCapture.send(form), false);
  form.fields.human_check = String(Number(answer[1]) + Number(answer[2]));
  assert.equal(await h.context.NikaLeadCapture.send(form), false);
  h.advance(3000);
  form.fields.website = 'spam.example';
  assert.equal(await h.context.NikaLeadCapture.send(form), false);
  assert.equal(h.calls.fetch.length, 0);
  assert.equal(h.calls.meta.length, 0);
  form.fields.website = '';
  assert.equal(await h.context.NikaLeadCapture.send(form), true);
  assert.equal(h.calls.fetch.length, 1);
  assert.equal(h.calls.meta.length, 2);
  assert.equal(h.calls.fetch[0].options.body.includes('human_check'), false);
  assert.equal(h.calls.fetch[0].options.body.includes('website'), false);
});
