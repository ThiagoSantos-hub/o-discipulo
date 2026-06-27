import type { UserContext, ConversationMessage } from '@/ai/types';

export function buildUserPrompt(
  userMessage: string,
  context: UserContext,
  conversationHistory: ConversationMessage[]
): string {
  const historyText = conversationHistory
    .slice(-6) // últimas 6 mensagens para contexto
    .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Conselheiro'}: ${msg.content}`)
    .join('\n');

  return `Contexto do usuário:
- Nome: ${context.name}
- Dias sem acessar: ${context.lastLoginDaysAgo}
- Objetivos espirituais atuais:
  - Leitura bíblica: ${context.spiritualGoals.bibleReading.target} (hoje: ${context.spiritualGoals.bibleReading.completedToday ? 'concluído' : 'pendente'})
  - Oração: ${context.spiritualGoals.prayer.completedToday ? 'concluído' : 'pendente'}
  - Devocional: ${context.spiritualGoals.devotional.completedToday ? 'concluído' : 'pendente'}

Histórico recente de conversas:
${historyText || 'Nenhuma conversa recente'}

Mensagem atual do usuário:
${userMessage}

Responda como o Conselheiro Espiritual seguindo todas as regras do system prompt.`;
}
