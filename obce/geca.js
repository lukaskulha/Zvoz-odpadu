/*
 * Obec Geča – data for the waste collection app.
 * One file per village. To add a village: copy this file, change everything below,
 * add it to OBCE_ZOZNAM in obce/zoznam.js and run `node scripts/check-i18n.js`.
 *
 *  D      collection days: K = mixed waste, S = glass, P = paper, L = plastics & metals;
 *         each maps month number (1–12) to a list of days in 2026 (from the KOSIT PDF).
 *  info   "yard"  = second tab is the collection yard (Zberný dvor), needs `yard` and zd_* texts
 *         "other" = second tab is "Other waste" (no yard), needs `other` and io_* texts
 *  t      village-specific texts in ALL languages (sk, hu, en); they override i18n.js
 */
OBCE.geca = {
  name: { sk: "Geča", hu: "Gecse", en: "Geča" },
  color: "#4d8f2f",
  pdf: "https://www.kosit.sk/wp-content/uploads/2025/12/Geca.pdf",
  daySwitch: false,
  info: "other",
  other: {
    tel: "+421556999821",
    web: "https://www.obecgeca.sk/"
  },
  D: {
    K: {1:[6,20],2:[3,17],3:[3,17,31],4:[14,28],5:[12,26],6:[9,23],7:[7,21],8:[4,18],9:[1,15,29],10:[13,27],11:[10,24],12:[8,22]},
    S: {1:[3],3:[21],5:[2],7:[4],9:[5],10:[31]},
    P: {1:[17],2:[14],3:[14],4:[18],5:[16],6:[13],7:[18],8:[15],9:[19],10:[17],11:[21],12:[19]},
    L: {1:[10],2:[7],3:[7],4:[11],5:[9,30],6:[20],7:[11],8:[1,22],9:[12],10:[3,24],11:[14],12:[5]}
  },
  t: {
    sk: {
      io_badge: "Mobilné zbery",
      io_link: "objemný, elektro, textil, olej…",
      io_none: "Geča nemá zberný dvor",
      io_none_sub: "Ostatný odpad sa zbiera mobilne alebo cez spätný odber v obchodoch.",
      io_t: ["Objemný odpad", "Drobný stavebný odpad", "Elektroodpad", "Batérie a akumulátory", "Farby, chemikálie a iný nebezpečný odpad", "Textil, odevy a obuv", "Jedlý olej", "Bioodpad a konáre"],
      io_d: ["Mobilný zber najmenej 2× ročne, na jar a na jeseň.", "Do kontajnera na určenom stanovišti podľa potreby, platí sa poplatok podľa hmotnosti.", "Zadarmo v predajni elektrospotrebičov (spätný odber), zber zabezpečuje aj zmluvný partner obce.", "Zber 2× ročne, alebo do zberných nádob v predajniach batérií.", "Zber najmenej 2× ročne.", "Zber 2× ročne.", "Použitý olej v PET fľaši odovzdáte pri mobilnom zbere.", "Kuchynský a záhradný bioodpad patrí do kompostéra, ktorý dostala každá domácnosť. Orezané konáre obec zbiera na jar a na jeseň."],
      io_when: "Presné termíny týchto zberov ohlasuje obec na webe obecgeca.sk a v miestnom rozhlase.",
      io_office: "Obecný úrad",
      io_addr: "Kostolná 382/8",
      io_zip: "044 10 Geča",
      io_call: "Zavolať",
      io_web: "Web obce",
      io_foot: "Zdroj: VZN obce Geča č. 2/2016 o nakladaní s komunálnymi odpadmi a drobnými stavebnými odpadmi v znení VZN č. 6/2022. Telefón obecného úradu: 055 699 98 21.",
      foot_src: "Termíny sú prepísané zo zvozového kalendára 2026 pre Geču ({pdf}). Pri pochybnostiach platí oficiálny kalendár. Bezplatná linka KOSIT: 0800 156 748."
    },
    hu: {
      io_badge: "Mobil gyűjtés",
      io_link: "lom, elektronika, textil, olaj…",
      io_none: "Gecsén nincs hulladékudvar",
      io_none_sub: "Az egyéb hulladékot mobil gyűjtéssel vagy az üzletekben történő visszavétellel gyűjtik.",
      io_t: ["Lomhulladék", "Apró építési hulladék", "Elektronikai hulladék", "Elemek és akkumulátorok", "Festékek, vegyszerek és egyéb veszélyes hulladék", "Textil, ruha és cipő", "Étolaj", "Biohulladék és gallyak"],
      io_d: ["Mobil gyűjtés évente legalább kétszer, tavasszal és ősszel.", "A kijelölt helyen lévő konténerbe szükség szerint, súly szerinti díj ellenében.", "Ingyenesen leadható az elektronikai üzletekben (visszavétel), a gyűjtést a község szerződéses partnere is biztosítja.", "Gyűjtés évente kétszer, vagy az elemeket árusító üzletek gyűjtőedényeibe.", "Gyűjtés évente legalább kétszer.", "Gyűjtés évente kétszer.", "A használt olajat PET-palackban a mobil gyűjtéskor lehet leadni.", "A konyhai és kerti biohulladék a komposztálóba kerül, amelyet minden háztartás megkapott. A levágott gallyakat a község tavasszal és ősszel gyűjti."],
      io_when: "A gyűjtések pontos időpontját a község az obecgeca.sk oldalon és a helyi hangosbemondóban teszi közzé.",
      io_office: "Községi hivatal",
      io_addr: "Kostolná 382/8",
      io_zip: "044 10 Geča",
      io_call: "Hívás",
      io_web: "Honlap",
      io_foot: "Forrás: Gecse község 2/2016. sz. általános érvényű rendelete a kommunális és apró építési hulladék kezeléséről, a 6/2022. sz. módosítással. A községi hivatal telefonszáma: 055 699 98 21.",
      foot_src: "Az időpontok a KOSIT Gecse (Geča) 2026-os szállítási naptárából származnak ({pdf}). Kétség esetén a hivatalos naptár az irányadó. A KOSIT ingyenes vonala: 0800 156 748."
    },
    en: {
      io_badge: "Pop-up collections",
      io_link: "bulky, electrical, textiles, oil…",
      io_none: "Geča has no recycling yard",
      io_none_sub: "Other waste is picked up in pop-up collections or taken back by shops.",
      io_t: ["Bulky waste", "Small construction waste", "Electrical waste", "Batteries and accumulators", "Paints, chemicals and other hazardous waste", "Textiles, clothes and shoes", "Cooking oil", "Green waste and branches"],
      io_d: ["Pop-up collection at least twice a year, in spring and autumn.", "Into the container at the designated spot as needed, with a fee charged by weight.", "Free take-back at electrical shops, the village's contracted partner also collects it.", "Collected twice a year, or use the collection boxes in shops that sell batteries.", "Collected at least twice a year.", "Collected twice a year.", "Hand in used oil in a PET bottle at the pop-up collection.", "Kitchen and garden waste goes into the compost bin every household received. The village collects pruned branches in spring and autumn."],
      io_when: "The village announces exact dates on obecgeca.sk and over the local PA system.",
      io_office: "Municipal office",
      io_addr: "Kostolná 382/8",
      io_zip: "044 10 Geča",
      io_call: "Call",
      io_web: "Village website",
      io_foot: "Source: Geča bylaw (VZN) No. 2/2016 on municipal and small construction waste, as amended by VZN No. 6/2022. Municipal office phone: 055 699 98 21.",
      foot_src: "Dates are transcribed from the KOSIT 2026 collection calendar for Geča ({pdf}). If in doubt, the official calendar applies. KOSIT free line: 0800 156 748."
    }
  }
};
