import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import { pairs, translate } from "../src/translations.js";
globalThis.document = { documentElement: { lang: "en" } };
test("every Russian UI string has an English translation", () => {
  const source = fs.readFileSync(
    new URL("../src/App.jsx", import.meta.url),
    "utf8",
  );
  const missing = [];
  traverseModule.default(
    parse(source, { sourceType: "module", plugins: ["jsx"] }),
    {
      StringLiteral(p) {
        const text = p.node.value;
        if (/[А-Яа-яЁё]/.test(text) && /[А-Яа-яЁё]/.test(translate(text)))
          missing.push(text);
      },
      TemplateElement(p) {
        const text = p.node.value.raw;
        if (/[А-Яа-яЁё]/.test(text) && /[А-Яа-яЁё]/.test(translate(text)))
          missing.push(text);
      },
    },
  );
  assert.deepEqual(missing, []);
});
test("all 15 floor plans and map exist", () => {
  for (const id of [
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "17",
    "18",
    "19",
  ])
    assert.ok(
      fs.existsSync(
        new URL("../public/assets/plan-" + id + "-focus.webp", import.meta.url),
      ),
    );
  assert.ok(
    fs.existsSync(new URL("../public/assets/masterplan.webp", import.meta.url)),
  );
});
test("no agency phone or messenger links", () => {
  const source = fs.readFileSync(
    new URL("../src/App.jsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /(?:tel:|wa\.me|t\.me|api\.whatsapp)/);
});
test("both HTML entries have locale and matching canonical", () => {
  for (const [lang, path, suffix] of [
    ["ru", "../index.html", "/valia/"],
    ["en", "../en/index.html", "/valia/en/"],
  ]) {
    const html = fs.readFileSync(new URL(path, import.meta.url), "utf8");
    assert.ok(html.includes('lang="' + lang + '"'));
    assert.ok(
      html.includes("https://nika-estate.github.io/nika-estate" + suffix),
    );
  }
});
