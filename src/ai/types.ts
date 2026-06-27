export interface SpiritualGoal {
  id: string;
  type: 'bible_reading' | 'prayer' | 'devotional' | 'verse_memorization' | 'study' | 'other';
  description: string;
  target?: string;
  completedToday: boolean;
  streak: number;
}

export interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    suggestedVerses?: string[];
    emotionalTone?: string;
  };
}

export interface ConversationSession {
  id: string;
  startedAt: string;
  endedAt?: string;
  turns: ConversationTurn[];
  summary?: string;
  mainTopic?: string;
}

export interface UserSpiritualProfile {
  userId: string;
  name: string;
  currentStreak: number;
  totalDaysActive: number;
  lastActiveAt: string;
  spiritualGoals: SpiritualGoal[];
  favoriteVerses: string[];
  recentPrayerRequests: Array<{
    id: string;
    message: string;
    createdAt: string;
    isShared: boolean;
  }>;
  recentStudies: Array<{
    id: string;
    title: string;
    completedAt: string;
  }>;
  emotionalStateHistory: Array<{
    date: string;
    state: string;
    note?: string;
  }>;
}

export interface CounselorContext {
  userProfile: UserSpiritualProfile;
  recentSessions: ConversationSession[];
  currentSession?: ConversationSession;
  lastInteractionDaysAgo: number;
}

export interface CounselorResponse {
  message: string;
  suggestedVerses?: Array<{
    reference: string;
    text: string;
    explanation?: string;
  }>;
  suggestedActions?: string[];
  shouldOfferPrayerNotebook?: boolean;
  followUpQuestions?: string[];
}

export interface AIRequest {
  userMessage: string;
  context: CounselorContext;
  conversationHistory: ConversationTurn[];
}
