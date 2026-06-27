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

const mockFeedbacks = [
  { id: 1, status: 'Novo', type: 'Sugestão de melhoria', user: 'Maria Silva', subject: 'Adicionar tema noturno automático', date: '27/06/2026', message: 'Seria ótimo se o app detectasse automaticamente o tema do sistema.', plan: 'Premium', email: 'maria.silva@email.com' },
  { id: 2, status: 'Em análise', type: 'Relatar erro', user: 'João Mendes', subject: 'Erro ao gerar sermão longo', date: '26/06/2026', message: 'Quando tento gerar um sermão com mais de 3000 palavras, a aplicação trava.', plan: 'Básico', email: 'joao.mendes@email.com' },
]

export function FeedbacksPage() {
  const [feedbacks] = useState(mockFeedbacks)
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Feedbacks</h1>

      <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#333333] bg-[#0F0F0F]">
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Tipo</th>
              <th className="text-left p-4">Usuário</th>
              <th className="text-left p-4">Assunto</th>
              <th className="text-left p-4">Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id} className="border-b border-[#333333] hover:bg-[#2A2A2A]">
                <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400">{f.status}</span></td>
                <td className="p-4">{f.type}</td>
                <td className="p-4">{f.user}</td>
                <td className="p-4">{f.subject}</td>
                <td className="p-4">{f.date}</td>
                <td className="p-4"><button onClick={() => setSelectedFeedback(f)} className="text-[#C9A962]">Ver</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1C1C1C] rounded-3xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Feedback</h2>
            <pre className="bg-[#0F0F0F] p-4 rounded-2xl text-sm overflow-auto">{JSON.stringify(selectedFeedback, null, 2)}</pre>
            <button onClick={() => setSelectedFeedback(null)} className="mt-4 px-6 py-2 bg-[#C9A962] text-black rounded-2xl">Fechar</button>
          </div>
        </div>
      )}
    </div>
  )
}