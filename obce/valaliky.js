/*
 * Obec Valaliky – data for the waste collection app.
 * One file per village. To add a village: copy this file, change everything below,
 * add it to OBCE_ZOZNAM in obce/zoznam.js and run `node scripts/check-i18n.js`.
 *
 *  D      collection days: K = mixed waste, S = glass, P = paper, L = plastics & metals;
 *         each maps month number (1–12) to a list of days in 2026 (from the KOSIT PDF).
 *  info   "yard"  = second tab is the collection yard (Zberný dvor), needs `yard` and zd_* texts
 *         "other" = second tab is "Other waste" (no yard), needs `other` and io_* texts
 *  t      village-specific texts in ALL languages (sk, hu, en); they override i18n.js
 *
 * Valaliky = Buzice, Bernátovce, Všechsvätých and Košťany; one collection route for all parts.
 */
OBCE.valaliky = {
  name: { sk: "Valaliky", hu: "Valaliky", en: "Valaliky" },
  color: "#c0631f",
  pdf: "https://www.kosit.sk/wp-content/uploads/2025/12/Valaliky.pdf",
  daySwitch: false,
  info: "other",
  other: {
    tel: "+421556999804",
    web: "https://www.valaliky.sk/",
    /* one icon per io_t item: bulky, dso, elektro, bat, chem, textil, olej, bio */
    icons: ["bulky", "dso", "elektro", "bat", "chem", "bio"]
  },
  D: {
    K: {1:[14,28],2:[11,25],3:[11,25],4:[8,22],5:[6,20],6:[3,17],7:[1,15,29],8:[12,26],9:[9,23],10:[7,21],11:[4,18],12:[2,16,30]},
    S: {1:[3],3:[7],5:[2],7:[4],9:[5],11:[7]},
    P: {1:[17],2:[14],3:[14],4:[18],5:[16],6:[13],7:[18],8:[15],9:[19],10:[17],11:[21],12:[19]},
    L: {1:[10],2:[7,28],3:[21],4:[11],5:[9,30],6:[20],7:[11],8:[1,22],9:[12],10:[3,24],11:[14],12:[5]}
  },
  t: {
    sk: {
      io_badge: "Zbery v obci",
      io_link: "objemný, elektro, batérie, konáre…",
      io_none: "Obec Valaliky nemá zberný dvor",
      io_none_sub: "Ostatný odpad obec zbiera do kontajnerov niekoľkokrát do roka, drobnosti môžete odniesť na obecný úrad.",
      io_t: ["Objemný odpad", "Drobný stavebný odpad", "Elektroodpad", "Batérie", "Farby, chemikálie a iný nebezpečný odpad", "Konáre a zelený odpad zo záhrad"],
      io_d: [
        "Bezplatný zber na jar a na jeseň. Kontajnery sa postupne rozmiestnia v každej časti obce, odpad (nábytok, koberce) treba doviezť k najbližšiemu.",
        "Do veľkokapacitného kontajnera na mieste, ktoré určí obec. Informácie dostanete na obecnom úrade.",
        "Zber organizuje obec najmenej 2× ročne. Drobnú elektroniku môžete hodiť do zbernej nádoby v budove obecného úradu, starý spotrebič zoberú zadarmo aj v predajni pri kúpe nového.",
        "Do zbernej nádoby v budove obecného úradu alebo pri zbere, ktorý obec organizuje 2× ročne.",
        "Zber do kontajnera 2× ročne, na jar a na jeseň. Tonery a náplne do tlačiarní patria do zbernej nádoby na obecnom úrade.",
        "Najlepšie je kompostovať doma. Na jar a na jeseň obec bezplatne rozmiestni kontajnery na konáre a zelený odpad v každej časti obce."
      ],
      io_when: "Presné termíny a rozpis kontajnerov zverejňuje obec na valaliky.sk a v miestnom rozhlase. Otázky k zberu: prevádzkáreň obce, 0950 838 963, prevadzka@valaliky.sk.",
      io_office: "Obecný úrad",
      io_addr: "Poľná 8",
      io_zip: "044 13 Valaliky",
      io_call: "Zavolať",
      io_web: "Web obce",
      io_foot: "Zdroj: web obce Valaliky (kalendár zberu odpadov, oznamy o zbere objemného a zeleného odpadu) a Program odpadového hospodárstva obce. Telefón obecného úradu: 055 699 98 04.",
      foot_src: "Termíny sú prepísané zo zvozového kalendára 2026 pre Valaliky ({pdf}). Pri pochybnostiach platí oficiálny kalendár. Bezplatná linka KOSIT: 0800 156 748."
    },
    hu: {
      io_badge: "Gyűjtések",
      io_link: "lom, elektronika, elemek, gallyak…",
      io_none: "Valalikyban nincs hulladékudvar",
      io_none_sub: "Az egyéb hulladékot a község évente többször konténerekbe gyűjti, apróságokat a községi hivatalba is vihet.",
      io_t: ["Lomhulladék", "Apró építési hulladék", "Elektronikai hulladék", "Elemek", "Festékek, vegyszerek és egyéb veszélyes hulladék", "Gallyak és kerti zöldhulladék"],
      io_d: [
        "Ingyenes gyűjtés tavasszal és ősszel. A konténereket fokozatosan a község minden részében kihelyezik, a hulladékot (bútor, szőnyeg) a legközelebbihez kell vinni.",
        "A község által kijelölt helyen lévő nagy konténerbe. Tájékoztatás a községi hivatalban.",
        "A gyűjtést a község évente legalább kétszer szervezi. Apró elektronikát a községi hivatal épületében lévő gyűjtőedénybe dobhat, a régi készüléket új vásárlásakor az üzlet is ingyen átveszi.",
        "A községi hivatal épületében lévő gyűjtőedénybe, vagy a község által évente kétszer szervezett gyűjtéskor.",
        "Konténeres gyűjtés évente kétszer, tavasszal és ősszel. A tonerek és tintapatronok a községi hivatalban lévő gyűjtőedénybe valók.",
        "A legjobb otthon komposztálni. Tavasszal és ősszel a község ingyen konténereket helyez ki gallyaknak és zöldhulladéknak a község minden részében."
      ],
      io_when: "A pontos időpontokat és a konténerek beosztását a község a valaliky.sk oldalon és a helyi hangosbemondóban teszi közzé. Kérdések a gyűjtéssel kapcsolatban: a község üzemeltetési részlege, 0950 838 963, prevadzka@valaliky.sk.",
      io_office: "Községi hivatal",
      io_addr: "Poľná 8",
      io_zip: "044 13 Valaliky",
      io_call: "Hívás",
      io_web: "Honlap",
      io_foot: "Forrás: Valaliky község honlapja (hulladékgyűjtési naptár, a lom- és zöldhulladék-gyűjtésről szóló közlemények) és a község hulladékgazdálkodási programja. A községi hivatal telefonszáma: 055 699 98 04.",
      foot_src: "Az időpontok a KOSIT Valaliky 2026-os szállítási naptárából származnak ({pdf}). Kétség esetén a hivatalos naptár az irányadó. A KOSIT ingyenes vonala: 0800 156 748."
    },
    en: {
      io_badge: "Collections",
      io_link: "bulky, electrical, batteries, branches…",
      io_none: "Valaliky has no recycling yard",
      io_none_sub: "The village collects other waste in containers several times a year; small items can be taken to the municipal office.",
      io_t: ["Bulky waste", "Small construction waste", "Electrical waste", "Batteries", "Paints, chemicals and other hazardous waste", "Branches and garden waste"],
      io_d: [
        "Free collection in spring and autumn. Containers are placed in each part of the village in turn; take your waste (furniture, carpets) to the nearest one.",
        "Into the large container at the spot set by the village. Ask at the municipal office.",
        "The village organises a collection at least twice a year. Small electronics go into the collection box in the municipal office building, and shops take an old appliance back for free when you buy a new one.",
        "Into the collection box in the municipal office building, or at the collection the village organises twice a year.",
        "Container collection twice a year, in spring and autumn. Toners and ink cartridges go into the collection box at the municipal office.",
        "Composting at home is best. In spring and autumn the village places free containers for branches and green waste in each part of the village."
      ],
      io_when: "The village announces exact dates and where the containers will be on valaliky.sk and over the local PA system. Questions about collections: village maintenance office, 0950 838 963, prevadzka@valaliky.sk.",
      io_office: "Municipal office",
      io_addr: "Poľná 8",
      io_zip: "044 13 Valaliky",
      io_call: "Call",
      io_web: "Village website",
      io_foot: "Source: the Valaliky village website (waste collection calendar, notices about bulky and green waste collections) and the village waste management programme. Municipal office phone: 055 699 98 04.",
      foot_src: "Dates are transcribed from the KOSIT 2026 collection calendar for Valaliky ({pdf}). If in doubt, the official calendar applies. KOSIT free line: 0800 156 748."
    }
  }
};
