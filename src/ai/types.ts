export interface UserContext {
  userId: string;
  name: string;
  currentStreak: number;
  spiritualGoals: {
    bibleReading: { target: string; completedToday: boolean };
    prayer: { completedToday: boolean };
    devotional: { completedToday: boolean };
  };
  recentConversations: Array<{
    date: string;
    summary: string;
    topic: string;
  }>;
  prayerRequests: Array<{
    id: string;
    message: string;
    createdAt: string;
    sharedWithTeam: boolean;
  }>;
  lastLoginDaysAgo: number;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
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
}
