import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const feedbackTypes = [
  'Feedback',
  'Sugestão de melhoria',
  'Relatar erro',
  'Assinatura / Plano',
  'Dúvida',
  'Outro',
]

export function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: 'Feedback',
    title: '',
    message: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      console.log('Feedback enviado (simulado):', {
        ...formData,
        file: selectedFile?.name || 'Nenhum arquivo',
      })
      setIsSubmitting(false)
      setSubmitted(true)

      setTimeout(() => {
        setFormData({ type: 'Feedback', title: '', message: '' })
        setSelectedFile(null)
        setSubmitted(false)
      }, 2500)
    }, 800)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A962]/10 mb-6">
          <span className="text-3xl">🙏</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Obrigado pelo seu feedback!</h1>
        <p className="mt-3 text-[#A1A1AA]">
          Sua mensagem foi recebida com sucesso. Nossa equipe irá analisar e responder o mais breve possível.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Central de Feedback</h1>
        <p className="mt-2 text-[#A1A1AA]">
          Sua opinião é muito importante para nós. Como podemos melhorar sua experiência?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">Tipo da mensagem</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full rounded-2xl border border-[#333333] bg-[#1C1C1C] px-4 py-3 text-sm focus:border-[#C9A962] focus:outline-none"
          >
            {feedbackTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Resumo do seu feedback"
            required
            className="w-full rounded-2xl border border-[#333333] bg-[#1C1C1C] px-4 py-3 text-sm placeholder:text-[#A1A1AA] focus:border-[#C9A962] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">Mensagem</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Descreva seu feedback, sugestão ou dúvida com o máximo de detalhes possível..."
            required
            rows={6}
            className="w-full resize-y rounded-2xl border border-[#333333] bg-[#1C1C1C] px-4 py-3 text-sm placeholder:text-[#A1A1AA] focus:border-[#C9A962] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">Imagem (opcional)</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer rounded-2xl border border-[#333333] bg-[#1C1C1C] px-4 py-2.5 text-sm hover:bg-[#2A2A2A] transition-colors">
              Escolher arquivo
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {selectedFile && <span className="text-sm text-[#A1A1AA] truncate max-w-[200px]">{selectedFile.name}</span>}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
          </Button>
        </div>
      </form>
    </div>
  )
}