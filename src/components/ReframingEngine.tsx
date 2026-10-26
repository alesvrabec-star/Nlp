import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Send
} from 'lucide-react';

export const ReframingEngine: React.FC = () => {
  const [belief, setBelief] = useState('Bojím se, že když udělám chybu, ztratím respekt svého týmu.');
  const [reframes, setReframes] = useState<any[]>([
    {
      type: 'Kontextové přeformátování (Context Reframing)',
      explanation: 'V jakém kontextu je tato obava užitečnou výhodou?',
      reframe: 'Tato opatrnost vám v momentech strategických rozhodnutí brání dělat ukvapené kroky a zajišťuje pečlivou kontrolu kvality.'
    },
    {
      type: 'Významové přeformátování (Meaning Reframing)',
      explanation: 'Co jiného tato situace znamená z pohledu lidskosti a autority?',
      reframe: 'Skutečný respekt týmu nevzniká z předstírané neomylnosti, ale ze schopnosti otevřeně přiznat chybu, poučit se z ní a ukázat týmu autenticitu.'
    },
    {
      type: 'Pozitivní záměr (Positive Intention)',
      explanation: 'Co dobrého se toto vnitřní nastavení snaží chránit?',
      reframe: 'Váš strach se snaží chránit vaši potřebu bezpečí, sounáležitosti a vysokých standardů pro vás i váš tým.'
    },
    {
      type: 'Časová osa & Budoucí zralé já',
      explanation: 'Jak se na tuto epizodu budete dívat za 5 let?',
      reframe: 'Za 5 let uvidíte, že právě zvládnuté krize a chyby byly nejrychlejším akcelerátorem vašeho manažerského růstu.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleBeliefs = [
    'Nemám na to dostatek času.',
    'Kolegové mi nerozumí a dělají si vše po svém.',
    'Jsem příliš starý na to, abych se učil nové věci.',
    'Pokud odmítnu požadavek klienta, ztratím zakázku.'
  ];

  const handleGenerateReframes = async (textToReframe?: string) => {
    const target = textToReframe || belief;
    if (!target.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/nlp/reframe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ belief: target.trim() }),
      });
      const data = await res.json();
      if (data.reframes && data.reframes.length > 0) {
        setReframes(data.reframes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
          <span>NLP Přeformátování (Reframing)</span>
          <span aria-hidden="true">·</span>
          <span>Změna vnitřního rámu vnímání</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Interaktivní Reframing Engine
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          „Změňte rámec a změníte význam. Změňte význam a změníte své pocity a chování.“ Zadejte jakékoliv omezující přesvědčení a nechte jej rozebrat do 4 nových NLP úhlů pohledu.
        </p>
      </div>

      {/* Input Box */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <label className="block text-xs font-semibold text-slate-300">
          Omezující myšlenka, obava nebo přesvědčení k přeformátování:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={belief}
            onChange={(e) => setBelief(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
            placeholder="Zadejte větu (např. Nikdy nebudu tak dobrý jako ostatní...)"
          />
          <button
            onClick={() => handleGenerateReframes()}
            disabled={isLoading || !belief.trim()}
            className="px-6 py-3 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shrink-0 shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Přeformátovávám...' : 'Generovat 4 nové rámce'}</span>
          </button>
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500">Vyzkoušejte:</span>
          {sampleBeliefs.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setBelief(s);
                handleGenerateReframes(s);
              }}
              className="text-slate-400 hover:text-amber-300 hover:underline transition-colors"
            >
              „{s}“
            </button>
          ))}
        </div>
      </div>

      {/* Reframed Perspectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reframes.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">{item.type}</span>
                <span className="font-mono text-slate-500">Úhel #{idx + 1}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.explanation}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 text-sm text-slate-100 font-medium leading-relaxed mt-2">
              „{item.reframe}“
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
