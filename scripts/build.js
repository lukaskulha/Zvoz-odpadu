#!/usr/bin/env node
/*
 * Builds the site into dist/ (Netlify runs this on every deploy, see netlify.toml).
 * Run locally:  node scripts/build.js && python3 -m http.server 8000 -d dist
 *
 * - copies the app files
 * - writes /<id>/index.html for every village with its own title, description and
 *   link preview (Facebook does not run JavaScript, so each village needs its own tags)
 * - writes sitemap.xml and robots.txt
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const BASE = "https://zvoz-odpadu.netlify.app/";

// load village data the same way the browser does
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "obce/zoznam.js"), "utf8"), ctx);
for (const id of ctx.OBCE_ZOZNAM) vm.runInContext(fs.readFileSync(path.join(root, "obce", id + ".js"), "utf8"), ctx);
const OBCE = ctx.OBCE, LIST = ctx.OBCE_ZOZNAM;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const names = LIST.map((id) => OBCE[id].name.sk);
const joinSk = (a) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " a " + a[a.length - 1]);

function meta(p) {
  const ld = { "@context": "https://schema.org", "@type": "WebApplication", name: p.name, url: p.url, description: p.desc, inLanguage: "sk",
    applicationCategory: "UtilitiesApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, areaServed: p.area.map((a) => ({ "@type": "Place", name: a + ", Košice-okolie, Slovensko" })) };
  return `<!--meta: generated per page by scripts/build.js, edit there-->
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<link rel="canonical" href="${p.url}">
<meta property="og:type" content="website"><meta property="og:locale" content="sk_SK"><meta property="og:site_name" content="Zvoz odpadu">
<meta property="og:title" content="${esc(p.ogTitle)}"><meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${p.url}"><meta property="og:image" content="${p.img}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(p.name)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.name)}"><meta name="twitter:description" content="${esc(p.desc)}"><meta name="twitter:image" content="${p.img}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<!--/meta-->`;
}

function page(src, p, noscript) {
  let h = src.replace(/<!--meta:[\s\S]*?<!--\/meta-->/, meta(p));
  h = h.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><div><p>${esc(noscript)}</p></div></noscript>`);
  return h;
}

function copy(rel) {
  const s = path.join(root, rel), d = path.join(dist, rel);
  if (fs.statSync(s).isDirectory()) { fs.mkdirSync(d, { recursive: true }); for (const f of fs.readdirSync(s)) copy(path.join(rel, f)); return; }
  fs.mkdirSync(path.dirname(d), { recursive: true });
  fs.copyFileSync(s, d);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);
for (const f of ["i18n.js", "sw.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "obce", "og"]) copy(f);
for (const f of fs.readdirSync(root)) if (/^google[0-9a-f]+\.html$/.test(f)) copy(f); // search console verification, if any

const src = fs.readFileSync(path.join(root, "index.html"), "utf8");

// home page: choose your village
fs.writeFileSync(path.join(dist, "index.html"), page(src, {
  title: "Zvoz odpadu 2026 – " + names.join(", ") + " | kalendár KOSIT",
  ogTitle: "Zvoz odpadu 2026 – " + names.join(", "),
  name: "Zvoz odpadu 2026",
  desc: "Kalendár zvozu odpadu KOSIT 2026 pre obce " + joinSk(names) + ": kedy sa vyváža komunálny odpad, sklo, papier a plasty, pripomienky do kalendára v mobile a čo kam patrí.",
  url: BASE, img: BASE + "og/og-image.png", area: names,
}, "Kalendár zvozu odpadu KOSIT 2026 pre obce " + joinSk(names) + ". Na zobrazenie kalendára zapnite JavaScript."));

// one page per village
for (const id of LIST) {
  const o = OBCE[id], n = o.name.sk, yard = o.info === "yard";
  const desc = "Zvoz odpadu v obci " + n + " 2026: kedy sa vyváža komunálny odpad, sklo, papier a plasty (KOSIT), pripomienky do kalendára v mobile" +
    (yard ? " a zberný dvor." : " a kam s objemným, elektro a iným odpadom.");
  fs.mkdirSync(path.join(dist, id), { recursive: true });
  fs.writeFileSync(path.join(dist, id, "index.html"), page(src, {
    title: "Zvoz odpadu " + n + " 2026 – kalendár KOSIT, pripomienky" + (yard ? ", zberný dvor" : ""),
    ogTitle: "Zvoz odpadu " + n + " 2026 – kalendár a pripomienky",
    name: "Zvoz odpadu " + n + " 2026",
    desc, url: BASE + id + "/",
    img: BASE + "og/" + (fs.existsSync(path.join(root, "og", id + ".png")) ? id : "og-image") + ".png",
    area: [n],
  }, "Zvoz odpadu v obci " + n + " 2026 (KOSIT): komunálny odpad, sklo, papier a plasty podľa zvozového kalendára. Na zobrazenie kalendára zapnite JavaScript."));
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[BASE].concat(LIST.map((id) => BASE + id + "/")).map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);
console.log("build: dist/ with home page and " + LIST.length + " village pages (" + LIST.join(", ") + ")");
