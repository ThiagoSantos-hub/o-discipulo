import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

export function ProfilePage() {
  const { user, signOut, refreshUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [username, setUsername] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [spiritualProfile, setSpiritualProfile] = useState<any>(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false)
        return
      }
      setLoading(true)

      const { data: profileData } = await supabase
        .from('user_spiritual_profile')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setSpiritualProfile(profileData)
      setUsername(user.user_metadata?.username || '')
      setLoading(false)
    }

    loadProfile()
  }, [user])

  const handleSavePersonalData = async () => {
    if (!user) return
    setSaving(true)

    const { error } = await supabase.auth.updateUser({
      data: {
        username: username,
        full_name: username
      }
    })

    if (!error) {
      await refreshUser() // Chama getUser + setUser internamente
      alert('Nome de usuário atualizado com sucesso!')
    } else {
      alert('Erro ao salvar: ' + error.message)
    }

    setSaving(false)
  }

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      alert('A nova senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('A confirmação da senha não coincide.')
      return
    }

    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSaving(false)

    if (error) {
      alert('Erro ao alterar senha: ' + error.message)
    } else {
      alert('Senha alterada com sucesso!')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  const handleConfigureSpiritualProfile = () => {
    alert('Abrindo fluxo de onboarding espiritual...')
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Carregando perfil...</div>
  }

  if (!user) {
    return <div className="max-w-3xl mx-auto text-center py-12">Acesso restrito</div>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Meu Perfil</h1>
        <p className="text-[#A1A1AA] mt-1">Gerencie sua conta</p>
      </div>

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#A1A1AA] mb-1">Nome de usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm text-[#A1A1AA] mb-1">E-mail</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5 text-[#A1A1AA] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-[#A1A1AA] mb-1">Membro desde</label>
            <div className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5 text-[#A1A1AA]">
              {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
            </div>
          </div>

          <Button onClick={handleSavePersonalData} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </div>

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Segurança</h2>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-[#A1A1AA] mb-1">Nova senha</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5 pr-12"
              placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-9 text-[#A1A1AA] hover:text-white"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm text-[#A1A1AA] mb-1">Confirmar nova senha</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-9 text-[#A1A1AA] hover:text-white"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button onClick={handleChangePassword} disabled={saving}>
            {saving ? 'Alterando...' : 'Alterar senha'}
          </Button>
        </div>
      </div>

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Perfil Espiritual</h2>

        {spiritualProfile ? (
          <div className="text-sm space-y-2">
            <p><span className="text-[#A1A1AA]">Nome:</span> {spiritualProfile.nome || 'Não informado'}</p>
            <p><span className="text-[#A1A1AA]">Igreja:</span> {spiritualProfile.igreja || 'Não informado'}</p>
          </div>
        ) : (
          <div>
            <p className="text-[#A1A1AA] mb-4">Você ainda não configurou seu perfil espiritual.</p>
            <Button onClick={handleConfigureSpiritualProfile}>Configurar Perfil Espiritual</Button>
          </div>
        )}
      </div>

      <div>
        <Button variant="outline" className="w-full text-red-400" onClick={handleLogout}>Sair da conta</Button>
      </div>
    </div>
  )
}
