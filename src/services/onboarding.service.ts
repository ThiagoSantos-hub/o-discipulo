import { supabase } from '@/lib/supabase'

export interface OnboardingData {
  preferred_name?: string
  daily_time_commitment?: string
  focus_areas?: string[]
  habit_to_overcome?: string
  preferred_devotional_time?: string
}

export const onboardingService = {
  async saveOnboarding(userId: string, data: OnboardingData) {
    const { error } = await supabase
      .from('user_onboarding')
      .upsert({
        user_id: userId,
        ...data,
        completed_at: new Date().toISOString(),
      })

    return { error }
  },

  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_onboarding')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (error || !data) return false
    return true
  },

  async getOnboardingData(userId: string) {
    const { data, error } = await supabase
      .from('user_onboarding')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) return null
    return data
  },
}
