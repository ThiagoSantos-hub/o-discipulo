import type { CounselorResponse, UserContext, ConversationMessage } from '@/ai/types';
import { counselorSystemPrompt } from '@/ai/prompts/counselor.system';
import { buildUserPrompt } from '@/ai/prompts/counselor.user';

/**
 * Serviço responsável por gerar respostas do Conselheiro Espiritual.
 * Atualmente retorna respostas mock. No futuro, esta camada chamará a OpenAI.
 */
export const counselorAIService = {
  async generateResponse(
    userMessage: string,
    userContext: UserContext,
    conversationHistory: ConversationMessage[] = []
  ): Promise<CounselorResponse> {
    // TODO: Substituir por chamada real à OpenAI usando o system prompt + user prompt
    // const systemPrompt = counselorSystemPrompt;
    // const userPrompt = buildUserPrompt(userMessage, userContext, conversationHistory);

    // Resposta mock por enquanto
    const mockResponse: CounselorResponse = {
      message: `Obrigado por compartilhar isso, ${userContext.name}. Entendo que você está passando por um momento desafiador. Lembre-se de que Deus está perto dos que têm o coração quebrantado (Salmo 34:18). Quer que conversemos mais sobre isso ou prefere que eu ore com você agora?`,
      suggestedVerses: [
        {
          reference: 'Salmo 34:18',
          text: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito contrito.',
          explanation: 'Este versículo nos lembra que Deus não nos abandona nos momentos de dor.',
        },
      ],
      suggestedActions: ['Ler o Salmo 34', 'Reservar 10 minutos para oração hoje'],
      shouldOfferPrayerNotebook: userMessage.toLowerCase().includes('orar') || userMessage.length > 80,
    };

    return Promise.resolve(mockResponse);
  },
};
