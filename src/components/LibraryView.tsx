import React, { useState } from 'react';
import { EYE_ACCESSING_CUES, NLP_PRESUPPOSITIONS } from '../data/nlpData';
import {
  BookOpen,
  Eye,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const [activeEyeIndex, setActiveEyeIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState<'all' | 'Vnímání' | 'Komunikace' | 'Růst' | 'Zdroje'>('all');

  const selectedCue = EYE_ACCESSING_CUES[activeEyeIndex];

  const metaModelPatterns = [
    {
      category: 'Generalizace (Zevšeobecnění)',
      name: 'Univerzální kvantifikátory',
      examples: '„Všichni mě ignorují.“ / „Nikdy se to nenaučím.“ / „Vždycky to pokazím.“',
      metaQuestion: '„Opravdu všichni bez výjimky? Existoval někdy v životě moment, kdy tomu tak nebylo?“',
      purpose: 'Rozbije falešné absolutní přesvědčení a najde výjimku pro obnovení volby.'
    },
    {
      category: 'Generalizace (Zevšeobecnění)',
      name: 'Modální operátory nutnosti a nemožnosti',
      examples: '„Musím to dokončit sám.“ / „Nesmím udělat chybu.“ / „Tohle prostě nemohu dokázat.“',
      metaQuestion: '„Co přesně by se stalo, kdybyste to neudělali? Co vám konkrétně brání?“',
      purpose: 'Odhalí domnělou hrozbu nebo vnímanou překážku a otevře možnosti řešení.'
    },
    {
      category: 'Zkreslení (Distortion)',
      name: 'Čtení myšlenek (Mind Reading)',
      examples: '„Vím přesně, co si o mně myslí.“ / „Šéfovi se můj nápad určitě nelíbí.“',
      metaQuestion: '„Jak konkrétně to víte? Co přesně dotyčný řekl nebo udělal, z čeho to vyvozujete?“',
      purpose: 'Vrací člověka ze spekulací do smyslově ověřitelných faktů a reality.'
    },
    {
      category: 'Zkreslení (Distortion)',
      name: 'Příčina a následek (Cause & Effect)',
      examples: '„Jeho chování mě neskutečně vytáčí.“ / „Počasí mi kazí náladu.“',
      metaQuestion: '„Jak přesně to, co dělá on, způsobuje, že se rozhodnete cítit vytočený?“',
      purpose: 'Vrací kontrolu a odpovědnost za vnitřní stav zpět do rukou člověka.'
    },
    {
      category: 'Vypuštění (Deletion)',
      name: 'Ztracený původce (Lost Performative)',
      examples: '„Není správné takhle mluvit.“ / „Je špatné žádat o zvýšení platu.“',
      metaQuestion: '„Kdo konkrétně říká, že je to špatné? Podle jakých konkrétních měřítek?“',
      purpose: 'Odhalí cizí převzaté dogmata a pravidla, kterým jsme slepě uvěřili.'
    },
    {
      category: 'Vypuštění (Deletion)',
      name: 'Neurčitá slovesa a srovnání',
      examples: '„Musíme se víc snažit.“ / „Naše nabídka je lepší.“',
      metaQuestion: '„Jak konkrétně se snažit? Lepší ve srovnání s čím a v jakém kritériu?“',
      purpose: 'Odstraňuje vágnost a vede k přesnému akčnímu kroku.'
    }
  ];

  const filteredPresuppositions = filterCategory === 'all'
    ? NLP_PRESUPPOSITIONS
    : NLP_PRESUPPOSITIONS.filter(p => p.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
          <span>NLP Znalostní báze</span>
          <span aria-hidden="true">·</span>
          <span>Lexikon a modely</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
          NLP Knihovna technik a principů
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Kompletní průvodce očními vzorci (Eye Accessing Cues), lingvistickými strukturami Meta-modelu a základními axiomy NLP pro každodenní rozvoj.
        </p>
      </div>

      {/* Section 1: Eye Accessing Cues Interactive Schema */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              Oční vzorce mysli (Eye Accessing Cues)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pohyby očí při přemýšlení ukazují, do které části mozku a smyslového kanálu člověk sahá.
            </p>
          </div>
          <span className="text-xs text-slate-400">Pohled pozorovatele zepředu</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Eye Grid (6 Hotspots) */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-6">
            <span className="text-xs font-semibold text-slate-400">
              Klikněte na směr pohledu pro vysvětlení kognitivního procesu:
            </span>

            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {EYE_ACCESSING_CUES.map((cue, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEyeIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeEyeIndex === idx
                      ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-[11px] text-slate-400 block truncate">
                    {cue.direction}
                  </span>
                  <span className="text-xs font-semibold block mt-0.5 truncate">
                    {cue.system}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cue Detail Deck */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <span>Směr: {selectedCue.direction}</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {selectedCue.system}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedCue.meaning}
              </p>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-1">
                  Příklad otázky, která tento pohyb očí spouští:
                </span>
                <p className="text-xs text-amber-300 italic">
                  {selectedCue.sampleQuestion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Meta-Model Matrix */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Layers className="w-5 h-5 text-amber-400" />
            Meta-model jazyka (Lingvistická preciznost)
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Vyvinutý Richardem Bandlerem a Johnem Grinderem podle terapeutických rozhovorů Virginie Satirové. Umožňuje rozbít kognitivní zkreslení a zpochybnit omezující iluze.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metaModelPatterns.map((pat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] text-amber-400 font-semibold block">
                  {pat.category}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {pat.name}
                </h3>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 italic">
                  {pat.examples}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block">
                  Precizní Meta-model otázka:
                </span>
                <p className="text-xs text-amber-300 font-medium leading-relaxed">
                  {pat.metaQuestion}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Cíl: {pat.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: The 8 Core NLP Presuppositions */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Shield className="w-5 h-5 text-amber-400" />
              Základní předpoklady NLP (Presuppositions)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Užitečná přesvědčení pro flexibilitu mysli, zdravé vztahy a vysokou efektivitu.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {(['all', 'Vnímání', 'Komunikace', 'Růst', 'Zdroje'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Všechny' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPresuppositions.map((p, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-amber-400">{p.category}</span>
                <span className="font-mono">Axiom #{idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                „{p.title}“
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {p.description}
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                <span className="font-bold text-amber-300 block mb-0.5">Praktický návyk:</span>
                {p.practicalTip}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
