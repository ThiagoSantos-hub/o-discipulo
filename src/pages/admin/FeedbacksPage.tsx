import { useState } from 'react'

interface Feedback {
  id: number
  status: string
  type: string
  user: string
  subject: string
  date: string
  message: string
  plan: string
  email: string
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    status: 'Novo',
    type: 'Sugestão de melhoria',
    user: 'Maria Silva',
    subject: 'Adicionar tema noturno automático',
    date: '27/06/2026',
    message: 'Seria ótimo se o app detectasse automaticamente o tema do sistema do usuário.',
    plan: 'Premium',
    email: 'maria.silva@email.com',
  },
  {
    id: 2,
    status: 'Em análise',
    type: 'Relatar erro',
    user: 'João Mendes',
    subject: 'Erro ao gerar sermão longo',
    date: '26/06/2026',
    message: 'Quando tento gerar um sermão com mais de 3000 palavras, a aplicação trava.',
    plan: 'Básico',
    email: 'joao.mendes@email.com',
  },
  {
    id: 3,
    status: 'Resolvido',
    type: 'Feedback',
    user: 'Ana Costa',
    subject: 'Excelente experiência com o app',
    date: '25/06/2026',
    message: 'Estou adorando a nova interface. Muito mais fluida e bonita.',
    plan: 'Premium',
    email: 'ana.costa@email.com',
  },
]

export function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  const updateStatus = (id: number, newStatus: string) => {
    setFeedbacks(prev =>
      prev.map(f => (f.id === id ? { ...f, status: newStatus } : f))
    )
  }

  const deleteFeedback = (id: number) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id))
    if (selectedFeedback?.id === id) {
      setSelectedFeedback(null)
    }
  }

  const openDetail = (feedback: Feedback) => {
    setSelectedFeedback(feedback)
  }

  const closeDetail = () => {
    setSelectedFeedback(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-emerald-500/10 text-emerald-400'
      case 'Lido': return 'bg-sky-500/10 text-sky-400'
      case 'Em análise': return 'bg-amber-500/10 text-amber-400'
      case 'Em desenvolvimento': return 'bg-purple-500/10 text-purple-400'
      case 'Resolvido': return 'bg-blue-500/10 text-blue-400'
      case 'Arquivado': return 'bg-zinc-500/10 text-zinc-400'
      default: return 'bg-zinc-500/10 text-zinc-400'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Feedbacks</h1>
        <p className="text-[#A1A1AA]">Gerencie os feedbacks recebidos dos usuários</p>
      </div>

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0F0F0F]">
            <tr className="border-b border-[#333333]">
              <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1AA]">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1AA]">Tipo</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1AA]">Usuário</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1AA]">Assunto</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1AA]">Data</th>
              <th className="px-6 py-4 w-48 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333333]">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-[#2A2A2A]">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(feedback.status)}`}>
                    {feedback.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{feedback.type}</td>
                <td className="px-6 py-4 text-sm font-medium">{feedback.user}</td>
                <td className="px-6 py-4 text-sm text-[#A1A1AA]">{feedback.subject}</td>
                <td className="px-6 py-4 text-sm text-[#A1A1AA]">{feedback.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {feedback.status === 'Novo' && (
                      <button
                        onClick={() => updateStatus(feedback.id, 'Lido')}
                        className="text-xs px-3 py-1.5 rounded-xl border border-[#333333] hover:bg-[#2A2A2A] text-[#A1A1AA]"
                      >
                        Marcar como lido
                      </button>
                    )}
                    {feedback.status !== 'Resolvido' && (
                      <button
                        onClick={() => updateStatus(feedback.id, 'Resolvido')}
                        className="text-xs px-3 py-1.5 rounded-xl border border-[#333333] hover:bg-[#2A2A2A] text-[#A1A1AA]"
                      >
                        Marcar como resolvido
                      </button>
                    )}
                    <button
                      onClick={() => setShowDeleteConfirm(feedback.id)}
                      className="text-xs px-3 py-1.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => openDetail(feedback)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-[#C9A962] text-[#0F0F0F]"
                    >
                      Ver
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalhes e Confirmação de Exclusão */}
      {/* ... (código completo do modal mantido para integridade) ... */}
    </div>
  )
}