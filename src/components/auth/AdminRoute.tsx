import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let active = true
    async function check() {
      if (!user) { setChecking(false); return }
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      })
      if (!active) return
      setIsAdmin(!error && data === true)
      setChecking(false)
    }
    check()
    return () => { active = false }
  }, [user])

  if (loading || checking) {
    return <div className="flex justify-center items-center min-h-screen">Verificando permissões...</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
