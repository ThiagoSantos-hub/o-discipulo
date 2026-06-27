import { supabase } from '@/lib/supabase'

export interface SpiritualProfile {
  id?: string
  user_id: string
  nome?: string
  foto_url?: string
  igreja?: string
  denominacao?: string
  ministerio?: string
  cargo?: string
  versao_biblia?: string
  objetivo_espiritual?: string
  frequencia_oracao?: string
  frequencia_leitura?: string
  idioma?: string
  fuso_horario?: string
}

export const profileService = {
  async getSpiritualProfile(userId: string): Promise<SpiritualProfile | null> {
    const { data, error } = await supabase
      .from('user_spiritual_profile')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) return null
    return data as SpiritualProfile
  },

  async createOrUpdateSpiritualProfile(profile: SpiritualProfile) {
    const { data, error } = await supabase
      .from('user_spiritual_profile')
      .upsert(profile, { onConflict: 'user_id' })
      .select()
      .single()

    return { data, error }
  },

  async ensureProfileExists(userId: string, defaultName?: string) {
    const existing = await this.getSpiritualProfile(userId)
    if (existing) return existing

    const newProfile: SpiritualProfile = {
      user_id: userId,
      nome: defaultName || '',
    }

    const { data } = await this.createOrUpdateSpiritualProfile(newProfile)
    return data
  },
}
