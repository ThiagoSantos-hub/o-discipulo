import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartHandshake, X } from 'lucide-react'

export function SpiritualCounselorPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const lastDismissed = localStorage.getItem('conselheiro_popup_last_dismissed')

    if (lastDismissed !== today) {
      // Pequeno delay para não aparecer instantaneamente ao carregar a página
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const closePopup = () => {
    setIsOpen(false)
  }

  const handlePrimaryAction = () => {
    closePopup()
    navigate('/conselheiro-espiritual')
  }

  const handleSecondaryAction = () => {
    const today = new Date().toISOString().split('T')[0]

    if (dontShowToday) {
      localStorage.setItem('conselheiro_popup_last_dismissed', today)
    }

    closePopup()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />

      {/* Pop-up Content */}
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#0F0F0F] border border-[#333333] shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100"
      >
        {/* Header com ícone e botão fechar */}
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

        {/* Mensagem */}
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

        {/* Botões */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handlePrimaryAction}
            className="w-full h-12 rounded-2xl bg-[#C9A962] hover:bg-[#B8975A] active:bg-[#A07F4A] text-black font-semibold text-base transition-all active:scale-[0.985]"
          >
            Conversar agora
          </button>

          <button
            onClick={handleSecondaryAction}
            className="w-full h-12 rounded-2xl border border-[#333333] hover:bg-white/5 text-white font-medium text-base transition-all"
          >
            Agora não
          </button>
        </div>

        {/* Checkbox Não mostrar hoje */}
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
      </div>
    </div>
  )
}