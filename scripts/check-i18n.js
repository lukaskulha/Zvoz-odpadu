#!/usr/bin/env node
/*
 * Translation check. Runs on every Netlify deploy (see netlify.toml) and can be run
 * locally:  node scripts/check-i18n.js
 * Exit code 1 = errors (the deploy is stopped, the previous version stays online).
 *
 * Errors:
 *  - a key is missing in a language, or a language has an extra key
 *  - value types differ (text vs list), lists have different lengths, empty values
 *  - placeholders ({n}, {t}, {x}, ...) differ between languages
 *  - index.html uses a key (data-i18n="..." or T("...")/TP("...")) that does not exist
 *  - village files obce/<id>.js: texts missing in a language, placeholders/lists differ,
 *    required texts or data for the second tab missing, file not linked in index.html or sw.js
 *  - index.html contains user-visible text outside i18n.js:
 *      * text in the <body> markup that is not inside an element with data-i18n
 *      * a string in an inline <script> with Slovak diacritics
 *        (add the comment "i18n-ignore" on that line for non-visible strings, e.g. analytics)
 * Warnings (do not stop the deploy):
 *  - a translation is identical to Slovak (maybe forgotten), unless listed in SAME_OK
 *  - a key seems unused
 */
"use strict";
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const { I18N, I18N_PLURAL } = require(path.join(root, "i18n.js"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const REF = "sk";
const LANGS = Object.keys(I18N);
const SAME_OK = new Set(["theme_auto", "theme_label", "month_title", "locale", "zd_zip", "io_zip", "io_addr"]);
// Keys built dynamically in code, e.g. T("type_" + k)
const DYNAMIC_PREFIXES = ["type_", "typeFull_", "typeShort_", "guide_", "tip_", "palette_", "zd_opens_", "thu", "fri", "lang_name", "h1_", "sub_", "tab_", "doc_title"];
const ALLOWED_TEXT = new Set(["‹", "›", "—"]);

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const placeholders = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(",");

// 1) dictionary consistency
const ref = I18N[REF];
if (!ref) err(`Reference language "${REF}" is missing`);
for (const l of LANGS) {
  if (!I18N_PLURAL || typeof I18N_PLURAL[l] !== "function") err(`[${l}] missing plural rule in I18N_PLURAL`);
  const d = I18N[l];
  for (const k of Object.keys(ref)) {
    if (!(k in d)) { err(`[${l}] missing key "${k}"`); continue; }
    const a = ref[k], b = d[k];
    if (Array.isArray(a) !== Array.isArray(b)) { err(`[${l}] "${k}" must be ${Array.isArray(a) ? "a list" : "a text"} like in ${REF}`); continue; }
    if (Array.isArray(a)) {
      if (a.length !== b.length) err(`[${l}] "${k}" has ${b.length} items, ${REF} has ${a.length}`);
      b.forEach((v, i) => {
        if (typeof v !== "string" || !v.trim()) err(`[${l}] "${k}"[${i}] is empty`);
        else if (a[i] !== undefined && placeholders(v) !== placeholders(a[i])) err(`[${l}] "${k}"[${i}] placeholders ${placeholders(v) || "none"} ≠ ${REF} ${placeholders(a[i]) || "none"}`);
      });
      if (l !== REF && JSON.stringify(a) === JSON.stringify(b) && !SAME_OK.has(k)) warn(`[${l}] "${k}" is identical to ${REF}`);
    } else {
      if (typeof b !== "string" || !b.trim()) { err(`[${l}] "${k}" is empty`); continue; }
      if (placeholders(a) !== placeholders(b)) err(`[${l}] "${k}" placeholders ${placeholders(b) || "none"} ≠ ${REF} ${placeholders(a) || "none"}`);
      if (l !== REF && a === b && !SAME_OK.has(k) && a.length > 3) warn(`[${l}] "${k}" is identical to ${REF}: "${a}"`);
    }
  }
  for (const k of Object.keys(d)) if (!(k in ref)) err(`[${l}] extra key "${k}" (not in ${REF})`);
}

// 1b) village files
const vm = require("vm");
const ctx = {};
vm.createContext(ctx);
const VKEYS = new Set();
const NEED = {
  yard: ["foot_src", "zd_addr", "zd_zip", "zd_res", "zd_fee", "zd_acc_sub", "zd_acc_items", "zd_rej_items", "zd_foot"],
  other: ["foot_src", "io_badge", "io_link", "io_none", "io_none_sub", "io_t", "io_d", "io_when", "io_office", "io_addr", "io_zip", "io_call", "io_web", "io_foot"],
};
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
try {
  vm.runInContext(fs.readFileSync(path.join(root, "obce/zoznam.js"), "utf8"), ctx);
  const files = fs.readdirSync(path.join(root, "obce")).filter((f) => f.endsWith(".js") && f !== "zoznam.js").map((f) => f.slice(0, -3));
  for (const f of files) if (!ctx.OBCE_ZOZNAM.includes(f)) err(`obce/${f}.js is not listed in OBCE_ZOZNAM (obce/zoznam.js)`);
  for (const id of ctx.OBCE_ZOZNAM) {
    const fp = path.join(root, "obce", id + ".js");
    if (!fs.existsSync(fp)) { err(`OBCE_ZOZNAM lists "${id}" but obce/${id}.js does not exist`); continue; }
    vm.runInContext(fs.readFileSync(fp, "utf8"), ctx);
    const o = ctx.OBCE[id], tag = `[obec ${id}]`;
    if (!o) { err(`${tag} obce/${id}.js must set OBCE.${id} = {...}`); continue; }
    if (!/^[a-z0-9-]+$/.test(id)) err(`${tag} id may contain only a-z, 0-9 and "-" (it is the web address)`);
    if (!html.includes(`src="/obce/${id}.js"`)) err(`${tag} add <script src="/obce/${id}.js"></script> to index.html`);
    if (!sw.includes(`"/obce/${id}.js"`) || !sw.includes(`"/${id}/"`)) err(`${tag} add "/obce/${id}.js" and "/${id}/" to the PRE list in sw.js`);
    for (const l of LANGS) if (!o.name || !o.name[l]) err(`${tag} name.${l} is missing`);
    if (!["yard", "other"].includes(o.info)) err(`${tag} info must be "yard" or "other"`);
    if (o.info === "yard" && !(o.yard && o.yard.hours && o.yard.map && o.yard.tel)) err(`${tag} info "yard" needs yard: {hours, map, tel}`);
    if (o.info === "other" && !(o.other && o.other.tel && o.other.web)) err(`${tag} info "other" needs other: {tel, web}`);
    if (!o.pdf || !/^https:\/\//.test(o.pdf)) err(`${tag} pdf must be the https link to the KOSIT calendar`);
    for (const k of ["K", "S", "P", "L"]) {
      const m = o.D && o.D[k];
      if (!m) { err(`${tag} D.${k} (collection days) is missing`); continue; }
      for (const mo in m) {
        if (!(mo >= 1 && mo <= 12)) err(`${tag} D.${k}: month ${mo} is not 1–12`);
        for (const d of m[mo]) { const dt = new Date(2026, mo - 1, d); if (dt.getMonth() !== mo - 1) err(`${tag} D.${k}: ${d}.${mo}. is not a valid date`); }
      }
    }
    const t = o.t || {}, sk = t.sk || {};
    for (const k of NEED[o.info] || []) if (!(k in sk)) err(`${tag} t.sk.${k} is missing`);
    for (const l of LANGS) {
      const d = t[l] || {};
      for (const k of Object.keys(sk)) {
        VKEYS.add(k);
        if (!(k in d)) { err(`${tag} [${l}] missing text "${k}"`); continue; }
        const a = sk[k], b = d[k];
        if (Array.isArray(a) !== Array.isArray(b)) err(`${tag} [${l}] "${k}" must be ${Array.isArray(a) ? "a list" : "a text"}`);
        else if (Array.isArray(a)) { if (a.length !== b.length) err(`${tag} [${l}] "${k}" has ${b.length} items, sk has ${a.length}`); }
        else if (placeholders(a) !== placeholders(b)) err(`${tag} [${l}] "${k}" placeholders differ from sk`);
      }
      for (const k of Object.keys(d)) if (!(k in sk)) err(`${tag} [${l}] extra text "${k}" (not in sk)`);
    }
  }
} catch (e) { err("village files could not be loaded: " + e.message); }

// 2) keys used in index.html must exist
const used = new Set();
for (const m of html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)) used.add(m[1]);
for (const m of html.matchAll(/\bTP?\(\s*"([A-Za-z0-9_]+)"\s*[,)]/g)) used.add(m[1]);
for (const k of used) if (!(k in ref) && !VKEYS.has(k)) err(`index.html uses unknown key "${k}"`);
for (const k of Object.keys(ref)) {
  const seen = used.has(k) || html.includes(`"${k}"`) || html.includes(`'${k}'`) || DYNAMIC_PREFIXES.some((p) => k.startsWith(p));
  if (!seen) warn(`key "${k}" looks unused`);
}

// 3) hard-coded text in <body> markup
const bodyStart = html.indexOf("<body");
let body = html.slice(bodyStart)
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<noscript>[\s\S]*?<\/noscript>/g, "") // static Slovak text for search engines
  .replace(/<svg[\s\S]*?<\/svg>/g, "");
for (const m of body.matchAll(/<([a-z0-9]+)([^>]*)>([^<]+)/gi)) {
  const attrs = m[2], text = m[3].trim();
  if (!text || ALLOWED_TEXT.has(text) || !/\p{L}{2,}/u.test(text)) continue;
  if (/data-i18n=/.test(attrs)) {
    const k = (attrs.match(/data-i18n="([^"]+)"/) || [])[1];
    if (k && ref[k] !== undefined && ref[k] !== text) warn(`static text of data-i18n="${k}" differs from ${REF} value`);
    continue;
  }
  err(`hard-coded text in index.html markup: "${text.slice(0, 60)}" – move it to i18n.js and use data-i18n`);
}
// text after closing tags, e.g. "</b> text"
for (const m of body.matchAll(/<\/[a-z0-9]+>([^<]+)/gi)) {
  const text = m[1].trim();
  if (text && /\p{L}{2,}/u.test(text) && !ALLOWED_TEXT.has(text)) err(`hard-coded text in index.html markup: "${text.slice(0, 60)}"`);
}

// 4) Slovak strings inside inline scripts
const DIAC = /[áäčďéíĺľňóôŕšťúýžÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]/;
for (const sm of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
  if (/application\/ld\+json/.test(sm[0].slice(0, 60))) continue; // SEO data stays Slovak
  sm[1].split("\n").forEach((line) => {
    if (line.includes("i18n-ignore")) return;
    for (const lit of line.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/g)) {
      if (DIAC.test(lit[2])) err(`Slovak text in script: ${lit[0].slice(0, 70)} – use T("key") from i18n.js (or mark the line with i18n-ignore if it is not visible to users)`);
    }
  });
}

for (const w of warnings) console.log("warning: " + w);
for (const e of errors) console.log("ERROR:   " + e);
console.log(`i18n check: ${LANGS.join(", ")} · ${Object.keys(ref).length} keys · ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
