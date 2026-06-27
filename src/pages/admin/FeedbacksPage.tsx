import { useState } from 'react'

const mockFeedbacks = [
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
  const [feedbacks] = useState(mockFeedbacks)
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)

  const openDetail = (feedback: any) => {
    setSelectedFeedback(feedback)
  }

  const closeDetail = () => {
    setSelectedFeedback(null)
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
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333333]">
            {feedbacks.map((feedback: any) => (
              <tr key={feedback.id} className="hover:bg-[#2A2A2A]">
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${feedback.status === 'Novo' ? 'bg-emerald-500/10 text-emerald-400' : feedback.status === 'Em análise' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {feedback.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{feedback.type}</td>
                <td className="px-6 py-4 text-sm font-medium">{feedback.user}</td>
                <td className="px-6 py-4 text-sm text-[#A1A1AA]">{feedback.subject}</td>
                <td className="px-6 py-4 text-sm text-[#A1A1AA]">{feedback.date}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openDetail(feedback)} className="text-sm text-[#C9A962] hover:underline">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl w-full max-w-2xl">
            <div className="p-6 border-b border-[#333333] flex justify-between items-center">
              <h2 className="text-xl font-semibold">Detalhes do Feedback</h2>
              <button onClick={closeDetail} className="text-[#A1A1AA] hover:text-white">Fechar</button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div><span className="text-[#A1A1AA]">Usuário:</span> {selectedFeedback.user}</div>
              <div><span className="text-[#A1A1AA]">Tipo:</span> {selectedFeedback.type}</div>
              <div><span className="text-[#A1A1AA]">Assunto:</span> {selectedFeedback.subject}</div>
              <div><span className="text-[#A1A1AA]">Mensagem:</span></div>
              <div className="bg-[#0F0F0F] p-4 rounded-2xl">{selectedFeedback.message}</div>
            </div>

            <div className="p-6 border-t border-[#333333] flex justify-end">
              <button onClick={closeDetail} className="px-6 py-2 rounded-2xl bg-[#C9A962] text-[#0F0F0F]">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}