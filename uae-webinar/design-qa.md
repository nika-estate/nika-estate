# Design QA — UAE webinar landing

## Source comparison

- Reference: the user-provided desktop and mobile captures of `estate.astons.com/greece-live`, plus a live read-only inspection of the reference page.
- Implementation: `uae-webinar/index.html` at 1440 × 1000 and 390 × 844.
- Reproduced visual hierarchy: compact brand header, live-event pill and date line, oversized uppercase offer, supporting bullets, prominent registration CTA, and a rounded project carousel on desktop.
- Responsive intent: desktop keeps the offer and carousel side by side; mobile keeps the complete offer and CTA in the first viewport, then moves the project imagery below the fold.

## Deliberate brand and content adaptations

- Replaced all ASTONS identity, colors, copy, and media with Nika Estate branding and repository-owned UAE project imagery.
- Replaced the blue event accent with the Nika Estate gold palette.
- Used “резидентская виза” and conditional eligibility wording instead of promising automatic “ВНЖ”.
- Did not invent an event date: the page says that the date and time will be sent after registration.
- Added a short UAE gallery and a compact webinar program, keeping the requested three-section structure.

## Functional checks

- 1440 px desktop: hero grid, CTA, carousel controls, gallery, program, and form are aligned and readable.
- 390 px mobile: no horizontal overflow (`scrollWidth = innerWidth = 390`); headline, CTA, images, and form controls fit the viewport.
- All nine visible images load from local project assets; no reference-site media is hotlinked.
- Carousel controls and dots have accessible names; reduced-motion preference is respected.
- Registration form is bound to the shared confirmed-lead handler and the existing Google Sheets endpoint.
- Meta Pixel and Yandex Metrika shared analytics are present; conversion events fire only after a confirmed lead response through the shared handler.
- Automated regression suite: 31/31 tests passed.

final result: passed
