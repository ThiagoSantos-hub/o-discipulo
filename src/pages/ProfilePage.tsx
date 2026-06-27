import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { onboardingService } from '@/services/onboarding.service'
import { supabase } from '@/lib/supabase'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [preferredName, setPreferredName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Carregar dados do onboarding
  useEffect(() => {
    const loadData = async () => {
      if (!user) return

      setLoading(true)
      const data = await onboardingService.getOnboardingData(user.id)
      setOnboardingData(data)

      if (data?.preferred_name) {
        setPreferredName(data.preferred_name)
      } else if (user.user_metadata?.full_name) {
        setPreferredName(user.user_metadata.full_name)
      }

      setLoading(false)
    }

    loadData()
  }, [user])

  const handleSaveName = async () => {
    if (!user || !preferredName.trim()) return

    const { error } = await onboardingService.saveOnboarding(user.id, {
      preferred_name: preferredName,
    })

    if (!error) {
      setIsEditing(false)
      // Recarregar dados
      const updated = await onboardingService.getOnboardingData(user.id)
      setOnboardingData(updated)
    } else {
      alert('Erro ao salvar nome. Tente novamente.')
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-[#A1A1AA]">Carregando perfil...</div>
      </div>
    )
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

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#A1A1AA]">Nome</label>
            <div className="flex gap-3 mt-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="flex-1 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5"
                  />
                  <Button onClick={handleSaveName} size="sm">Salvar</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">Cancelar</Button>
                </>
              ) : (
                <>
                  <div className="flex-1 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5">
                    {preferredName || 'Não informado'}
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                    Editar
                  </Button>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA]">E-mail</label>
            <div className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5 text-[#A1A1AA]">
              {user?.email}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#A1A1AA]">Membro desde</label>
              <div className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
              </div>
            </div>
            <div>
              <label className="text-sm text-[#A1A1AA]">Último acesso</label>
              <div className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-4 py-2.5">
                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR') : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações Espirituais */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Preferências Espirituais</h2>

        {onboardingData ? (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-[#333333]">
              <span className="text-[#A1A1AA]">Tempo diário desejado</span>
              <span>{onboardingData.daily_time_commitment || 'Não definido'} minutos</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#333333]">
              <span className="text-[#A1A1AA]">Horário preferido</span>
              <span>{onboardingData.preferred_devotional_time || 'Não definido'}</span>
            </div>
            <div className="py-2 border-b border-[#333333]">
              <div className="text-[#A1A1AA] mb-2">Áreas de foco</div>
              <div className="flex flex-wrap gap-2">
                {onboardingData.focus_areas?.length > 0 ? (
                  onboardingData.focus_areas.map((area: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-[#C9A962]/10 text-[#C9A962] rounded-full text-xs">
                      {area}
                    </span>
                  ))
                ) : (
                  <span className="text-[#A1A1AA]">Nenhuma área selecionada</span>
                )}
              </div>
            </div>
            {onboardingData.habit_to_overcome && (
              <div className="py-2">
                <div className="text-[#A1A1AA] mb-1">Hábito que deseja vencer</div>
                <div>{onboardingData.habit_to_overcome}</div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-[#A1A1AA]">Você ainda não completou o onboarding.</p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Minha Jornada</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-[#0F0F0F] rounded-2xl p-4">
            <div className="text-[#A1A1AA]">Dias consecutivos</div>
            <div className="text-2xl font-semibold mt-1">47</div>
          </div>
          <div className="bg-[#0F0F0F] rounded-2xl p-4">
            <div className="text-[#A1A1AA]">Conversas com o Conselheiro</div>
            <div className="text-2xl font-semibold mt-1">Em breve</div>
          </div>
          <div className="bg-[#0F0F0F] rounded-2xl p-4">
            <div className="text-[#A1A1AA]">Pedidos de oração</div>
            <div className="text-2xl font-semibold mt-1">Em breve</div>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Configurações</h2>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={() => alert('Funcionalidade de alterar senha em breve')}>
            Alterar senha
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-red-400 hover:text-red-400 border-red-900/50 hover:bg-red-950/20"
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  )
}
