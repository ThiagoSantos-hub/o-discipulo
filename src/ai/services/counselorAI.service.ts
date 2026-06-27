import type { CounselorResponse, CounselorContext, ConversationTurn } from '@/ai/types';
import { createClient } from '@supabase/supabase-js';

// Cliente Supabase (usando variáveis de ambiente do Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Camada de IA do Conselheiro Espiritual.
 * Esta camada chama a Edge Function do Supabase, que por sua vez chama a OpenAI.
 */
export const counselorAIService = {
  async generateResponse(
    userMessage: string,
    context: CounselorContext,
    conversationHistory: ConversationTurn[] = []
  ): Promise<CounselorResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('counselor-chat', {
        body: {
          userId: context.userProfile.userId,
          message: userMessage,
          context,
          conversationHistory,
        },
      });

      if (error) {
        console.error('Error calling counselor-chat function:', error);
        throw error;
      }

      return {
        message: data.message || 'Desculpe, não consegui processar sua mensagem agora.',
        suggestedVerses: data.suggestedVerses || [],
        suggestedActions: data.suggestedActions || [],
        shouldOfferPrayerNotebook: data.shouldOfferPrayerNotebook || false,
      };
    } catch (error) {
      console.error('counselorAIService error:', error);
      
      // Fallback em caso de erro
      return {
        message: 'Estou aqui para te ouvir. Pode me contar o que está acontecendo?',
        suggestedActions: ['Tentar novamente em alguns instantes'],
      };
    }
  },
};
