/**
 * Local rule-based NLP evaluation engine.
 * Provides instant responses and serves as a reliable fallback on Vercel
 * if serverless functions or Gemini API are slow or unconfigured.
 */

export function localAnalyzeNLP(text: string) {
  const lower = text.toLowerCase();

  const visualKeywords = ['vidět', 'vidím', 'jasný', 'pohled', 'obrázek', 'barv', 'temn', 'světl', 'mlh', 'představ', 'ukázat', 'kouk'];
  const auditoryKeywords = ['slyš', 'hlas', 'tón', 'zvuk', 'znít', 'rezon', 'ticho', 'hladina', 'povíd', 'řík', 'ladit'];
  const kinestheticKeywords = ['cítit', 'pocit', 'těžk', 'lehk', 'tlak', 'dotek', 'uchop', 'hork', 'chlad', 'stisk', 'napětí', 'uvoln'];
  const auditoryDigitalKeywords = ['myslet', 'chápat', 'analyz', 'logik', 'smysl', 'princip', 'uvědom', 'struktur', 'proces', 'rozumět'];

  const foundVisual = visualKeywords.filter((k) => lower.includes(k));
  const foundAuditory = auditoryKeywords.filter((k) => lower.includes(k));
  const foundKinesthetic = kinestheticKeywords.filter((k) => lower.includes(k));
  const foundAd = auditoryDigitalKeywords.filter((k) => lower.includes(k));

  const total = foundVisual.length + foundAuditory.length + foundKinesthetic.length + foundAd.length || 1;

  let dominant = 'Kinestetický (K)';
  const counts = [
    { type: 'Vizuální (V)', count: foundVisual.length },
    { type: 'Auditivní (A)', count: foundAuditory.length },
    { type: 'Kinestetický (K)', count: foundKinesthetic.length },
    { type: 'Auditivně-digitální (Ad)', count: foundAd.length },
  ].sort((a, b) => b.count - a.count);

  if (counts[0].count > 0) {
    dominant = counts[0].type;
  }

  const metaViolations: Array<{ pattern: string; detail: string; question: string }> = [];
  if (/\b(všichni|každý|nikdo|nikdy|vždycky|pořád)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Univerzální kvantifikátor (Generalizace)',
      detail: 'Slova jako "nikdo", "vždycky" zveličují situaci do absolutna.',
      question: 'Opravdu nikdy? Existovala někdy výjimka, kdy tomu tak nebylo?',
    });
  }
  if (/\b(musím|musí|nesmím|nemohu|nejde to)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Modální operátor nutnosti / nemožnosti',
      detail: 'Vyjadřuje pocit nesvobody nebo vnímané vnější překážky.',
      question: 'Co přesně by se stalo, kdybyste to neudělali? Co vám v tom brání?',
    });
  }
  if (/\b(on si myslí|vím co chce|ignoruje mě|nemá mě rád)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Čtení myšlenek (Zkreslení)',
      detail: 'Předpokládáme vnitřní stav druhé osoby bez ověření smyslových faktů.',
      question: 'Jak konkrétně víte, co si myslí? Co přesně řekl nebo udělal?',
    });
  }

  const detected = [
    ...foundVisual.map((w) => `V: ${w}`),
    ...foundAuditory.map((w) => `A: ${w}`),
    ...foundKinesthetic.map((w) => `K: ${w}`),
    ...foundAd.map((w) => `Ad: ${w}`),
  ];

  return {
    dominantSystem: dominant,
    vakogBreakdown: {
      visualPercent: Math.round((foundVisual.length / total) * 100),
      auditoryPercent: Math.round((foundAuditory.length / total) * 100),
      kinestheticPercent: Math.round((foundKinesthetic.length / total) * 100),
      digitalPercent: Math.round((foundAd.length / total) * 100),
    },
    detectedPredicates: detected,
    metaViolations,
    nlpScore: Math.min(95, Math.max(45, 65 + (foundVisual.length + foundKinesthetic.length) * 6 - metaViolations.length * 8)),
    reframingAdvice: 'Zaměřte se na přizpůsobení smyslového slovníku a ověření předpokladů pomocí precizních otázek Meta-modelu.',
  };
}

export function localReframeNLP(belief: string) {
  return [
    {
      type: 'Kontextové přeformátování (Context)',
      explanation: 'V jakém jiném kontextu je tato vlastnost nebo obava cennou výhodou?',
      reframe: `V situacích vyžadujících maximální opatrnost a prověření rizik vás tento přístup chrání před ukvapenou chybou.`,
    },
    {
      type: 'Významové přeformátování (Meaning)',
      explanation: 'Co jiného tato situace znamená z vyšší perspektivy růstu?',
      reframe: `Není to vaše neschopnost ani limit, ale cenná informace ukazující, které zdroje si zaslouží posílit.`,
    },
    {
      type: 'Pozitivní záměr (Positive Intention)',
      explanation: 'Co se toto vnitřní nastavení snaží chránit nebo zajistit?',
      reframe: `Podvědomí se snaží chránit vaše bezpečí, klid a vysoký standard, na kterém vám záleží.`,
    },
    {
      type: 'Časový nadhled & Zdroje',
      explanation: 'Jak se na tuto situaci budete dívat s odstupem času?',
      reframe: `S odstupem několika let to uvidíte jako klíčový moment obratu, kde jste získali novou odolnost.`,
    },
  ];
}

export function localScenarioTurnNLP(userReply: string, partnerRole?: string) {
  const analysis = localAnalyzeNLP(userReply);
  const isQuestion = userReply.includes('?');
  const hasEmpathy = /chápu|rozumím|vnímám|vidím|souhlasím/i.test(userReply);

  let partnerResponse = 'Rozumím tvému postoji. Zní to rozumně, ale stále mám pocit, že bychom měli pečlivě promyslet další krok a sladit priority.';
  if (isQuestion && hasEmpathy) {
    partnerResponse = 'To je dobrá otázka. Když se na to podívám z tohoto úhlu, dává to větší smysl než předtím.';
  } else if (!hasEmpathy) {
    partnerResponse = 'Nejsem si jistý, jestli si úplně rozumíme. Můj pohled je v tuto chvíli trochu odlišný.';
  }

  return {
    partnerResponse,
    nlpFeedback: {
      rapportScore: hasEmpathy ? (isQuestion ? 88 : 78) : 62,
      pacingObserved: hasEmpathy ? 'Úspěšně navázáno ladění před představením vlastního názoru.' : 'Chybělo počáteční ocenění pohledu druhé strany.',
      dominantSystemDetected: analysis.dominantSystem,
      tips: isQuestion ? 'Pokračujte v kladení otevřených otázek Meta-modelu.' : 'Zkuste repliku zakončit otevřenou ověřovací otázkou pro udržení kontaktu.',
    },
  };
}
