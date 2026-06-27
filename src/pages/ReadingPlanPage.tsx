import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { readingPlanService, ReadingPlan } from '@/services/readingPlan.service'
import { Button } from '@/components/ui/Button'

export default function ReadingPlanPage() {
  const { user } = useAuth()
  const [plan, setPlan] = useState<ReadingPlan | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPlan = async () => {
    if (!user) return
    setLoading(true)
    const data = await readingPlanService.getActivePlan(user.id)
    setPlan(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPlan()
  }, [user])

  const startNewPlan = async () => {
    if (!user) return
    const newPlan = {
      user_id: user.id,
      plano_nome: 'Plano de Leitura Bíblica 2026',
      objetivo: 'Ler a Bíblia em um ano',
      progresso: 0,
      leitura_atual: 'Gênesis 1',
    }
    await readingPlanService.createPlan(newPlan as any)
    loadPlan()
  }

  const markCompleted = async () => {
    if (!plan) return
    // Simple progress increment
    const newProgress = Math.min((plan.progresso || 0) + 1, 100)
    await readingPlanService.updateProgress(plan.id!, newProgress, 'Êxodo 1')
    loadPlan()
  }

  const restartPlan = async () => {
    if (!plan) return
    await readingPlanService.restartPlan(plan.id!)
    loadPlan()
  }

  if (loading) return <div className="p-8">Carregando Plano de Leitura...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Plano de Leitura Bíblica</h1>

      {!plan ? (
        <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-8 text-center">
          <p className="mb-6 text-[#A1A1AA]">Você ainda não iniciou um plano de leitura.</p>
          <Button onClick={startNewPlan}>Iniciar Plano de Leitura</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-2">{plan.plano_nome}</h2>
            <p className="text-[#A1A1AA]">{plan.objetivo}</p>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span>{plan.progresso || 0}%</span>
              </div>
              <div className="h-3 bg-[#333333] rounded-full overflow-hidden">
                <div className="h-3 bg-[#C9A962] transition-all" style={{ width: `${plan.progresso || 0}%` }}></div>
              </div>
            </div>

            <div className="mt-6 text-sm">
              <p><span className="text-[#A1A1AA]">Leitura atual:</span> {plan.leitura_atual || 'Não definida'}</p>
              <p><span className="text-[#A1A1AA]">Início:</span> {plan.data_inicio ? new Date(plan.data_inicio).toLocaleDateString('pt-BR') : '-'}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={markCompleted}>Marcar Leitura como Concluída</Button>
            <Button variant="outline" onClick={restartPlan}>Reiniciar Plano</Button>
          </div>
        </div>
      )}
    </div>
  )
}
