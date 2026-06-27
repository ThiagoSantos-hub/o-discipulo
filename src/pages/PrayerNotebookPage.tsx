import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { prayerService, PrayerRequest } from '@/services/prayer.service'
import { Button } from '@/components/ui/Button'

export default function PrayerNotebookPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<PrayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRequest, setEditingRequest] = useState<PrayerRequest | null>(null)
  const [filters, setFilters] = useState({ status: 'Todos', search: '' })

  const [formData, setFormData] = useState<Partial<PrayerRequest>>({
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: 'Media',
    status: 'Em oracao',
  })

  const loadRequests = async () => {
    if (!user) return
    setLoading(true)
    const { data } = await prayerService.getPrayerRequests(user.id, filters)
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadRequests()
  }, [user, filters])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (editingRequest) {
      await prayerService.updatePrayerRequest(editingRequest.id!, formData)
    } else {
      await prayerService.createPrayerRequest({ ...formData, user_id: user.id } as any)
    }

    setShowForm(false)
    setEditingRequest(null)
    setFormData({ titulo: '', descricao: '', categoria: '', prioridade: 'Media', status: 'Em oracao' })
    loadRequests()
  }

  const handleEdit = (req: PrayerRequest) => {
    setEditingRequest(req)
    setFormData(req)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      await prayerService.deletePrayerRequest(id)
      loadRequests()
    }
  }

  const handleMarkAnswered = async (req: PrayerRequest) => {
    const testemunho = prompt('Deseja adicionar um testemunho? (opcional)')
    await prayerService.markAsAnswered(req.id!, testemunho || undefined)
    loadRequests()
  }

  const handleArchive = async (id: string) => {
    await prayerService.archiveRequest(id)
    loadRequests()
  }

  if (loading) return <div className="p-8">Carregando Caderno de Oração...</div>

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Caderno de Oração</h1>
        <Button onClick={() => { setShowForm(true); setEditingRequest(null); setFormData({ titulo: '', descricao: '', categoria: '', prioridade: 'Media', status: 'Em oracao' }) }}>
          + Novo Pedido
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2">
          <option>Todos</option>
          <option>Em oracao</option>
          <option>Respondida</option>
          <option>Arquivada</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="flex-1 bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2"
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6 mb-8 space-y-4">
          <input type="text" placeholder="Título do pedido" value={formData.titulo || ''} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3" required />
          <textarea placeholder="Descrição / Motivo da oração" value={formData.descricao || ''} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} className="w-full h-24 bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Categoria" value={formData.categoria || ''} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3" />
            <select value={formData.prioridade || 'Media'} onChange={(e) => setFormData({ ...formData, prioridade: e.target.value as any })} className="bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3">
              <option value="Baixa">Baixa</option>
              <option value="Media">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingRequest(null) }}>Cancelar</Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {requests.length === 0 && <p className="text-[#A1A1AA]">Nenhum pedido encontrado.</p>}
        {requests.map((req) => (
          <div key={req.id} className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{req.titulo}</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">{req.descricao}</p>
              </div>
              <div className="text-right text-sm">
                <div className={`inline-block px-3 py-1 rounded-full text-xs ${req.status === 'Em oracao' ? 'bg-emerald-500/10 text-emerald-400' : req.status === 'Respondida' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'}`}>{req.status}</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {req.status === 'Em oracao' && (
                <>
                  <Button size="sm" onClick={() => handleMarkAnswered(req)}>Marcar como Respondida</Button>
                  <Button size="sm" variant="outline" onClick={() => handleArchive(req.id!)}>Arquivar</Button>
                </>
              )}
              <Button size="sm" variant="outline" onClick={() => handleEdit(req)}>Editar</Button>
              <Button size="sm" variant="outline" className="text-red-400" onClick={() => handleDelete(req.id!)}>Excluir</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
