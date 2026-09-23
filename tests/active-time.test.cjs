const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const bundles = [
  'assets/scripts/analytics.js',
  'valia-app/public/assets/analytics.js',
  'projects-app/public/project-assets/analytics.js'
];

for (const bundle of bundles) {
  test(`${bundle} counts visible time once and pauses while hidden`, () => {
    let now = 0;
    let hidden = false;
    let tick;
    let stopped = false;
    const events = new Map();
    const goals = [];
    const document = {
      title: 'Test', referrer: '', head: { appendChild() {} },
      scripts: [{ src: 'https://mc.yandex.ru/metrika/tag.js?id=112565381' }],
      createElement: () => ({ dataset: {} }),
      querySelector: () => ({}),
      addEventListener: (name, callback) => events.set(name, callback),
      get hidden() { return hidden; }
    };
    const context = vm.createContext({
      document, performance: { now: () => now },
      setInterval: callback => { tick = callback; return 1; },
      clearInterval: () => { stopped = true; },
      ym: (...args) => { if (args[1] === 'reachGoal') goals.push(args[2]); },
      fbq: () => {},
      URL, console
    });
    context.window = context;
    context.location = { href: 'https://example.test/nika-estate/', pathname: '/nika-estate/' };
    vm.runInContext(fs.readFileSync(path.join(root, bundle), 'utf8'), context);

    now = 29999;
    tick();
    assert.deepEqual(goals, []);
    now = 30000;
    hidden = true;
    events.get('visibilitychange')();
    assert.deepEqual(goals, ['time_30s']);

    now = 130000;
    tick();
    assert.deepEqual(goals, ['time_30s']);
    hidden = false;
    events.get('visibilitychange')();
    now = 160000;
    tick();
    assert.deepEqual(goals, ['time_30s', 'time_60s']);

    now = 220000;
    tick();
    assert.deepEqual(goals, ['time_30s', 'time_60s', 'time_120s']);
    now = 280000;
    tick();
    tick();
    assert.deepEqual(goals, ['time_30s', 'time_60s', 'time_120s', 'time_180s']);
    assert.equal(stopped, true);
  });
}
