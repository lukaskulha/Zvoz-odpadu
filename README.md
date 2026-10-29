# Zvoz odpadu 2026 – waste collection calendar for villages near Košice

A free, lightweight web app (PWA) with the 2026 KOSIT waste collection calendars for several villages in Slovakia. Each village has its own address; on the first visit without one, people pick their village and the app remembers it.

**Live app:** https://zvoz-odpadu.netlify.app/

| Village | Address | Second tab |
| --- | --- | --- |
| Čaňa | https://zvoz-odpadu.netlify.app/cana/ | Collection yard (Zberný dvor) |
| Geča | https://zvoz-odpadu.netlify.app/geca/ | Other waste (Iný odpad) – Geča has no collection yard |
| Valaliky | https://zvoz-odpadu.netlify.app/valaliky/ | Other waste (Iný odpad) – Valaliky has no collection yard |

> This is an unofficial, community project. It is not affiliated with the municipalities or KOSIT a.s. The dates were transcribed from the official KOSIT collection calendars (linked in each village file). If in doubt, the official calendar applies. Found a mistake? Please open an issue.

## Features

- Village picker on the first visit, village button in the header to switch, one link per village for sharing
- Days remaining until the next collection of mixed waste, glass, paper, and plastics/metals/beverage cartons, with red (today/tomorrow) and yellow (this week) warnings
- Colour-coded monthly calendar; tap a collection day to see what goes into that bin
- Thursday/Friday switch for mixed waste where a village has two collection days (Čaňa)
- "Add to calendar": an `.ics` file with reminders the day before (7:00, 13:00, 19:00) and/or on the day (6:00, 7:00, 10:00)
- What goes where, for all four waste types
- Second tab per village: collection yard with live open/closed status (Čaňa), or how bulky, electrical, hazardous waste, textiles, oil and green waste are collected (Geča, Valaliky)
- Light/dark theme and three colour themes, Slovak, Hungarian and English
- Installable on the home screen (one tap on Android, step-by-step guide on iPhone/iPad and in Facebook), works offline

## Privacy

Settings (village, theme, language, reminder times) are stored only in the browser (`localStorage`). No accounts, no cookies. Visits are counted anonymously with [GoatCounter](https://www.goatcounter.com/) (`zvoz-odpadu.goatcounter.com`), each village under its own path (`/cana`, `/geca`). **If you fork this project, replace or remove the GoatCounter script at the bottom of `index.html`.**

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles and JavaScript |
| `i18n.js` | Texts shared by all villages in Slovak, Hungarian and English |
| `obce/zoznam.js` | List and order of villages |
| `obce/<id>.js` | One file per village: collection dates, KOSIT PDF, second tab data and village-specific texts |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | App manifest and icons |
| `og/` | Link preview images (home page and per village) |
| `scripts/check-i18n.js` | Checks translations and village files; Netlify runs it before each deploy |
| `scripts/build.js` | Builds `dist/`: copies the app and writes a page per village with its own title and link preview, plus `sitemap.xml` and `robots.txt` |

## Run locally

```bash
node scripts/check-i18n.js && node scripts/build.js
python3 -m http.server 8000 -d dist
```

Then open http://localhost:8000 (or http://localhost:8000/geca/).

## Adding a village

1. Copy `obce/geca.js` (no collection yard) or `obce/cana.js` (with a yard) to `obce/<id>.js`, where `<id>` is the address, e.g. `obce/haniska.js` → `/haniska/`.
2. Fill in the name in all three languages, the KOSIT PDF link, the collection days `D` (month → days) from the PDF, and the texts in `t`.
3. Add the id to `OBCE_ZOZNAM` in `obce/zoznam.js`, add `<script src="/obce/<id>.js"></script>` to `index.html` and `"/obce/<id>.js"`, `"/<id>/"` to `PRE` in `sw.js`.
4. Optionally add `og/<id>.png` (1200×630) as the link preview.
5. Run `node scripts/check-i18n.js`; it lists anything missing or inconsistent.

## Updating the dates for a new year

Update `D` in every `obce/<id>.js` from the new KOSIT PDFs and replace the year 2026 in the code and texts.

## License

Released under the MIT License, see [LICENSE](LICENSE). The collection schedules come from KOSIT a.s.
