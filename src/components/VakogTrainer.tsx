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
  Search
} from 'lucide-react';

export const VakogTrainer: React.FC = () => {
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
      const data = await res.json();
      setAnalyzedResult(data.result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>Smyslová ostrost (Sensory Acuity)</span>
            <span aria-hidden="true">·</span>
            <span>Reprezentační systémy VAKOG</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            VAKOG Trenažér & Detektor predikátů
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Lidé nevnímají svět stejně: Vizuální lidé myslí v obrazech, auditivní ve slovech a tónech, kinestetičtí v tělesných pocitech. Rychlé naladění na jejich kód je tajemstvím okamžitého raportu.
          </p>
        </div>

        <div className="flex items-center gap-4 border border-slate-800 bg-slate-900/80 px-4 py-2 rounded-xl text-xs">
          <span className="text-slate-400">Úspěšnost v kvízu:</span>
          <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
            {score} / {VAKOG_TRAINING_QUESTIONS.length}
          </span>
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

      {/* Main Grid: Quiz & Live Predicate Tool */}
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
    </div>
  );
};
