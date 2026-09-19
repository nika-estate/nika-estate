import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const data = fs.readFileSync(new URL("../src/projects.jsx", import.meta.url), "utf8");

for (const slug of ["central-park", "thyme", "jadeel", "havencia"]) {
  test(`${slug} has a Russian landing entry and project data`, () => {
    const html = fs.readFileSync(new URL(`../${slug}/index.html`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`data-project="${slug}"`));
    assert.match(html, /lang="ru"/);
    assert.match(html, /analytics\.js/);
    assert.match(data, new RegExp(`(?:"${slug}"|${slug.replace("-", "")})`));
  });
}

test("all project forms use the shared confirmed-delivery lead capture", () => {
  assert.match(app, /lead-capture\.js/);
  assert.match(app, /NikaLeadCapture/);
  assert.match(app, /data-offer-name/);
  assert.match(app, /privacy_consent/);
});

test("The Archive and Valia are not duplicated in the project set", () => {
  assert.doesNotMatch(data, /^\s*(?:"the-archive"|valia)\s*:/m);
});
