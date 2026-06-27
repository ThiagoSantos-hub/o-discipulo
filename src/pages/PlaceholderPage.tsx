import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/EmptyState'
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div><Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#C9A962] mb-4"><ArrowLeft className="h-4 w-4" /> Voltar</Link><h1 className="text-4xl font-semibold tracking-tight mb-8">{title}</h1><EmptyState title="Em breve — Fase 2" description="Esta funcionalidade será implementada na próxima fase com todo o cuidado e qualidade que você merece." action={<Button asChild variant="outline"><Link to="/">Explorar Início</Link></Button>} /></div>
  )
}