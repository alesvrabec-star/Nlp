import React from 'react';
import { TabType } from '../types/nlp';

interface TopBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onQuickStart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onQuickStart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('daily')}
          className="text-xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-left"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          NLP Master
        </button>

        {/* Zone 2: 4–5 single-line clean text links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('daily')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'daily'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Denní plán
          </button>
          <button
            onClick={() => onSelectTab('scenarios')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'scenarios'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Scénáře
          </button>
          <button
            onClick={() => onSelectTab('submodalities')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'submodalities'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Laboratoř submodalit
          </button>
          <button
            onClick={() => onSelectTab('perceptual')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'perceptual'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            3 Pozice vnímání
          </button>
          <button
            onClick={() => onSelectTab('circle')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'circle'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Kruh dokonalosti
          </button>
          <button
            onClick={() => onSelectTab('vakog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'vakog'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            VAKOG trenažér
          </button>
          <button
            onClick={() => onSelectTab('library')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'library'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Knihovna
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickStart}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg hover:from-amber-300 hover:to-amber-200 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/10"
          >
            Rychlý trénink
          </button>
        </div>
      </div>
    </header>
  );
};
