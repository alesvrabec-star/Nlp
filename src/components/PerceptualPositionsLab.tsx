import React, { useState } from 'react';
import {
  User,
  Users,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const PerceptualPositionsLab: React.FC = () => {
  const [activePosition, setActivePosition] = useState<1 | 2 | 3>(1);
  const [conflictTitle, setConflictTitle] = useState('Neshoda s kolegou ohledně rozdělení práce na projektu');
  const [otherPersonName, setOtherPersonName] = useState('Kolega');

  // User insights recorded in each position
  const [insights, setInsights] = useState({
    pos1: 'Cítím se přetížený a naštvaný, že na mě padá většina rutiny, zatímco on si vybírá zajímavější úkoly.',
    pos2: 'Když jsem v jeho kůži: Bojí se, že udělá chybu v technických detailech, a proto se jim vyhýbá. Necítí se dostatečně doceněný.',
    pos3: 'Z nadhledu vidím, že mezi námi chybí jasná dohoda na začátku sprintu. Oba chceme úspěch projektu, ale komunikujeme až při frustraci.',
  });

  const [integratedSolution, setIntegratedSolution] = useState<string | null>(null);

  const handleGenerateSolution = () => {
    setIntegratedSolution(
      `1. Ocenit jeho příspěvek a pozitivní záměr (bezpečí a kvalita projektu).\n2. Navrhnout 15minutový týdenní synchronizační meeting pro transparentní rozdělení úkolů předem.\n3. Oddělit emoce od věcné dohody – komunikovat z 3. pozice klidu místo zraněného ega 1. pozice.`
    );
  };

  const handleReset = () => {
    setActivePosition(1);
    setIntegratedSolution(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>Interaktivní NLP modul</span>
            <span aria-hidden="true">·</span>
            <span>Řešení konfliktů a empatie</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Trenažér 3 Pozic vnímání (Perceptual Positions)
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Základní technika Johna Grindera a Judith DeLozier pro okamžité rozpuštění vztahových konfliktů. Projděte postupně pohled JÁ, TY a NEZAUJATÝ POZOROVATEL.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Začít novou situaci</span>
        </button>
      </div>

      {/* Conflict Setup Bar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">
            Konfliktní situace nebo vztahové tření k vyřešení:
          </label>
          <input
            type="text"
            value={conflictTitle}
            onChange={(e) => setConflictTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
            placeholder="Popište situaci (např. Hádka o rozpočet s partnerem...)"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Jméno nebo role druhé osoby:
          </label>
          <input
            type="text"
            value={otherPersonName}
            onChange={(e) => setOtherPersonName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
            placeholder="Např. Šéf, Partner, Kolega..."
          />
        </div>
      </div>

      {/* Visual Perspective Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1st Position */}
        <button
          onClick={() => setActivePosition(1)}
          className={`p-5 rounded-2xl text-left border transition-all ${
            activePosition === 1
              ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-400">1. Pozice</span>
            <User className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white">Moje pozice (JÁ)</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Plně asociovaný v mém těle. Jaké jsou mé potřeby, emoce, záměry a co mi na situaci vadí?
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <span>{insights.pos1 ? 'Zapsáno ✓' : 'K vyplnění'}</span>
          </div>
        </button>

        {/* 2nd Position */}
        <button
          onClick={() => setActivePosition(2)}
          className={`p-5 rounded-2xl text-left border transition-all ${
            activePosition === 2
              ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-400">2. Pozice</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white">V kůži druhého ({otherPersonName})</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Vcítění se do jeho očí a reality. Co cítí on? Jak vidí mě? Jaký má pozitivní záměr?
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <span>{insights.pos2 ? 'Zapsáno ✓' : 'K vyplnění'}</span>
          </div>
        </button>

        {/* 3rd Position */}
        <button
          onClick={() => setActivePosition(3)}
          className={`p-5 rounded-2xl text-left border transition-all ${
            activePosition === 3
              ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-400">3. Pozice</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white">Nezávislý režisér (NADHLED)</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Kamera ze stropu bez emocí. Jaký vzorec v jejich dynamice vidíte? Co by jim moudrý rádce doporučil?
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <span>{insights.pos3 ? 'Zapsáno ✓' : 'K vyplnění'}</span>
          </div>
        </button>
      </div>

      {/* Active Position Deep Dive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Workspace (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-amber-400 font-semibold block">
                Aktivní fáze cvičení:
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {activePosition === 1 && '1. Pozice – Uvědomění vlastního modelu světa'}
                {activePosition === 2 && `2. Pozice – Pohled z očí a reality: ${otherPersonName}`}
                {activePosition === 3 && '3. Pozice – Objektivní nadhled nezávislého pozorovatele'}
              </h2>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 bg-slate-950 rounded-lg text-slate-400 border border-slate-800">
              Krok {activePosition} ze 3
            </span>
          </div>

          {/* Guiding Questions */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Klíčové NLP otázky pro tuto pozici:
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              {activePosition === 1 && (
                <>
                  <li>Co v této chvíli chci a co je pro mě klíčová hodnota?</li>
                  <li>Jaké tělesné pocity a emoce ve mně tato situace vyvolává?</li>
                  <li>Co přesně od druhého člověka očekávám?</li>
                </>
              )}
              {activePosition === 2 && (
                <>
                  <li>Když se podívám jeho očima: Jak se chovám já? Jak na něj působím?</li>
                  <li>Čeho se on obává nebo jakému tlaku čelí?</li>
                  <li>Jaký je jeho pozitivní záměr za tímto chováním?</li>
                </>
              )}
              {activePosition === 3 && (
                <>
                  <li>Kdybych byl moudrý nezávislý mediátor sledující tyto dva lidi, co vidím?</li>
                  <li>Kde dochází k systémovému zkratu v komunikaci?</li>
                  <li>Co přesně musí udělat osoba v 1. pozici, aby situaci konstruktivně posunula?</li>
                </>
              )}
            </ul>
          </div>

          {/* Textarea for Current Position Insight */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-200">
              Vaše postřehy a pocity v této pozici:
            </label>
            <textarea
              rows={4}
              value={
                activePosition === 1
                  ? insights.pos1
                  : activePosition === 2
                  ? insights.pos2
                  : insights.pos3
              }
              onChange={(e) => {
                const val = e.target.value;
                setInsights((prev) => ({
                  ...prev,
                  [activePosition === 1 ? 'pos1' : activePosition === 2 ? 'pos2' : 'pos3']: val,
                }));
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed"
              placeholder="Vžijte se do této role a popište svůj zážitek..."
            />
          </div>

          {/* Navigation Controls */}
          <div className="pt-2 flex items-center justify-between">
            {activePosition > 1 ? (
              <button
                onClick={() => setActivePosition((activePosition - 1) as 1 | 2)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                ← Předchozí pozice
              </button>
            ) : <div />}

            {activePosition < 3 ? (
              <button
                onClick={() => setActivePosition((activePosition + 1) as 2 | 3)}
                className="px-5 py-2.5 text-xs font-semibold bg-amber-400 text-slate-950 rounded-xl hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <span>Další pozice ({activePosition + 1})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleGenerateSolution}
                className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 rounded-xl hover:from-amber-300 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Integrovat vhled a řešení</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Info & Synthesis Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Concept Card */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-lg relative">
            <div className="h-44 relative">
              <img
                src="/src/assets/images/nlp_perceptual_positions_1792958590559.jpg"
                alt="Architektonické znázornění tří pozic vnímání"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs font-bold text-white block">
                  Trojí perspektiva komunikace
                </span>
                <span className="text-[11px] text-slate-300">
                  Překonejte jednostranné vidění a získejte plnou systémovou flexibilitu.
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Solution Card */}
          {integratedSolution ? (
            <div className="p-6 bg-slate-900 border border-amber-400/60 rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Integrovaná NLP strategie (4. fáze)</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Doporučený postup řešení konfliktu
              </h3>
              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {integratedSolution}
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-amber-300/90 font-medium">
                  ✓ Tento postup kombinuje empatii 2. pozice s moudrým nadhledem 3. pozice.
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Jak funguje integrace</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Většina hádek vzniká tím, že jsme uzamčeni v 1. pozici (naše uražené ego). Projitím všech tří pozic mozek vytvoří novou, zralou kognitivní mapu a konflikt se přirozeně transformuje v dohodu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
