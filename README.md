# Nika Estate — landing pages

Static Russian-language landing pages in the Nika Estate brand style.

- `/` — City Walk + Central Park
- `/dubai/` — UAE property selection with a six-step quiz
- `/uae/` — Dubai vs Abu Dhabi
- `/saudi-arabia/` — Riyadh and OSUS Eye
- `/invest-meeting/` — online investment meeting
- `/real-estate/` — conversion landing for property selection in the UAE and Saudi Arabia, with current projects and 2026 market yield benchmarks
- `/the-archive/` — The Archive by Imtiaz project landing

The visual system uses local Inter and Cormorant Garamond fonts, the real Nika Estate logo, editorial whitespace, black typography and the brand gold accent. Visitors contact Nika Estate only through lead forms; agency phone numbers and direct contact links are not displayed, and submissions do not open messengers.

## Publication

The primary public site is deployed to GitHub Pages at:

- https://nika-estate.github.io/nika-estate/
- https://nika-estate.github.io/nika-estate/dubai/
- https://nika-estate.github.io/nika-estate/uae/
- https://nika-estate.github.io/nika-estate/saudi-arabia/
- https://nika-estate.github.io/nika-estate/invest-meeting/
- https://nika-estate.github.io/nika-estate/real-estate/
- https://nika-estate.github.io/nika-estate/the-archive/

GitHub is the source of truth and Pages publishes the `main` branch. Cloudflare Pages remains a backup deployment, but `pages.dev` is not used as the primary audience-facing URL because Russian networks may interrupt Cloudflare connections.

## Lead capture

Every landing includes `assets/scripts/lead-capture.js` once before `</body>`. The script sends valid form submissions to the shared Nika Estate Google Sheets endpoint and records the landing name, offer, form answers, contacts, URL, referrer and UTM parameters. A form-specific `data-offer-name` overrides the page default when a landing contains multiple offers.
