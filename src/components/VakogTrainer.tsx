import React, { useState } from 'react';
import { VAKOG_TRAINING_QUESTIONS } from '../data/nlpData';
import { VakogQuestion } from '../types/nlp';
import {
  Eye,
  Volume2,
  Hand,
  Cpu,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Search,
  Compass,
  BookmarkPlus,
  HelpCircle
} from 'lucide-react';
import { localAnalyzeNLP } from '../utils/nlpLocalEngine';

interface MemorySubmodalities {
  memoryTitle: string;
  // Visual
  isAssociated: boolean; // true = through own eyes, false = watching oneself from outside
  colorType: 'color' | 'bw';
  brightness: 'bright' | 'natural' | 'dim';
  sizeFormat: 'lifesize' | 'panorama' | 'framed' | 'mini';
  distance: 'close' | 'reach' | 'mid' | 'far';
  motion: 'movie' | 'still';
  // Auditory
  audioSource: 'internal' | 'external' | 'ambient' | 'silence';
  audioLocation: 'inside_head' | 'stereo' | 'side' | 'distance';
  volume: 'whisper' | 'normal' | 'loud';
  audioTone: 'warm' | 'energetic' | 'deep' | 'melodic';
  // Kinesthetic
  bodyLocation: 'chest' | 'solar' | 'shoulders' | 'head' | 'whole_body';
  temperature: 'warm' | 'cool' | 'neutral';
  movement: 'flowing' | 'grounded' | 'pulsing' | 'pressure';
  weight: 'light' | 'grounded' | 'neutral';
  intensity: number; // 1 - 10
}

export const VakogTrainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiler' | 'quiz'>('profiler');

  // Submodalities Memory Guide Wizard State
  const [guideStep, setGuideStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [savedToJournal, setSavedToJournal] = useState(false);

  const [memoryData, setMemoryData] = useState<MemorySubmodalities>({
    memoryTitle: 'Okamžik velkého úspěchu při prezentaci',
    isAssociated: true,
    colorType: 'color',
    brightness: 'bright',
    sizeFormat: 'panorama',
    distance: 'close',
    motion: 'movie',
    audioSource: 'external',
    audioLocation: 'stereo',
    volume: 'normal',
    audioTone: 'warm',
    bodyLocation: 'chest',
    temperature: 'warm',
    movement: 'flowing',
    weight: 'light',
    intensity: 9,
  });

  // Quiz state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Live predicate analyzer state
  const [customText, setCustomText] = useState('Potřebuji v tom mít konečně jasno a vidět ucelený obrázek celého projektu.');
  const [analyzedResult, setAnalyzedResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const question: VakogQuestion = VAKOG_TRAINING_QUESTIONS[currentIdx] || VAKOG_TRAINING_QUESTIONS[0];

  const handleSelectOption = (sys: string) => {
    if (hasSubmitted) return;
    setSelectedAnswer(sys);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || hasSubmitted) return;
    setHasSubmitted(true);
    if (selectedAnswer === question.correctSystem) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    if (currentIdx + 1 < VAKOG_TRAINING_QUESTIONS.length) {
      setCurrentIdx((c) => c + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleAnalyzeCustom = async () => {
    if (!customText.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/nlp/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: customText.trim() }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.result) {
        setAnalyzedResult(data.result);
      } else {
        throw new Error('No result returned');
      }
    } catch (e) {
      console.warn('Using local NLP analysis fallback:', e);
      setAnalyzedResult(localAnalyzeNLP(customText.trim()));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Save VAKOG profile to Journal in LocalStorage
  const handleSaveToJournal = () => {
    try {
      const existing = localStorage.getItem('nlp_journal_entries');
      const list = existing ? JSON.parse(existing) : [];
      const newEntry = {
        id: `entry-vakog-${Date.now()}`,
        date: 'Právě teď',
        technique: 'VAKOG Submodality Profil',
        insight: `Vzpomínka: „${memoryData.memoryTitle}“ | Vizuální: ${memoryData.isAssociated ? 'Asociovaný' : 'Disasociovaný'}, ${memoryData.colorType === 'color' ? 'Barevný' : 'ČB'}, ${memoryData.sizeFormat} | Auditivní: ${memoryData.audioTone}, ${memoryData.audioLocation} | Kinestetický: ${memoryData.bodyLocation}, ${memoryData.temperature}, intenzita ${memoryData.intensity}/10.`,
        moodRating: memoryData.intensity,
      };
      localStorage.setItem('nlp_journal_entries', JSON.stringify([newEntry, ...list]));
      setSavedToJournal(true);
      setTimeout(() => setSavedToJournal(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const sampleMemories = [
    'Okamžik velkého úspěchu a uznání',
    'Chvíle absolutního klidu a bezpečí v přírodě',
    'Okamžik hravosti, smíchu a flow',
    'Náročná situace, kterou chci pochopit a změnit',
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header and Mode Selector */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <span>Smyslová ostrost (Sensory Acuity)</span>
              <span aria-hidden="true">·</span>
              <span>Reprezentační systémy VAKOG</span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              VAKOG Trenažér & Mapovač submodalit
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Lidé nevnímají svět stejně: Vizuální lidé myslí v obrazech, auditivní ve slovech a tónech, kinestetičtí v tělesných pocitech. Prozkoumejte své vnitřní smyslové kódování.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('profiler')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'profiler'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Průvodce submodalitami vzpomínky
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kvíz predikátů & Analyzátor
            </button>
          </div>
        </div>

        {/* 4 Systems Reference Header Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Eye className="w-4 h-4" />
              <span>Vizuální (V)</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Vidět, jasný, pohled, mlhavý, obrázek, perspektiva.
            </span>
          </div>

          <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
              <Volume2 className="w-4 h-4" />
              <span>Auditivní (A)</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Slyšet, znít, tón, ladit, ticho, rezonovat, šum.
            </span>
          </div>

          <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
              <Hand className="w-4 h-4" />
              <span>Kinestetický (K)</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Cítit, tíha, lehkost, uchopit, hmatatelný, tlak, teplo.
            </span>
          </div>

          <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Auditivně-digitální (Ad)</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Smysl, logika, analyzovat, data, proces, chápat.
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: INTERAKTIVNÍ PRŮVODCE SUBMODALITAMI VZPOMÍNKY */}
      {/* ========================================================================= */}
      {activeTab === 'profiler' && (
        <div className="space-y-6">
          {/* Wizard Step Progress Indicator */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {[
                { step: 1, label: '1. Vzpomínka' },
                { step: 2, label: '2. Vizuální (V)' },
                { step: 3, label: '3. Auditivní (A)' },
                { step: 4, label: '4. Kinestetické (K)' },
                { step: 5, label: '5. VAKOG Profil' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setGuideStep(s.step as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    guideStep === s.step
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : guideStep > s.step
                      ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{s.label}</span>
                  {guideStep > s.step && <CheckCircle className="w-3.5 h-3.5 text-amber-300" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setGuideStep(1);
                setMemoryData({
                  memoryTitle: 'Můj vybraný okamžik',
                  isAssociated: true,
                  colorType: 'color',
                  brightness: 'bright',
                  sizeFormat: 'panorama',
                  distance: 'close',
                  motion: 'movie',
                  audioSource: 'external',
                  audioLocation: 'stereo',
                  volume: 'normal',
                  audioTone: 'warm',
                  bodyLocation: 'chest',
                  temperature: 'warm',
                  movement: 'flowing',
                  weight: 'light',
                  intensity: 8,
                });
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-3 py-1.5 bg-slate-800/60 rounded-lg hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset průvodce</span>
            </button>
          </div>

          {/* Step 1: Memory Selection */}
          {guideStep === 1 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-amber-400 font-semibold block">
                  Krok 1 z 5: Výběr a vyvolání zážitku
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Kterou konkrétní vzpomínku chcete smyslově zmapovat?
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Vyberte si konkrétní okamžik ze své minulosti. Může to být zdrojový moment hlubokého úspěchu, klidu, nebo situace, u které chcete zjistit její kognitivní kód.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Název nebo stručný popis vzpomínky:
                  </label>
                  <input
                    type="text"
                    value={memoryData.memoryTitle}
                    onChange={(e) => setMemoryData({ ...memoryData, memoryTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                    placeholder="Např. Okamžik, kdy jsem dokončil svůj první maraton..."
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block">Nebo si zvolte vzorovou situaci:</span>
                  <div className="flex flex-wrap gap-2">
                    {sampleMemories.map((sm, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, memoryTitle: sm })}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          memoryData.memoryTitle === sm
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        „{sm}“
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 block">NLP Doporučení k naladění:</span>
                  <p>
                    Zavřete na 5 sekund oči a dovolte si tuto vzpomínku znovu vybavit v plné intenzitě. Všimněte si, co se ve vaší mysli a těle objeví jako první.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setGuideStep(2)}
                  className="px-6 py-2.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center gap-2"
                >
                  <span>Přejít k vizuálním submodalitám</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Visual Submodalities (V) */}
          {guideStep === 2 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-amber-400 font-semibold block">
                  Krok 2 z 5: Vnitřní zrak (Vizuální submodality)
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  Jak přesně tento obraz vidíte ve své mysli?
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Vzpomínka: <strong className="text-white">„{memoryData.memoryTitle}“</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Association */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    1. Úhel pohledu (Asociace vs Disasociace)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, isAssociated: true })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        memoryData.isAssociated
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Asociovaný</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Dívám se vlastníma očima, vidím své ruce</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, isAssociated: false })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        !memoryData.isAssociated
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Disasociovaný</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Vidím sám sebe zvenčí jako ve filmu</span>
                    </button>
                  </div>
                </div>

                {/* 2. Color Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    2. Barevnost obrazu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, colorType: 'color' })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        memoryData.colorType === 'color'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Barevné</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Syté, přirozené a pestré barvy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, colorType: 'bw' })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        memoryData.colorType === 'bw'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Černobílé / Sépie</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Odstíny šedi nebo monochromatické</span>
                    </button>
                  </div>
                </div>

                {/* 3. Brightness */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    3. Jas a světlo
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['bright', 'natural', 'dim'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, brightness: b })}
                        className={`p-3 rounded-xl border text-center text-xs transition-all ${
                          memoryData.brightness === b
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {b === 'bright' ? 'Zářivě jasné' : b === 'natural' ? 'Přirozené denní' : 'Tlumené / temné'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Format & Size */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    4. Velikost a ohraničení obrazu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'panorama', label: 'Panoráma (360°)' },
                      { key: 'lifesize', label: 'Životní velikost' },
                      { key: 'framed', label: 'Zarámovaný obraz' },
                      { key: 'mini', label: 'Malá miniaturka' },
                    ].map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, sizeFormat: f.key as any })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          memoryData.sizeFormat === f.key
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Distance */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    5. Vzdálenost v prostoru mysli
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'close', label: 'Přímo před nosem (< 0.5m)' },
                      { key: 'reach', label: 'Na dosah paže (1–2m)' },
                      { key: 'mid', label: 'Několik metrů daleko' },
                      { key: 'far', label: 'V dáli na horizontu' },
                    ].map((d) => (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, distance: d.key as any })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          memoryData.distance === d.key
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Motion */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    6. Pohyb
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, motion: 'movie' })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        memoryData.motion === 'movie'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Plynulý film / video</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Scéna se plynule hýbe</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMemoryData({ ...memoryData, motion: 'still' })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        memoryData.motion === 'still'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block font-semibold">Statická fotografie</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Jeden zmrazený snímek</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <button
                  onClick={() => setGuideStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  ← Zpět na výběr vzpomínky
                </button>
                <button
                  onClick={() => setGuideStep(3)}
                  className="px-6 py-2.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center gap-2"
                >
                  <span>Přejít k auditivním submodalitám</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Auditory Submodalities (A) */}
          {guideStep === 3 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-amber-400 font-semibold block">
                  Krok 3 z 5: Vnitřní sluch (Auditivní submodality)
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-sky-400" />
                  Co v této vzpomínce slyšíte a jak to zní?
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Vzpomínka: <strong className="text-white">„{memoryData.memoryTitle}“</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Sound Source */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    1. Zdroj zvuku
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'internal', label: 'Vnitřní dialog', sub: 'Můj vlastní hlas v hlavě' },
                      { key: 'external', label: 'Hlasy lidí', sub: 'Rozhovor, slova druhých' },
                      { key: 'ambient', label: 'Zvuky okolí / hudba', sub: 'Šum, potlesk, hudba' },
                      { key: 'silence', label: 'Ticho', sub: 'Klid bez výrazných zvuků' },
                    ].map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, audioSource: s.key as any })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          memoryData.audioSource === s.key
                            ? 'bg-sky-400/20 border-sky-400 text-sky-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="block font-semibold">{s.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{s.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Audio Location */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    2. Směr a prostor zvuku
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'stereo', label: 'Stereo / Všude kolem', sub: 'Prostorový 3D zvuk' },
                      { key: 'inside_head', label: 'Uvnitř hlavy', sub: 'Centrální vnitřní hlas' },
                      { key: 'side', label: 'Z jedné strany', sub: 'Zleva nebo zprava' },
                      { key: 'distance', label: 'Z dálky', sub: 'Vzdálený zvuk v pozadí' },
                    ].map((l) => (
                      <button
                        key={l.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, audioLocation: l.key as any })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          memoryData.audioLocation === l.key
                            ? 'bg-sky-400/20 border-sky-400 text-sky-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="block font-semibold">{l.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{l.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Volume */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    3. Hlasitost zvuku
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'whisper', label: 'Tichý šepot' },
                      { key: 'normal', label: 'Normální zřetelná' },
                      { key: 'loud', label: 'Hlasitý / výrazný' },
                    ].map((v) => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, volume: v.key as any })}
                        className={`p-3 rounded-xl border text-center text-xs transition-all ${
                          memoryData.volume === v.key
                            ? 'bg-sky-400/20 border-sky-400 text-sky-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Tone */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    4. Tón a charakter zvuku
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'warm', label: 'Vřelý a povzbuzující' },
                      { key: 'energetic', label: 'Rychlý a energický' },
                      { key: 'deep', label: 'Hluboký a klidný' },
                      { key: 'melodic', label: 'Melodický a hravý' },
                    ].map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, audioTone: t.key as any })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          memoryData.audioTone === t.key
                            ? 'bg-sky-400/20 border-sky-400 text-sky-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <button
                  onClick={() => setGuideStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  ← Zpět na vizuální submodality
                </button>
                <button
                  onClick={() => setGuideStep(4)}
                  className="px-6 py-2.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center gap-2"
                >
                  <span>Přejít ke kinestetickým submodalitám</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Kinesthetic Submodalities (K) */}
          {guideStep === 4 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs text-amber-400 font-semibold block">
                  Krok 4 z 5: Tělesné pocity (Kinestetické submodality)
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Hand className="w-5 h-5 text-rose-400" />
                  Kde a jak tento stav prožíváte ve svém těle?
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Vzpomínka: <strong className="text-white">„{memoryData.memoryTitle}“</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Location in Body */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    1. Lokalizace pocitu v těle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'chest', label: 'Hrudník a u srdce', sub: 'Otevřenost, dech' },
                      { key: 'solar', label: 'Břicho / Solar plexus', sub: 'Střed síly, jistota' },
                      { key: 'shoulders', label: 'Ramena a šíje', sub: 'Rovná páteř, stabilita' },
                      { key: 'whole_body', label: 'V celém těle', sub: 'Rovnoměrný stav flow' },
                    ].map((l) => (
                      <button
                        key={l.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, bodyLocation: l.key as any })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          memoryData.bodyLocation === l.key
                            ? 'bg-rose-400/20 border-rose-400 text-rose-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="block font-semibold">{l.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{l.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Temperature */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    2. Teplota v těle
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'warm', label: 'Příjemné teplo' },
                      { key: 'cool', label: 'Svěží chlad' },
                      { key: 'neutral', label: 'Neutrální' },
                    ].map((temp) => (
                      <button
                        key={temp.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, temperature: temp.key as any })}
                        className={`p-3 rounded-xl border text-center text-xs transition-all ${
                          memoryData.temperature === temp.key
                            ? 'bg-rose-400/20 border-rose-400 text-rose-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {temp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Movement / Flow */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-200">
                    3. Pohyb pocitu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'flowing', label: 'Proudí a rozlévá se', sub: 'Expanze do končetin' },
                      { key: 'grounded', label: 'Klidný a uzemněný', sub: 'Stabilní pevný bod' },
                      { key: 'pulsing', label: 'Pulzuje v rytmu', sub: 'Živé vibrace s dechem' },
                      { key: 'pressure', label: 'Pevný stisk / opora', sub: 'Pevná vnitřní opora' },
                    ].map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMemoryData({ ...memoryData, movement: m.key as any })}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          memoryData.movement === m.key
                            ? 'bg-rose-400/20 border-rose-400 text-rose-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="block font-semibold">{m.label}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{m.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Intensity Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">
                      4. Emoční a tělesná intenzita
                    </span>
                    <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
                      {memoryData.intensity} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={memoryData.intensity}
                    onChange={(e) => setMemoryData({ ...memoryData, intensity: Number(e.target.value) })}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>1 (Jemný náznak)</span>
                    <span>5 (Střední prožitek)</span>
                    <span>10 (Vrcholný Peak State)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <button
                  onClick={() => setGuideStep(3)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  ← Zpět na auditivní submodality
                </button>
                <button
                  onClick={() => setGuideStep(5)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-xs font-bold rounded-xl hover:from-amber-300 transition-all flex items-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <span>Zobrazit kompletní VAKOG profil</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Final Synthesis & NLP Profile */}
          {guideStep === 5 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Výsledná smyslová mapa (VAKOG Submodality Matrix)</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    „{memoryData.memoryTitle}“
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveToJournal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <BookmarkPlus className="w-4 h-4 text-amber-400" />
                    <span>{savedToJournal ? 'Uloženo do Deníku! ✓' : 'Uložit do NLP Deníku'}</span>
                  </button>
                  <button
                    onClick={() => setGuideStep(1)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800"
                  >
                    Zmapovat další vzpomínku
                  </button>
                </div>
              </div>

              {/* 3 Sensory Code Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Visual Card */}
                <div className="p-5 bg-slate-950/70 border border-amber-400/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Eye className="w-4 h-4" />
                      Vizuální kód (V)
                    </span>
                    <span className="font-mono text-xs text-amber-300">
                      {memoryData.isAssociated ? 'Asociovaný' : 'Disasociovaný'}
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Barevnost:</span>
                      <span className="font-semibold text-white">{memoryData.colorType === 'color' ? 'Plnobarevné' : 'Černobílé'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Jas:</span>
                      <span className="font-semibold text-white">{memoryData.brightness === 'bright' ? 'Zářivě jasné' : memoryData.brightness === 'natural' ? 'Přirozené' : 'Tlumené'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Formát:</span>
                      <span className="font-semibold text-white">{memoryData.sizeFormat === 'panorama' ? 'Panoráma' : memoryData.sizeFormat === 'lifesize' ? 'Životní vel.' : memoryData.sizeFormat === 'framed' ? 'Zarámovaný' : 'Miniaturka'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Pohyb:</span>
                      <span className="font-semibold text-white">{memoryData.motion === 'movie' ? 'Živý film' : 'Statický snímek'}</span>
                    </li>
                  </ul>
                </div>

                {/* Auditory Card */}
                <div className="p-5 bg-slate-950/70 border border-sky-400/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Volume2 className="w-4 h-4" />
                      Auditivní kód (A)
                    </span>
                    <span className="font-mono text-xs text-sky-300">
                      {memoryData.audioLocation === 'stereo' ? 'Stereo' : memoryData.audioLocation === 'inside_head' ? 'Vnitřní' : 'Lokalizovaný'}
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Zdroj zvuku:</span>
                      <span className="font-semibold text-white">{memoryData.audioSource === 'internal' ? 'Vnitřní hlas' : memoryData.audioSource === 'external' ? 'Hlasy lidí' : memoryData.audioSource === 'ambient' ? 'Okolí/hudba' : 'Ticho'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Hlasitost:</span>
                      <span className="font-semibold text-white">{memoryData.volume === 'whisper' ? 'Šepot' : memoryData.volume === 'normal' ? 'Normální' : 'Hlasitý'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Tón:</span>
                      <span className="font-semibold text-white">{memoryData.audioTone === 'warm' ? 'Vřelý' : memoryData.audioTone === 'energetic' ? 'Energický' : memoryData.audioTone === 'deep' ? 'Hluboký' : 'Melodický'}</span>
                    </li>
                  </ul>
                </div>

                {/* Kinesthetic Card */}
                <div className="p-5 bg-slate-950/70 border border-rose-400/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Hand className="w-4 h-4" />
                      Kinestetický kód (K)
                    </span>
                    <span className="font-mono text-xs text-rose-300 font-bold tabular-nums">
                      Intenzita: {memoryData.intensity}/10
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                    <li className="flex justify-between">
                      <span className="text-slate-400">Místo v těle:</span>
                      <span className="font-semibold text-white">{memoryData.bodyLocation === 'chest' ? 'Hrudník/srdce' : memoryData.bodyLocation === 'solar' ? 'Solar plexus' : memoryData.bodyLocation === 'shoulders' ? 'Ramena/šíje' : 'Celé tělo'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Teplota:</span>
                      <span className="font-semibold text-white">{memoryData.temperature === 'warm' ? 'Hřejivé teplo' : memoryData.temperature === 'cool' ? 'Svěží chlad' : 'Neutrální'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-400">Dynamika:</span>
                      <span className="font-semibold text-white">{memoryData.movement === 'flowing' ? 'Proudí' : memoryData.movement === 'grounded' ? 'Klidné' : memoryData.movement === 'pulsing' ? 'Pulzující' : 'Pevná opora'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Lead System & NLP Coaching Synthesis */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  NLP Rozbor & Spouštěcí kanál (Lead System)
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  Tato vzpomínka je charakteristická tím, že je{' '}
                  <strong className="text-amber-300">
                    {memoryData.isAssociated ? 'plně asociovaná' : 'disasociovaná (s odstupem)'}
                  </strong>{' '}
                  a uložená jako{' '}
                  <strong className="text-white">
                    {memoryData.sizeFormat === 'panorama' ? 'širokoúhlá panoráma' : memoryData.sizeFormat}
                  </strong>{' '}
                  s {memoryData.brightness === 'bright' ? 'vysokým jasem' : 'přirozeným světlem'}.
                  Tento vizuální vjem okamžitě vyvolává kinestetickou reakci v oblasti{' '}
                  <strong className="text-rose-300">
                    {memoryData.bodyLocation === 'chest' ? 'hrudníku a srdce' : 'těla'}
                  </strong>{' '}
                  s intenzitou <span className="font-mono font-bold text-amber-400">{memoryData.intensity}/10</span>.
                </p>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1.5 text-xs text-amber-200">
                  <span className="font-bold block">Jak s touto mapou pracovat v běžném dni (Resource Anchoring):</span>
                  <p>
                    Kdykoliv budete před těžkým jednáním nebo výzvou potřebovat okamžitý přístup k tomuto stavu, stačí vteřinově promítnout obraz jako <strong>panorámu v plných barvách přímo před oči</strong> a nadechnout se do místa v hrudi. Tělesná fyziologie stav během 2 sekund zrcadlí.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: KVÍZ SMYSLOVÉ OSTROSTI & ŽIVÝ ANALYZÁTOR PREDIKÁTŮ */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Interactive Acuity Quiz (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-amber-400 font-semibold">
                Kvíz: Rozpoznání primárního systému v projevu
              </span>
              <span className="text-xs font-mono text-slate-400">
                Otázka {currentIdx + 1} ze {VAKOG_TRAINING_QUESTIONS.length}
              </span>
            </div>

            {/* Statement to analyze */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800/90 text-center space-y-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                Co říká komunikační partner:
              </span>
              <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {question.statement}
              </p>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => {
                const isSelected = selectedAnswer === opt.system;
                const isCorrect = opt.system === question.correctSystem;

                let style = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
                if (hasSubmitted) {
                  if (isCorrect) {
                    style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  style = 'bg-slate-900 border-amber-400 text-white font-bold shadow-md';
                }

                return (
                  <button
                    key={opt.system}
                    onClick={() => handleSelectOption(opt.system)}
                    disabled={hasSubmitted}
                    className={`p-4 rounded-xl text-left border transition-all text-sm flex items-start justify-between gap-2 ${style}`}
                  >
                    <div>
                      <span className="block font-bold">{opt.label}</span>
                      {hasSubmitted && (
                        <span className="text-xs text-slate-400 block mt-1 leading-relaxed">
                          {opt.explanation}
                        </span>
                      )}
                    </div>
                    {hasSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ideal Pacing Response Banner */}
            {hasSubmitted && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ideální odpověď se zrcadlením (Pacing):
                </span>
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  {question.idealPacingResponse}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex justify-end">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="px-5 py-2.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 disabled:opacity-50 transition-colors"
                >
                  Ověřit odpověď
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Další otázka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Live Text NLP Analyzer (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                Živý analyzátor vět & emailů
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Vložte libovolný text a zjistěte, v jakém smyslovém kódu člověk přemýšlí.
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                placeholder="Vložte větu nebo zprávu od klienta..."
              />

              <button
                onClick={handleAnalyzeCustom}
                disabled={isAnalyzing || !customText.trim()}
                className="w-full py-2.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAnalyzing ? 'Analyzuji smyslové kódy...' : 'Analyzovat VAKOG predikáty'}</span>
              </button>
            </div>

            {analyzedResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Dominantní reprezentační systém:</span>
                  <span className="text-sm font-bold text-amber-400">
                    {analyzedResult.dominantSystem}
                  </span>
                </div>

                {/* Progress bars */}
                {analyzedResult.vakogBreakdown && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Vizuální (V)</span>
                      <span className="font-mono text-white">{analyzedResult.vakogBreakdown.visualPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: `${analyzedResult.vakogBreakdown.visualPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Kinestetický (K)</span>
                      <span className="font-mono text-white">{analyzedResult.vakogBreakdown.kinestheticPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-400 h-full rounded-full"
                        style={{ width: `${analyzedResult.vakogBreakdown.kinestheticPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Auditivní (A)</span>
                      <span className="font-mono text-white">{analyzedResult.vakogBreakdown.auditoryPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-400 h-full rounded-full"
                        style={{ width: `${analyzedResult.vakogBreakdown.auditoryPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Auditivně-digitální (Ad)</span>
                      <span className="font-mono text-white">{analyzedResult.vakogBreakdown.digitalPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${analyzedResult.vakogBreakdown.digitalPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {analyzedResult.reframingAdvice && (
                  <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300">
                    <span className="font-bold text-amber-300 block mb-0.5">Doporučení pro rapport:</span>
                    {analyzedResult.reframingAdvice}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
