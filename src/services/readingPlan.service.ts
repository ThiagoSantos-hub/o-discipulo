import { supabase } from '@/lib/supabase'

export interface ReadingPlan {
  id?: string
  user_id: string
  plano_nome: string
  objetivo?: string
  progresso?: number
  leitura_atual?: string
  data_inicio?: string
  data_fim?: string
  ultimo_acesso?: string
  created_at?: string
  updated_at?: string
}

export const readingPlanService = {
  async getActivePlan(userId: string) {
    const { data, error } = await supabase
      .from('reading_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) return null
    return data as ReadingPlan
  },

  async createPlan(plan: Omit<ReadingPlan, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('reading_plans')
      .insert(plan)
      .select()
      .single()

    return { data, error }
  },

  async updateProgress(id: string, progresso: number, leitura_atual?: string) {
    const { data, error } = await supabase
      .from('reading_plans')
      .update({
        progresso,
        leitura_atual,
        ultimo_acesso: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  async markReadingCompleted(id: string, nextReading?: string) {
    const { data, error } = await supabase
      .from('reading_plans')
      .update({
        leitura_atual: nextReading || '',
        progresso: supabase.rpc('increment_progress', { plan_id: id }), // if function exists, or manual
        ultimo_acesso: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  async restartPlan(id: string) {
    const { data, error } = await supabase
      .from('reading_plans')
      .update({
        progresso: 0,
        leitura_atual: '',
        data_inicio: new Date().toISOString(),
        ultimo_acesso: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  // Para integração com o Conselheiro
  async getReadingProgress(userId: string) {
    const plan = await this.getActivePlan(userId)
    if (!plan) return null

    return {
      plano_nome: plan.plano_nome,
      progresso: plan.progresso || 0,
      leitura_atual: plan.leitura_atual,
      objetivo: plan.objetivo,
    }
  },
}
