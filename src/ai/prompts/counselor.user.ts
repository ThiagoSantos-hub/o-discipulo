import type { CounselorContext, ConversationTurn } from '@/ai/types';

export function buildUserPrompt(
  userMessage: string,
  context: CounselorContext,
  conversationHistory: ConversationTurn[]
): string {
  const historyText = conversationHistory
    .slice(-6)
    .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Conselheiro'}: ${msg.content}`)
    .join('\n');

  return `Contexto do usuário:
- Nome: ${context.userProfile.name}
- Dias sem acessar: ${context.lastInteractionDaysAgo}

Histórico recente de conversas:
${historyText || 'Nenhuma conversa recente'}

Mensagem atual do usuário:
${userMessage}

Responda como o Conselheiro Espiritual seguindo todas as regras do system prompt.`;
}
