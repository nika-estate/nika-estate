import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync(new URL("../src/QuizApp.jsx", import.meta.url), "utf8");
const content = fs.readFileSync(new URL("../src/quiz-content.js", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../public/project-assets/quiz.css", import.meta.url), "utf8");

for (const slug of ["central-park", "thyme", "jadeel", "havencia"]) {
  test(`${slug} has a one-screen Russian quiz entry`, () => {
    const html = fs.readFileSync(new URL(`../quiz/${slug}/index.html`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`data-project="${slug}"`));
    assert.match(html, /lang="ru"/);
    assert.match(html, /quiz\.css/);
    assert.match(html, /analytics\.js/);
    assert.match(content, new RegExp(`"${slug}"`));
  });
}

test("quiz asks only for the goal and contact details", () => {
  assert.match(app, /С какой целью рассматриваете покупку/);
  assert.match(app, /Как с вами связаться/);
  assert.match(app, /data-quiz-form/);
  assert.match(app, /name="contact"/);
  assert.match(app, /privacy_consent/);
});

test("quiz reuses confirmed lead delivery and supports offer variants", () => {
  assert.match(app, /lead-capture\.js/);
  assert.match(app, /nika:lead-sent/);
  assert.match(content, /requestedOffer/);
  assert.match(content, /invest:/);
  assert.match(content, /life:/);
});

test("quiz is viewport-based and accessible on phones", () => {
  assert.match(css, /100dvh/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
});

