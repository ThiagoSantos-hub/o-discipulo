import { supabase } from '@/lib/supabase'

export interface PrayerRequest {
  id?: string
  user_id: string
  titulo: string
  descricao?: string
  categoria?: string
  prioridade?: 'Baixa' | 'Media' | 'Alta'
  status?: 'Em oracao' | 'Respondida' | 'Arquivada'
  data_resposta?: string
  testemunho?: string
  created_at?: string
  updated_at?: string
}

export const prayerService = {
  async getPrayerRequests(userId: string, filters?: { status?: string; search?: string }) {
    let query = supabase
      .from('prayer_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'Todos') {
      query = query.eq('status', filters.status)
    }

    if (filters?.search) {
      query = query.ilike('titulo', `%${filters.search}%`)
    }

    const { data, error } = await query
    return { data: data || [], error }
  },

  async createPrayerRequest(request: Omit<PrayerRequest, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert(request)
      .select()
      .single()

    return { data, error }
  },

  async updatePrayerRequest(id: string, updates: Partial<PrayerRequest>) {
    const { data, error } = await supabase
      .from('prayer_requests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  async deletePrayerRequest(id: string) {
    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id)

    return { error }
  },

  async markAsAnswered(id: string, testemunho?: string) {
    return this.updatePrayerRequest(id, {
      status: 'Respondida',
      data_resposta: new Date().toISOString(),
      testemunho,
    })
  },

  async archiveRequest(id: string) {
    return this.updatePrayerRequest(id, { status: 'Arquivada' })
  },

  async getRecentPrayerRequests(userId: string, limit = 5) {
    const { data } = await supabase
      .from('prayer_requests')
      .select('titulo, descricao, status')
      .eq('user_id', userId)
      .eq('status', 'Em oracao')
      .order('created_at', { ascending: false })
      .limit(limit)

    return data || []
  },
}
