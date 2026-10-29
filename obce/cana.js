/*
 * Obec Čaňa – data for the waste collection app.
 * One file per village. To add a village: copy this file, change everything below,
 * add it to OBCE_ZOZNAM in obce/zoznam.js and run `node scripts/check-i18n.js`.
 *
 *  D      collection days: K = mixed waste, S = glass, P = paper, L = plastics & metals;
 *         each maps month number (1–12) to a list of days in 2026 (from the KOSIT PDF).
 *  info   "yard"  = second tab is the collection yard (Zberný dvor), needs `yard` and zd_* texts
 *         "other" = second tab is "Other waste" (no yard), needs `other` and io_* texts
 *  t      village-specific texts in ALL languages (sk, hu, en); they override i18n.js
 */
OBCE.cana = {
  name: { sk: "Čaňa", hu: "Čaňa", en: "Čaňa" },
  color: "#2f5fd0",
  pdf: "https://www.kosit.sk/wp-content/uploads/2025/12/Cana.pdf",
  daySwitch: true, /* mixed waste on Thursday or Friday depending on the street (Friday = Thursday + 1 day) */
  info: "yard",
  yard: {
    hours: { 3: [780, 1080], 6: [540, 990] }, /* weekday (0 = Sunday): [opens, closes] in minutes after midnight */
    map: "https://www.google.com/maps/search/?api=1&query=%C4%8Co%C5%88a+%C4%8COV+%C4%8Ca%C5%88a",
    tel: "+421556999206"
  },
  D: {
    K: {1:[1,15,29],2:[12,26],3:[12,26],4:[9,23],5:[7,21],6:[4,18],7:[2,16,30],8:[13,27],9:[10,24],10:[8,22],11:[5,19],12:[3,17]},
    S: {1:[3],3:[7],5:[2],7:[4],9:[5],11:[7]},
    P: {1:[17],2:[14],3:[14],4:[18],5:[16],6:[13],7:[18],8:[15],9:[19],10:[17],11:[21],12:[19]},
    L: {1:[10],2:[7,28],3:[21],4:[11],5:[9,30],6:[20],7:[11],8:[1,22],9:[12],10:[3,24],11:[14],12:[5]}
  },
  t: {
    sk: {
      zd_addr: "Areál ČOV, južná časť obce",
      zd_zip: "044 14 Čaňa",
      zd_res: "Trvalý alebo prechodný pobyt v Čani, alebo zaplatený poplatok za odpad ako vlastník nehnuteľnosti",
      zd_fee: "Odovzdanie je zadarmo. Drobný stavebný odpad stojí 0,015 € za 1 kg.",
      zd_acc_sub: "11 druhov odpadu",
      zd_acc_items: ["Papier a lepenka", "Sklo", "Kovové obaly", "Plasty", "Viacvrstvové obaly na báze lepenky", "Šatstvo a textílie", "Jedlé oleje a tuky", "Drevo", "Biologicky rozložiteľný odpad", "Objemný odpad", "Drobný stavebný odpad"],
      zd_rej_items: ["Komunálny odpad", "Elektroodpad", "Batérie a akumulátory", "Pneumatiky", "Lieky", "Chemikálie, farby a lepidlá", "Azbest a iný nebezpečný odpad", "Kuchynský bioodpad", "Odpad z podnikania"],
      zd_foot: "Prevádzka od apríla 2026. Zdroj: prevádzkový poriadok zberného dvora, obec Čaňa. Vo sviatky poriadok hodiny neuvádza, overte na obecnom úrade. Telefón: +421 55 69 99 206.",
      foot_src: "Termíny sú prepísané zo zvozového kalendára 2026 pre Čaňu ({pdf}). Pri pochybnostiach platí oficiálny kalendár. Bezplatná linka KOSIT: 0800 156 748."
    },
    hu: {
      zd_addr: "A szennyvíztisztító (ČOV) területe, a község déli része",
      zd_zip: "044 14 Čaňa",
      zd_res: "Állandó vagy ideiglenes lakcím Čaňán, vagy ingatlantulajdonosként befizetett hulladékdíj",
      zd_fee: "A leadás ingyenes. Az apró építési hulladék díja 0,015 € kilogrammonként.",
      zd_acc_sub: "11 hulladéktípus",
      zd_acc_items: ["Papír és karton", "Üveg", "Fém csomagolás", "Műanyag", "Karton alapú többrétegű csomagolás", "Ruha és textil", "Étolaj és zsiradék", "Fa", "Biológiailag lebomló hulladék", "Lomhulladék", "Apró építési hulladék"],
      zd_rej_items: ["Kommunális hulladék", "Elektronikai hulladék", "Elemek és akkumulátorok", "Gumiabroncsok", "Gyógyszerek", "Vegyszerek, festékek és ragasztók", "Azbeszt és egyéb veszélyes hulladék", "Konyhai biohulladék", "Vállalkozási hulladék"],
      zd_foot: "Üzemel 2026 áprilisától. Forrás: a hulladékudvar üzemeltetési szabályzata, Čaňa község. Az ünnepnapi nyitvatartást a szabályzat nem tartalmazza, érdeklődjön a községi hivatalban. Telefon: +421 55 69 99 206.",
      foot_src: "Az időpontok a KOSIT Čaňa 2026-os szállítási naptárából származnak ({pdf}). Kétség esetén a hivatalos naptár az irányadó. A KOSIT ingyenes vonala: 0800 156 748."
    },
    en: {
      zd_addr: "Wastewater treatment plant (ČOV) area, south part of the village",
      zd_zip: "044 14 Čaňa",
      zd_res: "Permanent or temporary residence in Čaňa, or the waste fee paid as a property owner",
      zd_fee: "Drop-off is free. Small construction waste costs €0.015 per kg.",
      zd_acc_sub: "11 types of waste",
      zd_acc_items: ["Paper and cardboard", "Glass", "Metal packaging", "Plastics", "Multilayer cardboard-based packaging", "Clothing and textiles", "Cooking oils and fats", "Wood", "Biodegradable waste", "Bulky waste", "Small construction waste"],
      zd_rej_items: ["Mixed municipal waste", "E-waste", "Batteries and accumulators", "Tyres", "Medicines", "Chemicals, paints and glues", "Asbestos and other hazardous waste", "Kitchen bio-waste", "Business waste"],
      zd_foot: "Open since April 2026. Source: the yard's operating rules, municipality of Čaňa. Holiday hours are not stated, please check with the municipal office. Phone: +421 55 69 99 206.",
      foot_src: "Dates are transcribed from the KOSIT 2026 collection calendar for Čaňa ({pdf}). If in doubt, the official calendar applies. KOSIT free line: 0800 156 748."
    }
  }
};
