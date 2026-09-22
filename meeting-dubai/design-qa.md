# Visual QA — meeting-dubai

Reference: `https://www.astons.com/ru/event-registration/` (layout and interaction direction only; no ASTONS assets, identity, contacts or copy were reused).

## Desktop comparison — 1440 × 1000

- Sticky white header, centered section navigation and prominent registration CTA preserve the reference hierarchy.
- Full-bleed project photography, translucent event card and right-side registration panel match the reference composition.
- Hero content and registration card fit inside the first desktop viewport without horizontal overflow.
- Subsequent content uses the same rhythm: explanatory split section, tall audience cards, numbered programme, speakers and repeated registration.

## Mobile comparison — 390 × 844

- Header reduces to brand and menu button.
- Hero image, event card, headline and short value proposition form a readable first screen; the form follows immediately below.
- Fixed registration CTA remains visible without hiding the main copy.
- Audience and speaker cards become swipeable rows; page width equals viewport width.

## Functional checks

- Two lead forms use the shared Google Sheets endpoint.
- Meta Pixel and Yandex Metrika shared scripts are present.
- Lead goals fire only after the lead endpoint confirms the matching request.
- No agency phone number, direct messenger link, meeting date or meeting time is published.
- Three editable speaker slots are present.

final result: passed
