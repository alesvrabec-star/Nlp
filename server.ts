import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI if key is present
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Rule-based NLP heuristics for high-speed fallback & local evaluation
function localAnalyzeNLP(text: string) {
  const lower = text.toLowerCase();
  
  // VAKOG detection
  const visualKeywords = ['vidět', 'vidím', 'jasný', 'pohled', 'obrázek', 'barv', 'temn', 'světl', 'mlh', 'představ', 'ukázat', 'kouk'];
  const auditoryKeywords = ['slyš', 'hlas', 'tón', 'zvuk', 'znít', 'rezon', 'ticho', 'hladina', 'povíd', 'řík', 'ladit'];
  const kinestheticKeywords = ['cítit', 'pocit', 'těžk', 'lehk', 'tlak', 'dotek', 'uchop', 'hork', 'chlad', 'stisk', 'napětí', 'uvoln'];
  const auditoryDigitalKeywords = ['myslet', 'chápat', 'analyz', 'logik', 'smysl', 'princip', 'uvědom', 'struktur', 'proces', 'rozumět'];

  const foundVisual = visualKeywords.filter(k => lower.includes(k));
  const foundAuditory = auditoryKeywords.filter(k => lower.includes(k));
  const foundKinesthetic = kinestheticKeywords.filter(k => lower.includes(k));
  const foundAd = auditoryDigitalKeywords.filter(k => lower.includes(k));

  const total = foundVisual.length + foundAuditory.length + foundKinesthetic.length + foundAd.length || 1;

  let dominant = 'Kinestetický';
  const counts = [
    { type: 'Vizuální (V)', count: foundVisual.length },
    { type: 'Auditivní (A)', count: foundAuditory.length },
    { type: 'Kinestetický (K)', count: foundKinesthetic.length },
    { type: 'Auditivně-digitální (Ad)', count: foundAd.length },
  ].sort((a, b) => b.count - a.count);

  if (counts[0].count > 0) {
    dominant = counts[0].type;
  }

  // Meta-model detection
  const metaViolations: Array<{ pattern: string; detail: string; question: string }> = [];
  if (/\b(všichni|každý|nikdo|nikdy|vždycky|pořád)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Univerzální kvantifikátor (Generalizace)',
      detail: 'Slova jako "nikdo", "vždycky" zveličují situaci do absolutna.',
      question: 'Opravdu nikdy? Existovala někdy výjimka, kdy tomu tak nebylo?'
    });
  }
  if (/\b(musím|musí|nesmím|nemohu|nejde to)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Modální operátor nutnosti / nemožnosti',
      detail: 'Vyjadřuje pocit nesvobody nebo vnímané vnější překážky.',
      question: 'Co přesně by se stalo, kdybyste to neudělali? Co vám v tom brání?'
    });
  }
  if (/\b(on si myslí|vím co chce|ignoruje mě|nemá mě rád)\b/i.test(lower)) {
    metaViolations.push({
      pattern: 'Čtení myšlenek (Zkreslení)',
      detail: 'Předpokládáme vnitřní stav druhé osoby bez ověření smyslových faktů.',
      question: 'Jak konkrétně víte, co si myslí? Co přesně řekl nebo udělal?'
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
    nlpScore: Math.min(95, 60 + (foundVisual.length + foundKinesthetic.length) * 8 - metaViolations.length * 10),
    reframingAdvice: 'Zaměřte se na přizpůsobení smyslového slovníku a ověření předpokladů pomocí precizních otázek Meta-modelu.',
  };
}

// 1. NLP Analysis Endpoint
app.post('/api/nlp/analyze', async (req, res) => {
  try {
    const { text, context } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text k analýze je povinný.' });
    }

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
      "pattern": "název vzorce (např. Univerzální kvantifikátor, Čtení myšlenek, Modální operátor)",
      "detail": "proč je to omezení",
      "question": "precizní Meta-model otázka rozbíjející vzorec"
    }
  ],
  "nlpScore": číslo 0-100 vyjadřující konstruktivnost a kongruenci projevu,
  "reframingAdvice": "konkrétní doporučení pro NLP rozvoj a přeformulování"
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
    console.warn('Gemini NLP analyze error, using fallback:', err?.message || err);
    const fallback = localAnalyzeNLP(req.body.text || '');
    return res.json({ result: fallback, source: 'fallback' });
  }
});

// 2. Reframing Engine Endpoint
app.post('/api/nlp/reframe', async (req, res) => {
  try {
    const { belief } = req.body;
    if (!belief || typeof belief !== 'string') {
      return res.status(400).json({ error: 'Přesvědčení k přeformátování je povinné.' });
    }

    if (!ai) {
      return res.json({
        belief,
        reframes: [
          {
            type: 'Kontextové přeformátování',
            explanation: 'V jakém jiném kontextu je toto chování nebo vlastnost cennou výhodou?',
            reframe: `Když toto přesvědčení vnímáte v náročném projektu, nutí vás to k opatrnosti a precizní přípravě.`
          },
          {
            type: 'Významové přeformátování',
            explanation: 'Co jiného tato situace znamená z vyšší perspektivy růstu?',
            reframe: `Není to selhání ani limit, ale přesná zpětná vazba ukazující, které dovednosti stojí za to posílit.`
          },
          {
            type: 'Pozitivní záměr (Positive Intention)',
            explanation: 'Co se toto vnitřní nastavení snaží chránit nebo zajistit?',
            reframe: `Podvědomí se vás snaží chránit před zbytečným rizikem a zajišťuje bezpečí vašich hodnot.`
          },
          {
            type: 'Časový nadhled & Zdroje',
            explanation: 'Jak se na tuto situaci budete dívat za 3 roky?',
            reframe: `S odstupem času to uvidíte jako klíčový bod obratu, kde jste získali novou vnitřní odolnost.`
          }
        ],
        source: 'templates'
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
    console.warn('Gemini reframe error:', err?.message || err);
    return res.json({
      belief: req.body.belief,
      reframes: [
        {
          type: 'Kontextové přeformátování',
          explanation: 'Hledání prostředí, kde je tato reakce užitečná.',
          reframe: `V situacích vyžadujících maximální obezřetnost vám tento přístup šetří energii.`
        },
        {
          type: 'Významové přeformátování',
          explanation: 'Změna významu pro aktivaci zdrojů.',
          reframe: `Tato situace není překážka, ale tréninkový trenažér vaší mentální flexibility.`
        }
      ],
      source: 'fallback'
    });
  }
});

// 3. Scenario Partner & Roleplay Turn
app.post('/api/nlp/scenario-turn', async (req, res) => {
  try {
    const { scenarioId, scenarioTitle, partnerRole, history, userReply } = req.body;

    if (!userReply) {
      return res.status(400).json({ error: 'Odpověď uživatele je povinná.' });
    }

    if (!ai) {
      return res.json({
        partnerResponse: 'Rozumím tvému postoji. Zní to rozumně, ale stále mám pocit, že bychom měli pečlivě promyslet další krok a sladit priority.',
        nlpFeedback: {
          rapportScore: 82,
          pacingObserved: 'Uznání pohledu partnera před návrhem vlastního řešení.',
          dominantSystemDetected: 'Kinestetický',
          tips: 'Zkuste zrcadlit klíčové slovo partnera a zakončit otevřenou ověřovací otázkou.'
        },
        source: 'fallback'
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

Tvým úkolem je:
1. Zareagovat autenticky v postavě (reaguj realisticky na to, jak moc uživatel navázal vztah (Rapport), zda použil pacing & leading, zda respektoval tvůj model světa).
2. Jako NLP trenér objektivně vyhodnotit uživatelovu repliku podle NLP principů.

Vrať JSON:
{
  "partnerResponse": "autentická replika partnera v postavě v češtině (2-3 věty)",
  "nlpFeedback": {
    "rapportScore": číslo 0-100,
    "pacingObserved": "jak uživatel naladil partnera nebo jestli šel rovnou do odporu",
    "dominantSystemDetected": "V / A / K / Ad",
    "metaQuestionsUsed": "zda užil vhodné zjišťovací otázky nebo generalizoval",
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
    console.warn('Gemini scenario turn error:', err?.message || err);
    return res.json({
      partnerResponse: 'Chápu tvůj argument. Když se na to podívám z tvého úhlu, dává to určitý smysl.',
      nlpFeedback: {
        rapportScore: 78,
        pacingObserved: 'Slušné přizpůsobení tónu.',
        dominantSystemDetected: 'Kinestetický',
        tips: 'Využijte smyslově specifický jazyk partnera.'
      },
      source: 'fallback'
    });
  }
});

// Configure Vite or Static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`NLP Master server listening on port ${port}`);
  });
}

startServer();
