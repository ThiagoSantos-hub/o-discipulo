import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartHandshake, X, Send } from 'lucide-react'

export function SpiritualCounselorPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const [currentView, setCurrentView] = useState<'welcome' | 'reflection' | 'thankyou'>('welcome')
  const [userMessage, setUserMessage] = useState('')
  const navigate = useNavigate()

  // Mock de compromissos do usuário (estrutura preparada para futura integração com Supabase)
  const userCommitments = {
    leituraBiblia: { meta: '30 minutos', realizadoHoje: false },
    oracao: { realizadoHoje: true },
    devocional: { realizadoHoje: false },
  }

  // Função para gerar mensagem personalizada baseada nos compromissos
  const getPersonalizedMessage = () => {
    const { leituraBiblia, oracao, devocional } = userCommitments
    const pending = []

    if (!leituraBiblia.realizadoHoje) {
      pending.push(`dedicar ${leituraBiblia.meta} à leitura da Palavra`)
    }
    if (!oracao.realizadoHoje) {
      pending.push('manter uma vida de oração diária')
    }
    if (!devocional.realizadoHoje) {
      pending.push('fazer seu devocional de hoje')
    }

    if (pending.length === 0) {
      return 'Parabéns! Hoje você concluiu todos os compromissos espirituais que definiu. Continue firme na sua caminhada.'
    }

    if (pending.length === 1) {
      return `Você assumiu o compromisso de ${pending[0]}. Ainda há tempo para dar esse passo hoje.`
    }

    return `Hoje você definiu como objetivo ${pending.join(' e ')}. Que tal separar alguns minutos agora?`
  }

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
    setCurrentView('welcome')
    setUserMessage('')
  }

  const handlePrimaryAction = () => {
    closePopup()
    navigate('/conselheiro-espiritual')
  }

  const goToReflection = () => {
    setCurrentView('reflection')
  }

  const handleSendMessage = () => {
    setCurrentView('thankyou')
  }

  const handleFinalAction = (shouldNavigate = false) => {
    if (shouldNavigate) {
      closePopup()
      navigate('/conselheiro-espiritual')
    } else {
      closePopup()
    }
  }

  if (!isOpen) return null

  const renderContent = () => {
    if (currentView === 'welcome') {
      return (
        <>
          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
            <div className="space-y-3 sm:space-y-4 text-[#E5E5E5]">
              <p className="text-lg font-medium">Bom dia, Thiago!</p>
              <p className="leading-relaxed">
                Que alegria ver você novamente.
              </p>
              <p className="leading-relaxed">
                {getPersonalizedMessage()}
              </p>
              <p className="leading-relaxed text-[#C9A962]">
                Vamos fortalecer sua caminhada com Ele?
              </p>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-3">
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

          <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-[#333333]/60">
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
          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Antes de continuar...</h3>
            <div className="space-y-4 text-[#E5E5E5] leading-relaxed">
              <p>Você definiu esses objetivos porque deseja crescer na sua caminhada com Deus.</p>
              <p>Gostaria de entender o que está acontecendo em seu coração hoje.</p>
              <p>Pode compartilhar com sinceridade. Não estou aqui para julgar, mas para caminhar ao seu lado.</p>
              <p className="text-[#C9A962]">Como diz a Palavra: “Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei” (Mateus 11:28).</p>
            </div>
          </div>

          {/* Campo de conversa livre */}
          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
            <div className="relative">
              <textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Conte o que está acontecendo..."
                rows={4}
                className="w-full bg-[#1A1A1A] border border-[#333333] rounded-2xl px-5 py-4 text-white placeholder:text-[#666] focus:outline-none focus:border-[#C9A962] resize-y text-[15px] leading-relaxed"
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            <button
              onClick={handleSendMessage}
              disabled={!userMessage.trim()}
              className="w-full h-12 rounded-2xl bg-[#C9A962] hover:bg-[#B8975A] active:bg-[#A07F4A] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.985]"
            >
              Enviar
              <Send className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-[#666] mt-3">Sua mensagem é confidencial e será considerada nas próximas conversas.</p>
          </div>
        </>
      )
    }

    // Thank you view after sending
    if (currentView === 'thankyou') {
      return (
        <>
          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Obrigado por abrir seu coração.</h3>
            <div className="space-y-4 text-[#E5E5E5] leading-relaxed">
              <p>Vou levar o que você compartilhou em oração e consideração nas próximas conversas.</p>
              <p>Lembre-se: as misericórdias do Senhor se renovam a cada manhã (Lamentações 3:22-23). Sempre existe um novo começo em Cristo.</p>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-3">
            <button
              onClick={() => handleFinalAction(true)}
              className="w-full h-12 rounded-2xl bg-[#C9A962] hover:bg-[#B8975A] active:bg-[#A07F4A] text-black font-semibold text-base transition-all active:scale-[0.985]"
            >
              Conversar com o Conselheiro
            </button>

            <button
              onClick={() => handleFinalAction(false)}
              className="w-full h-12 rounded-2xl border border-[#333333] hover:bg-white/5 text-white font-medium text-base transition-all"
            >
              Entrar no aplicativo
            </button>
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

      {/* Pop-up Content - Responsivo */}
      <div className="relative w-full max-w-[92vw] sm:max-w-md max-h-[78vh] rounded-3xl bg-[#0F0F0F] border border-[#333333] shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#C9A962]/10">
              <HeartHandshake className="h-7 w-7 text-[#C9A962]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Conselheiro Espiritual</h2>
          </div>
          <button 
            onClick={closePopup}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5 text-[#A1A1AA]" />
          </button>
        </div>

        {/* Conteúdo com rolagem no mobile */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}