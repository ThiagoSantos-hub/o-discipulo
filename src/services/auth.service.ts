import { supabase } from '@/lib/supabase'
import type { AuthUser, AuthSession } from '@/contexts/AuthContext'

/**
 * Serviço de Autenticação - Infraestrutura pronta para uso futuro.
 * Não está integrado às telas ainda.
 */
export const authService = {
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password })
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    return await supabase.auth.signOut()
  },

  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email)
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser()
    return user as AuthUser | null
  },

  async getCurrentSession(): Promise<AuthSession | null> {
    const { data: { session } } = await supabase.auth.getSession()
    return session as AuthSession | null
  },
}
