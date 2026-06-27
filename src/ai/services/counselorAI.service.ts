import type { CounselorResponse, UserContext } from '@/ai/types';

/**
 * Serviço responsável por gerar respostas do Conselheiro Espiritual.
 * Atualmente retorna respostas mock. No futuro, esta camada chamará a OpenAI.
 */
export const counselorAIService = {
  async generateResponse(
    userMessage: string,
    userContext: UserContext
  ): Promise<CounselorResponse> {
    // TODO: Integrar com OpenAI usando counselorSystemPrompt + buildUserPrompt

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
