import type { CounselorResponse, CounselorContext, ConversationTurn } from '@/ai/types';

/**
 * Camada de IA do Conselheiro Espiritual.
 * Esta camada é responsável por gerar respostas inteligentes.
 * Atualmente utiliza respostas mock. Futuramente integrará com OpenAI via Edge Function do Supabase.
 */
export const counselorAIService = {
  /**
   * Gera uma resposta do Conselheiro baseada no contexto do usuário.
   * @param userMessage Mensagem enviada pelo usuário
   * @param context Contexto completo do usuário (perfil, histórico, etc.)
   * @param conversationHistory Histórico recente da conversa atual
   */
  async generateResponse(
    userMessage: string,
    context: CounselorContext,
    conversationHistory: ConversationTurn[] = []
  ): Promise<CounselorResponse> {
    // TODO: No futuro, esta função enviará o prompt para uma Edge Function do Supabase
    // que fará a chamada para a OpenAI usando o system prompt + user prompt + contexto.

    // Resposta mock estruturada
    const mockResponse: CounselorResponse = {
      message: `Obrigado por compartilhar isso, ${context.userProfile.name}. Entendo que você está passando por um momento desafiador. Lembre-se de que Deus está perto dos que têm o coração quebrantado (Salmo 34:18). Quer que conversemos mais sobre isso?`,
      suggestedVerses: [
        {
          reference: 'Salmo 34:18',
          text: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito contrito.',
          explanation: 'Este versículo nos lembra que Deus não nos abandona nos momentos difíceis.',
        },
      ],
      suggestedActions: ['Ler o Salmo 34 hoje', 'Reservar alguns minutos para oração'],
      shouldOfferPrayerNotebook: userMessage.length > 60,
      followUpQuestions: ['Como você está se sentindo agora?', 'Gostaria de orarmos juntos?'],
    };

    return Promise.resolve(mockResponse);
  },
};
