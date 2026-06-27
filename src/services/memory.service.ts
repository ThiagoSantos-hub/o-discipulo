import { createClient } from '@supabase/supabase-js';

import type { UserSpiritualProfile } from '@/ai/types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Serviço centralizado de Memória Espiritual.
 * Usado pelo Conselheiro e futuramente por outros módulos.
 */
export const memoryService = {
  async getUserSpiritualProfile(userId: string): Promise<UserSpiritualProfile | null> {
    const { data, error } = await supabase
      .from('user_spiritual_memory')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return null;

    // TODO: Buscar goals, activities, etc. e montar o objeto completo
    return data as UserSpiritualProfile;
  },

  async getRecentConversationHistory(userId: string, limit = 10) {
    const { data } = await supabase
      .from('conversation_sessions')
      .select(`
        *,
        conversation_turns (*)
      `)
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(limit);

    return data || [];
  },

  async saveConversationTurn(sessionId: string, role: 'user' | 'assistant', content: string, metadata?: any) {
    await supabase.from('conversation_turns').insert({
      session_id: sessionId,
      role,
      content,
      metadata,
    });
  },
};
