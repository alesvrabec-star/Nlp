import React, { useState, useEffect } from 'react';
import { DAILY_EXERCISES, NLP_PRESUPPOSITIONS } from '../data/nlpData';
import { DailyExercise, JournalEntry } from '../types/nlp';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Flame,
  ArrowRight,
  BookOpen,
  Send,
  Trash2,
  Target,
  Brain
} from 'lucide-react';

interface DailyGrowthViewProps {
  onStartScenario: () => void;
  onOpenSubmodalities: () => void;
  onOpenCircle: () => void;
}

export const DailyGrowthView: React.FC<DailyGrowthViewProps> = ({
  onStartScenario,
  onOpenSubmodalities,
  onOpenCircle,
}) => {
  const [exercises, setExercises] = useState<DailyExercise[]>(() => {
    const saved = localStorage.getItem('nlp_daily_exercises');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DAILY_EXERCISES;
      }
    }
    return DAILY_EXERCISES;
  });

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('nlp_streak');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('nlp_journal_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'entry-1',
        date: 'Včera, 18:30',
        technique: 'Zrcadlení a Pacing',
        insight: 'Na poradě jsem napodobil tempo dechu kolegy. Okamžitě přestal oponovat a začal spolupracovat.',
        moodRating: 9,
      },
      {
        id: 'entry-2',
        date: 'Před 2 dny',
        technique: 'Rozbití generalizace',
        insight: 'Místo „nikdy nic nestíhám“ jsem se zeptal: „Kdy naposledy jsem měl hotovo dříve?“ Úzkost klesla o 80 %.',
        moodRating: 8,
      },
    ];
  });

  const [newInsight, setNewInsight] = useState('');
  const [newTechnique, setNewTechnique] = useState('Reframing');

  // Random presupposition of the day
  const [todayPresupposition] = useState(() => {
    const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return NLP_PRESUPPOSITIONS[dayOfYear % NLP_PRESUPPOSITIONS.length];
  });

  useEffect(() => {
    localStorage.setItem('nlp_daily_exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('nlp_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const activeExercise = exercises[activeExerciseIndex] || exercises[0];

  const handleToggleComplete = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === id) {
          const updated = !ex.completed;
          if (updated) {
            setStreakDays((s) => {
              const next = s + 1;
              localStorage.setItem('nlp_streak', next.toString());
              return next;
            });
          }
          return { ...ex, completed: updated };
        }
        return ex;
      })
    );
  };

  const handleAddJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInsight.trim()) return;

    const entry: JournalEntry = {
      id: `entry-${Date.now()}`,
      date: 'Právě teď',
      technique: newTechnique,
      insight: newInsight.trim(),
      moodRating: 9,
    };

    setJournalEntries([entry, ...journalEntries]);
    setNewInsight('');
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const completedCount = exercises.filter((e) => e.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      {/* Hero Section with High-Fidelity Asset */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-amber-400 font-medium">
                <span>Denní tréninkový plán</span>
                <span aria-hidden="true">·</span>
                <span>Neuroplasticita a komunikace</span>
                <span aria-hidden="true">·</span>
                <span>Den {activeExercise.dayNumber} z 30</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Ovládněte jazyk své mysli a mistrovskou komunikaci
              </h1>

              <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                Neurolingvistické programování je věda o tom, jak naše myšlenky, jazykové vzorce a fyziologie vytvářejí naši realitu. Trénujte denně praktické mikroskopické návyky pro okamžitý vliv a vnitřní klid.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartScenario}
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 active:scale-95"
              >
                <span>Spustit interaktivní scénář</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCircle}
                className="px-5 py-2.5 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
              >
                Kruh dokonalosti (Kotva)
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_nlp_mind_clarity_1792958591178.jpg"
              alt="Neurolingvistické programování a kognitivní transformace"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/30 lg:to-transparent" />
          </div>
        </div>

        {/* 4-Column KPI / Progress Strip */}
        <div className="border-t border-slate-800/80 bg-slate-950/70 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          <div className="p-4 sm:p-5">
            <span className="block text-xs text-slate-400">Dny v řadě (Streak)</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-amber-400">
                {streakDays}
              </span>
              <span className="text-xs text-amber-400/80 flex items-center gap-1 font-medium">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                Aktivní tempo
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <span className="block text-xs text-slate-400">Dnešní splnění</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-white">
                {completedCount} / {exercises.length}
              </span>
              <span className="text-xs text-slate-400">cvičení</span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <span className="block text-xs text-slate-400">Zapsané vhledy</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-white">
                {journalEntries.length}
              </span>
              <span className="text-xs text-slate-400">záznamů v deníku</span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <span className="block text-xs text-slate-400">NLP Úroveň</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-sky-400">
                Practitioner
              </span>
              <span className="text-xs text-slate-400">Fáze II</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Today's Exercise & Presupposition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Today's Active Exercise */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400 font-semibold">Cvičení #{activeExercise.dayNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>Kategorie: {activeExercise.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeExercise.durationMinutes} minut</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {activeExercise.title}
                </h2>
              </div>

              <button
                onClick={() => handleToggleComplete(activeExercise.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeExercise.completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeExercise.completed ? 'Splněno dnes' : 'Označit za splněné'}</span>
              </button>
            </div>

            <p className="text-slate-300 text-base leading-relaxed italic">
              „{activeExercise.teaser}“
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-200">
                Kroky cvičení a postup:
              </h3>
              <div className="space-y-3">
                {activeExercise.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
                    <span className="w-6 h-6 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Dnešní mikro-výzva do praxe
              </span>
              <p className="text-sm text-slate-200 font-medium">
                {activeExercise.microChallenge}
              </p>
            </div>

            {/* Exercise Selector Strip */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>Výběr dne cvičení</span>
                <span>Zobrazeno {activeExerciseIndex + 1} ze 7 dnů</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {exercises.slice(0, 7).map((ex, index) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExerciseIndex(index)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                      activeExerciseIndex === index
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : ex.completed
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Den {ex.dayNumber} {ex.completed ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick NLP Reflection Journal */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  NLP Deník postřehů & vhledů
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Zaznamenejte si reakce lidí, úspěšné zrcadlení nebo přerušení starého vzorce.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddJournalEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Použitá technika</label>
                  <select
                    value={newTechnique}
                    onChange={(e) => setNewTechnique(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Reframing">Přeformátování (Reframing)</option>
                    <option value="Rapport & Zrcadlení">Rapport & Zrcadlení</option>
                    <option value="VAKOG Predikáty">VAKOG Predikáty</option>
                    <option value="Meta-Model otázka">Meta-Model otázka</option>
                    <option value="Kruh dokonalosti">Kruh dokonalosti (Kotva)</option>
                    <option value="Submodality">Změna submodalit</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Váš postřeh a výsledek</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInsight}
                      onChange={(e) => setNewInsight(e.target.value)}
                      placeholder="Např.: Kolega v hádce změnil tón, když jsem uznal jeho pozitivní záměr..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Uložit</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-amber-300">{entry.technique}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.date}</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {entry.insight}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Smazat záznam"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Daily Presupposition & Quick Tools */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: NLP Presupposition of the Day */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Brain className="w-4 h-4" />
              <span>Základní předpoklad NLP pro dnešek</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              „{todayPresupposition.title}“
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {todayPresupposition.description}
            </p>

            <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-amber-300 block">Praktická aplikace:</span>
              <p>{todayPresupposition.practicalTip}</p>
            </div>
          </div>

          {/* Quick Access Training Modules */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-semibold text-slate-200">
              Rychlé interaktivní trenažéry
            </h4>

            <div className="space-y-3">
              <button
                onClick={onOpenSubmodalities}
                className="w-full p-3.5 bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-amber-300 transition-colors">
                    Laboratoř submodalit (Swish)
                  </span>
                  <span className="text-xs text-slate-400">
                    Zmenšete a odbarvěte stresující myšlenku
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>

              <button
                onClick={onStartScenario}
                className="w-full p-3.5 bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-amber-300 transition-colors">
                    Tréninkový simulátor scénářů
                  </span>
                  <span className="text-xs text-slate-400">
                    Rozhovory s náročným klientem a kolegou
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>

              <button
                onClick={onOpenCircle}
                className="w-full p-3.5 bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-left flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-white block group-hover:text-amber-300 transition-colors">
                    Kruh dokonalosti
                  </span>
                  <span className="text-xs text-slate-400">
                    Vytvoření silné tělesné kotvy pro sebedůvěru
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
