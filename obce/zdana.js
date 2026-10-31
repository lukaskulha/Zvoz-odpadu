/*
 * Obec Ždaňa – data for the waste collection app.
 * One file per village. To add a village: copy this file, change everything below,
 * add it to OBCE_ZOZNAM in obce/zoznam.js and run `node scripts/check-i18n.js`.
 *
 *  D      collection days: K = mixed waste, S = glass, P = paper, L = plastics & metals;
 *         each maps month number (1–12) to a list of days in 2026 (from the KOSIT PDF).
 *  info   "yard"  = second tab is the collection yard (Zberný dvor), needs `yard` and zd_* texts
 *         "other" = second tab is "Other waste" (no yard), needs `other` and io_* texts
 *  t      village-specific texts in ALL languages (sk, hu, en); they override i18n.js
 */
OBCE.zdana = {
  name: { sk: "Ždaňa", hu: "Hernádzsadány", en: "Ždaňa" },
  color: "#7a4fb5",
  pdf: "https://www.kosit.sk/wp-content/uploads/2025/12/Zdana.pdf",
  daySwitch: false,
  info: "yard",
  yard: {
    /* weekday (0 = Sunday): [opens, closes] or several intervals, minutes after midnight.
       Saturday 8:00–10:00 only by arrangement with the village, so it is in zd_other_closed, not here. */
    hours: {
      1: [[450, 690], [780, 870]],
      2: [[450, 690], [780, 870]],
      3: [[450, 690], [780, 1020]],
      4: [[450, 690], [780, 870]],
      5: [450, 690]
    },
    map: "https://www.google.com/maps/search/?api=1&query=Z%C3%A1kladn%C3%A1+%C5%A1kola+Jarmo%C4%8Dn%C3%A1+96+%C5%BDda%C5%88a",
    tel: "+421556980021"
  },
  D: {
    K: {1:[12,26],2:[9,23],3:[9,23],4:[6,20],5:[4,18],6:[1,15,29],7:[13,27],8:[10,24],9:[7,21],10:[5,19],11:[2,16,30],12:[14,28]},
    S: {1:[15],3:[12],5:[7],7:[2],8:[29],9:[24],11:[19],12:[26]},
    P: {2:[12],4:[9],6:[4],8:[27],10:[22],12:[17]},
    L: {1:[1,29],2:[26],3:[26],4:[23],5:[21],6:[18],7:[16,30],8:[13],9:[10],10:[8],11:[5],12:[3]}
  },
  t: {
    sk: {
      zd_other_closed: "Sobota 8:00 – 10:00 len po dohode s obcou, inak zatvorené.",
      zd_addr: "Zberné miesto obce, areál základnej školy (vchod ku kotolni), Jarmočná 96",
      zd_zip: "044 11 Ždaňa",
      zd_res: "Trvalý alebo prechodný pobyt v Ždani a zaplatený poplatok za odpad. Odovzdať sa dá len odpad z domácnosti, nie z podnikania.",
      zd_fee: "Objemný odpad je zadarmo. Drobný stavebný odpad stojí 0,015 € za 1 kg, poplatok sa platí vopred v pokladni obce. Väčšie množstvo (nad cca 500 kg) cez objednaný veľkokapacitný kontajner.",
      zd_acc_sub: "3 druhy odpadu",
      zd_acc_items: ["Objemný odpad (nábytok, sedačky, koberce – rozložené)", "Drobný stavebný odpad", "Použitý jedlý olej a tuky v uzavretej nádobe"],
      zd_rej_items: ["Papier, plasty, sklo a kovy – patria do triedeného zberu doma", "Elektroodpad – do predajne alebo pri zbere obce 2× ročne", "Batérie a akumulátory – pri zbere elektroodpadu 2× ročne", "Pneumatiky – k predajcovi pneumatík", "Lieky – do lekárne", "Odpad z podnikania"],
      zd_foot: "Zdroj: oznam obce Ždaňa „Kam s odpadom“ a VZN č. 50/2016. Pred cestou si hodiny radšej overte na obecnom úrade, tel. 055 698 00 21.",
      foot_src: "Termíny sú prepísané zo zvozového kalendára 2026 pre Ždaňu ({pdf}). Pri pochybnostiach platí oficiálny kalendár. Bezplatná linka KOSIT: 0800 156 748."
    },
    hu: {
      zd_other_closed: "Szombaton 8:00 – 10:00 csak előzetes megbeszélés alapján, egyébként zárva.",
      zd_addr: "A község gyűjtőhelye, az alapiskola területe (a kazánház bejáratánál), Jarmočná 96",
      zd_zip: "044 11 Ždaňa",
      zd_res: "Állandó vagy ideiglenes lakcím Ždaňán és befizetett hulladékdíj. Csak háztartási hulladék adható le, vállalkozási nem.",
      zd_fee: "A lomhulladék leadása ingyenes. Az apró építési hulladék díja 0,015 € kilogrammonként, előre kell befizetni a községi pénztárban. Nagyobb mennyiséget (kb. 500 kg felett) megrendelt nagy konténerrel.",
      zd_acc_sub: "3 hulladéktípus",
      zd_acc_items: ["Lomhulladék (bútor, ülőgarnitúra, szőnyeg – szétszedve)", "Apró építési hulladék", "Használt étolaj és zsiradék zárt edényben"],
      zd_rej_items: ["Papír, műanyag, üveg és fém – otthon szelektíven gyűjtendő", "Elektronikai hulladék – az üzletbe vagy a község évi kétszeri gyűjtésére", "Elemek és akkumulátorok – az elektronikai hulladékkal évente kétszer", "Gumiabroncsok – a gumiabroncs-forgalmazóhoz", "Gyógyszerek – a gyógyszertárba", "Vállalkozási hulladék"],
      zd_foot: "Forrás: Ždaňa község „Hova a hulladékkal” tájékoztatója és az 50/2016. sz. rendelet. Indulás előtt érdemes a nyitvatartást a községi hivatalban ellenőrizni, tel. 055 698 00 21.",
      foot_src: "Az időpontok a KOSIT Ždaňa (Hernádzsadány) 2026-os szállítási naptárából származnak ({pdf}). Kétség esetén a hivatalos naptár az irányadó. A KOSIT ingyenes vonala: 0800 156 748."
    },
    en: {
      zd_other_closed: "Saturday 8:00 – 10:00 only by arrangement with the village, otherwise closed.",
      zd_addr: "Village collection point, primary school grounds (boiler room entrance), Jarmočná 96",
      zd_zip: "044 11 Ždaňa",
      zd_res: "Permanent or temporary residence in Ždaňa and the waste fee paid. Household waste only, no business waste.",
      zd_fee: "Bulky waste is free. Small construction waste costs €0.015 per kg, paid in advance at the village cash desk. Larger amounts (over about 500 kg) need an ordered skip.",
      zd_acc_sub: "3 types of waste",
      zd_acc_items: ["Bulky waste (furniture, sofas, carpets – taken apart)", "Small construction waste", "Used cooking oil and fat in a closed container"],
      zd_rej_items: ["Paper, plastics, glass and metal – sort them at home", "E-waste – to a shop or the village collection twice a year", "Batteries – with the e-waste collection twice a year", "Tyres – to a tyre dealer", "Medicines – to a pharmacy", "Business waste"],
      zd_foot: "Source: the village of Ždaňa notice “Where to take waste” and bylaw No. 50/2016. Better check the hours with the municipal office before you go, phone 055 698 00 21.",
      foot_src: "Dates are transcribed from the KOSIT 2026 collection calendar for Ždaňa ({pdf}). If in doubt, the official calendar applies. KOSIT free line: 0800 156 748."
    }
  }
};
