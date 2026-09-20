import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const data = fs.readFileSync(new URL("../src/projects.jsx", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../public/project-assets/styles.css", import.meta.url), "utf8");

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

test("desktop detail content remains visible when summaries are hidden", () => {
  assert.match(app, /matchMedia\("\(min-width: 768px\)"\)/);
  assert.match(app, /item\.open = desktopDetails\.matches/);
  assert.match(app, /details-desktop-title/);
});

test("project pages include a stronger consultation offer and structured footer", () => {
  assert.match(app, /Инвестиционная консультация/);
  assert.match(app, /План платежей/);
  assert.match(app, /Презентация объекта/);
  assert.match(app, /Видеоконсультация с экспертом/);
  assert.match(app, /project-footer-main/);
  assert.doesNotMatch(app, /floating-enquiry/);
});

test("all published project starting prices include a dollar equivalent", () => {
  for (const marker of ["$743 тыс.", "$572 тыс.", "$626 тыс.", "$177 тыс."]) {
    assert.match(data, new RegExp(marker.replace("$", "\\$")));
  }
});
