import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartHandshake, X } from 'lucide-react'

export function SpiritualCounselorPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [currentView, setCurrentView] = useState<'welcome' | 'reflection' | 'response'>('welcome')
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const lastDismissed = localStorage.getItem('conselheiro_popup_last_dismissed')

    if (lastDismissed !== today) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const closePopup = () => {
    const today = new Date().toISOString().split('T')[0]
    if (dontShowToday) {
      localStorage.setItem('conselheiro_popup_last_dismissed', today)
    }
    setIsOpen(false)
    // Reset states for next time
    setCurrentView('welcome')
    setSelectedReason(null)
  }

  const handlePrimaryAction = () => {
    closePopup()
    navigate('/conselheiro-espiritual')
  }

  const goToReflection = () => {
    setCurrentView('reflection')
  }

  const selectReason = (reason: string) => {
    setSelectedReason(reason)
    setCurrentView('response')
  }

  const handleActionAndClose = (shouldNavigate = false) => {
    if (shouldNavigate) {
      closePopup()
      navigate('/conselheiro-espiritual')
    } else {
      closePopup()
    }
  }

  if (!isOpen) return null

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'welcome') {
      return (
        <>
          <div className="px-6 pb-6">
            <div className="space-y-4 text-[#E5E5E5]">
              <p className="text-lg font-medium">Bom dia, Thiago!</p>
              <p className="leading-relaxed">
                Que alegria ver você novamente.
              </p>
              <p className="leading-relaxed">
                Hoje ainda não registramos seu momento de oração nem sua leitura bíblica.
              </p>
              <p className="leading-relaxed text-[#C9A962]">
                Vamos fortalecer sua caminhada com Deus?
              </p>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-3">
            <button
              onClick={handlePrimaryAction}
              className="w-full h-12 rounded-2xl bg-[#C9A962] hover:bg-[#B8975A] active:bg-[#A07F4A] text-black font-semibold text-base transition-all active:scale-[0.985]"
            >
              Conversar agora
            </button>

            <button
              onClick={goToReflection}
              className="w-full h-12 rounded-2xl border border-[#333333] hover:bg-white/5 text-white font-medium text-base transition-all"
            >
              Agora não
            </button>
          </div>

          <div className="px-6 pb-6 pt-2 border-t border-[#333333]/60">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-[#A1A1AA] hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 accent-[#C9A962] rounded border-[#444] bg-[#1A1A1A]"
              />
              <span>Não mostrar novamente hoje</span>
            </label>
          </div>
        </>
      )
    }

    if (currentView === 'reflection') {
      return (
        <>
          <div className="px-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Antes de continuar...</h3>
            <p className="text-[#E5E5E5] leading-relaxed">
              Você definiu esses objetivos porque deseja crescer na sua caminhada com Deus.
              O que está impedindo você de dar esse pequeno passo hoje?
            </p>
          </div>

          <div className="px-6 pb-8 space-y-2">
            {[ 
              { id: 'time', label: 'Estou sem tempo' },
              { id: 'not-well', label: 'Não estou bem hoje' },
              { id: 'later', label: 'Faço mais tarde' },
              { id: 'forgot', label: 'Esqueci' },
              { id: 'no-answer', label: 'Prefiro não responder' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => selectReason(option.id)}
                className="w-full text-left px-5 py-3.5 rounded-2xl border border-[#333333] hover:border-[#C9A962]/60 hover:bg-white/5 text-white transition-all active:scale-[0.985]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )
    }

    // Response view
    if (currentView === 'response' && selectedReason) {
      let title = ''
      let message = ''
      let primaryAction: { label: string; navigate?: boolean } | null = null
      let secondaryAction: { label: string; navigate?: boolean } | null = null

      switch (selectedReason) {
        case 'time':
          title = 'Eu entendo.'
          message = 'Mesmo cinco minutos dedicados a Deus podem fazer diferença. Que tal começarmos agora?'
          primaryAction = { label: 'Fazer agora', navigate: true }
          secondaryAction = { label: 'Continuar mesmo assim' }
          break
        case 'not-well':
          title = 'Obrigado por compartilhar isso.'
          message = 'Mesmo nos dias difíceis, Deus continua perto de você. Podemos fazer uma oração juntos.'
          primaryAction = { label: 'Fazer uma oração', navigate: true }
          secondaryAction = { label: 'Continuar mesmo assim' }
          break
        case 'later':
          title = 'Tudo bem.'
          message = 'Mais tarde também pode ser um bom momento para cuidar da sua vida espiritual.'
          primaryAction = { label: 'Definir lembrete' }
          secondaryAction = { label: 'Continuar mesmo assim' }
          break
        case 'forgot':
          title = 'Acontece.'
          message = 'Vamos aproveitar que você já está aqui e dar esse pequeno passo?'
          primaryAction = { label: 'Fazer agora', navigate: true }
          secondaryAction = { label: 'Continuar mesmo assim' }
          break
        case 'no-answer':
          title = 'Respeito sua decisão.'
          message = 'Estarei aqui sempre que precisar.'
          primaryAction = { label: 'Continuar para o aplicativo' }
          secondaryAction = null
          break
      }

      return (
        <>
          <div className="px-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-[#E5E5E5] leading-relaxed">{message}</p>
          </div>

          <div className="px-6 pb-8 space-y-3">
            {primaryAction && (
              <button
                onClick={() => handleActionAndClose(primaryAction.navigate)}
                className="w-full h-12 rounded-2xl bg-[#C9A962] hover:bg-[#B8975A] active:bg-[#A07F4A] text-black font-semibold text-base transition-all active:scale-[0.985]"
              >
                {primaryAction.label}
              </button>
            )}

            {secondaryAction && (
              <button
                onClick={() => handleActionAndClose(false)}
                className="w-full h-12 rounded-2xl border border-[#333333] hover:bg-white/5 text-white font-medium text-base transition-all"
              >
                {secondaryAction.label}
              </button>
            )}

            {!secondaryAction && (
              <button
                onClick={() => handleActionAndClose(false)}
                className="w-full h-12 rounded-2xl border border-[#333333] hover:bg-white/5 text-white font-medium text-base transition-all"
              >
                Continuar para o aplicativo
              </button>
            )}
          </div>
        </>
      )
    }

    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />

      {/* Pop-up Content */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0F0F0F] border border-[#333333] shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#C9A962]/10">
              <HeartHandshake className="h-7 w-7 text-[#C9A962]" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Conselheiro Espiritual</h2>
          </div>
          <button 
            onClick={closePopup}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5 text-[#A1A1AA]" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}