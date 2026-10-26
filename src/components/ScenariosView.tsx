import React, { useState } from 'react';
import { PRESET_SCENARIOS } from '../data/nlpData';
import { Scenario, ScenarioStep } from '../types/nlp';
import {
  Send,
  RotateCcw,
  Sparkles,
  User,
  Bot,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Plus
} from 'lucide-react';

export const ScenariosView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(PRESET_SCENARIOS[0]);
  const [conversation, setConversation] = useState<ScenarioStep[]>([
    {
      speaker: 'partner',
      text: PRESET_SCENARIOS[0].initialMessage,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(true);

  // Custom scenario modal/form state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [customInitial, setCustomInitial] = useState('');

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setConversation([
      {
        speaker: 'partner',
        text: scenario.initialMessage,
      },
    ]);
    setUserInput('');
  };

  const handleResetConversation = () => {
    setConversation([
      {
        speaker: 'partner',
        text: selectedScenario.initialMessage,
      },
    ]);
    setUserInput('');
  };

  const handleCreateCustomScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customRole || !customInitial) return;

    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      subtitle: `Vlastní trénink: ${customRole}`,
      partnerName: 'Komunikační partner',
      partnerRole: customRole,
      context: 'Vlastní reálná situace navržená uživatelem pro nácvik NLP technik.',
      learningGoal: 'Otestovat a uplatnit NLP principy (Rapport, VAKOG, Pacing, Meta-model) ve vaší specifické situaci.',
      initialMessage: customInitial,
      suggestedApproaches: [
        'Nejprve uznejte jeho pohled (Pacing), neoponujte hned.',
        'Položte ověřovací Meta-model otázku.',
        'Použijte smyslové zrcadlení.'
      ],
    };

    setSelectedScenario(newScenario);
    setConversation([
      {
        speaker: 'partner',
        text: newScenario.initialMessage,
      },
    ]);
    setIsCustomMode(false);
    setCustomTitle('');
    setCustomRole('');
    setCustomInitial('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const currentInput = userInput.trim();
    setUserInput('');

    // Append user step
    const updatedHistory = [
      ...conversation,
      { speaker: 'user' as const, text: currentInput },
    ];
    setConversation(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/nlp/scenario-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          scenarioTitle: selectedScenario.title,
          partnerRole: selectedScenario.partnerRole,
          history: updatedHistory.map((s) => ({
            role: s.speaker,
            text: s.text,
          })),
          userReply: currentInput,
        }),
      });

      const data = await response.json();

      if (data.partnerResponse) {
        setConversation([
          ...updatedHistory,
          {
            speaker: 'partner',
            text: data.partnerResponse,
            nlpFeedback: data.nlpFeedback,
          },
        ]);
      }
    } catch (err) {
      console.error('Error during scenario turn:', err);
      // Fallback
      setConversation([
        ...updatedHistory,
        {
          speaker: 'partner',
          text: 'Rozumím tvému postoji. Zní to rozumně, ale stále vnímám několik sporných bodů.',
          nlpFeedback: {
            rapportScore: 80,
            pacingObserved: 'Uznání pohledu před argumentací.',
            dominantSystemDetected: 'Kinestetický',
            tips: 'Zkuste zrcadlit klíčové slovo partnera a zakončit otevřenou ověřovací otázkou.',
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTemplate = (template: string) => {
    setUserInput(template);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header and Scenario Selector */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <span>Interaktivní NLP simulátor</span>
              <span aria-hidden="true">·</span>
              <span>Reálné konverzační scénáře</span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Trenažér dialogu a zvládání námitek
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Trénujte navazování raportu, přizpůsobení a vedení (Pacing & Leading) a kladení otázek Meta-modelu v reálném čase s okamžitým NLP vyhodnocením každé odpovědi.
            </p>
          </div>

          <button
            onClick={() => setIsCustomMode(!isCustomMode)}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>{isCustomMode ? 'Zpět na scénáře' : 'Vytvořit vlastní scénář'}</span>
          </button>
        </div>

        {/* Custom Scenario Form */}
        {isCustomMode && (
          <form onSubmit={handleCreateCustomScenario} className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Vlastní konverzační partner a situace</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Název situace / téma</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Např.: Rozhovor s naštvaným sousedem"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Role partnera</label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Např.: Podrážděný soused stěžující si na hluk"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Úvodní replika partnera (výzva)</label>
              <textarea
                value={customInitial}
                onChange={(e) => setCustomInitial(e.target.value)}
                placeholder="Co vám partner řekne jako první na začátku rozhovoru..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300"
              >
                Spustit tento scénář
              </button>
            </div>
          </form>
        )}

        {/* Preset Selector Tabs */}
        {!isCustomMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedScenario.id === sc.id
                    ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-500/5'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <span className="text-xs text-amber-400/90 font-medium block truncate">
                  {sc.partnerRole}
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5 truncate">
                  {sc.title}
                </span>
                <span className="text-xs text-slate-400 block mt-1 line-clamp-2 leading-relaxed">
                  {sc.subtitle}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Sandbox: 2-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dialogue View (7 cols) */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col h-[650px] shadow-lg overflow-hidden">
          {/* Scenario Info Bar */}
          <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-amber-300">{selectedScenario.partnerName}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedScenario.partnerRole}</span>
              </div>
              <h2 className="text-sm font-bold text-white mt-0.5">
                {selectedScenario.title}
              </h2>
            </div>

            <button
              onClick={handleResetConversation}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
              title="Začít scénář od začátku"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetovat</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
            {conversation.map((step, idx) => (
              <div key={idx} className="space-y-3">
                <div
                  className={`flex items-start gap-3 ${
                    step.speaker === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {step.speaker === 'partner' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      step.speaker === 'user'
                        ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-xs'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <p>{step.text}</p>
                  </div>

                  {step.speaker === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
                      <span className="text-xs font-bold font-mono">Já</span>
                    </div>
                  )}
                </div>

                {/* NLP Feedback Box for Partner's reply to User's previous reply */}
                {step.nlpFeedback && (
                  <div className="ml-11 mr-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        NLP Zpětná vazba na vaši repliku
                      </span>
                      <div className="flex items-center gap-3">
                        <span>Rapport skóre:</span>
                        <span className="font-mono tabular-nums font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                          {step.nlpFeedback.rapportScore}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                      <div>
                        <span className="text-slate-400 block">Pacing / Ladění:</span>
                        <span>{step.nlpFeedback.pacingObserved}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Detekovaný systém:</span>
                        <span className="font-semibold text-amber-300">
                          {step.nlpFeedback.dominantSystemDetected}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200">
                      <span className="font-bold">Tip trenéra: </span>
                      {step.nlpFeedback.tips}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-xs text-slate-400 italic py-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Partner promýšlí vaši odpověď a NLP trenér analyzuje techniku...</span>
              </div>
            )}
          </div>

          {/* Dialogue Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Napište svoji odpověď (využijte zrcadlení, pacing nebo otázku Meta-modelu)..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="px-5 py-3 bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0"
            >
              <span>Odeslat</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* NLP Strategy & Suggestions Deck (5 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Learning Goal Card */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Cíl nácviku ve scénáři
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedScenario.learningGoal}
            </p>
          </div>

          {/* Suggested Approaches */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Doporučené formulace & šablony
              </h3>
              <button
                onClick={() => setShowTips(!showTips)}
                className="text-xs text-slate-400 hover:text-white"
              >
                {showTips ? 'Skrýt' : 'Zobrazit'}
              </button>
            </div>

            {showTips && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Kliknutím vložíte NLP šablonu do pole pro odpověď:
                </p>
                {selectedScenario.suggestedApproaches.map((app, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyTemplate(app)}
                    className="w-full text-left p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-xs text-slate-300 leading-relaxed group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{app}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick NLP Rules for High Rapport */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3 Zlatá pravidla Rapportu
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Nikdy neříkejte „Ale“:</strong> Místo toho použijte spojení „A zároveň...“ nebo „A když k tomu přidáme...“.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Pacing před Leadingem:</strong> Nejdříve alespoň 2 větami potvrďte jeho pohled, až pak navrhněte změnu.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Smyslová shoda:</strong> Pokud říká „vidím v tom problém“, odpovězte „pojďme se na to podívat podrobněji“.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
