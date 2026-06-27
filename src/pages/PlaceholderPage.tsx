import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/EmptyState'

interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div>
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#C9A962] mb-4">
          <ArrowLeft className="h-4 w-4" /> Voltar para Início
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-[#A1A1AA]">Esta seção está em desenvolvimento.</p>
      </div>

      <EmptyState
        title="Em breve — Fase 2"
        description="Estamos construindo esta funcionalidade com muito cuidado para entregar a melhor experiência possível. Fique ligado nas próximas atualizações!"
        action={
          <Button asChild variant="outline">
            <Link to="/">Explorar outras áreas</Link>
          </Button>
        }
      />
    </div>
  )
}