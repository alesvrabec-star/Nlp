import { DailyExercise, Scenario, VakogQuestion } from '../types/nlp';

export const NLP_PRESUPPOSITIONS = [
  {
    title: 'Mapa není teritorium',
    description: 'Naše vnímání reality není realita sama, ale pouze náš vnitřní filtr a mentální reprezentace. Respektujte model světa druhého člověka.',
    category: 'Vnímání',
    practicalTip: 'Při nedorozumění se ptejte: „Jakou mapu reality teď používá druhý člověk?“ místo „Proč se chová nelogicky?“'
  },
  {
    title: 'Každé chování má pozitivní záměr',
    description: 'Za každým jednáním (i zdánlivě destruktivním nebo odmítavým) je původní záměr uspokojit nějakou potřebu, zajistit bezpečí nebo ochranu.',
    category: 'Komunikace',
    practicalTip: 'Oddělte záměr od chování. Ocenění pozitivního záměru okamžitě rozpouští komunikační odpor.'
  },
  {
    title: 'Neexistuje selhání, existuje pouze zpětná vazba',
    description: 'Každý výsledek je jen informace o tom, jak fungovala zvolená strategie. Pokud to nefunguje, udělejte něco jiného.',
    category: 'Růst',
    practicalTip: 'Nahraďte větu „Selhal jsem“ otázkou: „Jaké konkrétní ponaučení a úpravu přístupu mi tento výsledek dává?“'
  },
  {
    title: 'Lidé mají k dispozici všechny zdroje, které potřebují',
    description: 'Všechny stavy mysli, odvahu, klid i tvořivost už v sobě máme uložené ze své minulosti. Stačí se k nim naučit vědomě dostat pomocí kotvení.',
    category: 'Zdroje',
    practicalTip: 'Vzpomeňte si na okamžik, kdy jste se cítili naprosto suverénně, a přeneste tuto tělesnou fyziologii do přítomnosti.'
  },
  {
    title: 'Význam komunikace je v reakci, kterou vyvolá',
    description: 'Nezáleží na tom, co jste chtěli říct, ale na tom, co druhý skutečně slyšel a jak zareagoval. Plnou odpovědnost za přenos nese mluvčí.',
    category: 'Komunikace',
    practicalTip: 'Pokud vás partner nechápe, nezvyšujte hlas a neopakujte totéž – změňte svůj styl, intonaci a slova.'
  },
  {
    title: 'Člověk s nejvyšší flexibilitou řídí systém',
    description: 'Zákon requisite variety: v jakémkoliv komunikačním systému má největší vliv ten, kdo má k dispozici nejvíce možností reakce.',
    category: 'Vliv',
    practicalTip: 'Nebuďte rigidní v jednom stylu rozhovoru. Trénujte schopnost přejít z logické argumentace do empatického naslouchání.'
  },
  {
    title: 'Mysl a tělo jsou propojený systém',
    description: 'Změna tělesné fyziologie (držení těla, dech, pohled očí) okamžitě změní chemické nastavení mozku a prožívání emocí.',
    category: 'Fyziologie',
    practicalTip: 'Při pocitu úzkosti narovnejte páteř, zvedněte bradu a 3x se zhluboka nadechněte do břicha.'
  },
  {
    title: 'Lidé dělají vždy tu nejlepší volbu, jaké jsou v danou chvíli schopni',
    description: 'Vzhledem ke svým možnostem, přesvědčením a stavu zdrojů jedná každý nejlépe, jak umí. Pro lepší volby potřebují přístup k novým zdrojům.',
    category: 'Empatie',
    practicalTip: 'Přestaňte lidi soudit za minulá rozhodnutí. Pomozte jim rozšířit repertoár jejich možností.'
  }
];

export const DAILY_EXERCISES: DailyExercise[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    title: 'Vyladění smyslové ostrosti (Sensory Acuity)',
    category: 'VAKOG',
    durationMinutes: 5,
    teaser: 'Všimněte si dominantních smyslových predikátů u lidí kolem sebe.',
    instructions: [
      'Při dnešních rozhovorech nesoustřeďte pozornost pouze na obsah, ale na konkrétní slova.',
      'Sledujte, zda dotyčný říká „vidím to jasně“ (V), „to mi zní dobře“ (A) nebo „mám z toho těžký pocit“ (K).',
      'Zkuste odpovědět s použitím stejného smyslového kanálu a sledujte, jak se promění jeho výraz tváře.'
    ],
    microChallenge: 'Zaznamenejte dnes u 3 různých lidí jejich primární smyslový systém.',
    reflectionPrompt: 'Jak se změnila atmosféra rozhovoru, když jste použili stejný smyslový kód?'
  },
  {
    id: 'day-2',
    dayNumber: 2,
    title: 'Aktivace Kruhu dokonalosti před výzvou',
    category: 'Kotvení',
    durationMinutes: 7,
    teaser: 'Vytvořte si mentální prostor pro 100% klid a sebedůvěru.',
    instructions: [
      'Představte si na zemi před sebou zářící kruh vaší oblíbené barvy plný klidu, jistoty a soustředění.',
      'Vzpomeňte si na moment ze svého života, kdy jste se cítili nepřekonatelní a v naprostém flow.',
      'Vstupte do kruhu, nadechněte se a spojte ukazováček s palcem pravé ruky (vytvoření kotvy).',
      'Vystupte ven, protřepejte ruce a poté stiskněte kotvu znovu. Cítíte návrat stavu?'
    ],
    microChallenge: 'Použijte tuto kotvu těsně před důležitým telefonátem nebo schůzkou.',
    reflectionPrompt: 'Jak rychle se vaše tělo zklidnilo po aktivaci prstové kotvy?'
  },
  {
    id: 'day-3',
    dayNumber: 3,
    title: 'Odhalování generalizací Meta-modelu',
    category: 'Meta-Model',
    durationMinutes: 6,
    teaser: 'Zachyťte vnitřní slova „všichni“, „nikdy“, „musím“ a rozbijte je.',
    instructions: [
      'Kdykoliv se dnes přistihnete u myšlenky obsahující „musím to udělat“, nahraďte ji větou „rozhodl jsem se to udělat, protože...“.',
      'Pokud v hlavě uslyšíte „nikdo mě neposlouchá“ nebo „nikdy nic nestíhám“, zeptejte se: „Opravdu nikdy? Existovala někdy výjimka?“',
      'Sledujte, jak absolutní slova vytvářejí falešný tlak a jak otázka vrátí kontrolu do vašich rukou.'
    ],
    microChallenge: 'Přepište dnes alespoň 2 povinnosti z „musím“ na „chci / volím si“.',
    reflectionPrompt: 'Které zdánlivě nepřekonatelné omezení se po Meta-model otázce ukázalo jako pouhá domněnka?'
  },
  {
    id: 'day-4',
    dayNumber: 4,
    title: 'Kontextové přeformátování nepříjemnosti',
    category: 'Reframing',
    durationMinutes: 5,
    teaser: 'Změňte rámec situace: Kde a kdy je tato věc vaší největší výhodou?',
    instructions: [
      'Vyberte si vlastnost na sobě nebo situaci, která vás obvykle štve (např. „Jsem příliš pomalý / váhavý“).',
      'Položte si otázku: „V jakém kontextu je tato vlastnost obrovskou konkurenční výhodou a ctností?“',
      'Například: V situaci, kdy se podepisuje složitá smlouva nebo řeší bezpečnost, je pomalost a opatrnost záchranou před katastrofou.'
    ],
    microChallenge: 'Přeformátujte jednu svoji „slabinu“ na užitečný nástroj v určitém kontextu.',
    reflectionPrompt: 'Jak se změnil váš pocit vůči této vlastnosti?'
  },
  {
    id: 'day-5',
    dayNumber: 5,
    title: 'Zrcadlení dechu a tempa řeči (Pacing)',
    category: 'Rapport',
    durationMinutes: 6,
    teaser: 'Nalaďte se na fyziologii komunikačního partnera bez nápadnosti.',
    instructions: [
      'Při osobním rozhovoru si nenápadně všimněte rytmu dechu druhé osoby (pohyb ramen nebo hrudníku).',
      'Přizpůsobte tempo a rytmus své řeči jeho dechu a rychlosti mluvy.',
      'Až ucítíte hluboké spojení, zkuste jemně zpomalit svůj dech i řeč – a sledujte, zda vás partner automaticky následuje (Leading).'
    ],
    microChallenge: 'Úspěšně proveďte Pacing & Leading v délce alespoň 2 minut.',
    reflectionPrompt: 'V jakém momentu začal partner přejímat váš klidnější tón a tempo?'
  },
  {
    id: 'day-6',
    dayNumber: 6,
    title: 'Třífázové pozice vnímání při neshodě',
    category: 'Reframing',
    durationMinutes: 8,
    teaser: 'Vyřešte tření s kolegou či partnerem vystoupením do role Pozorovatele.',
    instructions: [
      '1. Pozice (Já): Uvědomte si své potřeby, emoce a argumenty.',
      '2. Pozice (Druhý): Doslova se v duchu přesuňte do těla druhého. Jak vidí vás? Co potřebuje? Co ho trápí?',
      '3. Pozice (Nezávislý režisér / kamera): Podívejte se na oba dva ze stropu. Jaký vzorec v jejich dynamice vidíte? Jakou radu byste jim dal?'
    ],
    microChallenge: 'Zapište si klíčový vhled ze 3. pozice pro aktuální vztahovou situaci.',
    reflectionPrompt: 'Co jste z pozice nezaujatého pozorovatele uviděli, co vám v 1. pozici zcela unikalo?'
  },
  {
    id: 'day-7',
    dayNumber: 7,
    title: 'Audit submodalit vnitřního hlasu',
    category: 'Submodality',
    durationMinutes: 5,
    teaser: 'Změňte hlasitost a tón svého vnitřního kritika na kreslenou postavičku.',
    instructions: [
      'Vzpomeňte si na větu, kterou vám vnitřní kritik často opakuje.',
      'Všimněte si jeho submodalit: Odkud hlas přichází? Je hlasitý nebo tichý? Rychlý nebo pomalý?',
      'Nyní mentálně změňte hlas: Nechte tuto větu říct hlasem Kačera Donalda nebo Mickey Mouse, zpomalte tempo na polovinu a přidejte veselou hudbu.',
      'Všimněte si, jak původní tíha a úzkost okamžitě ztratily svoji moc.'
    ],
    microChallenge: 'Otestujte změnu hlasu vnitřního kritika kdykoliv se dnes ozve.',
    reflectionPrompt: 'Jak se proměnil emoční náboj kritického výroku?'
  }
];

export const PRESET_SCENARIOS: Scenario[] = [
  {
    id: 'scenario-client-price',
    title: 'Vyjednávání s náročným klientem',
    subtitle: 'Zvládání cenové námitky přes Pacing & Leading a Meta-model',
    partnerName: 'Ing. Tomáš Horák',
    partnerRole: 'Finanční ředitel korporátního klienta',
    context: 'Prezentujete své prémiové služby. Klient je skeptický, zaměřený na čísla a tlačí na slevu.',
    learningGoal: 'Nereagovat obhajobou ani okamžitou slevou. Nejdříve potvrdit klientův pohled (Pacing), ověřit hodnotu a položit Meta-model otázku.',
    initialMessage: 'Podívejte se, váš návrh sice vypadá hezky, ale vaše cena je o 40 % vyšší než u konkurence. V této podobě je to pro nás absolutně nepřijatelné a museli bychom jednání ukončit.',
    suggestedApproaches: [
      'Pacing: „Rozumím, že efektivita nákladů a srovnání s trhem je pro vaši společnost naprosto klíčové kritérium.“',
      'Meta-model ověření: „Ve srovnání s jakou konkrétní nabídkou cenu porovnáváte a jaké výstupy v ní máte garantované?“',
      'Reframing: „Je pro vás v tuto chvíli prioritou nejnižší vstupní pořizovací náklad, nebo celková návratnost a garance bezchybného chodu za 3 roky?“'
    ]
  },
  {
    id: 'scenario-colleague-conflict',
    title: 'Frustrovaný kolega v odporu',
    subtitle: 'Rozbití generalizace a navázání hlubokého vztahu (Rapport)',
    partnerName: 'Monika Kovářová',
    partnerRole: 'Vedoucí projektového týmu',
    context: 'Týmová porada po zpožděném projektu. Kolegyně je podrážděná a vyhořelá.',
    learningGoal: 'Použít zrcadlení, uznat její pozitivní záměr (touhu po kvalitě) a jemně rozebrat paušální tvrzení.',
    initialMessage: 'Nemá to cenu. Nikdo v tomhle týmu mě neposlouchá a veškerá práce nakonec stejně vždycky spadne na moji hlavu. Mám chuť z projektu odejít.',
    suggestedApproaches: [
      'Uznání a Pacing: „Moniko, vidím, jak moc ti na úspěchu projektu záleží a jak náročné to pro tebe poslední týdny bylo.“',
      'Rozbití „nikdo / vždycky“: „Zmínila jsi, že tě nikdo neposlouchá. Mohla bys mi říct, u které konkrétní věci ses cítila nevyslyšená?“',
      'Pozitivní záměr: „Vím, že tvůj cíl je dodat špičkovou kvalitu. Jak ti mohu dnes konkrétně ulehčit?“'
    ]
  },
  {
    id: 'scenario-coaching-goals',
    title: 'Koučovací rozhovor: Zaseknutý cíl',
    subtitle: 'Převedení omezujícího přesvědčení do Well-Formed Outcome',
    partnerName: 'Petr Novotný',
    partnerRole: 'Klient v osobním rozvoji',
    context: 'Petr už 2 roky sní o rozjezdu vlastního projektu, ale neustále ho odkládá z obavy ze selhání.',
    learningGoal: 'Převést abstraktní strach na konkrétní smyslové důkazy a definovat první malý krok v jeho osobní kontrole.',
    initialMessage: 'Já bych hrozně rád začal podnikat, ale prostě na to nemám dostatek zkušeností a vím, že by to dopadlo katastrofou. Musím ještě pár let počkat.',
    suggestedApproaches: [
      'Čtení budoucnosti: „Jak přesně víte, že by to dopadlo katastrofou? Co konkrétního by se podle vás stalo?“',
      'Modální operátor: „Co konkrétně vám brání udělat první testovací krok už tento týden?“',
      'Smyslový důkaz: „Až budete mít dostatek zkušeností, jak to poznáte? Co přesně uvidíte, uslyšíte nebo ucítíte?“'
    ]
  },
  {
    id: 'scenario-public-speaking',
    title: 'Tréma před veřejným projevem',
    subtitle: 'Práce se submodalitami a fyziologií před publikem',
    partnerName: 'Lucie Dvořáková',
    partnerRole: 'Manažerka před celofiremní konferencí',
    context: 'Za 20 minut má vystoupit před 300 lidmi. Ruce se jí třesou, dech je zrychlený.',
    learningGoal: 'Rychlé tělesné ukotvení, změna dechu a přerušení katastrofického vnitřního filmu (Submodality shift).',
    initialMessage: 'Mám úplně stažený krk a v hlavě mi běží film, jak stojím na pódiu, zapomenu text a všichni v sále se na mě vyčítavě dívají. To nepřežiju.',
    suggestedApproaches: [
      'Přerušení stavu: „Lucie, podívej se na mě a teď se 3x zhluboka nadechni do břicha. Narovnej ramena.“',
      'Změna submodalit: „Ten film v hlavě – posuň ho 10 metrů od sebe, zmenši ho na velikost poštovní známky a stáhni z něj všechny barvy do černobílé.“',
      'Aktivace kotvy: „A teď si promítni ten moment, kdy jsi minule sklidila potlesk. Co tam slyšíš?“'
    ]
  }
];

export const VAKOG_TRAINING_QUESTIONS: VakogQuestion[] = [
  {
    id: 'vakog-1',
    statement: '„Mám pocit, že se v tom projektu hrozně plácáme a tíží mě ta odpovědnost na ramenou.“',
    options: [
      { system: 'V', label: 'Vizuální', explanation: 'Chybí zrakové metafory jako obrázek, barva, jas.' },
      { system: 'A', label: 'Auditivní', explanation: 'Nejsou zde zmínky o tónech, hluku či zvucích.' },
      { system: 'K', label: 'Kinestetický (Správně)', explanation: 'Slova „pocit“, „plácáme se“, „tíží mě“, „na ramenou“ jsou čistě tělesné a kinestetické predikáty.' },
      { system: 'Ad', label: 'Auditivně-digitální', explanation: 'Nejde o abstraktní logiku, ale o přímé tělesné prožívání.' }
    ],
    correctSystem: 'K',
    idealPacingResponse: '„Chápu, že cítíš ten tlak a je to pro tebe teď těžké břemeno. Pojďme to uchopit krok za krokem a ulevit ti.“'
  },
  {
    id: 'vakog-2',
    statement: '„Celé mi to nějak nehraje. Jeho tón hlasu zněl falešně a ten návrh prostě nerezonuje s tím, co jsme probírali.“',
    options: [
      { system: 'V', label: 'Vizuální', explanation: 'Nezaměřuje se na vizuální vzhled.' },
      { system: 'A', label: 'Auditivní (Správně)', explanation: 'Výrazy „nehraje“, „tón hlasu“, „zněl“, „nerezonuje“ jsou typické auditivní predikáty.' },
      { system: 'K', label: 'Kinestetický', explanation: 'Chybí hmatové a pocitové výrazy.' },
      { system: 'Ad', label: 'Auditivně-digitální', explanation: 'Jde o vnímání akustických kvalit, nikoliv čisté datové analýzy.' }
    ],
    correctSystem: 'A',
    idealPacingResponse: '„Slyším tě naprosto přesně. Co konkrétního v jeho slovech ti skřípalo a jak by to mělo znít, abychom se sladili?“'
  },
  {
    id: 'vakog-3',
    statement: '„Potřebuji v tom mít konečně jasno. Chci vidět konkrétní perspektivu a obrázek toho, jak bude výsledek vypadat za rok.“',
    options: [
      { system: 'V', label: 'Vizuální (Správně)', explanation: 'Predikáty: „jasno“, „vidět“, „perspektivu“, „obrázek“, „vypadat“.' },
      { system: 'A', label: 'Auditivní', explanation: 'Neřeší zvukovou stránku.' },
      { system: 'K', label: 'Kinestetický', explanation: 'Nejde o tělesný dotek nebo pocit.' },
      { system: 'Ad', label: 'Auditivně-digitální', explanation: 'Zaměřuje se na vizuální mapu a představy.' }
    ],
    correctSystem: 'V',
    idealPacingResponse: '„Rád ti ukážu ucelený pohled. Pojďme si to rozkreslit, ať máš před očima jasnou vizi každé fáze.“'
  },
  {
    id: 'vakog-4',
    statement: '„Musíme si zanalyzovat tato data a pochopit systémovou logiku celého procesu, jinak to nedává smysl.“',
    options: [
      { system: 'V', label: 'Vizuální', explanation: 'Chybí optické popisy.' },
      { system: 'A', label: 'Auditivní', explanation: 'Nejsou tu zvukové metafory.' },
      { system: 'K', label: 'Kinestetický', explanation: 'Nejde o emoce a dotek.' },
      { system: 'Ad', label: 'Auditivně-digitální (Správně)', explanation: '„Zanalyzovat data“, „pochopit logiku“, „proces“, „smysl“ – čistý abstraktní vnitřní dialog a racionální systém.' }
    ],
    correctSystem: 'Ad',
    idealPacingResponse: '„Naprosto souhlasím, dává smysl projít si ta kritéria a ověřit, zda je struktura a postup v souladu s našimi principy.“'
  }
];

export const EYE_ACCESSING_CUES = [
  {
    direction: 'Nahoru a doprava (z pohledu pozorovatele)',
    system: 'Vizuálně zkonstruované (Vc)',
    meaning: 'Vytváření nových vizuálních obrazů, fantazie, představivost, návrh nového řešení.',
    sampleQuestion: '„Jak by vypadalo vaše vysněné bydlení?“'
  },
  {
    direction: 'Nahoru a doleva (z pohledu pozorovatele)',
    system: 'Vizuálně vzpomenuté (Vr)',
    meaning: 'Vybavování si reálných obrazů z paměti (barva dveří domu z dětství, tvář kamaráda).',
    sampleQuestion: '„Jakou barvu má auto tvého bratra?“'
  },
  {
    direction: 'Vodorovně doprava',
    system: 'Auditivně zkonstruované (Ac)',
    meaning: 'Představa nového zvuku, komponování melodie, představa, jak by zněl hlas cizí osoby.',
    sampleQuestion: '„Jak by zněl štěkot psa pod vodou?“'
  },
  {
    direction: 'Vodorovně doleva',
    system: 'Auditivně vzpomenuté (Ar)',
    meaning: 'Vybavování si reálného zvuku, hlasu rodiče, oblíbené písničky z rádia.',
    sampleQuestion: '„Vzpomeneš si na melodii budíku tvého telefonu?“'
  },
  {
    direction: 'Dolů a doprava',
    system: 'Kinestetické pocity (K)',
    meaning: 'Prožívání tělesných pocitů, emocí, tepla, tlaku, bolesti nebo uvolnění.',
    sampleQuestion: '„Jaké to je, když se ponoříš do horké vany po celém dni?“'
  },
  {
    direction: 'Dolů a doleva',
    system: 'Vnitřní dialog (Ad - Auditory Digital)',
    meaning: 'Rozhovor sám se sebou, vnitřní debata, logické hodnocení a sebereflexe.',
    sampleQuestion: '„Co si v duchu říkáš, když se ti něco povede?“'
  }
];
