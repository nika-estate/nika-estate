# Visual QA — meeting-cyprus

Reference: `https://www.astons.com/ru/event-registration/` (layout and interaction direction only; no ASTONS assets, identity, contacts or copy were reused).

## Desktop comparison — 1440 × 1000

- Sticky white header, centered navigation and black registration CTA retain the reference hierarchy.
- Full-bleed Cyprus photography, translucent event card and right-side registration panel reproduce the intended event-registration composition in the Nika Estate design system.
- Hero height is 914 px below the 86 px header; content fits the 1000 px desktop viewport with no horizontal overflow.
- The page continues with the same event funnel: meeting value, audience cards, programme, participants, company proof and repeat form.

## Mobile comparison — 390 × 844

- Header collapses cleanly to logo and menu.
- Hero copy remains readable over the image; the registration form follows below the visual introduction.
- Fixed registration CTA remains visible and the page has no horizontal overflow.
- Horizontal card rows preserve image scale and readable body copy.

## Functional checks

- All local images loaded successfully after their lazy-load sections entered the viewport.
- Two lead forms use the shared Google Sheets endpoint.
- Meta Pixel and Yandex Metrika shared scripts are present.
- Lead goals fire only after the lead endpoint confirms the matching request.
- Residency wording is conditional; no automatic status outcome is promised.
- No meeting date, time, agency phone or direct messenger contact is published.
- Three editable speaker slots are present.

final result: passed
