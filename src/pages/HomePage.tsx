import { Link } from 'react-router-dom'
import { Section } from '@/components/Section'
import { SkeletonCard } from '@/components/SkeletonCard'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/SearchBar'
export function HomePage() {
  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-black border border-[#333333] h-[420px] flex items-center px-8 md:px-12">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A962]/10 px-4 py-1 text-xs font-medium tracking-[2px] text-[#C9A962] mb-6">BETA • PLATAFORMA CRISTÃ PREMIUM</div>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-[0.9] mb-4">O Discípulo</h1>
          <p className="text-2xl md:text-3xl text-[#C9A962] font-light tracking-tight mb-8">Tudo o que você precisa para estudar, ensinar e viver a Palavra de Deus em um só lugar.</p>
          <div className="flex flex-wrap gap-4"><Button size="lg" asChild><Link to="/explorar">Começar Agora</Link></Button><Button variant="outline" size="lg" asChild><Link to="/">Continuar Estudando</Link></Button></div>
        </div>
      </div>
      <div className="max-w-2xl"><SearchBar placeholder="O que você deseja estudar hoje?" onSearch={(q) => console.log(q)} /></div>
      <Section title="Continue de onde parou"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} hasProgress />)}</div></Section>
      <Section title="Recomendado para você"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div></Section>
      <Section title="Novidades desta semana"><div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">{Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}</div></Section>
    </div>
  )
}