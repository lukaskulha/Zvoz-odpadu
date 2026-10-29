# Zvoz odpadu (Čaňa, Geča, …) – rules for changes

One static PWA for several villages. No framework; `scripts/build.js` only copies files into `dist/`
and writes one page per village. Netlify deploys every push to `main` automatically.

## Villages
- Each village is one file `obce/<id>.js` (dates, PDF link, second tab, village-specific texts in sk/hu/en).
  The id is the web address `/<id>/`. The order on the "choose your village" screen is `OBCE_ZOZNAM` in `obce/zoznam.js`.
- Adding a village: copy an existing file, change everything, add the id to `OBCE_ZOZNAM`,
  add `<script src="/obce/<id>.js"></script>` to `index.html`, add `"/obce/<id>.js"` and `"/<id>/"` to `PRE` in `sw.js`,
  optionally add `og/<id>.png` (1200×630 link preview). `node scripts/check-i18n.js` reports anything missing.
- `info: "yard"` = second tab is the collection yard (needs `yard` + `zd_*` texts), `info: "other"` = "Other waste" (needs `other` + `io_*` texts).
- Never put village-specific data into `index.html` or `i18n.js`.

## Translations (SK, HU, EN) – mandatory
- All user-visible text lives in `i18n.js` (`sk` is the reference) or, if it differs per village, in `obce/<id>.js` → `t`.
  Never write visible text directly into `index.html`: add a key to **all three languages** and use `T("key")`
  (or `TP("key", n)` for plurals, or `data-i18n="key"` / `data-i18n-aria="key"` in markup).
- `{obec}` in a text is replaced with the village name in the current language.
- Plural values are arrays of 3 forms `[1, 2–4, 5+]`; placeholders (`{n}`, `{t}`, `{x}`…) must match in every language.
- Dates use `fmtDate()` (locale from the `locale` key), never a hard-coded `"sk-SK"`.
- Before committing, run `node scripts/check-i18n.js` – it must report 0 errors.
  Netlify runs the same check (`netlify.toml`) and stops the deploy if it fails.
- Strings that users never see (analytics labels) may stay Slovak; mark the line with `i18n-ignore`.
- Hungarian texts were machine-translated; ask the owner before larger wording changes.

## Releasing
- Bump `APP_VERSION` in `index.html` and the cache name `C` in `sw.js` for every release.
- Every new file the app needs offline must be added to `PRE` in `sw.js`.
- Paths in `index.html` are absolute (`/i18n.js`), because the same page is served at `/`, `/cana/`, `/geca/`.
- Test locally: `node scripts/check-i18n.js && node scripts/build.js && python3 -m http.server 8000 -d dist`.
- Commit messages in Slovak, short summary of the change.
