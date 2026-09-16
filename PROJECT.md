# Nika Estate landing pages

- Repository: https://github.com/nika-estate/nika-estate
- Live base URL: https://nika-estate.github.io/nika-estate/
- Deployment: GitHub Pages from `main`; Cloudflare Pages project `nika-estate` retained as backup
- Build: static HTML, CSS and JavaScript; no package installation

## Routes

- `https://nika-estate.github.io/nika-estate/` — City Walk + Central Park
- `https://nika-estate.github.io/nika-estate/dubai/` — UAE property selection with a six-step quiz and project examples
- `https://nika-estate.github.io/nika-estate/uae/` — Dubai and Abu Dhabi comparison
- `https://nika-estate.github.io/nika-estate/saudi-arabia/` — Saudi Arabia / Riyadh / OSUS Eye
- `https://nika-estate.github.io/nika-estate/invest-meeting/` — online investment consultation
- `https://nika-estate.github.io/nika-estate/real-estate/` — conversion landing for property selection in the UAE and Saudi Arabia, with current projects and 2026 market yield benchmarks
- `https://nika-estate.github.io/nika-estate/the-archive/` — The Archive by Imtiaz project landing

## Lead routing

All forms send a lead copy to the shared Google Sheets endpoint and then keep the existing WhatsApp flow. The shared browser module is `assets/scripts/lead-capture.js`; each page passes its landing and default offer names through `data-landing-name` and `data-offer-name`. Pages with more than one form set a separate `data-offer-name` on each form.

The Google Apps Script asset served through `?asset=lead-capture` had invalid JavaScript on 2026-09-11, so the repository uses a corrected local client module pointed at the same healthy POST endpoint. Do not replace it with the hosted asset until that deployment passes a JavaScript syntax check.

### New landing checklist

1. Include `assets/scripts/lead-capture.js` once before `</body>`.
2. Set the shared endpoint, `data-landing-name` and the page-level `data-offer-name` on the script tag.
3. If forms promote different offers, set `data-offer-name` on each form.
4. Keep contact field names compatible: `name`, `phone` or `contact`, `email`, `telegram`, `whatsapp`, `messenger`.
5. Verify that the form is bound once and send one clearly marked test lead before launch.
6. Include Meta Pixel `1758103622093263` early in `head`, with the noscript image in `body`, and the shared `analytics.js` module before lead capture.

## Conversion tracking

Meta Pixel `1758103622093263` starts asynchronously in the head of all seven landings and queues `PageView` immediately. Automatic pixel configuration is disabled; conversions are sent explicitly after the shared Google endpoint returns HTTP success and JSON `{ok: true, lead_id: <matching request id>}`. An opaque/no-cors response, failed request, invalid form or missing/mismatched acknowledgement cannot trigger a conversion. Pending double submissions are coalesced.

- `Lead` — standard Meta event for every confirmed form submission; use as the primary advertising conversion.
- `QuizLead` — custom secondary event for quiz submissions.
- `MiniFormLead` — custom secondary event for ordinary forms.

Meta receives only the landing/offer labels and form type/ID, not names, phone numbers, emails or form answers. Each successful submission has a unique event ID; duplicate success events are ignored. The same confirmed event also triggers existing Yandex goals `lead_sent` plus `quiz_sent` or `mini_form_sent`.

Run the dependency-free regression checks with `node --test tests/tracking.test.cjs`. The live endpoint's matching acknowledgement and CORS support were verified on 2026-09-16 using a synthetic lead marked `ТЕСТ Meta / удалить` (ID `qa-meta-a00903f5-70f2-40e7-8899-dfc3f4239d24`). Pixel-account receipt still needs verification after publication, preferably through Meta Test Events.

## Readability and consultation hero

The consultation hero on `invest-meeting` fills at least the visible screen below the header: `100svh - 78px` on desktop/tablet, `100svh - 67px` on phones, with a `100vh` fallback. It has no fixed height, so content remains visible on unusually small screens. Supporting text declarations below 18 px were enlarged by 2–3 px across all three stylesheet families and the consultation page's inline styles, including mobile overrides and form captions. Body copy is now 18 px. Mobile cards retain compact two-column layouts; grid tracks, contact buttons and tablet navigation wrap instead of overflowing.

Run all checks with `node --test tests/*.test.cjs`. Browser QA covers the seven routes at widths 320, 375, 390, 768, 1280 and 1440 px.

## Content safeguards

The investment-meeting landing uses an official The Archive exterior render with the Dubai skyline as its hero background, preloaded at high priority. Two additional lazy-loaded photo breaks show Central Park between the benefits and meeting plan, and The Archive between the project catalog and company introduction. They reuse existing brochure/gallery assets, have short project/location captions, and keep a compact 280 px height on phones. The viewport-height hero and all form/analytics wiring remain unchanged.

Havencia by ALA is included in the four general multi-project routes: `dubai`, `uae`, `real-estate` and `invest-meeting`. The facade render comes from the client Drive folder. Unit 607 is a scenario based on the supplied offer: AED 665,400, 38.24 m², 20% + 4% DLD + AED 3,600 admin = AED 163,296 initial budget; 20/50/30 payment plan and June 2028 delivery in that offer. The public project card has different plan/timing, so the pages explicitly require a fresh unit-specific plan and contract date before booking. Rental scenarios are 5.5–6% annually before expenses and 4–5% after expenses, never a guarantee.

Prices, unit availability, views, handover dates and payment plans are described as subject to confirmation. Rows marked for verification in the client registry are not published as current numeric offers.
