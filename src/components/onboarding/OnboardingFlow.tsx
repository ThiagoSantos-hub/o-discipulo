import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { onboardingService } from '@/services/onboarding.service'
import { useAuth } from '@/contexts/AuthContext'

interface OnboardingFlowProps {
  onComplete: () => void
}

const focusAreaOptions = [
  'Vida de oração',
  'Leitura da Bíblia',
  'Disciplina espiritual',
  'Evangelismo',
  'Família',
  'Santidade',
  'Jejum',
  'Conhecimento bíblico',
  'Liderança',
  'Relacionamento com Deus',
]

const timeOptions = ['10 minutos', '20 minutos', '30 minutos', '45 minutos', '60 minutos']
const timeValues = ['10', '20', '30', '45', '60']

const devotionalTimeOptions = ['Manhã', 'Tarde', 'Noite', 'Madrugada']

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Dados do onboarding
  const [preferredName, setPreferredName] = useState('')
  const [dailyTime, setDailyTime] = useState('')
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [habitToOvercome, setHabitToOvercome] = useState('')
  const [devotionalTime, setDevotionalTime] = useState('')

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter(a => a !== area))
    } else {
      setFocusAreas([...focusAreas, area])
    }
  }

  const handleNext = () => {
    if (step < 7) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFinish = async () => {
    if (!user) return

    setLoading(true)

    const { error } = await onboardingService.saveOnboarding(user.id, {
      preferred_name: preferredName || undefined,
      daily_time_commitment: dailyTime || undefined,
      focus_areas: focusAreas.length > 0 ? focusAreas : undefined,
      habit_to_overcome: habitToOvercome || undefined,
      preferred_devotional_time: devotionalTime || undefined,
    })

    setLoading(false)

    if (!error) {
      onComplete()
    } else {
      alert('Ocorreu um erro ao salvar suas respostas. Tente novamente.')
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#333333]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#A1A1AA]">Passo {step} de 7</div>
            {step > 1 && (
              <button onClick={handleBack} className="text-sm text-[#C9A962] hover:underline">
                Voltar
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Etapa 1 - Boas-vindas */}
          {step === 1 && (
            <div className="text-center py-4">
              <div className="text-5xl mb-6">✝</div>
              <h2 className="text-2xl font-semibold mb-3">Bem-vindo ao O Discípulo!</h2>
              <p className="text-[#A1A1AA] leading-relaxed">
                Vamos personalizar sua experiência para que o Conselheiro Espiritual possa te acompanhar de forma mais próxima e significativa.
              </p>
            </div>
          )}

          {/* Etapa 2 - Nome */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Como gostaria de ser chamado?</h3>
              <input
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-[#C9A962]"
              />
            </div>
          )}

          {/* Etapa 3 - Tempo diário */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Quanto tempo você deseja dedicar por dia?</h3>
              <div className="grid grid-cols-1 gap-3">
                {timeOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setDailyTime(timeValues[index])}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      dailyTime === timeValues[index]
                        ? 'bg-[#C9A962] text-[#0F0F0F] border-[#C9A962]'
                        : 'bg-[#0F0F0F] border-[#333333] hover:border-[#C9A962]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 4 - Áreas de foco */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Quais áreas você deseja fortalecer?</h3>
              <p className="text-sm text-[#A1A1AA] mb-4">Selecione todas que se aplicam</p>
              <div className="grid grid-cols-2 gap-3">
                {focusAreaOptions.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => toggleFocusArea(area)}
                    className={`p-3 rounded-2xl border text-sm transition-all ${
                      focusAreas.includes(area)
                        ? 'bg-[#C9A962] text-[#0F0F0F] border-[#C9A962]'
                        : 'bg-[#0F0F0F] border-[#333333] hover:border-[#C9A962]'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 5 - Hábito a vencer */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Existe algum hábito que você deseja vencer?</h3>
              <textarea
                value={habitToOvercome}
                onChange={(e) => setHabitToOvercome(e.target.value)}
                placeholder="Ex: Procrastinação, raiva, etc. (opcional)"
                className="w-full h-28 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-4 resize-y focus:outline-none focus:border-[#C9A962]"
              />
            </div>
          )}

          {/* Etapa 6 - Horário preferido */}
          {step === 6 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Qual horário você prefere para seu momento devocional?</h3>
              <div className="grid grid-cols-2 gap-3">
                {devotionalTimeOptions.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setDevotionalTime(time)}
                    className={`p-4 rounded-2xl border transition-all ${
                      devotionalTime === time
                        ? 'bg-[#C9A962] text-[#0F0F0F] border-[#C9A962]'
                        : 'bg-[#0F0F0F] border-[#333333] hover:border-[#C9A962]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 7 - Mensagem final */}
          {step === 7 && (
            <div className="text-center py-4">
              <div className="text-4xl mb-6">🙏</div>
              <h3 className="text-xl font-semibold mb-3">Pronto!</h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Obrigado por compartilhar isso conosco. O Conselheiro Espiritual agora poderá te acompanhar de forma mais personalizada com base nas suas respostas.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#333333] flex justify-end gap-3">
          {step < 7 ? (
            <Button onClick={handleNext} disabled={step === 3 && !dailyTime || step === 4 && focusAreas.length === 0}>
              Continuar
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={loading}>
              {loading ? 'Salvando...' : 'Concluir Onboarding'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
