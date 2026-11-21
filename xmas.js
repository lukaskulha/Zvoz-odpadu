/*
 * Vianočný odpočet – rovnaký ako v aplikácii Home organizer (lukaskulha/Home-organizer, public/js/xmas*.js).
 * Od 1. novembra do Štedrého dňa: darček s počtom dní a sneženie v hlavičke (#xmas-cd, #xmas-snow)
 * a raz za deň veľké uvítanie (Santa, elf a sob pod stromčekom, lietajúce soby). Ťuknutie na darček ho prehrá znova.
 * Texty sú v i18n.js (kľúče xmas_*). Pri „Obmedziť pohyb“ v systéme bez animácií.
 * Používa T(), TP(), fmtDate() a lang z index.html.
 */
(function () {
"use strict";
/* ---------------------------------------------------------------- kresby (z xmas-art.js) */
// Kresby pre vianočné uvítanie (SVG, tieňované): Santa, elf, sob, ozdobený stromček s darčekmi,
// sane plné darčekov s lietajúcimi sobmi, svetielka, chalúpka. Vlastné postavičky, žiadne známe postavy ani logá.

const RED = '#d6323a', GOLD = '#f4c430', BROWN = '#a86b3c', TAN = '#dcb88e', DARK = '#4a2f1d';

const DEFS = `<defs>
  <linearGradient id="r-coat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8403f"/><stop offset="1" stop-color="#a8141d"/></linearGradient>
  <linearGradient id="r-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
  <linearGradient id="r-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d7dee6"/></linearGradient>
  <linearGradient id="r-beard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef1f4"/><stop offset="1" stop-color="#cfd6de"/></linearGradient>
  <radialGradient id="r-skin" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#fde0c8"/><stop offset="1" stop-color="#e6a982"/></radialGradient>
  <radialGradient id="r-nose" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffb8a8"/><stop offset="1" stop-color="#d9786a"/></radialGradient>
  <linearGradient id="r-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe58a"/><stop offset="1" stop-color="#c38a12"/></linearGradient>
  <linearGradient id="r-boot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3d3d"/><stop offset="1" stop-color="#0c0c0c"/></linearGradient>
  <linearGradient id="r-belt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b261a"/><stop offset="1" stop-color="#1c110b"/></linearGradient>
  <linearGradient id="r-elf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fb56d"/><stop offset="1" stop-color="#1c7040"/></linearGradient>
  <linearGradient id="r-deer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9824f"/><stop offset="1" stop-color="#76472a"/></linearGradient>
  <linearGradient id="r-deerleg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a35"/><stop offset="1" stop-color="#4f311d"/></linearGradient>
  <linearGradient id="r-tree" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8f55"/><stop offset="1" stop-color="#17532f"/></linearGradient>
  <linearGradient id="r-treeside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
  <radialGradient id="r-glow"><stop offset="0" stop-color="#ffd98a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
  <radialGradient id="r-ball-red" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a8a"/><stop offset=".5" stop-color="#d22a2a"/><stop offset="1" stop-color="#7a0e12"/></radialGradient>
  <radialGradient id="r-ball-gold" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff1b0"/><stop offset=".5" stop-color="#e6b02a"/><stop offset="1" stop-color="#8c5f06"/></radialGradient>
  <radialGradient id="r-ball-blue" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#b7e1ff"/><stop offset=".5" stop-color="#3b86d6"/><stop offset="1" stop-color="#163f78"/></radialGradient>
  <linearGradient id="r-jute" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c99b64"/><stop offset="1" stop-color="#7a5230"/></linearGradient>
  <linearGradient id="r-velvet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2343d"/><stop offset="1" stop-color="#7d0d16"/></linearGradient>
  <linearGradient id="r-sleigh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e23a3a"/><stop offset="1" stop-color="#8f1219"/></linearGradient>
  <linearGradient id="r-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
</defs>`;


// ---------------------------------------------------------------- Santa (140 × 200)
const santaR = () => `<g class="xs-santa">
  <path d="M40 182 h24 v12 q0 5 -5 5 h-28 q-7 0 -5 -7 q2 -6 14 -10z" fill="url(#r-boot)"/>
  <path d="M76 182 h24 q12 4 14 10 q2 7 -5 7 h-28 q-5 0 -5 -5z" fill="url(#r-boot)"/>
  <path d="M30 184 Q22 124 46 106 Q70 96 94 106 Q118 124 110 184 Z" fill="url(#r-coat)"/>
  <path d="M30 184 Q22 124 46 106 Q70 96 94 106 Q118 124 110 184 Z" fill="url(#r-side)"/>
  <rect x="64" y="110" width="12" height="72" rx="5" fill="url(#r-fur)"/>
  <path d="M26 176 Q70 188 114 176 Q118 186 113 192 Q70 202 27 192 Q22 186 26 176Z" fill="url(#r-fur)"/>
  <path d="M28 150 Q70 159 112 150 L112 163 Q70 172 28 163Z" fill="url(#r-belt)"/>
  <rect x="59" y="149" width="22" height="19" rx="3" fill="none" stroke="url(#r-gold)" stroke-width="4"/>
  <g><path d="M42 112 Q24 124 22 150" stroke="url(#r-coat)" stroke-width="18" fill="none" stroke-linecap="round"/>
    <ellipse cx="22" cy="153" rx="11.5" ry="6.5" fill="url(#r-fur)"/><ellipse cx="22" cy="164" rx="9" ry="10" fill="#1e1e1e"/><ellipse cx="29" cy="160" rx="3.5" ry="5" fill="#1e1e1e" transform="rotate(-25 29 160)"/></g>
  <g class="xs-arm-r"><path d="M98 112 Q120 104 122 76" stroke="url(#r-coat)" stroke-width="18" fill="none" stroke-linecap="round"/>
    <ellipse cx="122" cy="72" rx="11.5" ry="6.5" fill="url(#r-fur)" transform="rotate(-8 122 72)"/>
    <ellipse cx="122" cy="59" rx="9.5" ry="11" fill="#1e1e1e"/><ellipse cx="113" cy="62" rx="3.5" ry="5.5" fill="#1e1e1e" transform="rotate(30 113 62)"/></g>
  <ellipse cx="53" cy="74" rx="3.5" ry="5" fill="#e6a982"/><ellipse cx="87" cy="74" rx="3.5" ry="5" fill="#e6a982"/>
  <circle cx="70" cy="72" r="17" fill="url(#r-skin)"/>
  <circle cx="58" cy="78" r="5" fill="#f28f8f" opacity=".45"/><circle cx="82" cy="78" r="5" fill="#f28f8f" opacity=".45"/>
  <path d="M50 70 Q44 86 48 100 Q46 110 54 116 Q58 126 70 130 Q82 126 86 116 Q94 110 92 100 Q96 86 90 70 Q84 86 70 88 Q56 86 50 70Z" fill="url(#r-beard)"/>
  <path d="M56 98 q4 6 0 12 M64 104 q4 6 0 12 M74 104 q4 6 0 12 M82 98 q4 6 0 12 M60 114 q3 5 0 9 M78 114 q3 5 0 9" stroke="#c9d1da" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <path d="M65 90.5 Q70 94 75 90.5" stroke="#a0413c" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M70 83 Q62 76 51 82 Q55 91 64 89 Q68 88 70 86 Q72 88 76 89 Q85 91 89 82 Q78 76 70 83Z" fill="#f6f8fa" stroke="#d4dae1" stroke-width=".8"/>
  <circle cx="70" cy="77" r="4.6" fill="url(#r-nose)"/>
  <g class="xs-eye"><ellipse cx="63" cy="69" rx="2.8" ry="2.3" fill="#fff"/><circle cx="63.3" cy="69.2" r="1.7" fill="#2b2b2b"/><circle cx="63.9" cy="68.5" r=".6" fill="#fff"/></g>
  <g class="xs-eye"><ellipse cx="77" cy="69" rx="2.8" ry="2.3" fill="#fff"/><circle cx="77.3" cy="69.2" r="1.7" fill="#2b2b2b"/><circle cx="77.9" cy="68.5" r=".6" fill="#fff"/></g>
  <circle cx="63" cy="69.5" r="5.6" fill="#fff" fill-opacity=".12" stroke="#c38a12" stroke-width="1.3"/><circle cx="77" cy="69.5" r="5.6" fill="#fff" fill-opacity=".12" stroke="#c38a12" stroke-width="1.3"/>
  <path d="M68.6 69 Q70 67.6 71.4 69" stroke="#c38a12" stroke-width="1.2" fill="none"/>
  <path d="M57 62 q6 -5 11 -1 M72 61 q5 -4 11 1" stroke="#fff" stroke-width="3.6" fill="none" stroke-linecap="round"/>
  <path d="M52 60 Q54 30 80 26 Q104 26 112 50 Q114 58 108 64 Q102 46 92 42 Q96 50 94 60Z" fill="url(#r-coat)"/>
  <path d="M92 42 Q101 49 106 60" stroke="#8e0f16" stroke-width="2" fill="none" opacity=".7"/>
  <path d="M48 54 Q70 46 94 54 Q99 60 94 66 Q70 59 46 66 Q42 60 48 54Z" fill="url(#r-fur)"/>
  <circle cx="109" cy="66" r="8.5" fill="url(#r-fur)"/><circle cx="106" cy="63" r="3" fill="#fff"/>
</g>`;

// ---------------------------------------------------------------- Elf (110 × 170)
const elfR = () => `<g class="xs-elf">
  <rect x="40" y="140" width="9" height="20" fill="#fff"/><rect x="40" y="144" width="9" height="3.5" fill="${RED}"/><rect x="40" y="151" width="9" height="3.5" fill="${RED}"/>
  <rect x="61" y="140" width="9" height="20" fill="#fff"/><rect x="61" y="144" width="9" height="3.5" fill="${RED}"/><rect x="61" y="151" width="9" height="3.5" fill="${RED}"/>
  <path d="M36 158 h16 v8 h-18 q-10 0 -12 -10 q6 3 8 -1z" fill="#1c6a3c"/><circle cx="23" cy="156" r="2.6" fill="url(#r-gold)"/>
  <path d="M58 158 h16 q2 -2 8 1 q-2 9 -12 9 h-12z" fill="#1c6a3c"/><circle cx="84" cy="158" r="2.6" fill="url(#r-gold)"/>
  <path d="M30 104 Q16 112 14 126" stroke="url(#r-elf)" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="14" cy="130" r="5.5" fill="url(#r-skin)"/>
  <path d="M80 104 Q96 96 98 82" stroke="url(#r-elf)" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="98" cy="77" r="5.5" fill="url(#r-skin)"/>
  <path d="M26 146 Q24 106 55 98 Q86 106 84 146 L77 140 L69 148 L61 140 L55 148 L49 140 L41 148 L33 140Z" fill="url(#r-elf)"/>
  <path d="M26 146 Q24 106 55 98 Q86 106 84 146 L77 140 L69 148 L61 140 L55 148 L49 140 L41 148 L33 140Z" fill="url(#r-side)"/>
  <rect x="27" y="124" width="56" height="7" fill="url(#r-belt)"/><rect x="50" y="122.5" width="10" height="10" rx="1.5" fill="none" stroke="url(#r-gold)" stroke-width="2.2"/>
  <path d="M36 101 q5 9 10 0 q5 9 9 0 q5 9 10 0 q5 9 9 0 Q55 94 36 101Z" fill="${RED}"/>
  <circle cx="41" cy="106" r="2" fill="url(#r-gold)"/><circle cx="55" cy="106" r="2" fill="url(#r-gold)"/><circle cx="69" cy="106" r="2" fill="url(#r-gold)"/>
  <rect x="50" y="88" width="10" height="10" fill="#e6a982"/>
  <path d="M41 70 L27 61 L42 80Z" fill="#eab38f"/><path d="M39 70 L31 65 L40 76Z" fill="#f2a5a0" opacity=".6"/>
  <path d="M69 70 L83 61 L68 80Z" fill="#eab38f"/><path d="M71 70 L79 65 L70 76Z" fill="#f2a5a0" opacity=".6"/>
  <circle cx="55" cy="74" r="15" fill="url(#r-skin)"/>
  <circle cx="45.5" cy="79" r="3.6" fill="#f28f8f" opacity=".5"/><circle cx="64.5" cy="79" r="3.6" fill="#f28f8f" opacity=".5"/>
  <g fill="#c8794f" opacity=".7"><circle cx="47" cy="76" r=".7"/><circle cx="49" cy="78" r=".7"/><circle cx="61" cy="76" r=".7"/><circle cx="63" cy="78" r=".7"/></g>
  <g class="xs-eye"><ellipse cx="50" cy="72" rx="2.4" ry="2.1" fill="#fff"/><circle cx="50.3" cy="72.2" r="1.5" fill="#3a2a1a"/></g>
  <g class="xs-eye"><ellipse cx="60" cy="72" rx="2.4" ry="2.1" fill="#fff"/><circle cx="60.3" cy="72.2" r="1.5" fill="#3a2a1a"/></g>
  <path d="M48 67 q2.5 -2 5 -.5 M57 66.5 q2.5 -1.5 5 .5" stroke="#8a4a22" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M51 81 Q55 85 59 81" stroke="#9a3b2a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M41 66 Q44 58 50 63 Q53 57 57 62 Q61 57 64 63 Q68 59 70 66 Q66 61 55 61 Q45 61 41 66Z" fill="#a65a26"/>
  <path d="M40 60 Q42 26 68 20 Q86 17 96 34 Q86 30 78 36 Q72 46 72 60Z" fill="url(#r-elf)"/>
  <path d="M68 20 Q86 17 96 34 Q88 31 80 34" fill="#000" opacity=".15"/>
  <path d="M38 56 Q55 50 74 56 Q77 61 74 65 Q55 59 37 65 Q34 61 38 56Z" fill="url(#r-fur)"/>
  <circle cx="96" cy="36" r="5" fill="url(#r-gold)"/><path d="M93 38h6" stroke="#8c5f06" stroke-width="1.2"/>
</g>`;

// ---------------------------------------------------------------- Sob stojaci zboku, hľadí doľava (170 × 170)
const reindeerR = () => `<g class="xs-reindeer">
  <path d="M118 120 L120 142 L117 160 M130 118 L134 140 L132 160" stroke="url(#r-deerleg)" stroke-width="7.5" fill="none" stroke-linecap="round"/>
  <path d="M56 120 L54 142 L56 160 M68 120 L70 142 L68 160" stroke="url(#r-deerleg)" stroke-width="7.5" fill="none" stroke-linecap="round"/>
  <path d="M112 158 h10 v6 h-12z M128 158 h10 v6 h-12z M50 158 h10 v6 h-12z M63 158 h10 v6 h-12z" fill="#2a1a10"/>
  <path d="M40 104 Q44 84 74 82 L120 82 Q144 84 144 104 Q142 124 122 126 L60 126 Q42 124 40 104Z" fill="url(#r-deer)"/>
  <ellipse cx="92" cy="121" rx="32" ry="5.5" fill="#e3c8a3" opacity=".85"/>
  <path d="M140 92 Q150 88 148 98 Q146 102 141 100Z" fill="#fff"/>
  <path d="M46 102 Q34 82 40 60 L60 56 Q60 78 70 92Z" fill="url(#r-deer)"/>
  <path d="M42 100 Q32 84 42 68 Q44 82 56 98Z" fill="#efe0c8"/>
  <path d="M42 88 Q54 96 66 86" stroke="${RED}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g class="xs-bell"><circle cx="54" cy="95" r="4.2" fill="url(#r-gold)"/><path d="M51.5 96.5h5" stroke="#8c5f06" stroke-width="1"/></g>
  <path d="M38 42 Q54 38 60 50 Q62 60 52 63 L30 71 Q19 73 17 66 Q15 60 23 56Z" fill="url(#r-deer)"/>
  <path d="M30 71 Q19 73 17 66 Q16 61 22 58 Q28 64 34 68Z" fill="#d8b48a"/>
  <ellipse cx="18" cy="63" rx="4.3" ry="3.4" fill="#2a1a10"/><circle cx="16.8" cy="62" r="1" fill="#fff" opacity=".5"/>
  <path d="M20 69 Q24 71 27 69" stroke="#4a2f1d" stroke-width="1.2" fill="none"/>
  <g class="xs-eye"><ellipse cx="42" cy="52" rx="2.7" ry="2.5" fill="#1c120b"/><circle cx="41.2" cy="51.2" r=".8" fill="#fff"/></g>
  <path d="M38 48 Q42 46 46 48" stroke="#5a3a22" stroke-width="1" fill="none"/>
  <ellipse cx="55" cy="44" rx="9" ry="3.6" fill="#9a6a40" transform="rotate(-28 55 44)"/><ellipse cx="55" cy="44" rx="5.5" ry="1.8" fill="#e8c9a6" transform="rotate(-28 55 44)"/>
  <g stroke="#8d6b49" stroke-width="3.2" fill="none" stroke-linecap="round">
    <path d="M46 42 Q42 26 48 12 Q52 4 60 2"/><path d="M45 30 Q36 26 34 16"/><path d="M47 20 Q55 18 58 10"/>
    <path d="M52 42 Q56 26 66 16 Q71 11 78 11"/><path d="M57 30 Q64 27 70 28"/><path d="M62 22 Q61 14 65 7"/>
  </g>
</g>`;

// ---------------------------------------------------------------- stromčeky (120 × 230)
function tiers() {
  const T = [[0, 64, 30], [36, 112, 42], [76, 160, 52], [118, 206, 62]];
  return T.map(([top, bot, w]) => {
    let d = `M60 ${top} Q${60 + w * 0.5} ${(top + bot) / 2} ${60 + w} ${bot}`;
    const n = Math.round(w / 6);
    for (let i = 1; i <= n * 2; i++) {
      const x = 60 + w - (i * w) / n;
      d += ` L${x.toFixed(1)} ${(i % 2 ? bot - 7 : bot).toFixed(1)}`;
    }
    d += ` Q${60 - w * 0.5} ${(top + bot) / 2} 60 ${top}Z`;
    return { d, top, bot, w };
  });
}
const treeBase = () => {
  const ts = tiers();
  let out = `<rect x="52" y="200" width="16" height="22" fill="#5a3a22"/><rect x="60" y="200" width="8" height="22" fill="#000" opacity=".2"/>`;
  for (const t of ts) {
    out += `<path d="${t.d}" fill="url(#r-tree)"/><path d="${t.d}" fill="url(#r-treeside)"/>`;
    // vetvičky
    out += `<path d="M60 ${t.top + 12} L${60 - t.w * 0.55} ${t.bot - 10} M60 ${t.top + 12} L${60 + t.w * 0.55} ${t.bot - 10} M60 ${t.top + 18} L60 ${t.bot - 8}" stroke="#145030" stroke-width="1.4" opacity=".6"/>`;
  }
  return out;
};
const lightsOn = (pts) => pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="url(#r-glow)" class="xs-tl" style="animation-delay:${(i * 0.19).toFixed(2)}s"/><circle cx="${x}" cy="${y}" r="2" fill="#fff4cf"/>`).join('');
const giftR = (x, y, w, h, col, rib, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="0" y="0" width="${w}" height="${h}" rx="1.5" fill="${col}"/><rect x="0" y="0" width="${w}" height="${h}" rx="1.5" fill="url(#r-shade)"/>
  <rect x="${w / 2 - 2}" y="0" width="4" height="${h}" fill="${rib}"/><rect x="0" y="${h * 0.38}" width="${w}" height="3.5" fill="${rib}"/>
  <ellipse cx="${w / 2 - 5}" cy="-2.5" rx="5.5" ry="3.2" fill="none" stroke="${rib}" stroke-width="2.4" transform="rotate(-18 ${w / 2 - 5} -2.5)"/>
  <ellipse cx="${w / 2 + 5}" cy="-2.5" rx="5.5" ry="3.2" fill="none" stroke="${rib}" stroke-width="2.4" transform="rotate(18 ${w / 2 + 5} -2.5)"/>
  <circle cx="${w / 2}" cy="-1" r="2.2" fill="${rib}"/></g>`;
const starTop = () => `<g transform="translate(60 0)"><circle r="14" fill="url(#r-glow)" class="xs-treestar"/><path d="M0-11 3-3.5 11-3.4 4.8 1.6 7 9.5 0 4.8-7 9.5-4.8 1.6-11-3.4-3-3.5Z" fill="url(#r-gold)" stroke="#a87410" stroke-width=".6"/></g>`;

const treeDecorated = () => {
  const balls = [[48, 52, 'red'], [74, 58, 'gold'], [40, 96, 'blue'], [70, 100, 'red'], [86, 92, 'gold'], [30, 140, 'gold'], [58, 146, 'blue'], [92, 138, 'red'], [22, 188, 'red'], [50, 192, 'gold'], [80, 186, 'blue'], [104, 194, 'gold']]
    .map(([x, y, c]) => `<path d="M${x} ${y - 7}v-3" stroke="#c9a14a" stroke-width="1"/><circle cx="${x}" cy="${y}" r="5.5" fill="url(#r-ball-${c})"/><ellipse cx="${x - 1.8}" cy="${y - 2}" rx="1.6" ry="1" fill="#fff" opacity=".8"/>`).join('');
  const garland = `<path d="M38 44 Q62 58 82 40 M28 86 Q60 108 96 82 M18 128 Q60 152 104 124 M10 172 Q60 198 112 168" stroke="#f0d27a" stroke-width="1.6" fill="none" opacity=".85"/>`;
  const lights = lightsOn([[46, 46], [62, 50], [36, 90], [56, 98], [82, 90], [26, 132], [48, 140], [74, 140], [98, 128], [16, 176], [40, 186], [66, 190], [94, 180]]);
  const gifts = giftR(-6, 202, 30, 22, '#c8242c', '#f4c430') + giftR(78, 196, 26, 28, '#2a7ad0', '#f4f4f4') + giftR(24, 210, 24, 16, '#f4c430', '#c8242c', -4) + giftR(102, 208, 20, 16, '#2f9e5a', '#f4c430', 5);
  return treeBase() + garland + lights + balls + starTop() + gifts;
};
// ---------------------------------------------------------------- sane + vrecia (súradnice saní 120 × 80)
const sleighR = (cargo) => `<g>
  ${cargo}
  <path d="M8 38 L94 38 Q104 38 104 28 L112 28 Q114 58 92 64 L24 64 Q6 62 8 38Z" fill="url(#r-sleigh)"/>
  <path d="M8 38 L94 38 Q104 38 104 28 L112 28" stroke="url(#r-gold)" stroke-width="3.2" fill="none"/>
  <path d="M26 50 q8 -9 16 0 q8 9 16 0 q8 -9 16 0" stroke="url(#r-gold)" stroke-width="2.2" fill="none"/>
  <path d="M28 64 L28 74 M84 64 L84 74" stroke="url(#r-gold)" stroke-width="3.5"/>
  <path d="M6 66 Q4 74 14 74 L104 74 Q120 74 118 58" stroke="url(#r-gold)" stroke-width="4.2" fill="none" stroke-linecap="round"/>
</g>`;
const candyCane = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0 V-22 Q0 -30 7 -30 Q14 -30 14 -23" stroke="#fff" stroke-width="4.2" fill="none" stroke-linecap="round"/>
  <path d="M0 0 V-22 Q0 -30 7 -30 Q14 -30 14 -23" stroke="${RED}" stroke-width="4.2" fill="none" stroke-dasharray="3 3.5" stroke-linecap="butt"/></g>`;

// V3: kopa zabalených darčekov bez vreca
const giftPile = () => `
  ${giftR(18, 14, 26, 24, '#c8242c', GOLD, 0)}${giftR(44, 10, 22, 28, '#2a7ad0', '#f4f4f4', 0)}${giftR(66, 18, 24, 20, '#2f9e5a', GOLD, 0)}
  ${giftR(26, -8, 20, 18, GOLD, '#c8242c', -8)}${giftR(48, -14, 18, 20, '#8e44ad', '#f4c430', 4)}${giftR(68, -2, 18, 16, '#f4f4f4', '#c8242c', 10)}
  ${giftR(40, -32, 16, 16, '#e85a8a', '#f4f4f4', -6)}${candyCane(86, 18, 14)}`;


/** Sob zboku v lete (hľadí doprava), asi 100 × 60. */
const flyingReindeer = () => `<g>
  <g class="xs-legs"><path d="M22 32 L6 42 M28 35 L14 49 M60 33 L78 40 M56 36 L72 48" stroke="#7a4f27" stroke-width="4.5"/></g>
  <circle cx="14" cy="24" r="4.5" fill="#fff"/>
  <ellipse cx="40" cy="29" rx="27" ry="12.5" fill="${BROWN}"/><ellipse cx="42" cy="34" rx="16" ry="6" fill="${TAN}"/>
  <path d="M56 24 L69 9 L80 14 L66 32Z" fill="${BROWN}"/>
  <path d="M74 3 L69 -10 M72 -3 L63 -5 M81 3 L86 -10 M83 -3 L92 -5" stroke="#7a4f27" stroke-width="3"/>
  <ellipse cx="69" cy="4" rx="6" ry="2.6" fill="${BROWN}" transform="rotate(-30 69 4)"/>
  <ellipse cx="78" cy="12" rx="11" ry="7.5" fill="${BROWN}"/><ellipse cx="86" cy="14.5" rx="5.5" ry="4.2" fill="${TAN}"/><circle cx="90.5" cy="13" r="2.6" fill="${DARK}"/>
  <circle cx="77" cy="9" r="1.8" fill="#222"/>
  <path d="M63 22 L70 29" stroke="${RED}" stroke-width="4.5"/><circle cx="70" cy="31" r="3" fill="${GOLD}"/>
</g>`;

/** Sane plné darčekov ťahané dvojicou lietajúcich sobov (asi 350 × 80). */
const flyingTeam = () => `<path d="M112 30 L190 40 M112 34 L270 40" stroke="#c99a3a" stroke-width="2"/>
  ${sleighR(giftPile())}
  <g transform="translate(160 6)"><g class="xs-r2">${flyingReindeer()}</g></g>
  <g transform="translate(250 0)">${flyingReindeer()}</g>`;

/** Iskra (hviezdička) so stredom v 0,0 a veľkosťou s. */
const spark = (s, cls = '', style = '') =>
  `<path class="${cls}" style="${style}" transform="scale(${(s / 20).toFixed(2)})" d="M0-10 2.2-2.2 10 0 2.2 2.2 0 10-2.2 2.2-10 0-2.2-2.2Z" fill="${GOLD}"/>`;

/** Reťaz farebných žiaroviek cez vrch obrazovky. */
function garland() {
  const cols = ['#e85a5a', GOLD, '#7cc8ff', '#4fb87a', '#ff8fa3'];
  const segs = [[-10, 16, 70, 50, 150, 16], [150, 16, 230, 50, 310, 16]];
  let out = '', k = 0;
  for (const [x0, y0, cx, cy, x1, y1] of segs) {
    for (let t = 0.08; t < 1; t += 0.14) {
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1;
      const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1;
      out += `<path d="M${x.toFixed(1)} ${(y - 1).toFixed(1)}v4" stroke="#2a2a2a" stroke-width="3"/><circle cx="${x.toFixed(1)}" cy="${(y + 7).toFixed(1)}" r="4.6" fill="${cols[k % 5]}" style="animation-delay:${(k * 0.08).toFixed(2)}s,${((k * 0.23) % 1.6).toFixed(2)}s"/>`;
      k++;
    }
  }
  return `<path d="M-10 16 Q70 50 150 16 Q230 50 310 16" stroke="#173024" stroke-width="2" fill="none"/><g class="xs-bulbs">${out}</g>`;
}

/** Chalúpka so svietiacimi oknami. */
const house = (x, y, s, roof) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="0" y="20" width="44" height="34" fill="#3a2a22"/><path d="M-6 22 L22 0 L50 22Z" fill="${roof}"/><path d="M-7 23 L22 -1 L51 23" stroke="#fff" stroke-width="5" fill="none"/>
  <rect class="xs-win" x="7" y="29" width="11" height="11" rx="1.5" fill="#ffd166"/><rect class="xs-win" x="26" y="29" width="11" height="11" rx="1.5" fill="#ffd166" style="animation-delay:.7s"/>
  <rect x="30" y="2" width="7" height="12" fill="#3a2a22"/></g>`;

/** Hviezdy na oblohe (pseudonáhodne, stabilne). */
function stars(n, h) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const r = (k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    out += `<circle class="xs-star" cx="${(r(1) * 290 + 5).toFixed(0)}" cy="${(r(2) * h + 8).toFixed(0)}" r="${((i % 3) * 0.5 + 0.9).toFixed(1)}" fill="#fff" style="animation-delay:${((i * 0.37) % 2.4).toFixed(2)}s"/>`;
  }
  return out;
}

/** Celá scéna 300 × 600 (bez textov). */
function sceneSvg() {
  const trail = Array.from({ length: 12 }, (_, i) => {
    const t = 0.44 + i * 0.045, x = -259 + 590 * t, y = 252 - 209 * t;
    return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})">${spark(14 - (i % 3) * 3, 'xs-trail', `animation-delay:${(0.5 + t * 2.8).toFixed(2)}s`)}</g>`;
  }).join('');
  const glints = [[24, 560], [118, 548], [176, 566], [262, 552], [70, 584], [232, 588]]
    .map(([x, y], i) => `<g transform="translate(${x} ${y})">${spark(8, 'xs-glint', `animation-delay:${i * 0.4}s`)}</g>`).join('');
  return `<svg class="xs-art" width="300" height="600" viewBox="0 0 300 600" aria-hidden="true">
    ${DEFS}
    ${stars(22, 280)}
    <circle cx="268" cy="252" r="26" fill="#fff6d6" opacity=".1"/><circle cx="268" cy="252" r="14" fill="#fff6d6"/><circle cx="263" cy="248" r="3" fill="#efe3b8"/>
    ${trail}
    <g transform="scale(.72)"><g class="xs-fly">${flyingTeam()}</g></g>
    <path d="M-400 500 Q60 470 120 488 Q200 510 700 470 L700 610 L-400 610Z" fill="#cfe0ea"/>
    ${house(232, 452, 0.62, '#b02630')}
    <g transform="translate(-16 262) scale(1.18)">${treeDecorated()}</g>
    <path d="M-400 520 Q80 495 150 512 Q230 530 700 500 L700 610 L-400 610Z" fill="#fff"/>
    <g transform="translate(160 392) scale(.82)"><g class="xs-in-rd"><g class="xs-hop xs-hop2">${reindeerR()}</g></g></g>
    <g transform="translate(52 318) scale(1.03)"><g class="xs-in-santa"><g class="xs-jig">${santaR()}</g></g></g>
    <g transform="translate(-4 402) scale(.76)"><g class="xs-in-elf"><g class="xs-hop">${elfR()}</g></g></g>
    <g transform="translate(190 280)"><g class="xs-bubble">
      <path d="M8 0 H92 Q102 0 102 10 V36 Q102 46 92 46 H30 L12 60 L16 46 H8 Q-2 46 -2 36 V10 Q-2 0 8 0Z" fill="#fff"/>
      <text x="50" y="30" text-anchor="middle" font-size="17" font-weight="800" fill="${RED}">Ho ho ho!</text></g></g>
    <path d="M-400 560 Q150 540 700 560 L700 610 L-400 610Z" fill="#eef4f8"/>
    ${glints}
    ${garland()}
  </svg>`;
}

var CSS = `.xmas-snow { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.xmas-cd { display: flex; align-items: center; gap: 6px; flex: none; white-space: nowrap; position: relative; min-height: 44px; padding: 0 4px; margin: -4px 0; border: 0; border-radius: 12px; background: none; text-align: left; -webkit-tap-highlight-color: transparent; }
.xmas-cd:active { transform: scale(.94); }
.xmas-cd svg, .xmas-splash svg, .xmas-snow svg { stroke: none; overflow: visible; }
.xmas-cd .xg-gift { width: 30px; height: 30px; }
.xmas-txt { display: flex; flex-direction: column; line-height: 1.05; }
.xmas-txt b { font-size: 17px; font-weight: 800; color: var(--tx); }
.xmas-txt b i { font-style: normal; font-size: 14px; font-weight: 700; }
.xmas-txt small { font-size: 11px; font-weight: 600; color: #b98a00; letter-spacing: .02em; }
:root[data-theme="dark"] .xmas-txt small { color: #f4c430; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .xmas-txt small { color: #f4c430; } }
@media (max-width: 340px) { .xmas-txt small { display: none; } }

@keyframes xg-wiggle { 0%,62%,100% { transform: rotate(0) } 68% { transform: rotate(-9deg) } 74% { transform: rotate(8deg) } 80% { transform: rotate(-5deg) } 86% { transform: rotate(3deg) } }
@keyframes xg-hop { 0%,62%,100% { transform: translateY(0) } 70% { transform: translateY(-3px) } 78% { transform: translateY(0) } 84% { transform: translateY(-1.5px) } }
@keyframes xg-spark { 0%,60%,100% { opacity: 0; transform: scale(.3) } 72% { opacity: 1; transform: scale(1) } 86% { opacity: 0; transform: scale(.6) } }
.xg-body { transform-origin: 50% 90%; animation: xg-wiggle 3.6s ease-in-out infinite; }
.xg-lid { animation: xg-hop 3.6s ease-in-out infinite; }
.xg-spark { opacity: 0; transform-box: fill-box; transform-origin: center; }
.xg-spark { animation: xg-spark 3.6s ease-out infinite; }
.xg-spark.s2 { animation-delay: .15s; }

/* vločky (hlavička aj uvítanie) */
@keyframes xf-fall { 0% { transform: translate(0,-30px); opacity: 0 } 10% { opacity: var(--op) } 85% { opacity: var(--op) } 100% { transform: translate(var(--dx), var(--fall, 72px)); opacity: 0 } }
@keyframes xf-spin { 0% { transform: rotate(0) translateX(0) } 50% { transform: rotate(calc(var(--spin) / 2)) translateX(6px) } 100% { transform: rotate(var(--spin)) translateX(0) } }
.xmas-snow span, .xs-snow span { position: absolute; top: 0; display: block; opacity: 0; filter: drop-shadow(0 0 2px rgba(190,225,255,.55)); }
.xmas-snow svg, .xs-snow svg { display: block; }
.xmas-snow span, .xs-snow span { animation: xf-fall 6s linear infinite; }
.xmas-snow svg, .xs-snow svg { animation: xf-spin var(--sd, 3s) ease-in-out infinite alternate; }
.xmas-snow span { color: #7fa9cc; filter: none; }
:root[data-theme="dark"] .xmas-snow span { color: #fff; filter: drop-shadow(0 0 2px rgba(190,225,255,.55)); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .xmas-snow span { color: #fff; filter: drop-shadow(0 0 2px rgba(190,225,255,.55)); } }
.xs-snow span { color: #fff; }

/* uvítanie – Santa, elf a sob pod stromčekom, lietajúce soby (kresby v xmas-art.js) */
.xmas-splash {
  position: fixed; inset: 0; z-index: 1000; border: 0; padding: 0; margin: 0; width: 100%; color: #fff; font: inherit; overflow: hidden;
  background-color: #0c1a16;
  background-image: radial-gradient(circle at 50% 30%, rgba(39,110,72,.9), rgba(22,62,44,.6) 50%, rgba(12,26,22,1) 85%);
  animation: xs-in .35s ease-out both;
  --fall: 110vh; --k: 1;
}
.xmas-splash.out { animation: xs-out .45s ease-in forwards; }
@keyframes xs-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes xs-out { to { opacity: 0; visibility: hidden } }
.xs-snow { position: absolute; inset: 0; pointer-events: none; }
.xs-ground { position: absolute; left: 0; right: 0; bottom: 0; height: calc(60px * var(--k)); background: #eef4f8; }
.xs-scene { position: absolute; left: 50%; bottom: 0; width: 300px; height: 600px; margin-left: -150px; transform: scale(var(--k)); transform-origin: 50% 100%; }
.xmas-splash .xs-art { position: absolute; inset: 0; width: 300px; height: 600px; max-width: none; }
.xmas-splash .xs-art * { transform-box: fill-box; }
.xs-num { position: absolute; left: -40px; right: -40px; top: 70px; text-align: center; font-size: 112px; line-height: .9; font-weight: 900; letter-spacing: -.04em; text-shadow: 0 6px 28px rgba(244,196,48,.55); }
.xs-num.eve { top: 92px; font-size: 52px; letter-spacing: -.01em; }
.xs-sub { position: absolute; left: -40px; right: -40px; top: 174px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,.45); }
.xs-sub b { font-size: 26px; font-weight: 800; line-height: 1.1; }
.xs-sub span { font-size: 15px; font-weight: 600; color: #f4c430; }
.xs-tap { position: absolute; left: 0; right: 0; bottom: 14px; text-align: center; font-size: 13px; font-weight: 600; color: #6f8f7c; }
.xs-fly { opacity: 0; filter: drop-shadow(0 0 6px rgba(244,196,48,.45)); }
.xs-trail { opacity: 0; }

@keyframes xs-pop { 0% { opacity: 0; transform: scale(.3) } 70% { opacity: 1; transform: scale(1.15) } 100% { opacity: 1; transform: scale(1) } }
@keyframes xs-rise { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
@keyframes xs-twinkle { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes xs-blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(.1) } }
@keyframes xs-wave { 0%,100% { transform: rotate(0) } 50% { transform: rotate(-22deg) } }
@keyframes xs-hopk { 0%,100% { transform: translateY(0) } 40% { transform: translateY(-14px) } }
@keyframes xs-gallop { from { transform: rotate(-8deg) } to { transform: rotate(10deg) } }
@keyframes xs-flyk { 0% { transform: translate(-370px, 290px) rotate(-6deg); opacity: 1 } 40% { transform: translate(450px, 0) rotate(-14deg); opacity: 1 } 40.1%,100% { transform: translate(450px, 0); opacity: 0 } }
@keyframes xs-trailk { 0% { opacity: 0; transform: scale(.2) } 4% { opacity: 1; transform: scale(1) } 22%,100% { opacity: 0; transform: scale(.4) translateY(26px) } }
@keyframes xs-bulb { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes xs-bulbon { from { opacity: 0 } to { opacity: 1 } }
@keyframes xs-jigk { 0%,100% { transform: scale(1,1) } 50% { transform: scale(1.04,.95) } }
@keyframes xs-ring { 0%,100% { transform: rotate(0) } 25% { transform: rotate(18deg) } 75% { transform: rotate(-18deg) } }
@keyframes xs-santa { 0%,8% { transform: translateY(300px) } 26% { transform: translateY(-16px) } 31% { transform: translateY(4px) } 35%,100% { transform: translateY(0) } }
@keyframes xs-elfk { 0%,26% { transform: translate(-200px, 0) } 38% { transform: translate(8px,-24px) } 44%,100% { transform: translate(0,0) } }
@keyframes xs-rdk { 0%,34% { transform: translate(200px, 0) } 46% { transform: translate(-8px,-24px) } 52%,100% { transform: translate(0,0) } }

.xmas-splash:not(.still) .xs-star { animation: xs-twinkle 2.4s ease-in-out infinite; }
.xmas-splash:not(.still) .xs-eye { transform-origin: center; animation: xs-blink 3.8s infinite; }
.xmas-splash:not(.still) .xs-fly { animation: xs-flyk 7s linear .5s infinite both; }
.xmas-splash:not(.still) .xs-legs { transform-origin: center; animation: xs-gallop .32s ease-in-out infinite alternate; }
.xmas-splash:not(.still) .xs-r2 .xs-legs { animation-delay: .16s; }
.xmas-splash:not(.still) .xs-trail { animation: xs-trailk 7s ease-out infinite both; }
.xmas-splash:not(.still) .xs-bulbs circle { animation: xs-bulbon .2s ease-out both, xs-bulb 1.6s ease-in-out infinite; }
.xmas-splash:not(.still) .xs-tl { animation: xs-bulb 1.2s ease-in-out infinite; }
.xmas-splash:not(.still) .xs-win, .xmas-splash:not(.still) .xs-glint { animation: xs-twinkle 2s ease-in-out infinite; }
.xmas-splash:not(.still) .xs-treestar { transform-origin: center; animation: xs-twinkle 1.4s ease-in-out infinite; }
.xmas-splash:not(.still) .xs-in-santa { animation: xs-santa 6s cubic-bezier(.2,.9,.3,1) both; }
.xmas-splash:not(.still) .xs-in-elf { animation: xs-elfk 6s cubic-bezier(.2,.9,.3,1) both; }
.xmas-splash:not(.still) .xs-in-rd { animation: xs-rdk 6s cubic-bezier(.2,.9,.3,1) both; }
.xmas-splash:not(.still) .xs-jig { transform-origin: 50% 100%; animation: xs-jigk .28s ease-in-out 2.1s 4 both; }
.xmas-splash:not(.still) .xs-arm-r { transform-origin: 0% 100%; animation: xs-wave .55s ease-in-out 2.1s 8 both; }
.xmas-splash:not(.still) .xs-hop { animation: xs-hopk .6s ease-in-out 3.2s 4 both; }
.xmas-splash:not(.still) .xs-hop2 { animation-delay: 3.5s; }
.xmas-splash:not(.still) .xs-bell { transform-origin: 50% 0%; animation: xs-ring .4s ease-in-out 3.5s 8; }
.xmas-splash:not(.still) .xs-bubble { transform-origin: 0% 100%; animation: xs-pop .5s cubic-bezier(.2,1.4,.4,1) 2.1s both; }
.xmas-splash:not(.still) .xs-num { animation: xs-pop .7s cubic-bezier(.2,1.4,.4,1) 2.5s both; }
.xmas-splash:not(.still) .xs-sub { animation: xs-rise .6s ease-out 3s both; }


/* vločky v hlavičke padajú cez celú hlavičku */
.hd .xmas-snow { --fall: 150px; z-index: 0; }
@media (prefers-reduced-motion: reduce) { .xmas-cd *, .xmas-snow * { animation: none !important; } .xmas-snow { display: none; } }
`;

/* ---------------------------------------------------------------- odpočet a uvítanie */
var XMAS_FROM = "11-01", SPLASH_KEY = "xmas-splash";
function pad(n) { return (n < 10 ? "0" : "") + n; }
function todayISO() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

/* info o odpočte pre YYYY-MM-DD, alebo null mimo obdobia (1. 11. – 24. 12.) */
function xmasInfo(iso) {
  var p = iso.split("-").map(Number), md = iso.slice(5);
  if (md < XMAS_FROM || md > "12-24") return null;
  var days = Math.round((Date.UTC(p[0], 11, 24) - Date.UTC(p[0], p[1] - 1, p[2])) / 86400000);
  return { days: days, eve: days === 0, year: p[0] };
}

var arms = function (id, d) { return '<g id="' + id + '"><path d="' + d + '"/></g>' + [60, 120, 180, 240, 300].map(function (a) { return '<use href="#' + id + '" transform="rotate(' + a + ' 12 12)"/>'; }).join(""); };
var FLAKES = '<svg width="0" height="0" aria-hidden="true" style="position:absolute" id="xmas-defs"><defs>' +
  '<symbol id="xsf1" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + arms("xa1", "M12 12V1.5M12 4.5L9.6 2.4M12 4.5l2.4-2.1M12 8l-3.2-2.3M12 8l3.2-2.3") + '</g></symbol>' +
  '<symbol id="xsf2" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + arms("xa2", "M12 12V2.5M12 6.5l-2-1.6M12 6.5l2-1.6") + '<circle cx="12" cy="12" r="2.2"/></g></symbol>' +
  '<symbol id="xsf3" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + arms("xa3", "M12 12V1.8M12 3.8l-1.6-1.4M12 3.8l1.6-1.4M12 6.3l-2.4-1.9M12 6.3l2.4-1.9M12 9l-2-1.3M12 9l2-1.3") + '<path d="M12 9.6l2.1 1.2v2.4L12 14.4l-2.1-1.2v-2.4z"/></g></symbol></defs></svg>';

function ensureDefs() {
  if (!document.getElementById("xmas-css")) { var st = document.createElement("style"); st.id = "xmas-css"; st.textContent = CSS; document.head.appendChild(st); }
  if (!document.getElementById("xmas-defs")) document.body.insertAdjacentHTML("beforeend", FLAKES);
}
var rnd = function (a, b) { return a + Math.random() * (b - a); };
var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

/* n vločiek; malé sú „ďalej“ (bledšie, rozmazané) */
function flakesHtml(n, sizes, durs, blurFar) {
  var html = "";
  for (var i = 0; i < n; i++) {
    var size = pick(sizes), far = size <= sizes[1], dur = rnd(durs[0], durs[1]);
    var style = ["left:" + (((i + 0.5) * 100) / n + rnd(-2.5, 2.5)).toFixed(1) + "%", "--op:" + (far ? rnd(0.45, 0.7) : rnd(0.8, 1)).toFixed(2),
      "--dx:" + pick([-30, -18, -8, 10, 22, 34]) + "px", "--spin:" + pick([-1, 1]) * pick([120, 180, 240, 300]) + "deg", "--sd:" + (dur / 2).toFixed(1) + "s",
      "animation-duration:" + dur.toFixed(1) + "s", "animation-delay:" + (-rnd(0, dur)).toFixed(1) + "s", far && blurFar ? "filter:blur(.6px)" : ""].filter(Boolean).join(";");
    html += '<span style="' + style + '"><svg width="' + size + '" height="' + size + '" style="width:' + size + "px;height:" + size + 'px"><use href="#' + pick(["xsf1", "xsf2", "xsf3"]) + '"/></svg></span>';
  }
  return html;
}

var GIFT = '<svg class="xg-gift" width="30" height="30" viewBox="0 0 34 34" aria-hidden="true">' +
  '<g class="xg-body"><rect x="6" y="15" width="22" height="16" rx="2.5" fill="#d64545"/><rect x="15" y="15" width="4" height="16" fill="#f4c430"/>' +
  '<g class="xg-lid"><rect x="4" y="10" width="26" height="6" rx="2" fill="#e85a5a"/><rect x="15" y="10" width="4" height="6" fill="#f4c430"/>' +
  '<path d="M17 10c-2-5-8-6-8-2.5 0 2.5 5 2.5 8 2.5M17 10c2-5 8-6 8-2.5 0 2.5-5 2.5-8 2.5" fill="none" stroke="#f4c430" stroke-width="2.2" stroke-linecap="round"/></g></g>' +
  '<path class="xg-spark" d="M31 4l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#f4c430"/>' +
  '<path class="xg-spark s2" d="M3 3l.7 1.6 1.6.7-1.6.7L3 7.6l-.7-1.6L.7 5.3l1.6-.7z" fill="#fff"/></svg>';

/* texty z i18n.js (T, TP a fmtDate sú v index.html) */
function unit(n) { return TP("xmas_unit", n); }
function label(info) { return info.eve ? T("xmas_eve_aria") : T("xmas_left_aria", { n: info.days, u: unit(info.days) }); }

/* odpočet v hlavičke (#xmas-cd) a sneženie v nej (#xmas-snow) */
function header() {
  var el = document.getElementById("xmas-cd"), snow = document.getElementById("xmas-snow");
  if (!el) return;
  var iso = todayISO(), info = xmasInfo(iso);
  el.hidden = !info; if (snow) snow.hidden = !info;
  if (!info) { el.innerHTML = ""; if (snow) snow.innerHTML = ""; return; }
  ensureDefs();
  var key = iso + lang;
  if (el.dataset.day === key) return;
  el.dataset.day = key;
  el.setAttribute("aria-label", label(info) + " " + T("xmas_play"));
  el.innerHTML = GIFT + '<span class="xmas-txt">' + (info.eve
    ? "<b>" + T("xmas_eve_1") + "</b><small>" + T("xmas_eve_2") + "</small>"
    : "<b>" + info.days + " <i>" + unit(info.days) + "</i></b><small>" + T("xmas_to") + "</small>") + "</span>";
  if (!el.dataset.bound) { el.dataset.bound = "1"; el.addEventListener("click", function () { splash(); }); }
  if (snow && !snow.childElementCount) snow.innerHTML = flakesHtml(10, [8, 9, 11, 12, 13], [4.5, 7], false);
}

var reduced = function () { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; };
function seen(iso) { try { return localStorage.getItem(SPLASH_KEY) === iso; } catch (e) { return false; } }

/* veľké uvítanie raz za deň */
function maybeSplash() { var iso = todayISO(); if (!xmasInfo(iso) || seen(iso)) return false; return splash(); }

/* prehrá uvítanie hneď (aj po ťuknutí na darček v hlavičke) */
function splash() {
  var iso = todayISO(), info = xmasInfo(iso);
  if (!info || document.getElementById("xmas-splash")) return false;
  try { localStorage.setItem(SPLASH_KEY, iso); } catch (e) {}
  ensureDefs();
  var still = reduced();
  var date = fmtDate(new Date(info.year, 11, 24), { weekday: "long", day: "numeric", month: "long" });
  var wrap = document.createElement("div");
  wrap.innerHTML = '<button type="button" id="xmas-splash" class="xmas-splash' + (still ? " still" : "") + '" aria-label="' + label(info) + " " + T("xmas_continue") + '">' +
    '<span class="xs-ground" aria-hidden="true"></span><span class="xs-scene">' + sceneSvg() +
    '<span class="xs-num' + (info.eve ? " eve" : "") + '">' + (info.eve ? T("xmas_eve_big") : info.days) + "</span>" +
    '<span class="xs-sub"><b>' + (info.eve ? T("xmas_merry") : T("xmas_sub", { u: unit(info.days) })) + "</b>" +
    "<span>" + (info.eve ? T("xmas_wish") : T("xmas_date", { d: date })) + "</span></span>" +
    '<small class="xs-tap">' + T("xmas_tap") + "</small></span>" +
    '<span class="xs-snow" aria-hidden="true">' + (still ? "" : flakesHtml(26, [10, 12, 16, 20, 24, 28], [6, 11], true)) + "</span></button>";
  var el = wrap.firstElementChild, closed = false;
  var fit = function () { el.style.setProperty("--k", Math.min(window.innerWidth / 300, window.innerHeight / 600).toFixed(3)); };
  fit(); window.addEventListener("resize", fit);
  document.body.appendChild(el);
  var close = function () {
    if (closed) return; closed = true;
    el.classList.add("out"); window.removeEventListener("resize", fit);
    setTimeout(function () { el.remove(); }, 450);
  };
  el.addEventListener("click", close);
  document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { document.removeEventListener("keydown", k); close(); } });
  setTimeout(close, still ? 4000 : 7000);
  return true;
}

/* po návrate do aplikácie (iný deň) obnoviť odpočet a ukázať dnešné uvítanie */
document.addEventListener("visibilitychange", function () {
  if (document.hidden) return;
  header();
  if (typeof firstRun === "undefined" || !firstRun) maybeSplash();
});

window.XMAS = { header: header, maybeSplash: maybeSplash, splash: splash, info: xmasInfo };
})();
