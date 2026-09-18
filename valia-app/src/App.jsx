import * as Gl from "react";
import * as raw from "react/jsx-runtime";
import { localProps } from "./translations.js";
const f = {
  Fragment: raw.Fragment,
  jsx: (type, props, key) => raw.jsx(type, localProps(props), key),
  jsxs: (type, props, key) => raw.jsxs(type, localProps(props), key),
};
const tt = (T) =>
    `${document.documentElement.dataset.assetBase || "./assets/"}${T}`,
  d0 =
    "https://script.google.com/macros/s/AKfycbwioz7fVEzsnDXOz5EOG5f7Db1detqxZYDZF1T8OqyU2DAeUW-_P5envHK6vwCtcNKAbg/exec",
  o0 = [
    ["Планировки", "#plans"],
    ["План платежей", "#payment"],
    ["Локация", "#location"],
    ["Преимущества", "#why"],
  ],
  rf = [
    {
      bedrooms: 1,
      type: "A1",
      page: "03",
      area: "76,28",
      balcony: "9,88",
      feet: "821,07",
      levels: "3–29",
      details: "Отдельная спальня, кухня-гостиная и широкий балкон.",
    },
    {
      bedrooms: 1,
      type: "A1 · верхние этажи",
      page: "04",
      area: "77,06",
      balcony: "9,88",
      feet: "829,47",
      levels: "30–40, 42–52",
      details: "Спальня, гостиная и балкон на верхних этажах.",
    },
    {
      bedrooms: 1,
      type: "A2",
      page: "05",
      area: "76,28",
      balcony: "9,88",
      feet: "821,07",
      levels: "3–52",
      details: "Зеркальный вариант A1 с отдельной зоной спальни.",
    },
    {
      bedrooms: 1,
      type: "B",
      page: "06",
      area: "75,89",
      balcony: "9,88",
      feet: "816,88",
      levels: "3–52",
      details: "Самый компактный формат с отдельной спальней.",
    },
    {
      bedrooms: 2,
      type: "A1",
      page: "07",
      area: "116,37",
      balcony: "11,94",
      feet: "1 252,60",
      levels: "3–52",
      details: "Две спальни, гардеробные и гостевой санузел.",
    },
    {
      bedrooms: 2,
      type: "A2",
      page: "08",
      area: "116,37",
      balcony: "11,94",
      feet: "1 252,60",
      levels: "3–52",
      details: "Просторная кухня-гостиная и две отдельные спальни.",
    },
    {
      bedrooms: 2,
      type: "B1 · подиум",
      page: "17",
      area: "115,37",
      balcony: "15,58",
      feet: "1 241,83",
      levels: "1–3",
      details: "Квартира в подиуме с двумя балконами.",
    },
    {
      bedrooms: 2,
      type: "B2 · подиум",
      page: "18",
      area: "116,43",
      balcony: "15,58",
      feet: "1 253,24",
      levels: "1–3",
      details: "Две спальни, гостевой санузел и два балкона.",
    },
    {
      bedrooms: 2,
      type: "B2 · квартира 03",
      page: "19",
      area: "115,74",
      balcony: "15,85",
      feet: "1 245,82",
      levels: "1–3",
      details: "Вариант подиума с увеличенной площадью балконов.",
    },
    {
      bedrooms: 3,
      type: "A",
      page: "09",
      area: "155,32",
      balcony: "19,76",
      feet: "1 671,85",
      levels: "30–52",
      details: "Три спальни, два балкона и комната для персонала.",
    },
    {
      bedrooms: 3,
      type: "B",
      page: "10",
      area: "153,49",
      balcony: "19,77",
      feet: "1 652,15",
      levels: "53–55",
      details: "Семейная квартира на верхних этажах с тремя балконами.",
    },
    {
      bedrooms: 3,
      type: "C1",
      page: "11",
      area: "157,42",
      balcony: "16,90",
      feet: "1 694,45",
      levels: "53–55",
      details: "Три спальни, гардеробная и комната для персонала.",
    },
    {
      bedrooms: 3,
      type: "C2",
      page: "12",
      area: "157,42",
      balcony: "16,90",
      feet: "1 694,45",
      levels: "53–55",
      details: "Зеркальный вариант C1 с просторной кухней-гостиной.",
    },
    {
      bedrooms: 4,
      type: "A1",
      page: "13",
      area: "237,93",
      balcony: "26,78",
      feet: "2 561,06",
      levels: "53–55",
      details: "Четыре спальни, отдельная кухня, столовая и три балкона.",
    },
    {
      bedrooms: 4,
      type: "A2",
      page: "14",
      area: "237,91",
      balcony: "26,78",
      feet: "2 560,84",
      levels: "53–55",
      details:
        "Большая семейная резиденция с гардеробной и комнатой для персонала.",
    },
  ],
  m0 = [
    ["exterior-3.webp", "Valia на фоне Dubai Creek", "Архитектура"],
    ["interior-3.webp", "Гостиная с панорамными окнами", "Интерьеры"],
    ["interior-1.webp", "Спальня с выходом на балкон", "Интерьеры"],
    ["features-1.webp", "Бассейн и кабаны у дома", "Инфраструктура"],
    ["exterior-4.webp", "Зелёный двор и прогулочные дорожки", "Инфраструктура"],
    ["interior-4.webp", "Кухня, столовая и гостиная", "Интерьеры"],
    ["valia-hero-2.webp", "Лобби с высокими потолками", "Интерьеры"],
    ["features-2.webp", "Открытая зона йоги", "Инфраструктура"],
    ["exterior-2.webp", "Терраса для отдыха и встреч", "Инфраструктура"],
  ],
  h0 = [
    [
      "Набережная и парк вместо городского шума",
      "Dubai Creek Harbour — район у залива с мариной, прогулочными маршрутами и Creek Beach. Valia расположен рядом с зелёной зоной.",
    ],
    [
      "Квартира, в которой есть место для жизни",
      "От одной до четырёх спален, отдельные балконы и большие окна. Можно выбрать компактный формат или просторную семейную резиденцию.",
    ],
    [
      "Спорт и отдых прямо у дома",
      "Взрослый и детский бассейны, падел-корт, йога, открытая фитнес-зона и места для барбекю — без поездок через весь город.",
    ],
    [
      "Район с новой инфраструктурой",
      "Рядом планируются Dubai Square Mall и станция Blue Line Metro. Это будущие объекты: сроки их открытия могут меняться.",
    ],
    [
      "Emaar и понятные условия покупки",
      "Застройщик известных проектов Дубая. До бронирования проверим выбранную квартиру, график платежей и все расходы на сделку.",
    ],
  ],
  r0 = [
    [
      "Что такое Valia?",
      "Новый жилой проект Emaar в Dubai Creek Harbour. В коллекции — квартиры с 1–4 спальнями, балконами, премиальной отделкой и видами на залив, парк или город в зависимости от выбранного лота.",
    ],
    [
      "Сколько стоит квартира?",
      "На официальном сайте Emaar стартовая цена — AED 1,96 млн, примерно $534 тыс. Цена зависит от планировки, этажа и вида. Актуальную стоимость и наличие конкретного лота подтверждаем перед бронированием.",
    ],
    [
      "Как устроен план платежей?",
      "Публично заявлена схема 80/20: 10% при бронировании, 70% в ходе строительства и 20% при передаче. График и дополнительные сборы нужно сверить с актуальным предложением Emaar по выбранной квартире.",
    ],
    [
      "Когда ожидается передача ключей?",
      "Публичные материалы указывают 2030 год, но расходятся в квартале сдачи. Точный срок проверим в актуальных документах Emaar и договоре по выбранному лоту.",
    ],
    [
      "Подходит ли Valia для аренды?",
      "Можно рассматривать проект для аренды после завершения строительства. На консультации рассчитаем индивидуальный прогноз с учётом цены, сервисных сборов, управления и простоя. Доход не гарантирован.",
    ],
  ];
function vf({ id: T, title: W, subtitle: Z, bare: y = !1, onPrivacy: R }) {
  return f.jsxs("div", {
    className: `lead-form-wrap ${y ? "is-bare" : ""}`,
    children: [
      W &&
        f.jsxs(f.Fragment, {
          children: [
            f.jsx("h3", { children: W }),
            f.jsx("p", { className: "form-sub", children: Z }),
          ],
        }),
      f.jsxs("form", {
        id: T,
        className: "valia-form",
        "aria-label": `Заявка Valia — ${T}`,
        "data-offer-name": "Valia — цены, планировки и консультация",
        children: [
          f.jsxs("label", {
            htmlFor: `${T}-name`,
            children: [
              "Ваше имя",
              f.jsx("input", {
                id: `${T}-name`,
                name: "name",
                type: "text",
                autoComplete: "given-name",
                required: !0,
                minLength: "2",
                maxLength: "80",
              }),
            ],
          }),
          f.jsxs("label", {
            htmlFor: `${T}-phone`,
            children: [
              "Телефон для связи",
              f.jsx("input", {
                id: `${T}-phone`,
                name: "phone",
                type: "tel",
                inputMode: "tel",
                autoComplete: "tel",
                placeholder: "Укажите номер с кодом страны",
                required: !0,
                minLength: "7",
                maxLength: "25",
                pattern: "[0-9\\s\\+\\-\\(\\)]{7,25}",
              }),
            ],
          }),
          f.jsxs("label", {
            htmlFor: `${T}-rooms`,
            children: [
              "Какая квартира вам интересна?",
              f.jsxs("select", {
                id: `${T}-rooms`,
                name: "apartment",
                children: [
                  f.jsx("option", { children: "1 спальня" }),
                  f.jsx("option", { children: "2 спальни" }),
                  f.jsx("option", { children: "3 спальни" }),
                  f.jsx("option", { children: "4 спальни" }),
                  f.jsx("option", {
                    children: "Пока не знаю — помогите выбрать",
                  }),
                ],
              }),
            ],
          }),
          f.jsxs("label", {
            className: "consent",
            children: [
              f.jsx("input", {
                name: "privacy_consent",
                type: "checkbox",
                value: "yes",
                required: !0,
              }),
              "Согласен на обработку данных для ответа на заявку. ",
              f.jsx("a", {
                href: "#privacy",
                onClick: R,
                children: "Подробнее",
              }),
            ],
          }),
          f.jsx("button", {
            type: "submit",
            children: "Получить цены и планировки",
          }),
          f.jsx("p", {
            "data-form-status": "",
            role: "status",
            "aria-live": "polite",
            className: "form-status",
          }),
        ],
      }),
      f.jsxs("div", {
        className: "form-trust",
        children: [
          f.jsxs("span", {
            children: [
              f.jsx("img", { src: tt("shield.svg"), alt: "" }),
              "Данные защищены",
            ],
          }),
          f.jsxs("span", {
            children: [
              f.jsx("img", { src: tt("check.svg"), alt: "" }),
              "Брокер Nika Estate",
            ],
          }),
          f.jsxs("span", {
            children: [
              f.jsx("img", { src: tt("check.svg"), alt: "" }),
              "Без обязательств",
            ],
          }),
        ],
      }),
    ],
  });
}
function Ne({ src: T, alt: W, className: Z = "img-wide" }) {
  const y = {
      "waterfront.webp": [1168, 880],
      "pool-impression.webp": [1168, 880],
      "tower-impression.webp": [1920, 1086],
      "interior-4.webp": [1024, 768],
      "features-1.webp": [1200, 655],
      "features-2.webp": [1200, 655],
    },
    [R, k] = y[T] || [1024, 768];
  return f.jsx("figure", {
    className: `img-card ${Z}`,
    children: f.jsx("img", {
      src: tt(T),
      width: R,
      height: k,
      alt: W,
      loading: "lazy",
      decoding: "async",
    }),
  });
}
// Frame the apartment, not the blank page or the small building key plan.
const planFrames = {
  "03": "192 192 528 584",
  "04": "192 192 528 584",
  "05": "192 184 520 592",
  "06": "192 176 528 600",
  "07": "40 184 824 592",
  "08": "40 184 824 592",
  "09": "8 176 928 600",
  10: "8 176 928 600",
  11: "8 16 912 752",
  12: "8 16 912 752",
  13: "8 8 1056 784",
  14: "8 8 1056 784",
  17: "80 168 752 576",
  18: "80 168 752 576",
  19: "80 168 752 576",
};
function PlanDrawing({ src, alt }) {
  const page = src.match(/plan-(\d+)-focus/)?.[1];
  const clipId = "floor-plan-" + Gl.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [x, y, width, height] = planFrames[page].split(" ").map(Number);
  return f.jsxs("svg", {
    className: "plan-drawing",
    viewBox: planFrames[page],
    role: "img",
    "aria-label": alt,
    children: [
      f.jsx("defs", {
        children: f.jsx("clipPath", {
          id: clipId,
          clipPathUnits: "userSpaceOnUse",
          children: f.jsx("rect", { x, y, width, height }),
        }),
      }),
      f.jsx("image", {
        href: tt(src),
        width: 1174,
        height: 1095,
        clipPath: `url(#${clipId})`,
      }),
    ],
  });
}
function ResponsiveDetails({ title, children }) {
  const [open, setOpen] = Gl.useState(false);
  Gl.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setOpen(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return f.jsxs("details", {
    className: "responsive-details",
    open,
    onToggle: (event) => setOpen(event.currentTarget.open),
    children: [f.jsx("summary", { children: title }), children],
  });
}
function _e({
  children: T = "Получить цены и планировки",
  onClick: W,
  light: Z = !1,
}) {
  return f.jsx("button", {
    type: "button",
    onClick: W,
    className: `btn ${Z ? "btn-light" : "btn-primary"}`,
    children: T,
  });
}
function v0() {
  const [T, W] = Gl.useState(!1),
    [Z, y] = Gl.useState(!1),
    [R, k] = Gl.useState(!1),
    [hl, Hl] = Gl.useState(!1),
    [M, x] = Gl.useState(!1),
    [Q, H] = Gl.useState(!1),
    [sl, Vl] = Gl.useState(1),
    [P, Dl] = Gl.useState(rf[0]),
    [at, Ll] = Gl.useState("Все"),
    [Al, Nl] = Gl.useState(null),
    [Xl, rt] = Gl.useState(new Set([0])),
    [Ql, V] = Gl.useState(!1),
    [videoLoaded, setVideoLoaded] = Gl.useState(false),
    Ol = Gl.useRef(null),
    wl = Gl.useRef(null),
    It = m0.filter((m) => at === "Все" || m[2] === at),
    El = () => {
      (W(!1), y(!1), (wl.current = document.activeElement), H(!0));
    },
    gl = () => {
      var m;
      (H(!1), Nl(null), (m = wl.current) == null || m.focus());
    };
  (Gl.useEffect(() => {
    const m = () => {
        (k(window.scrollY > 60), Hl(window.scrollY > 500));
      },
      j = (C) => {
        const I = C.target.closest('a[href^="#"]');
        if (!I || C.ctrlKey || C.metaKey || C.shiftKey || C.altKey) return;
        const o = document.getElementById(I.getAttribute("href").slice(1));
        o &&
          (C.preventDefault(),
          history.pushState(null, "", I.getAttribute("href")),
          o.scrollIntoView({ behavior: "instant", block: "start" }));
      };
    (document.addEventListener("click", j),
      m(),
      window.addEventListener("scroll", m, { passive: !0 }));
    const A = document.createElement("script");
    return (
      (A.src = tt("lead-capture.js")),
      (A.dataset.endpoint = d0),
      (A.dataset.landingName =
        "Valia by Emaar — Dubai Creek Harbour (" +
        document.documentElement.lang.toUpperCase() +
        ")"),
      (A.dataset.offerName = "Valia — цены, планировки и консультация"),
      (A.onload = () => {
        var C;
        return (C = window.NikaLeadCapture) == null ? void 0 : C.init(document);
      }),
      document.body.appendChild(A),
      () => {
        (window.removeEventListener("scroll", m),
          document.removeEventListener("click", j),
          A.remove());
      }
    );
  }, []),
    Gl.useEffect(() => {
      var A;
      if (!Q && !Al) return;
      document.body.classList.add("modal-open");
      const m = () =>
        [
          ...Ol.current.querySelectorAll("button, a[href], input, select"),
        ].filter((C) => !C.disabled && C.getClientRects().length);
      (A = m()[0]) == null || A.focus();
      const j = (C) => {
        if ((C.key === "Escape" && gl(), C.key === "Tab")) {
          const I = m(),
            o = I[0],
            z = I.at(-1);
          C.shiftKey && document.activeElement === o
            ? (C.preventDefault(), z.focus())
            : !C.shiftKey &&
              document.activeElement === z &&
              (C.preventDefault(), o.focus());
        }
      };
      return (
        document.addEventListener("keydown", j),
        () => {
          (document.body.classList.remove("modal-open"),
            document.removeEventListener("keydown", j));
        }
      );
    }, [Q, Al]));
  const Tt = (m, j) => {
      ((wl.current = document.activeElement), Nl({ src: m, alt: j }));
    },
    At = (m) => {
      (Vl(m), Dl(rf.find((j) => j.bedrooms === m)));
    },
    et = (m) =>
      rt((j) => {
        const A = new Set(j);
        return (A.has(m) ? A.delete(m) : A.add(m), A);
      });
  return f.jsxs(f.Fragment, {
    children: [
      f.jsx("a", {
        className: "screen-reader-text",
        href: "#main",
        children: "Перейти к содержимому",
      }),
      f.jsx("header", {
        className: `site-header ${R ? "is-stuck" : ""}`,
        children: f.jsxs("div", {
          className: "header-inner",
          children: [
            f.jsxs("a", {
              className: "brand",
              href: "#main",
              children: [
                "Emaar Valia",
                f.jsx("span", { children: "Dubai Creek Harbour" }),
              ],
            }),
            f.jsx("a", {
              className: "language-switch",
              href: document.documentElement.lang === "en" ? "../" : "./en/",
              children: document.documentElement.lang === "en" ? "RU" : "EN",
            }),
            f.jsx("button", {
              className: "nav-toggle",
              type: "button",
              "aria-controls": "navigation",
              "aria-expanded": T,
              onClick: () => W(!T),
              children: T ? "Закрыть" : "Меню",
            }),
            f.jsx("nav", {
              id: "navigation",
              className: `main-nav ${T ? "open" : ""}`,
              "aria-label": "Навигация",
              children: f.jsxs("ul", {
                children: [
                  o0.map(([m, j]) =>
                    f.jsx(
                      "li",
                      {
                        children: f.jsx("a", {
                          href: j,
                          onClick: () => W(!1),
                          children: m,
                        }),
                      },
                      j,
                    ),
                  ),
                  f.jsxs("li", {
                    className: "more-nav",
                    children: [
                      f.jsx("button", {
                        className: "mega-toggle",
                        type: "button",
                        "aria-expanded": Z,
                        onClick: () => y(!Z),
                        children: "Ещё",
                      }),
                      Z &&
                        f.jsxs("div", {
                          className: "more-panel",
                          children: [
                            f.jsx("a", {
                              href: "#gallery",
                              onClick: () => {
                                (W(!1), y(!1));
                              },
                              children: "Галерея",
                            }),
                            f.jsx("a", {
                              href: "#amenities",
                              onClick: () => {
                                (W(!1), y(!1));
                              },
                              children: "Инфраструктура",
                            }),
                            f.jsx("a", {
                              href: "#faq",
                              onClick: () => {
                                (W(!1), y(!1));
                              },
                              children: "Вопросы и ответы",
                            }),
                          ],
                        }),
                    ],
                  }),
                  f.jsx("li", {
                    children: f.jsx("button", {
                      type: "button",
                      className: "nav-cta",
                      onClick: El,
                      children: "Получить цены",
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      f.jsxs("main", {
        id: "main",
        children: [
          f.jsx("section", {
            className: "hero hero-photo section-dark",
            children: [
              f.jsx("img", {
                className: "hero-backdrop",
                src: tt("exterior-3.webp"),
                alt: "Valia by Emaar — визуализация здания у Dubai Creek",
                fetchPriority: "high",
              }),
              f.jsx("div", {
                className: "wrap",
                children: f.jsxs("div", {
                  className: "hero-grid",
                  children: [
                    f.jsxs("div", {
                      className: "hero-copy",
                      children: [
                        f.jsxs("span", {
                          className: "hero-badge",
                          children: [
                            f.jsx("span", { className: "dot" }),
                            "Новый проект · Emaar",
                          ],
                        }),
                        f.jsxs("h1", {
                          children: [
                            "Emaar Valia в",
                            f.jsx("br", {}),
                            "Dubai Creek Harbour",
                          ],
                        }),
                        f.jsxs("p", {
                          className: "lede",
                          children: [
                            "Квартиры с ",
                            f.jsx("strong", { children: "1–4 спальнями" }),
                            " у парка и набережной. Балконы, панорамные окна и отдых у дома.",
                          ],
                        }),
                        f.jsxs("div", {
                          className: "hero-facts",
                          children: [
                            f.jsxs("div", {
                              children: [
                                f.jsx("strong", { children: "AED 1,96 млн" }),
                                f.jsx("span", { children: "Стартовая цена" }),
                              ],
                            }),
                            f.jsxs("div", {
                              children: [
                                f.jsx("strong", { children: "1–4" }),
                                f.jsx("span", { children: "Спальни" }),
                              ],
                            }),
                            f.jsxs("div", {
                              children: [
                                f.jsx("strong", { children: "80/20" }),
                                f.jsx("span", { children: "План платежей" }),
                              ],
                            }),
                            f.jsxs("div", {
                              children: [
                                f.jsx("strong", { children: "2030" }),
                                f.jsx("span", { children: "Ожидаемая сдача*" }),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "hero-actions",
                          children: [
                            f.jsx("button", {
                              className: "btn btn-light hero-enquire",
                              type: "button",
                              onClick: El,
                              children: "Получить цены и планировки",
                            }),
                            f.jsx("a", {
                              className: "hero-secondary",
                              href: "#plans",
                              children: "Планировки и площади",
                            }),
                            f.jsx("a", {
                              className: "hero-secondary",
                              href: "#payment",
                              children: "Условия покупки",
                            }),
                          ],
                        }),
                      ],
                    }),
                    f.jsxs("div", {
                      className: "hero-form",
                      children: [
                        f.jsxs("div", {
                          className: "form-head",
                          children: [
                            f.jsx("h2", {
                              children: "Получите цены и планировки",
                            }),
                            f.jsx("p", {
                              className: "form-sub",
                              children:
                                "Брокер Nika Estate проверит доступные квартиры и подберёт варианты под ваш бюджет.",
                            }),
                          ],
                        }),
                        f.jsx(vf, { id: "valia-hero", bare: !0 }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          f.jsx("section", {
            id: "overview",
            className: "section",
            children: f.jsx("div", {
              className: "wrap",
              children: f.jsxs("div", {
                className: "split-52",
                children: [
                  f.jsxs("div", {
                    children: [
                      f.jsx("span", {
                        className: "eyebrow",
                        children: "О проекте",
                      }),
                      f.jsxs("h2", {
                        children: [
                          "Жить у воды.",
                          f.jsx("br", {}),
                          "Быть рядом с городом.",
                        ],
                      }),
                      f.jsxs("p", {
                        children: [
                          f.jsx("strong", { children: "Valia by Emaar" }),
                          " — квартиры у парка и набережной Dubai Creek Harbour. Вид на залив, парк или город зависит от выбранного лота.",
                        ],
                      }),
                      f.jsx(ResponsiveDetails, {
                        title: "Подробнее о проекте",
                        children: [
                          f.jsx("p", {
                            children:
                              "Рядом — прогулочная набережная, марина и зелёные пространства. Напротив предусмотрен торгово-развлекательный центр Dubai Square, а по другую сторону канала — будущая станция Blue Line Metro.",
                          }),
                          f.jsx("ul", {
                            className: "spec-list",
                            children: [
                              ["Застройщик", "Emaar Properties"],
                              ["Квартиры", "1, 2, 3 и 4 спальни"],
                              ["Площадь с балконами", "75,89–237,93 м²"],
                              ["Отделка", "Премиальные материалы"],
                              ["Балкон", "В каждой квартире"],
                            ].map(([m, j]) =>
                              f.jsxs(
                                "li",
                                {
                                  children: [
                                    f.jsx("span", {
                                      className: "k",
                                      children: m,
                                    }),
                                    f.jsx("span", {
                                      className: "v",
                                      children: j,
                                    }),
                                  ],
                                },
                                m,
                              ),
                            ),
                          }),
                        ],
                      }),
                      f.jsxs("div", {
                        className: "btn-row",
                        children: [
                          f.jsx(_e, {
                            onClick: El,
                            children: "Получить презентацию",
                          }),
                          f.jsx("a", {
                            href: "#location",
                            className: "link-arrow",
                            children: "Посмотреть расположение",
                          }),
                        ],
                      }),
                    ],
                  }),
                  f.jsxs("div", {
                    children: [
                      f.jsx(Ne, {
                        src: "waterfront.webp",
                        alt: "Иллюстрация набережной Dubai Creek Harbour",
                      }),
                      f.jsx("p", {
                        className: "img-caption",
                        children:
                          "Набережная и марина района. Иллюстрация из референса, не фотография готового проекта.",
                      }),
                      f.jsx(ResponsiveDetails, {
                        title: "Видео проекта",
                        children: f.jsxs("div", {
                          className: "reel-row",
                          id: "video",
                          children: [
                            f.jsx("div", {
                              className: "video-reel",
                              children: videoLoaded
                                ? f.jsx("iframe", {
                                    title: "Valia — project video",
                                    src: "https://www.youtube-nocookie.com/embed/7SPR5kxjI_M?autoplay=1",
                                    allow:
                                      "autoplay; encrypted-media; picture-in-picture",
                                    allowFullScreen: true,
                                  })
                                : f.jsxs("button", {
                                    type: "button",
                                    className: "video-start",
                                    onClick: () => setVideoLoaded(true),
                                    children: [
                                      f.jsx("img", {
                                        src: tt("video-poster.webp"),
                                        alt: "Valia — Emaar",
                                        loading: "lazy",
                                      }),
                                      f.jsx("span", {
                                        children:
                                          document.documentElement.lang === "en"
                                            ? "Play project video"
                                            : "Смотреть видео проекта",
                                      }),
                                    ],
                                  }),
                            }),
                            f.jsxs("div", {
                              className: "reel-note",
                              children: [
                                f.jsx("span", {
                                  className: "eyebrow",
                                  children: "Видео проекта",
                                }),
                                f.jsx("h3", {
                                  children: "Посмотрите Valia в движении",
                                }),
                                f.jsx("p", {
                                  children:
                                    "Архитектура, окружение и атмосфера нового адреса у Dubai Creek.",
                                }),
                                f.jsx("button", {
                                  type: "button",
                                  className: "text-button",
                                  onClick: El,
                                  children: "Получить материалы проекта",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          f.jsx("section", {
            id: "gallery",
            className: "section section-alt",
            children: f.jsxs("div", {
              className: "wrap",
              children: [
                f.jsx("span", {
                  className: "eyebrow",
                  children: "Архитектура и интерьеры",
                }),
                f.jsx("h2", {
                  children: "Виды, к которым хочется возвращаться",
                }),
                f.jsx("p", {
                  className: "lede",
                  children:
                    "Визуализации Emaar: светлые квартиры, зелёный двор и пространства для отдыха.",
                }),
                f.jsx("div", {
                  className: "filter-tabs",
                  "aria-label": "Фильтр галереи",
                  children: [
                    "Все",
                    "Архитектура",
                    "Интерьеры",
                    "Инфраструктура",
                  ].map((m) =>
                    f.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": at === m,
                        onClick: () => Ll(m),
                        children: m,
                      },
                      m,
                    ),
                  ),
                }),
                f.jsx("div", {
                  className: "gallery-grid",
                  children: It.map(([m, j], A) =>
                    f.jsxs(
                      "button",
                      {
                        type: "button",
                        className: `gallery-item ${A === 0 ? "gallery-main" : ""}`,
                        onClick: () => Tt(m, j),
                        "aria-label": `Увеличить: ${j}`,
                        children: [
                          f.jsx("img", { src: tt(m), alt: j, loading: "lazy" }),
                          f.jsx("span", { children: j }),
                        ],
                      },
                      m,
                    ),
                  ),
                }),
                f.jsx("p", {
                  className: "img-caption",
                  children:
                    "Все изображения Emaar — визуализации. Фактические виды и отделка зависят от выбранной квартиры.",
                }),
              ],
            }),
          }),
          f.jsx("section", {
            id: "plans",
            className: "section section-dark",
            children: f.jsxs("div", {
              className: "wrap",
              children: [
                f.jsxs("div", {
                  className: "grid-2",
                  children: [
                    f.jsxs("div", {
                      children: [
                        f.jsx("span", {
                          className: "eyebrow",
                          children: "Квартиры и цены",
                        }),
                        f.jsx("h2", {
                          children: "Планировки для вашего образа жизни",
                        }),
                        f.jsx("p", {
                          className: "lede",
                          children:
                            "От компактной квартиры до семейной резиденции. Стартовая цена Emaar — AED 1,96 млн, примерно $534 тыс.",
                        }),
                      ],
                    }),
                    f.jsx("div", {
                      className: "btn-row",
                      children: f.jsx(_e, {
                        light: !0,
                        onClick: El,
                        children: "Запросить актуальный прайс",
                      }),
                    }),
                  ],
                }),
                f.jsx(ResponsiveDetails, {
                  title: "Сравнить площади всех квартир",
                  children: f.jsx("div", {
                    className: "table-scroll",
                    children: f.jsxs("table", {
                      className: "v-table",
                      children: [
                        f.jsx("caption", {
                          children:
                            "Площади по планам Emaar включают балконы. Цена конкретной квартиры зависит от этажа, типа и вида.",
                        }),
                        f.jsx("thead", {
                          children: f.jsxs("tr", {
                            children: [
                              f.jsx("th", { children: "Формат" }),
                              f.jsx("th", { children: "Площадь, м²" }),
                              f.jsx("th", { children: "Балконы, м²" }),
                              f.jsx("th", { children: "Кому подходит" }),
                            ],
                          }),
                        }),
                        f.jsx("tbody", {
                          children: [
                            [
                              "1 спальня",
                              "75,89–77,06",
                              "9,88",
                              "Для одного, пары или аренды",
                            ],
                            [
                              "2 спальни",
                              "115,37–116,43",
                              "11,94–15,85",
                              "Для пары с ребёнком",
                            ],
                            [
                              "3 спальни",
                              "153,49–157,42",
                              "16,90–19,77",
                              "Для семьи и работы из дома",
                            ],
                            [
                              "4 спальни",
                              "237,91–237,93",
                              "26,78",
                              "Для большой семьи",
                            ],
                          ].map((m) =>
                            f.jsx(
                              "tr",
                              {
                                children: m.map((j) =>
                                  f.jsx("td", { children: j }, j),
                                ),
                              },
                              m[0],
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                }),
                f.jsx("div", {
                  className: "filter-tabs dark-tabs",
                  "aria-label": "Число спален",
                  children: [1, 2, 3, 4].map((m) =>
                    f.jsxs(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": sl === m,
                        onClick: () => At(m),
                        "aria-label": `${m} ${m === 1 ? "спальня" : "спальни"}`,
                        children: [
                          f.jsxs("span", {
                            className: "bedroom-full",
                            children: [m, " ", m === 1 ? "спальня" : "спальни"],
                          }),
                          f.jsxs("span", {
                            className: "bedroom-short",
                            "aria-hidden": true,
                            children: [m, " сп."],
                          }),
                        ],
                      },
                      m,
                    ),
                  ),
                }),
                f.jsxs("div", {
                  className: "plan-panel",
                  children: [
                    f.jsx("div", {
                      className: "plan-visual",
                      children: f.jsxs("button", {
                        type: "button",
                        onClick: () =>
                          Tt(
                            `plan-${P.page}-focus.webp`,
                            `${P.bedrooms} ${P.bedrooms === 1 ? "спальня" : "спальни"}, тип ${P.type}`,
                          ),
                        "aria-label": "Увеличить планировку",
                        children: [
                          f.jsx(PlanDrawing, {
                            src: `plan-${P.page}-focus.webp`,
                            alt: `План Emaar — ${P.bedrooms} ${P.bedrooms === 1 ? "спальня" : "спальни"}, тип ${P.type}`,
                          }),
                          f.jsx("span", { children: "Увеличить планировку" }),
                        ],
                      }),
                    }),
                    f.jsx(ResponsiveDetails, {
                      title: "Площадь, этаж и варианты планировки",
                      children: f.jsxs("div", {
                        className: "plan-details",
                        children: [
                          f.jsx("span", {
                            className: "eyebrow",
                            children: "Планы Emaar",
                          }),
                          f.jsxs("h3", {
                            children: [
                              P.bedrooms,
                              " ",
                              P.bedrooms === 1 ? "спальня" : "спальни",
                              " · ",
                              P.type,
                            ],
                          }),
                          f.jsx("p", { children: P.details }),
                          f.jsx("div", {
                            className: "plan-variants",
                            "aria-label": "Варианты планировки",
                            children: rf
                              .filter((m) => m.bedrooms === sl)
                              .map((m) =>
                                f.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    "aria-pressed": m.page === P.page,
                                    onClick: () => Dl(m),
                                    children: m.type,
                                  },
                                  m.page,
                                ),
                              ),
                          }),
                          f.jsxs("ul", {
                            className: "spec-list",
                            children: [
                              f.jsxs("li", {
                                children: [
                                  f.jsx("span", {
                                    className: "k",
                                    children: "Общая площадь",
                                  }),
                                  f.jsxs("span", {
                                    className: "v",
                                    children: [P.area, " м²"],
                                  }),
                                ],
                              }),
                              f.jsxs("li", {
                                children: [
                                  f.jsx("span", {
                                    className: "k",
                                    children: "Включая балконы",
                                  }),
                                  f.jsxs("span", {
                                    className: "v",
                                    children: [P.balcony, " м²"],
                                  }),
                                ],
                              }),
                              f.jsxs("li", {
                                children: [
                                  f.jsx("span", {
                                    className: "k",
                                    children: "Площадь в ft²",
                                  }),
                                  f.jsx("span", {
                                    className: "v",
                                    children: P.feet,
                                  }),
                                ],
                              }),
                              f.jsxs("li", {
                                children: [
                                  f.jsx("span", {
                                    className: "k",
                                    children: "Этажи*",
                                  }),
                                  f.jsx("span", {
                                    className: "v",
                                    children: P.levels,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          f.jsx(_e, {
                            onClick: El,
                            children: "Получить презентацию и план",
                          }),
                          f.jsx("a", {
                            className: "download-link",
                            href: tt("floor-plans.pdf"),
                            target: "_blank",
                            rel: "noopener",
                            children: "Все планы квартир — PDF",
                          }),
                          f.jsx("p", {
                            className: "small-note",
                            children:
                              "*Диапазоны могут включать служебные этажи без квартир этого типа. Точное расположение и площадь — в плане выбранного лота. Схемы не в масштабе.",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
          f.jsx("section", {
            id: "payment",
            className: "section",
            children: f.jsx("div", {
              className: "wrap",
              children: f.jsxs("div", {
                className: "split-52",
                children: [
                  f.jsxs("div", {
                    children: [
                      f.jsx("span", {
                        className: "eyebrow",
                        children: "План платежей",
                      }),
                      f.jsxs("h2", {
                        children: [
                          "Оплата поэтапно.",
                          f.jsx("br", {}),
                          "Без всей суммы сразу.",
                        ],
                      }),
                      f.jsx("p", {
                        className: "lede",
                        children:
                          "Схема 80/20: основная часть — до завершения строительства, остаток — при передаче квартиры.",
                      }),
                      f.jsx("div", {
                        className: "payment-steps",
                        children: [
                          ["10%", "При бронировании"],
                          ["70%", "В ходе строительства"],
                          ["20%", "При передаче ключей"],
                        ].map(([m, j]) =>
                          f.jsxs(
                            "div",
                            {
                              children: [
                                f.jsx("strong", { children: m }),
                                f.jsx("span", { children: j }),
                              ],
                            },
                            m,
                          ),
                        ),
                      }),
                      f.jsx(ResponsiveDetails, {
                        title: "Сроки и дополнительные расходы",
                        children: f.jsx("p", {
                          className: "small-note",
                          children:
                            "Схема указана в публичных материалах проекта. Даты платежей, дополнительные сборы и условия бронирования подтверждаем по актуальному предложению Emaar. Ожидаемая сдача — 2030 год; точный срок — в договоре.",
                        }),
                      }),
                      f.jsx("div", {
                        className: "btn-row",
                        children: f.jsx(_e, {
                          onClick: El,
                          children: "Рассчитать мой план платежей",
                        }),
                      }),
                    ],
                  }),
                  f.jsx(Ne, {
                    src: "interior-4.webp",
                    alt: "Гостиная и столовая Valia — визуализация Emaar",
                  }),
                ],
              }),
            }),
          }),
          f.jsx("section", {
            id: "location",
            className: "section",
            children: f.jsxs("div", {
              className: "wrap",
              children: [
                f.jsxs("div", {
                  className: "split-25",
                  children: [
                    f.jsxs("div", {
                      children: [
                        f.jsx("span", {
                          className: "eyebrow",
                          children: "Локация",
                        }),
                        f.jsx("h2", {
                          children: "Парк и набережная у вашего дома",
                        }),
                        f.jsx("p", {
                          children:
                            "Dubai Creek Harbour — современный район Дубая у залива. Для тех, кто хочет прогулок у воды, спокойной среды и доступа к городским возможностям.",
                        }),
                        f.jsx(ResponsiveDetails, {
                          title: "Развитие района",
                          children: f.jsx("p", {
                            children:
                              "Valia расположен у зелёной зоны, рядом с будущим Dubai Square Mall. В генеральном плане также обозначена будущая станция метро Emaar Properties.",
                          }),
                        }),
                        f.jsx("a", {
                          className: "text-button",
                          href: "https://www.google.com/maps/search/?api=1&query=Dubai%20Creek%20Harbour%20Dubai",
                          target: "_blank",
                          rel: "noopener",
                          children: "Открыть район на карте",
                        }),
                      ],
                    }),
                    f.jsxs("button", {
                      className: "map-plan",
                      type: "button",
                      onClick: () =>
                        Tt(
                          "masterplan.webp",
                          "Расположение Valia на генеральном плане Emaar",
                        ),
                      "aria-label": "Увеличить карту с расположением Valia",
                      children: [
                        f.jsx("img", {
                          src: tt("masterplan.webp"),
                          loading: "lazy",
                          alt: "Генеральный план Emaar: Valia, Creek Beach, Central Park, Dubai Square Mall и будущая станция метро",
                        }),
                        f.jsx("span", {
                          children:
                            "Расположение Valia на карте Emaar — увеличить",
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsx(ResponsiveDetails, {
                  title: "Время в пути",
                  children: [
                    f.jsx("div", {
                      className: "location-times",
                      children: [
                        [
                          "Dubai International Airport",
                          "Международный аэропорт DXB",
                          "10 минут",
                        ],
                        [
                          "Downtown Dubai",
                          "Центр города и Burj Khalifa",
                          "15 минут",
                        ],
                        [
                          "Dubai Marina",
                          "Набережная и прогулочный район",
                          "25 минут",
                        ],
                        [
                          "Al Maktoum Airport",
                          "Международный аэропорт DWC",
                          "40 минут",
                        ],
                      ].map(([m, j, A]) =>
                        f.jsxs(
                          "div",
                          {
                            children: [
                              f.jsx("h3", { children: m }),
                              f.jsx("p", { children: j }),
                              f.jsx("strong", { children: A }),
                            ],
                          },
                          m,
                        ),
                      ),
                    }),
                  ],
                }),
                f.jsx("p", {
                  className: "small-note",
                  children:
                    "Время на автомобиле по брошюре Emaar, без учёта пробок. Dubai Square Mall и Blue Line Metro — будущая инфраструктура.",
                }),
                f.jsx(ResponsiveDetails, {
                  title: "Посмотреть интерактивную карту",
                  children: f.jsx("div", {
                    className: "live-map",
                    children: Ql
                      ? f.jsx("iframe", {
                          title: "Карта района Dubai Creek Harbour",
                          src: "https://maps.google.com/maps?q=Dubai%20Creek%20Harbour%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed",
                          loading: "lazy",
                          referrerPolicy: "no-referrer-when-downgrade",
                          allowFullScreen: !0,
                        })
                      : f.jsxs("div", {
                          children: [
                            f.jsx("h3", {
                              children: "Посмотрите окружение на Google Картах",
                            }),
                            f.jsx("p", {
                              children:
                                "Интерактивная карта показывает район Dubai Creek Harbour. Точная позиция Valia отмечена на плане Emaar выше.",
                            }),
                            f.jsx("button", {
                              className: "btn btn-primary",
                              type: "button",
                              onClick: () => V(!0),
                              children: "Показать интерактивную карту",
                            }),
                            f.jsx("p", {
                              className: "small-note",
                              children:
                                "При загрузке карты Google получает технические данные вашего браузера.",
                            }),
                          ],
                        }),
                  }),
                }),
              ],
            }),
          }),
          f.jsx("section", {
            className: "section section-tight hero-media-band",
            children: f.jsx("div", {
              className: "wrap",
              children: f.jsxs("div", {
                className: "hero-media",
                children: [
                  f.jsx(Ne, {
                    src: "exterior-3.webp",
                    alt: "Valia — визуализация Emaar",
                    className: "",
                  }),
                  f.jsx("p", {
                    className: "img-caption",
                    children: "Valia — визуализация Emaar",
                  }),
                  f.jsxs("div", {
                    className: "trust-strip",
                    children: [
                      f.jsx("span", { children: "Emaar Properties" }),
                      f.jsx("span", { children: "1–4 спальни" }),
                      f.jsx("span", { children: "Балкон в каждой квартире" }),
                      f.jsx("span", {
                        children: "Отделка премиального уровня",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          f.jsx("section", {
            id: "amenities",
            className: "section",
            children: f.jsxs("div", {
              className: "wrap",
              children: [
                f.jsx("span", {
                  className: "eyebrow",
                  children: "Инфраструктура",
                }),
                f.jsx("h2", { children: "Отдыхать, двигаться, встречаться" }),
                f.jsx("p", {
                  className: "lede",
                  children:
                    "Пространства для взрослых и детей, которые делают обычный день приятнее.",
                }),
                f.jsxs("div", {
                  className: "amenities-media",
                  children: [
                    f.jsx(Ne, {
                      src: "features-1.webp",
                      alt: "Взрослый бассейн Valia — визуализация Emaar",
                    }),
                    f.jsx(Ne, {
                      src: "features-2.webp",
                      alt: "Лужайка и йога-зона Valia — визуализация Emaar",
                    }),
                  ],
                }),
                f.jsx("div", {
                  className: "amenity-grid",
                  children: [
                    ["Взрослый бассейн", "С контролем температуры воды"],
                    ["Детский бассейн", "Отдельная зона для детей"],
                    ["Падел-корт", "Для активного отдыха"],
                    ["Йога-дек", "Занятия на открытом воздухе"],
                    ["Фитнес-зона", "Тренировки во дворе"],
                    ["Барбекю", "Встречи с семьёй и друзьями"],
                    ["Приватные кабаны", "Отдых в тени у бассейна"],
                    ["Splash pad", "Водная игровая зона"],
                    ["Детские площадки", "Игры на свежем воздухе"],
                    ["Зелёная лужайка", "Пространство для отдыха"],
                  ].map(([m, j]) =>
                    f.jsxs(
                      "div",
                      {
                        children: [
                          f.jsx("h3", { children: m }),
                          f.jsx("p", { children: j }),
                        ],
                      },
                      m,
                    ),
                  ),
                }),
              ],
            }),
          }),
          f.jsx("section", {
            id: "why",
            className: "section section-alt",
            children: f.jsx("div", {
              className: "wrap",
              children: f.jsxs("div", {
                className: "grid-2",
                children: [
                  f.jsxs("div", {
                    children: [
                      f.jsx("span", {
                        className: "eyebrow",
                        children: "Почему Valia",
                      }),
                      f.jsx("h2", { children: "Пять причин присмотреться" }),
                      f.jsx("ol", {
                        className: "reason-list",
                        children: h0.map(([m, j]) =>
                          f.jsx(
                            "li",
                            {
                              children: f.jsx(ResponsiveDetails, {
                                title: m,
                                children: f.jsxs("div", {
                                  children: [
                                    f.jsx("h3", { children: m }),
                                    f.jsx("p", { children: j }),
                                  ],
                                }),
                              }),
                            },
                            m,
                          ),
                        ),
                      }),
                    ],
                  }),
                  f.jsxs("div", {
                    id: "faq",
                    children: [
                      f.jsx("span", {
                        className: "eyebrow",
                        children: "Нас часто спрашивают",
                      }),
                      f.jsx("h2", { children: "Вопросы о Valia" }),
                      f.jsx("div", {
                        className: "faq-list",
                        children: r0.map(([m, j], A) =>
                          f.jsxs(
                            "div",
                            {
                              className: `faq-item ${Xl.has(A) ? "open" : ""}`,
                              children: [
                                f.jsx("h3", {
                                  children: f.jsx("button", {
                                    type: "button",
                                    className: "faq-q",
                                    "aria-expanded": Xl.has(A),
                                    "aria-controls": `faq-${A}`,
                                    onClick: () => et(A),
                                    children: m,
                                  }),
                                }),
                                f.jsx("div", {
                                  className: "faq-a",
                                  id: `faq-${A}`,
                                  hidden: !Xl.has(A),
                                  children: f.jsx("p", { children: j }),
                                }),
                              ],
                            },
                            m,
                          ),
                        ),
                      }),
                      f.jsxs("ul", {
                        className: "related-inline",
                        children: [
                          f.jsx("li", {
                            children: f.jsx("a", {
                              href: "#plans",
                              children: "Планировки",
                            }),
                          }),
                          f.jsx("li", {
                            children: f.jsx("a", {
                              href: "#amenities",
                              children: "Инфраструктура",
                            }),
                          }),
                          f.jsx("li", {
                            children: f.jsx("a", {
                              href: "#payment",
                              children: "Условия покупки",
                            }),
                          }),
                          f.jsx("li", {
                            children: f.jsx("a", {
                              href: "#gallery",
                              children: "Интерьеры",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          f.jsx("section", {
            id: "contact",
            className: "section",
            children: f.jsx("div", {
              className: "wrap",
              children: f.jsxs("div", {
                className: "split-52",
                children: [
                  f.jsxs("div", {
                    children: [
                      f.jsx("span", {
                        className: "eyebrow",
                        children: "Следующий шаг",
                      }),
                      f.jsx("h2", {
                        children: "Обсудите Valia с брокером Nika Estate",
                      }),
                      f.jsx(ResponsiveDetails, {
                        title: "Что вы получите на консультации",
                        children: [
                          f.jsx("p", {
                            children:
                              "Расскажите, какую квартиру ищете и какой бюджет планируете. Проверим предложения Emaar, сравним этажи и виды, посчитаем платежи и расходы — до вашего решения о покупке.",
                          }),
                          f.jsxs("ul", {
                            className: "check-list tick-navy",
                            children: [
                              f.jsx("li", {
                                children:
                                  "Актуальные цены и доступные квартиры",
                              }),
                              f.jsx("li", {
                                children:
                                  "Подбор планировки под жизнь или инвестиции",
                              }),
                              f.jsx("li", {
                                children:
                                  "Расчёт платежей и индивидуального прогноза аренды",
                              }),
                            ],
                          }),
                        ],
                      }),
                      f.jsx(Ne, {
                        src: "features-1.webp",
                        alt: "Бассейн Valia — визуализация Emaar",
                      }),
                      f.jsx("p", {
                        className: "img-caption",
                        children: "Бассейн Valia — визуализация Emaar",
                      }),
                    ],
                  }),
                  f.jsx(vf, {
                    id: "valia-contact",
                    title: "Получите подборку квартир Valia",
                    subtitle:
                      "Оставьте заявку — брокер поможет разобраться в вариантах и условиях.",
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      f.jsx("footer", {
        className: "site-footer",
        children: f.jsxs("div", {
          className: "wrap",
          children: [
            f.jsxs("div", {
              className: "footer-main",
              children: [
                f.jsxs("div", {
                  className: "footer-about",
                  children: [
                    f.jsxs("a", {
                      href: "#main",
                      className: "brand",
                      children: [
                        "Emaar Valia",
                        f.jsx("span", { children: "Dubai Creek Harbour" }),
                      ],
                    }),
                    f.jsx("p", {
                      children:
                        "Квартиры Emaar с 1–4 спальнями у парка и залива. Подбор и сопровождение — Nika Estate.",
                    }),
                    f.jsx(_e, {
                      light: !0,
                      onClick: El,
                      children: "Получить цены",
                    }),
                  ],
                }),
                [
                  [
                    "Проект",
                    [
                      ["Планировки", "#plans"],
                      ["Галерея", "#gallery"],
                      ["Инфраструктура", "#amenities"],
                    ],
                  ],
                  [
                    "Покупка",
                    [
                      ["План платежей", "#payment"],
                      ["Консультация", "#contact"],
                      ["Вопросы и ответы", "#faq"],
                    ],
                  ],
                  [
                    "Район",
                    [
                      ["Расположение", "#location"],
                      ["Видео проекта", "#video"],
                      ["Преимущества", "#why"],
                    ],
                  ],
                ].map(([m, j]) =>
                  f.jsxs(
                    "div",
                    {
                      className: "footer-col",
                      children: [
                        f.jsx("h3", { children: m }),
                        f.jsx("ul", {
                          children: j.map(([A, C]) =>
                            f.jsx(
                              "li",
                              {
                                children: f.jsx("a", { href: C, children: A }),
                              },
                              C,
                            ),
                          ),
                        }),
                      ],
                    },
                    m,
                  ),
                ),
              ],
            }),
            f.jsxs("div", {
              className: "footer-disclaimer",
              children: [
                f.jsxs("p", {
                  children: [
                    f.jsx("strong", {
                      children:
                        "Это страница Nika Estate, а не официальный сайт Emaar.",
                    }),
                    " Наименования и визуализации проекта принадлежат правообладателям. Материалы носят информационный характер и не являются офертой. Цены, наличие, сроки и характеристики подтверждаются по актуальным документам застройщика. Будущая инфраструктура и доходность не гарантированы.",
                  ],
                }),
                f.jsxs("div", {
                  id: "privacy",
                  children: [
                    f.jsx("h3", { children: "Обработка заявки" }),
                    f.jsx("p", {
                      children:
                        "Данные из формы передаются Nika Estate для ответа на вашу заявку и сохраняются в рабочей Google-таблице агентства. Не вводите паспортные или платёжные данные. Отозвать согласие можно, сообщив об этом брокеру при первом контакте.",
                    }),
                  ],
                }),
                f.jsx("p", { children: "© 2026 Nika Estate" }),
              ],
            }),
          ],
        }),
      }),
      f.jsx("div", {
        className: `sticky-cta ${hl && !M && !Q && !Al ? "show" : ""}`,
        "aria-hidden": !hl || M || Q || !!Al,
        children: f.jsxs("div", {
          className: "sticky-cta-inner",
          children: [
            f.jsxs("div", {
              className: "sticky-cta-copy",
              children: [
                f.jsx("strong", { children: "Valia · от AED 1,96 млн" }),
                f.jsx("span", {
                  children: "1–4 спальни · план 80/20 · Dubai Creek Harbour",
                }),
              ],
            }),
            f.jsx(_e, { onClick: El, children: "Получить цены" }),
            f.jsx("button", {
              type: "button",
              className: "dismiss-text",
              onClick: () => x(!0),
              "aria-label": "Скрыть панель заявки",
              children: "Скрыть",
            }),
          ],
        }),
      }),
      !Q &&
        !Al &&
        !R &&
        f.jsxs("button", {
          className: "fab-enquire",
          type: "button",
          onClick: El,
          children: [
            f.jsx("img", { src: tt("email.svg"), alt: "" }),
            "Оставить заявку",
          ],
        }),
      f.jsx("div", {
        className: `modal-overlay ${Q ? "open" : ""}`,
        "aria-hidden": !Q,
        onClick: (m) => m.target === m.currentTarget && gl(),
        children: f.jsxs("div", {
          className: "modal-box",
          role: "dialog",
          "aria-modal": Q ? !0 : void 0,
          "aria-labelledby": "enquiry-title",
          ref: Q ? Ol : null,
          children: [
            f.jsx("button", {
              type: "button",
              className: "close-text",
              onClick: gl,
              children: "Закрыть",
            }),
            f.jsxs("aside", {
              className: "modal-aside",
              children: [
                f.jsx("img", {
                  className: "modal-aside-img",
                  src: tt("exterior-3.webp"),
                  alt: "",
                }),
                f.jsx("span", {
                  className: "eyebrow",
                  children: "Emaar · Dubai Creek Harbour",
                }),
                f.jsx("h4", {
                  children: "Цены, планировки и подходящие квартиры",
                }),
                f.jsx("p", {
                  children:
                    "Проверим варианты под ваш бюджет и объясним все условия.",
                }),
              ],
            }),
            f.jsxs("div", {
              className: "modal-body",
              children: [
                f.jsx("h3", {
                  id: "enquiry-title",
                  children: "Получите материалы Valia",
                }),
                f.jsx("p", {
                  className: "form-sub",
                  children: "Оставьте заявку брокеру Nika Estate.",
                }),
                f.jsx(vf, { id: "valia-modal", bare: !0, onPrivacy: gl }),
              ],
            }),
          ],
        }),
      }),
      Al &&
        f.jsx("div", {
          className: "modal-overlay open image-overlay",
          onClick: (m) => m.target === m.currentTarget && gl(),
          children: f.jsxs("div", {
            className: "image-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": Al.alt,
            ref: Ol,
            children: [
              f.jsx("button", {
                type: "button",
                className: "close-text",
                onClick: gl,
                children: "Закрыть",
              }),
              /plan-\d+-focus/.test(Al.src)
                ? f.jsx(PlanDrawing, { src: Al.src, alt: Al.alt })
                : f.jsx("img", { src: tt(Al.src), alt: Al.alt }),
              f.jsx("p", { children: Al.alt }),
            ],
          }),
        }),
    ],
  });
}
export default v0;
