export type TabType = 'daily' | 'scenarios' | 'submodalities' | 'perceptual' | 'circle' | 'reframing' | 'vakog' | 'library';

export interface DailyExercise {
  id: string;
  dayNumber: number;
  title: string;
  category: 'Rapport' | 'VAKOG' | 'Meta-Model' | 'Submodality' | 'Reframing' | 'Kotvení' | 'Cíle';
  durationMinutes: number;
  teaser: string;
  instructions: string[];
  microChallenge: string;
  reflectionPrompt: string;
  completed?: boolean;
}

export interface ScenarioStep {
  speaker: 'partner' | 'user';
  text: string;
  nlpFeedback?: {
    rapportScore: number;
    pacingObserved: string;
    dominantSystemDetected: string;
    tips: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  partnerName: string;
  partnerRole: string;
  context: string;
  learningGoal: string;
  initialMessage: string;
  suggestedApproaches: string[];
}

export interface SubmodalitiesState {
  title: string;
  // Visual
  size: number; // 10 to 100
  distance: number; // 1 to 10
  brightness: number; // 0 to 100
  colorSaturation: number; // 0 (black/white) to 100 (vivid)
  focus: number; // 0 (blurry) to 100 (sharp)
  isAssociated: boolean; // true = 1st person, false = watching oneself from outside
  hasFrame: boolean;
  isMoving: boolean; // still frame vs moving video
  // Auditory
  volume: number; // 0 to 100
  tempo: number; // 50 to 150
  pitch: 'deep' | 'normal' | 'silly';
  // State impact
  intensityScore: number; // 1 to 10
}

export interface VakogQuestion {
  id: string;
  statement: string;
  options: {
    system: 'V' | 'A' | 'K' | 'Ad';
    label: string;
    explanation: string;
  }[];
  correctSystem: 'V' | 'A' | 'K' | 'Ad';
  idealPacingResponse: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  technique: string;
  insight: string;
  moodRating: number;
}
