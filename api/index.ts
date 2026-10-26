import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

// Initialize GoogleGenAI if key is present
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Local heuristics fallback
function localAnalyzeNLP(text: string) {
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

  return {
    dominantSystem: dominant,
    vakogBreakdown: {
      visualPercent: Math.round((foundVisual.length / total) * 100),
      auditoryPercent: Math.round((foundAuditory.length / total) * 100),
      kinestheticPercent: Math.round((foundKinesthetic.length / total) * 100),
      digitalPercent: Math.round((foundAd.length / total) * 100),
    },
    metaViolations,
    nlpScore: Math.min(95, 65 + (foundVisual.length + foundKinesthetic.length) * 8 - metaViolations.length * 10),
    reframingAdvice: 'Zaměřte se na přizpůsobení smyslového slovníku a ověření předpokladů pomocí precizních otázek Meta-modelu.',
  };
}

// Handler functions supporting both /api/... and direct rewrites
const handleAnalyze = async (req: Request, res: Response) => {
  try {
    const { text, context } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text k analýze je povinný.' });
    }

    const ai = getAIClient();
    if (!ai) {
      const fallback = localAnalyzeNLP(text);
      return res.json({ result: fallback, source: 'heuristics' });
    }

    const prompt = `Jsi mistr a certifikovaný trenér Neurolingvistického programování (NLP).
Analyzuj následující text v češtině a proveď hloubkový NLP rozbor:
Text: "${text}"
${context ? `Kontext situace: ${context}` : ''}

Vrať výsledek jako validní JSON ve formátu:
{
  "dominantSystem": "Vizuální (V) | Auditivní (A) | Kinestetický (K) | Auditivně-digitální (Ad)",
  "vakogBreakdown": {
    "visualPercent": číslo (0-100),
    "auditoryPercent": číslo (0-100),
    "kinestheticPercent": číslo (0-100),
    "digitalPercent": číslo (0-100)
  },
  "detectedPredicates": ["seznam identifikovaných smyslových slov v textu"],
  "metaViolations": [
    {
      "pattern": "název vzorce",
      "detail": "proč je to omezení",
      "question": "precizní Meta-model otázka"
    }
  ],
  "nlpScore": číslo 0-100,
  "reframingAdvice": "konkrétní doporučení pro NLP rozvoj"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ result: parsed, source: 'gemini' });
  } catch (err: any) {
    const fallback = localAnalyzeNLP(req.body?.text || '');
    return res.json({ result: fallback, source: 'fallback' });
  }
};

const handleReframe = async (req: Request, res: Response) => {
  try {
    const { belief } = req.body;
    if (!belief || typeof belief !== 'string') {
      return res.status(400).json({ error: 'Přesvědčení k přeformátování je povinné.' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        belief,
        reframes: [
          {
            type: 'Kontextové přeformátování',
            explanation: 'V jakém jiném kontextu je toto chování výhodou?',
            reframe: 'V situacích vyžadujících maximální opatrnost vás tento přístup chrání.',
          },
          {
            type: 'Významové přeformátování',
            explanation: 'Co jiného tato situace znamená z pohledu růstu?',
            reframe: 'Není to selhání, ale informace ukazující, které schopnosti si zaslouží posílit.',
          },
          {
            type: 'Pozitivní záměr',
            explanation: 'Co se toto vnitřní nastavení snaží chránit?',
            reframe: 'Podvědomí chrání vaše bezpečí a vysoký standard.',
          },
          {
            type: 'Časový nadhled',
            explanation: 'Pohled s odstupem několika let.',
            reframe: 'V budoucnu to uvidíte jako klíčový moment osobního růstu.',
          },
        ],
        source: 'templates',
      });
    }

    const prompt = `Jako přední NLP kouč vytvoř 4 mocná přeformátování (Reframing) pro omezující myšlenku nebo výrok:
Výrok: "${belief}"

Vytvoř odpověď jako JSON:
{
  "belief": "${belief}",
  "reframes": [
    {
      "type": "Kontextové přeformátování",
      "explanation": "Kde a kdy je tato vlastnost předností",
      "reframe": "Samotné přeformulované tvrzení"
    },
    {
      "type": "Významové přeformátování",
      "explanation": "Nový pozitivní výklad téže reality",
      "reframe": "Samotné přeformulované tvrzení"
    },
    {
      "type": "Pozitivní záměr",
      "explanation": "Co dobrého tím podvědomí sleduje",
      "reframe": "Samotné přeformulované tvrzení"
    },
    {
      "type": "Časová osa a zdroje",
      "explanation": "Pohled z budoucího zralého já",
      "reframe": "Samotné přeformulované tvrzení"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, source: 'gemini' });
  } catch (err: any) {
    return res.json({
      belief: req.body?.belief,
      reframes: [
        {
          type: 'Kontextové přeformátování',
          explanation: 'Hledání prostředí, kde je tato reakce užitečná.',
          reframe: 'V situacích vyžadujících maximální obezřetnost vám tento přístup šetří energii.',
        },
      ],
      source: 'fallback',
    });
  }
};

const handleScenarioTurn = async (req: Request, res: Response) => {
  try {
    const { scenarioTitle, partnerRole, history, userReply } = req.body;
    if (!userReply) {
      return res.status(400).json({ error: 'Odpověď uživatele je povinná.' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        partnerResponse: 'Rozumím tvému postoji. Zní to rozumně, ale stále mám pocit, že bychom měli pečlivě promyslet další krok a sladit priority.',
        nlpFeedback: {
          rapportScore: 82,
          pacingObserved: 'Uznání pohledu partnera před návrhem vlastního řešení.',
          dominantSystemDetected: 'Kinestetický',
          tips: 'Zkuste zrcadlit klíčové slovo partnera a zakončit otevřenou ověřovací otázkou.',
        },
        source: 'fallback',
      });
    }

    const conversationContext = (history || [])
      .map((h: { role: string; text: string }) => `${h.role === 'user' ? 'Uživatel' : partnerRole || 'Partner'}: ${h.text}`)
      .join('\n');

    const prompt = `Jsi interaktivní simulátor NLP konverzačních scénářů.
Scénář: "${scenarioTitle || 'Vyjednávání a komunikace'}"
Tvá role ve scénáři: "${partnerRole || 'Skeptický kolega'}"

Dosavadní historie dialogu:
${conversationContext || 'Zatím žádná historie.'}

Nová replika od uživatele:
"${userReply}"

Vrať JSON:
{
  "partnerResponse": "autentická replika partnera v postavě v češtině (2-3 věty)",
  "nlpFeedback": {
    "rapportScore": číslo 0-100,
    "pacingObserved": "jak uživatel naladil partnera",
    "dominantSystemDetected": "V / A / K / Ad",
    "tips": "1 konkrétní rada, co by mohl v příští větě zlepšit z hlediska NLP technik"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, source: 'gemini' });
  } catch (err: any) {
    return res.json({
      partnerResponse: 'Chápu tvůj argument. Když se na to podívám z tvého úhlu, dává to určitý smysl.',
      nlpFeedback: {
        rapportScore: 78,
        pacingObserved: 'Slušné přizpůsobení tónu.',
        dominantSystemDetected: 'Kinestetický',
        tips: 'Využijte smyslově specifický jazyk partnera.',
      },
      source: 'fallback',
    });
  }
};

// Mount route variants for universal Vercel rewrite compatibility
app.post('/api/nlp/analyze', handleAnalyze);
app.post('/nlp/analyze', handleAnalyze);

app.post('/api/nlp/reframe', handleReframe);
app.post('/nlp/reframe', handleReframe);

app.post('/api/nlp/scenario-turn', handleScenarioTurn);
app.post('/nlp/scenario-turn', handleScenarioTurn);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'nlp-master-api' }));
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'nlp-master-api' }));

export default app;
