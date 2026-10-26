import React, { useState } from 'react';
import { TabType } from './types/nlp';
import { TopBar } from './components/TopBar';
import { DailyGrowthView } from './components/DailyGrowthView';
import { ScenariosView } from './components/ScenariosView';
import { SubmodalitiesLab } from './components/SubmodalitiesLab';
import { PerceptualPositionsLab } from './components/PerceptualPositionsLab';
import { CircleOfExcellenceLab } from './components/CircleOfExcellenceLab';
import { VakogTrainer } from './components/VakogTrainer';
import { ReframingEngine } from './components/ReframingEngine';
import { LibraryView } from './components/LibraryView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const handleQuickStart = () => {
    setActiveTab('scenarios');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar adhering strictly to 3-Zone Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onQuickStart={handleQuickStart}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'daily' && (
          <DailyGrowthView
            onStartScenario={() => setActiveTab('scenarios')}
            onOpenSubmodalities={() => setActiveTab('submodalities')}
            onOpenCircle={() => setActiveTab('circle')}
          />
        )}

        {activeTab === 'scenarios' && <ScenariosView />}

        {activeTab === 'submodalities' && <SubmodalitiesLab />}

        {activeTab === 'perceptual' && <PerceptualPositionsLab />}

        {activeTab === 'circle' && <CircleOfExcellenceLab />}

        {activeTab === 'vakog' && <VakogTrainer />}

        {activeTab === 'reframing' && <ReframingEngine />}

        {activeTab === 'library' && <LibraryView />}
      </main>

      {/* Clean, quiet human footer compliant with anti-slop rules */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">NLP Master</span>
            <span aria-hidden="true">·</span>
            <span>Trénink neurolingvistického programování a každodenní rozvoj</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('daily')}
              className="hover:text-slate-200 transition-colors"
            >
              Denní plán
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className="hover:text-slate-200 transition-colors"
            >
              Scénáře
            </button>
            <button
              onClick={() => setActiveTab('reframing')}
              className="hover:text-slate-200 transition-colors"
            >
              Reframing Engine
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className="hover:text-slate-200 transition-colors"
            >
              NLP Knihovna
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
