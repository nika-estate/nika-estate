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
  'saudi-arabia/index.html', 'the-archive/index.html'];

class Form {
  constructor(quiz = false) {
    this.quiz = quiz;
    this.valid = true;
    this.id = quiz ? 'quiz-test' : 'mini-test';
    this.className = quiz ? 'quiz-form' : 'lead-form';
    this.dataset = { offerName: 'Test offer' };
    this.fields = { name: 'Synthetic test', phone: '+971000000000', messenger: 'WhatsApp' };
    this.listeners = [];
    this.elements = { namedItem: name => name in this.fields ? { value: this.fields[name] } : null };
  }
  checkValidity() { return this.valid; }
  matches() { return this.quiz; }
  getAttribute() { return ''; }
  addEventListener(type, callback, capture) { this.listeners.push({ type, callback, capture }); }
  querySelector(selector) {
    if (selector.includes('data-quiz-next')) return null;
    const names = [...selector.matchAll(/\[name="([^"]+)"\]/g)].map(match => match[1]);
    const name = names.find(item => item in this.fields);
    return name ? { value: this.fields[name], labels: [{ textContent: name }] } : null;
  }
}

function harness(forms = []) {
  const listeners = new Map();
  const calls = { meta: [], metrika: [], fetch: [], events: [] };
  let nextId = 0;
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
    fetch: (url, options) => { calls.fetch.push({ url, options }); return responder(url, options); }
  });
  context.window = context;
  vm.runInContext(analytics, context);
  vm.runInContext(capture, context);
  return { context, document, calls, listeners, respond: fn => { responder = fn; } };
}

test('all seven pages start the same async pixel in head, with valid body fallback', () => {
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.equal((head.match(/fbq\('init', '1758103622093263'\)/g) || []).length, 1, page);
    assert.equal((head.match(/fbq\('track', 'PageView'\)/g) || []).length, 1, page);
    assert.ok(head.indexOf('Meta Pixel Code') < head.indexOf('stylesheet'), page);
    assert.match(head, /fbq\('set', 'autoConfig', false, '1758103622093263'\)/);
    assert.doesNotMatch(head, /<noscript>.*<img/);
    assert.match(html, /<body[^>]*>\s*<noscript><img[^>]*tr\?id=1758103622093263&amp;ev=PageView&amp;noscript=1/);
    assert.equal((html.match(/assets\/scripts\/analytics\.js\?v=20260916-1/g) || []).length, 1);
    assert.equal((html.match(/assets\/scripts\/lead-capture\.js\?v=20260916-1/g) || []).length, 1);
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
