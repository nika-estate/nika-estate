const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const source = fs.readFileSync(
  new URL("../public/assets/lead-capture.js", "file://" + __filename),
  "utf8",
);
function setup(reply, valid = true) {
  const events = [];
  const form = {
    id: "test-form",
    dataset: {},
    className: "lead-form",
    elements: {
      namedItem: (name) => ({
        value:
          { name: "Test Buyer", phone: "+00000000000", privacy_consent: "yes" }[
            name
          ] || "",
      }),
    },
    checkValidity: () => valid,
    matches: () => false,
    querySelector: () => null,
    getAttribute: () => "",
  };
  const document = {
    currentScript: {
      dataset: { endpoint: "https://example.test", landingName: "Valia (RU)" },
    },
    title: "Valia",
    documentElement: { lang: "ru" },
    readyState: "complete",
    querySelectorAll: () => [],
    dispatchEvent: (e) => events.push(e),
    referrer: "",
  };
  class FakeData {
    forEach(fn) {
      fn("Test Buyer", "name");
      fn("+00000000000", "phone");
      fn("yes", "privacy_consent");
    }
  }
  const context = {
    window: {
      location: {
        search: "",
        pathname: "/valia/",
        origin: "https://example.test",
        href: "https://example.test/valia/",
      },
      crypto: { randomUUID: () => "test-id" },
    },
    document,
    fetch: async () => reply,
    FormData: FakeData,
    File: class {},
    CustomEvent: class {
      constructor(type, options) {
        this.type = type;
        this.detail = options.detail;
      }
    },
    URLSearchParams,
    Intl,
    Date,
    Math,
    WeakMap,
    Promise,
    Set,
  };
  vm.runInNewContext(source, context);
  return { capture: context.window.NikaLeadCapture, form, events };
}
test("confirmed matching acknowledgement emits exactly one success event", async () => {
  const s = setup({
    ok: true,
    type: "cors",
    json: async () => ({ ok: true, lead_id: "test-id" }),
  });
  assert.equal(await s.capture.send(s.form), true);
  assert.equal(s.events.length, 1);
  assert.equal(s.events[0].detail.confirmed, true);
});
for (const [name, response] of [
  ["HTTP error", { ok: false }],
  ["opaque response", { ok: true, type: "opaque" }],
  [
    "wrong acknowledgement",
    { ok: true, json: async () => ({ ok: true, lead_id: "other" }) },
  ],
  [
    "negative acknowledgement",
    { ok: true, json: async () => ({ ok: false, lead_id: "test-id" }) },
  ],
])
  test(name + " never emits a conversion", async () => {
    const s = setup(response);
    assert.equal(await s.capture.send(s.form), false);
    assert.equal(s.events.length, 0);
  });
test("invalid form never emits a conversion", async () => {
  const s = setup({ ok: true }, false);
  assert.equal(await s.capture.send(s.form), false);
  assert.equal(s.events.length, 0);
});
test("tracking waits for confirmed delivery and deduplicates lead IDs", () => {
  const events = {};
  const calls = [];
  const document = {
    head: { appendChild() {} },
    createElement: () => ({}),
    addEventListener: (name, fn) => (events[name] = fn),
  };
  const context = {
    window: {
      ym: (...a) => calls.push(["ym", ...a]),
      fbq: (...a) => calls.push(["fbq", ...a]),
    },
    document,
    setInterval() {},
    performance: { now: () => 0 },
    Date,
    Set,
  };
  context.ym = context.window.ym;
  context.fbq = context.window.fbq;
  vm.runInNewContext(
    fs.readFileSync(
      new URL("../public/assets/analytics.js", "file://" + __filename),
      "utf8",
    ),
    context,
  );
  calls.length = 0;
  events["nika:lead-sent"]({ detail: { confirmed: false, leadId: "id" } });
  assert.equal(calls.length, 0);
  const detail = { confirmed: true, leadId: "id", formType: "mini_form" };
  events["nika:lead-sent"]({ detail });
  events["nika:lead-sent"]({ detail });
  assert.equal(
    calls.filter((c) => c[0] === "fbq" && c[2] === "Lead").length,
    1,
  );
  assert.ok(calls.some((c) => c[3] === "lead_sent"));
});
