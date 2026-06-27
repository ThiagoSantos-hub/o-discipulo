import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { onboardingService } from '@/services/onboarding.service'
import { profileService, SpiritualProfile } from '@/services/profile.service'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [spiritualProfile, setSpiritualProfile] = useState<SpiritualProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)

      const [onboarding, profile] = await Promise.all([
        onboardingService.getOnboardingData(user.id),
        profileService.ensureProfileExists(user.id, user.user_metadata?.full_name)
      ])

      setOnboardingData(onboarding)
      setSpiritualProfile(profile)

      setLoading(false)
    }

    loadData()
  }, [user])

  const handleSaveSpiritualProfile = async () => {
    if (!user || !spiritualProfile) return

    const { error } = await profileService.createOrUpdateSpiritualProfile(spiritualProfile)

    if (!error) {
      setIsEditing(false)
      alert('Perfil espiritual salvo com sucesso!')
    } else {
      alert('Erro ao salvar perfil. Tente novamente.')
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
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
        <p className="text-[#A1A1AA] mt-1">Gerencie suas informações pessoais e preferências espirituais</p>
      </div>

      {/* Dados Pessoais */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
        <div className="space-y-4 text-sm">
          <div>E-mail: {user.email}</div>
          <div>Membro desde: {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}</div>
        </div>
      </div>

      {/* Perfil Espiritual */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Perfil Espiritual</h2>
          {!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Editar</Button>}
        </div>

        {spiritualProfile && (
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm text-[#A1A1AA]">Nome</label>
                  <input type="text" value={spiritualProfile.nome || ''} onChange={(e) => setSpiritualProfile({...spiritualProfile, nome: e.target.value})} className="w-full mt-1 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2" />
                </div>
                <div>
                  <label className="text-sm text-[#A1A1AA]">Igreja</label>
                  <input type="text" value={spiritualProfile.igreja || ''} onChange={(e) => setSpiritualProfile({...spiritualProfile, igreja: e.target.value})} className="w-full mt-1 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2" />
                </div>

                <div className="flex gap-3 mt-4">
                  <Button onClick={handleSaveSpiritualProfile}>Salvar</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                </div>
              </>
            ) : (
              <div className="space-y-3 text-sm">
                <div><span className="text-[#A1A1AA]">Nome:</span> {spiritualProfile.nome || 'Não informado'}</div>
                <div><span className="text-[#A1A1AA]">Igreja:</span> {spiritualProfile.igreja || 'Não informado'}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Informações do Onboarding */}
      {onboardingData && (
        <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4">Preferências do Onboarding</h2>
          <div className="space-y-2 text-sm">
            <div>Tempo diário: {onboardingData.daily_time_commitment || 'Não definido'}</div>
            <div>Horário preferido: {onboardingData.preferred_devotional_time || 'Não definido'}</div>
          </div>
        </div>
      )}

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <Button variant="outline" className="w-full text-red-400" onClick={handleLogout}>Sair da conta</Button>
      </div>
    </div>
  )
}
