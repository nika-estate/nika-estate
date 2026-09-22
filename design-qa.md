# Design QA — «Дубай или Абу‑Даби» Nika Estate

## Артефакты и нормализация

- Source visual truth, hero: `/var/folders/q_/sn0glqyj0zb8fnvz7dxlsm280000gn/T/TemporaryItems/NSIRD_screencaptureui_F2eUlZ/Снимок экрана — 2026-09-11 в 18.02.41.png`.
- Source visual truth, selection block: `/var/folders/q_/sn0glqyj0zb8fnvz7dxlsm280000gn/T/TemporaryItems/NSIRD_screencaptureui_iZRF7c/Снимок экрана — 2026-09-11 в 18.03.14.png` and `/Users/katerinaanisimova/Desktop/Снимок экрана — 2026-09-11 в 18.04.29.png`.
- Source visual truth, quiz goal cards: `/var/folders/q_/sn0glqyj0zb8fnvz7dxlsm280000gn/T/TemporaryItems/NSIRD_screencaptureui_11Zhqa/Снимок экрана — 2026-09-11 в 18.05.20.png`.
- Implementation URL: `http://localhost:4174/uae/`.
- Implementation screenshots: in-app Browser captures shown inline in the task at desktop `1280 × 720` and mobile `390 × 844`; the browser surface does not expose a filesystem path for these captures.
- Source desktop screenshots are Retina browser captures (`2940 × 1912` and `2778 × 1412`) with browser chrome. Comparison used the page content region and normalized it to CSS-pixel proportions rather than comparing browser chrome.
- Implementation density: `1x`; desktop viewport `1280 × 720`, mobile viewport `390 × 844`.
- States: hero, selection block, first quiz question, full quiz progression, Telegram contact state, profitability block, Archive payment table and final lead form.

## Full-view comparison evidence

- The hero keeps the reference two-column composition and Nika Estate’s white, black and gold system. The offer is now the dominant element; the explanatory line is visually 2–3 times smaller and the CTA is present on the first screen.
- The dark selection block follows the supplied layout direction: large headline on the left, short financial promise and CTA in the upper-right, three goal cards below.
- Mobile keeps the same reading order as desktop, with single-column cards and full-width actions. At `390px` there is no horizontal overflow.
- The detailed profitability section intentionally extends beyond the supplied screenshots because the user requested concrete first-payment, payment-plan, layout, rent and resale calculations.

## Focused comparison evidence

- Hero: prepositions in the offer and subtitle are tied with non-breaking spaces; the subtitle and CTA remain visible at `390 × 844`.
- Selection block: the new heading wraps as one semantic group, the financial line and «Получить разбор» sit above the cards on desktop, and the action becomes full-width on mobile.
- Quiz: goal labels match the requested concrete outcomes. Choosing a radio option automatically advances after `320ms`; the complete path reaches step `6 из 6`. Telegram reveals a required `@username` field, and the selected goal synchronizes with the final form.
- Numbers and cases: Archive and Jadeel use real repository images. Payment rows, plan steps, layouts and AED/USD conversions remain readable at `390px`.
- Final form: «под вашу цель» stays together on one line and does not overflow at `390px`.

## Findings

- No actionable P0/P1/P2 findings remain.
- Typography: passed. Cormorant remains the Nika Estate display face; Inter carries body and controls. The hero subtitle is substantially smaller than the headline, with controlled line height and non-breaking prepositions in the key copy.
- Spacing and layout: passed. Desktop and mobile grids preserve hierarchy, case tables collapse cleanly, and all tested content stays within the viewport.
- Colors and tokens: passed. Existing gold, ivory, black and neutral border tokens are used consistently and retain readable contrast.
- Image quality: passed. The hero, city cards, projects and case studies use real property imagery; no placeholder or code-drawn imagery was introduced.
- Copy and content: passed. The Archive location is corrected to DLRC, the 4% line is identified as DLD registration, admin fee is explicitly marked for lot-level confirmation, and growth figures are labelled as scenarios rather than guarantees.
- Interaction and accessibility: passed. Semantic form controls, labels, alt text, keyboard-compatible buttons and responsive tap targets are present. Full quiz auto-advance, back navigation availability, Telegram conditional field, goal synchronization and mobile CTA behavior were checked.
- Console and resilience: passed. No browser console errors. Document width equals viewport width at both `1280px` and `390px`.

## Comparison history

1. Initial review found P2 hierarchy drift: the hero subtitle was part of the H1, there was no inline first-screen CTA, and the selection CTA sat below the cards. Fixes: separated the subtitle, added the hero action, and moved «Получить разбор» to the upper-right. Post-fix evidence: final desktop hero and selection captures.
2. Initial content review found P2 clarity gaps in the investment example: a single paragraph mixed the booking payment, DLD and later instalments, while the project location was inaccurate. Fixes: corrected DLRC, separated the payment table, displayed the 50/50 schedule, added layouts and a real project image. Post-fix evidence: final desktop and mobile Archive captures.
3. Initial mobile review found P2 scanability risk in a wide financial table. Fix: cards and tables collapse to one column at `390px`, with AED and USD kept together. Post-fix evidence: mobile numbers, Archive and final-form captures.
4. Final interaction pass completed the six-step quiz automatically, verified the required Telegram username state and confirmed the selected goal reaches the footer form. No console errors or horizontal overflow remain.

## Follow-up polish

- P3: replace scenario assumptions with unit-specific rent comparables when the broker confirms the exact active lot and current leasing data.

## Implementation checklist

- [x] Compact hero subtitle and first-screen CTA.
- [x] Selection headline and CTA in the requested position.
- [x] Concrete quiz outcomes and automatic progression.
- [x] Budget entry point from `$35,000`.
- [x] AED/USD conversions and 6–7% rental range.
- [x] Archive payment table, layouts, rental and resale scenarios.
- [x] Second worked example for Jadeel.
- [x] Removed the visible sources and city-market cards.
- [x] Desktop/mobile visual and interaction checks.

---

# Design QA — property selection landing `/real-estate/`

## Reference and implementation evidence

- Reference URL: `https://bizon-capital.com/en/about`.
- Reference captures: `/private/tmp/prodigital-work/screens/nika-bizon-reference/source-desktop-00.png` and `/private/tmp/prodigital-work/screens/nika-bizon-reference/source-mobile-00.png`.
- Implementation URL: `http://localhost:4174/real-estate/`.
- Implementation captures: `/private/tmp/prodigital-work/screens/nika-bizon-implementation/about-desktop-hero.jpg`, `/private/tmp/prodigital-work/screens/nika-bizon-implementation/about-desktop-projects.jpg`, `/private/tmp/prodigital-work/screens/nika-bizon-implementation/about-mobile-hero.jpg`, `/private/tmp/prodigital-work/screens/nika-bizon-implementation/about-mobile-projects.jpg` and `/private/tmp/prodigital-work/screens/nika-bizon-implementation/about-mobile-form.jpg`.
- Combined comparisons: `/private/tmp/prodigital-work/screens/nika-bizon-comparison/desktop-hero-comparison.jpg` and `/private/tmp/prodigital-work/screens/nika-bizon-comparison/mobile-hero-comparison.jpg`.
- Viewports: desktop `1440 × 900`; mobile `390 × 844`. The reference surface returned Retina-scaled captures and failed to load several of its own remote images; comparison used normalized viewport proportions and the visible structure.

## Full-view comparison

- The implementation preserves the reference sequence and page rhythm: compact sticky header, two-column hero, three proof points, four-part trust band, eight services, project catalog, photo-led location grid, dark trust section, four steps, market story, FAQ and conversion form.
- The visual layer intentionally follows Nika Estate: Cormorant display type, Inter body copy, ivory backgrounds, near-black panels, muted gold and square editorial cards.
- Desktop hero and projects use balanced columns with readable line lengths. Mobile follows a single-column sequence with full-width CTAs and no horizontal overflow.

## Focused checks

- Images: 21 local image placements loaded with non-zero intrinsic dimensions; no remote image hotlinks or placeholders.
- Projects: nine current portfolio examples include a purpose and a clearly labelled 2026 area benchmark or scenario. Unverified lot-level values are not presented as current facts.
- Interactions: mobile menu opens and closes; FAQ expands; project CTAs transfer the selected project into the lead form; Telegram reveals a required username field.
- Lead routing: the shared Google Sheets capture script appears exactly once and the form includes a specific offer name.
- Accessibility: semantic headings, labels, alt text, keyboard buttons, visible focus behavior and a corrected visually hidden menu label.
- Console and resilience: zero console errors; document width equals viewport width at `390px`; all local references resolve.

## Comparison history

1. Initial mobile review found a P2 issue: the screen-reader menu label was visibly rendered beside the hamburger. Added a global `.sr-only` utility and verified the corrected header at `390 × 844`.
2. Copy review found a P2 issue in the hero: the first headline version sounded translated. Replaced it with the direct offer «Недвижимость для жизни, аренды и роста капитала» and rechecked desktop and mobile line breaks.
3. Financial review found a P2 trust gap: yield figures did not expose their sources. Added direct market-report links and kept the distinction between district benchmarks and a unit-specific forecast.

## Follow-up polish

- P3: replace district benchmarks with exact net-yield models after Nika Estate confirms an active unit, current rent comparables and annual service charges.

final result: passed

---

# Design QA — webinar lead-magnet funnels

## Visual source of truth

- Reference URL: `https://www.astons.com/webinar-registration/`
- Reference desktop viewport inspected: 1440 × 1000 px.
- Reference mobile viewport inspected: 390 × 844 px.
- Reused interaction pattern: fixed header, visual first screen, compact registration form, stacked editorial cards, and a persistent mobile CTA.
- Brand, copy, imagery, form destination, tracking, and residency information are original to Nika Estate; no reference-site assets were reused.

## Implemented pages

- `/webinar/uae/`
- `/webinar/cyprus/`
- `/webinar/greece/`

## Comparison and responsive checks

- Desktop, 1440 × 1000 px: verified two-column composition, sticky form, hero readability, input sizing, CTA contrast, and no horizontal overflow on all three pages.
- Mobile, 390 × 844 px: verified image-first hero, readable title, two-column benefit chips, form immediately after the first screen, single-column editorial cards, persistent CTA, and no horizontal overflow on all three pages.
- Full-page/bottom-region check: verified Greece residency source, lower trust section, footer alignment, and lazy-loaded imagery.
- Source-focused comparison: the desktop split and mobile content order match the reference conversion flow while retaining Nika Estate visual language.

## Interaction and technical checks

- Header CTA scrolls to the registration form and focuses the name field.
- One registration form is present on every page.
- Required name, phone, and consent fields are present.
- Form submission was not sent during visual QA, so no test lead was written to the production Google Sheet.
- Confirmed Yandex Metrika, Meta Pixel, and shared lead-capture scripts are present through automated tests.
- Confirmed no broken loaded images and no browser console errors on the tested pages.

## Findings and fixes

- Moved the mobile registration form directly below the hero instead of after all editorial content.
- Removed a theme-background specificity conflict that made mobile hero headings hard to read.
- Replaced a decorative text-arrow glyph with a readable `PDF` badge.
- Confirmed official-source links and conditional wording for UAE, Cyprus, and Greece residency routes.

final result: passed
