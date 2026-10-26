import React, { useState } from 'react';
import { SubmodalitiesState } from '../types/nlp';
import {
  Sliders,
  Sparkles,
  Zap,
  Volume2,
  Eye,
  Maximize2,
  SunMedium,
  Palette,
  RotateCcw,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const SubmodalitiesLab: React.FC = () => {
  const [mentalThought, setMentalThought] = useState('Obava ze selhání před důležitou prezentací');
  const [state, setState] = useState<SubmodalitiesState>({
    title: 'Stresující situace',
    size: 75,
    distance: 2, // 1 = very close, 10 = far away
    brightness: 80,
    colorSaturation: 90,
    focus: 90,
    isAssociated: true,
    hasFrame: false,
    isMoving: true,
    volume: 75,
    tempo: 120,
    pitch: 'normal',
    intensityScore: 8,
  });

  const [isSwishing, setIsSwishing] = useState(false);
  const [swishCompleted, setSwishCompleted] = useState(false);

  // Compute calculated emotional intensity
  const calculatedIntensity = Math.max(
    1,
    Math.min(
      10,
      Math.round(
        (state.size * 0.035) +
        ((11 - state.distance) * 0.3) +
        (state.brightness * 0.015) +
        (state.colorSaturation * 0.02) +
        (state.isAssociated ? 1.5 : 0) +
        (state.pitch === 'silly' ? -2.5 : 0) +
        (state.volume * 0.02)
      )
    )
  );

  const handleResetToStress = () => {
    setState({
      title: 'Stresující situace',
      size: 80,
      distance: 2,
      brightness: 85,
      colorSaturation: 95,
      focus: 90,
      isAssociated: true,
      hasFrame: false,
      isMoving: true,
      volume: 80,
      tempo: 130,
      pitch: 'normal',
      intensityScore: 8,
    });
    setSwishCompleted(false);
  };

  const handleCollapseSubmodalities = () => {
    // Diminish the painful image
    setState((prev) => ({
      ...prev,
      size: 15,
      distance: 9,
      brightness: 20,
      colorSaturation: 0,
      focus: 30,
      isAssociated: false,
      hasFrame: true,
      volume: 10,
      pitch: 'silly',
    }));
  };

  const handleTriggerSwish = () => {
    setIsSwishing(true);
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        title: 'Moje ideální, suverénní JÁ v plné síle',
        size: 95,
        distance: 2,
        brightness: 95,
        colorSaturation: 100,
        focus: 100,
        isAssociated: true,
        hasFrame: false,
        isMoving: true,
        volume: 60,
        pitch: 'normal',
      }));
      setIsSwishing(false);
      setSwishCompleted(true);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title & Concept */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>Interaktivní NLP laboratoř</span>
            <span aria-hidden="true">·</span>
            <span>Kognitivní kódování vnímání</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Laboratoř submodalit & SWISH trenažér
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            V NLP nerozhoduje to, CO se stalo, ale JAK je to zakódováno v parametrech vaší mysli (velikost, barva, vzdálenost, tón). Změnou submodalit okamžitě neutralizujete strach.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToStress}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Výchozí stresující stav</span>
          </button>
          <button
            onClick={handleCollapseSubmodalities}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Zmenšit & neutralizovat</span>
          </button>
        </div>
      </div>

      {/* Target Thought Selector */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <label className="block text-xs text-slate-400 mb-1">
            Myšlenka, obraz nebo vzpomínka k úpravě:
          </label>
          <input
            type="text"
            value={mentalThought}
            onChange={(e) => setMentalThought(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
            placeholder="Zadejte situaci (např. Strach z odmítnutí, Hádka se šéfem...)"
          />
        </div>

        <div className="flex items-center gap-4 border-l sm:border-slate-800 pl-0 sm:pl-6 shrink-0">
          <div>
            <span className="block text-xs text-slate-400">Emoční intenzita</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span
                className={`text-2xl font-bold font-mono tabular-nums ${
                  calculatedIntensity >= 7
                    ? 'text-rose-400'
                    : calculatedIntensity >= 4
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {calculatedIntensity}/10
              </span>
              <span className="text-xs text-slate-400">
                {calculatedIntensity >= 7 ? 'Vysoký stres' : calculatedIntensity >= 4 ? 'Střední napětí' : 'Klid & neutralita'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Zone Interactive Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Stage (7 cols): The Mental Screen Canvas */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                Vnitřní plátno mysli (Mental Screen Simulation)
              </span>
              <span className="text-xs font-mono text-amber-400">
                {state.isAssociated ? 'Asociovaný pohled (1. osoba)' : 'Disasociovaný pohled (3. osoba)'}
              </span>
            </div>

            {/* Simulated Mental Display Area */}
            <div className="mt-6 h-[380px] bg-slate-950/90 rounded-2xl border border-slate-800/90 relative overflow-hidden flex items-center justify-center p-4">
              {/* Perspective grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Dynamic Mental Image Box */}
              <div
                style={{
                  width: `${state.size}%`,
                  height: `${state.size * 0.8}%`,
                  filter: `brightness(${state.brightness}%) grayscale(${100 - state.colorSaturation}%) blur(${(100 - state.focus) * 0.05}px)`,
                  transform: `scale(${1.1 - state.distance * 0.08}) ${isSwishing ? 'scale(0.01) rotate(45deg)' : ''}`,
                  opacity: Math.max(0.2, 1 - state.distance * 0.08),
                  transition: isSwishing ? 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'all 0.25s ease-out',
                }}
                className={`relative rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 ${
                  state.hasFrame ? 'border-8 border-slate-700 bg-slate-900' : 'border border-amber-400/20'
                } ${
                  swishCompleted
                    ? 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 text-white'
                    : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-300">
                    {swishCompleted ? '★ Cílový stav: Síla & Zdroj' : 'Původní reprezentace'}
                  </span>
                  <span className="font-mono text-slate-300">
                    Vzdálenost: {state.distance}m
                  </span>
                </div>

                <div className="text-center my-auto space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {swishCompleted ? 'Jsem klidný, přesvědčivý a plně v přítomnosti' : mentalThought}
                  </h3>
                  <p className="text-xs text-slate-300/80 max-w-sm mx-auto">
                    {swishCompleted
                      ? 'Nová neuro-asociace: Tělo je uvolněné, dech hluboký, vnitřní hlas podpůrný.'
                      : 'Starý mentální vzorec. Zmenšete jej, odsuňte ho do dálky a odeberte barvu.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-white/10 pt-3">
                  <span>Zvuk: {state.pitch === 'silly' ? 'Kačer Donald (zesměšněno)' : 'Běžný tón'}</span>
                  <span className="font-mono">Jas: {state.brightness}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Swish Trigger Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Technika SWISH (Blesková záměna)</span>
              <span className="text-xs text-slate-400">
                Nahradí starý obraz vteřinovým výbuchem vašeho silného, ideálního já.
              </span>
            </div>

            <button
              onClick={handleTriggerSwish}
              disabled={isSwishing}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-xs font-bold rounded-xl hover:from-amber-300 hover:to-amber-200 transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSwishing ? 'SWISH probíhá...' : 'Provést SWISH vzorec!'}</span>
            </button>
          </div>
        </div>

        {/* Right Stage (5 cols): Parameter Sliders & Submodality Controls */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Ovladače submodalit (Control Deck)
            </h3>
          </div>

          <div className="space-y-5">
            {/* 1. Size Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  Velikost obrazu v mysli
                </span>
                <span className="font-mono text-slate-400">{state.size}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                value={state.size}
                onChange={(e) => setState({ ...state, size: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Miniaturní známka</span>
                <span>Obří plátno</span>
              </div>
            </div>

            {/* 2. Distance Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  Vzdálenost od vašich očí
                </span>
                <span className="font-mono text-slate-400">{state.distance} metrů</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={state.distance}
                onChange={(e) => setState({ ...state, distance: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Přímo před nosem</span>
                <span>50 metrů v dálce</span>
              </div>
            </div>

            {/* 3. Brightness Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                  Jas a osvětlení
                </span>
                <span className="font-mono text-slate-400">{state.brightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={state.brightness}
                onChange={(e) => setState({ ...state, brightness: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* 4. Color vs Black & White */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Barevnost (Saturace)
                </span>
                <span className="font-mono text-slate-400">
                  {state.colorSaturation <= 15 ? 'Černobílá' : `${state.colorSaturation}% barvy`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.colorSaturation}
                onChange={(e) => setState({ ...state, colorSaturation: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* 5. Auditory Submodalities */}
            <div className="pt-3 border-t border-slate-800 space-y-4">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Auditivní submodality (Vnitřní hlas)
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setState({ ...state, pitch: 'normal' })}
                  className={`p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                    state.pitch === 'normal'
                      ? 'bg-slate-800 text-white border-amber-400/60'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Vážný vnitřní tón
                </button>
                <button
                  type="button"
                  onClick={() => setState({ ...state, pitch: 'silly' })}
                  className={`p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                    state.pitch === 'silly'
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Kreslený hlas (Neutralizátor)
                </button>
              </div>

              {/* Association Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {state.isAssociated ? 'Asociovaný stav' : 'Disasociovaný stav'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {state.isAssociated
                      ? 'Prožíváte to z vlastních očí (vysoká emoce)'
                      : 'Díváte se na sebe zvenčí jako divák (odstup)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setState({ ...state, isAssociated: !state.isAssociated })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    !state.isAssociated
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {state.isAssociated ? 'Získat odstup' : 'Jsem v odstupu ✓'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
