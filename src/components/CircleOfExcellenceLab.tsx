import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Shield,
  Heart,
  Flame,
  Feather
} from 'lucide-react';

export const CircleOfExcellenceLab: React.FC = () => {
  const [selectedState, setSelectedState] = useState<'confidence' | 'calm' | 'creativity' | 'charisma'>('confidence');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Nádech' | 'Zadržet' | 'Výdech'>('Nádech');
  const [breathCounter, setBreathCounter] = useState(4);
  const [anchorTested, setAnchorTested] = useState(false);

  // Breathing pacer loop
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          setBreathPhase((current) => {
            if (current === 'Nádech') return 'Zadržet';
            if (current === 'Zadržet') return 'Výdech';
            return 'Nádech';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const stateDefinitions = {
    confidence: {
      name: 'Nezlomná sebedůvěra & Odvaha',
      color: 'from-amber-500 to-amber-300',
      textColor: 'text-amber-400',
      description: 'Stav absolutní vnitřní jistoty, stability a suverénního vystupování.',
      icon: Shield,
    },
    calm: {
      name: 'Hluboký vnitřní klid & Nadled',
      color: 'from-cyan-500 to-blue-300',
      textColor: 'text-sky-400',
      description: 'Zpomalení tepu, čistá mysl, nezaujatost stresem okolí a hluboké dýchání.',
      icon: Feather,
    },
    creativity: {
      name: 'Tvořivost, Hravost & Flow',
      color: 'from-emerald-500 to-teal-300',
      textColor: 'text-emerald-400',
      description: 'Přístup k nečekaným nápadům, lehkost, radost a spontánní řešení.',
      icon: Flame,
    },
    charisma: {
      name: 'Magnetické charisma & Vřelost',
      color: 'from-rose-500 to-amber-300',
      textColor: 'text-rose-400',
      description: 'Schopnost strhnout a inspirovat druhé, oční kontakt a otevřené srdce.',
      icon: Heart,
    },
  };

  const activeDef = stateDefinitions[selectedState];
  const IconComp = activeDef.icon;

  const handleTestAnchor = () => {
    setAnchorTested(true);
    setTimeout(() => setAnchorTested(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>NLP Kotvení stavů</span>
            <span aria-hidden="true">·</span>
            <span>Circle of Excellence</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Kruh dokonalosti & Tělesné ukotvení
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Vytvořte si spouštěč (kotvu), kterým dokážete během 2 vteřin zaplavit tělo a mysl stavem naprosté sebedůvěry, klidu nebo charismatu kdykoliv před těžkou situací.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentStep(1);
            setIsBreathingActive(false);
          }}
          className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Začít od 1. kroku</span>
        </button>
      </div>

      {/* Resource State Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(Object.keys(stateDefinitions) as Array<keyof typeof stateDefinitions>).map((key) => {
          const item = stateDefinitions[key];
          const ItemIcon = item.icon;
          const isSelected = selectedState === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedState(key)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <ItemIcon className={`w-5 h-5 ${item.textColor}`} />
                {isSelected && <span className="text-[11px] font-bold text-amber-400">Zvoleno</span>}
              </div>
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Guided Sandbox: 2 Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Stage & Breathing Pacer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <IconComp className={`w-4 h-4 ${activeDef.textColor}`} />
              <span className="text-xs font-semibold text-white">
                Vizuální kruh a tělesné spojení
              </span>
            </div>
            <span className="text-xs font-mono text-amber-400">
              Krok {currentStep} ze 4
            </span>
          </div>

          {/* Interactive Luminous Visual Circle Container */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-6 bg-slate-950">
            <img
              src="/src/assets/images/nlp_circle_of_excellence_1792958590975.jpg"
              alt="Kruh dokonalosti a světelná kotva"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

            {/* Glowing Golden Circle Animation */}
            <div
              className={`relative z-10 w-48 h-48 rounded-full border-4 border-amber-400/80 flex flex-col items-center justify-center text-center p-4 shadow-[0_0_50px_rgba(251,191,36,0.35)] transition-all ${
                isBreathingActive ? 'scale-110 shadow-[0_0_70px_rgba(251,191,36,0.6)]' : 'scale-100'
              }`}
            >
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse mb-1" />
              <span className="text-xs font-bold text-white block">
                KRUH DOKONALOSTI
              </span>
              <span className="text-[11px] text-amber-200 mt-0.5">
                {activeDef.name}
              </span>
            </div>
          </div>

          {/* Breathing Pacer Bar for Emotional Induction */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isBreathingActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold'
                }`}
              >
                {isBreathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isBreathingActive ? 'Zastavit dech' : 'Spustit vedené dýchání'}</span>
              </button>

              {isBreathingActive && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-amber-400">{breathPhase}:</span>
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {breathCounter}s
                  </span>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400">
              Rytmus 4-4-4 zklidní nervovou soustavu a otevře přístup ke zdrojům.
            </div>
          </div>

          {/* Test Anchor Button */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">
                Vyzkoušet kotvu (Future Pacing)
              </span>
              <span className="text-xs text-slate-400">
                Stiskněte palec a ukazováček dohromady a aktivujte stav.
              </span>
            </div>

            <button
              onClick={handleTestAnchor}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              {anchorTested ? 'Kotva aktivována! ✓' : 'Stisknout kotvu'}
            </button>
          </div>

          {anchorTested && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Fyziologická odezva upevněna! Vaše tělo si pamatuje vzorec narovnané páteře a hlubokého dechu.
              </span>
            </div>
          )}
        </div>

        {/* Guided Steps Deck (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">
              4 Kroky ukotvení dokonalosti
            </h3>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div
              onClick={() => setCurrentStep(1)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentStep === 1
                  ? 'bg-slate-950 border-amber-400 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-400">Krok 1</span>
                {currentStep > 1 && <span className="text-emerald-400">Hotovo ✓</span>}
              </div>
              <h4 className="text-sm font-semibold text-white">Představa a barva kruhu</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Představte si na podlaze před sebou kruh o průměru 1 metru. Naplňte jej barvou, která pro vás symbolizuje {activeDef.name}.
              </p>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setCurrentStep(2)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentStep === 2
                  ? 'bg-slate-950 border-amber-400 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-400">Krok 2</span>
                {currentStep > 2 && <span className="text-emerald-400">Hotovo ✓</span>}
              </div>
              <h4 className="text-sm font-semibold text-white">Vybavení vrcholného okamžiku</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Vzpomeňte si na konkrétní okamžik ze své minulosti, kdy jste tento stav intenzivně zažívali. Co jste viděli? Co jste slyšeli? Jaké pocity vám procházely tělem?
              </p>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setCurrentStep(3)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentStep === 3
                  ? 'bg-slate-950 border-amber-400 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-400">Krok 3</span>
                {currentStep > 3 && <span className="text-emerald-400">Hotovo ✓</span>}
              </div>
              <h4 className="text-sm font-semibold text-white">Vstup do kruhu a stisk kotvy</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Fyzicky nebo v duchu udělejte krok do kruhu. V okamžiku, kdy je stav na absolutním vrcholu (peak state), pevně spojte palec a ukazováček své dominantní ruky po dobu 5 sekund.
              </p>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => setCurrentStep(4)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentStep === 4
                  ? 'bg-slate-950 border-amber-400 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-400">Krok 4</span>
                {currentStep === 4 && <span className="text-amber-400">Aktivní fáze</span>}
              </div>
              <h4 className="text-sm font-semibold text-white">Vystoupení a mentální zkouška</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Vystupte z kruhu ven, protřepejte ruce a podívejte se z okna (Break State). Poté stiskněte kotvu znovu a představte si zítřejší náročnou situaci s tímto novým stavem.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {currentStep < 4 && (
              <button
                onClick={() => setCurrentStep((currentStep + 1) as any)}
                className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg hover:bg-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Další krok</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
