import { Link } from 'react-router-dom'
import { Section } from '@/components/Section'
import { SkeletonCard } from '@/components/SkeletonCard'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/SearchBar'

export function HomePage() {
  return (
    <div className="space-y-10 overflow-x-hidden">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-black border border-[#333333] h-[380px] md:h-[420px] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A962_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-10" />
        
        <div className="relative z-10 px-6 md:px-10 max-w-3xl w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#C9A962]/10 px-4 py-1 text-xs font-medium tracking-[2px] text-[#C9A962] mb-6">
            BETA • PLATAFORMA CRISTÃ PREMIUM
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[0.9] mb-4">
            O Discípulo
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#C9A962] font-light tracking-tight mb-8">
            Tudo o que você precisa para estudar, ensinar e viver a Palavra de Deus em um só lugar.
          </p>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link to="/explorar">
                Começar Agora
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto" asChild>
              <Link to="/">
                Continuar Estudando
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="text-right text-sm text-[#A1A1AA]">
            Junte-se a milhares de discípulos<br />transformando sua fé diariamente.
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="max-w-2xl">
        <SearchBar 
          placeholder="O que você deseja estudar hoje? (Ex: Romanos 8, Oração, Liderança...)"
          onSearch={(query) => console.log('Home search:', query)}
        />
      </div>

      {/* Sections with Skeletons */}
      <Section title="Continue de onde parou">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} hasProgress />
          ))}
        </div>
      </Section>

      <Section title="Recomendado para você">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Section>

      <Section title="Novidades desta semana">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Vida Espiritual">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Section>

        <Section title="Professor EBD">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Section>
      </div>

      <Section title="Mais acessados">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Section>

      <Section title="Conquistas recentes">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} variant="compact" />
          ))}
        </div>
      </Section>
    </div>
  )
}