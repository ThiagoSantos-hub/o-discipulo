import { createClient } from '@supabase/supabase-js';

import type { UserSpiritualProfile } from '@/ai/types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Serviço centralizado de Memória Espiritual.
 * Responsável por construir e manter o Perfil Espiritual Inteligente do usuário.
 */
export const memoryService = {
  /**
   * Retorna o perfil espiritual completo do usuário com goals e atividades recentes.
   */
  async getUserSpiritualProfile(userId: string): Promise<UserSpiritualProfile | null> {
    const { data: profileData, error: profileError } = await supabase
      .from('user_spiritual_memory')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError || !profileData) return null;

    // Buscar objetivos espirituais ativos
    const { data: goals } = await supabase
      .from('spiritual_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    return {
      ...profileData,
      spiritualGoals: goals || [],
    } as UserSpiritualProfile;
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
