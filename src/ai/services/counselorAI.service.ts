import type { CounselorResponse, CounselorContext, ConversationTurn } from '@/ai/types';
import { createClient } from '@supabase/supabase-js';
import { profileService } from '@/services/profile.service';
import { prayerService } from '@/services/prayer.service';
import { readingPlanService } from '@/services/readingPlan.service';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const counselorAIService = {
  async generateResponse(
    userMessage: string,
    context: CounselorContext,
    conversationHistory: ConversationTurn[] = []
  ): Promise<CounselorResponse> {
    try {
      let spiritualProfile = null;
      let recentPrayers: any[] = [];
      let readingProgress = null;

      if (context?.userProfile?.userId) {
        spiritualProfile = await profileService.getSpiritualProfile(context.userProfile.userId);
        recentPrayers = await prayerService.getRecentPrayerRequests(context.userProfile.userId);
        readingProgress = await readingPlanService.getReadingProgress(context.userProfile.userId);
      }

      const { data, error } = await supabase.functions.invoke('counselor-chat', {
        body: {
          userId: context?.userProfile?.userId,
          message: userMessage,
          context,
          spiritualProfile,
          recentPrayers,
          readingProgress,
          conversationHistory,
        },
      });

      if (error) throw error;

      return {
        message: data.message || 'Desculpe, não consegui processar sua mensagem agora.',
        suggestedVerses: data.suggestedVerses || [],
        suggestedActions: data.suggestedActions || [],
        shouldOfferPrayerNotebook: data.shouldOfferPrayerNotebook || false,
      };
    } catch (error) {
      return {
        message: 'Estou aqui para te ouvir. Pode me contar o que está acontecendo?',
        suggestedActions: ['Tentar novamente em alguns instantes'],
      };
    }
  },
};
