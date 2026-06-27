import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/Section'
import { SkeletonCard } from '@/components/SkeletonCard'

export function HomePage() {
  return (
    <div className="space-y-10 overflow-x-hidden">
      {/* Saudacao Personalizada */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bom dia, Pr. Thiago 👋</h1>
        <p className="text-[#A1A1AA] mt-1">Que o Senhor te abençoe hoje. Pronto para crescer na Palavra?</p>
      </div>

      {/* Continue de onde parou */}
      <Section title="Continue de onde parou">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} hasProgress />
          ))}
        </div>
      </Section>

      {/* Devocional de Hoje */}
      <Section title="Devocional de Hoje">
        <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">A Paz que Excede o Entendimento</h3>
              <p className="text-sm text-[#A1A1AA] mt-1">Filipenses 4:6-7 • 6 min de leitura</p>
            </div>
            <Button size="sm" variant="outline">Ler agora</Button>
          </div>
        </div>
      </Section>

      {/* Versiculo do Dia */}
      <Section title="Versículo do Dia">
        <div className="bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] border border-[#333333] rounded-2xl p-8 text-center">
          <p className="text-xl italic">“Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.”</p>
          <p className="mt-4 text-[#C9A962] font-medium">— Isaías 41:10</p>
        </div>
      </Section>

      {/* Desafio Diario + Plano de Leitura */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Desafio Diário">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
            <p className="text-sm">Leia 3 capítulos hoje e ganhe +50 pontos de jornada.</p>
            <Button className="mt-4 w-full" size="sm">Começar desafio</Button>
          </div>
        </Section>

        <Section title="Plano de Leitura">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
            <p className="text-sm">Você está no dia 12 de 90 do plano “Através da Bíblia”.</p>
            <div className="mt-3 h-2 bg-[#333333] rounded-full">
              <div className="h-2 w-[13%] bg-[#C9A962] rounded-full" />
            </div>
          </div>
        </Section>
      </div>

      {/* Conquistas Recentes + Minha Jornada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Conquistas Recentes">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">🏅</div>
                <div className="text-sm font-medium">Leitor Dedicado</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Minha Jornada">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 space-y-3 text-sm">
            <div className="flex justify-between"><span>Dias estudando</span><span className="font-medium">47 dias</span></div>
            <div className="flex justify-between"><span>Tempo total de estudo</span><span className="font-medium">38h 20min</span></div>
            <div className="flex justify-between"><span>Sermões criados</span><span className="font-medium">12</span></div>
          </div>
        </Section>
      </div>

      {/* Ultimo Sermao + Estudos Recomendados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Último Sermão">
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
            <h4 className="font-semibold">Vivendo com Propósito</h4>
            <p className="text-sm text-[#A1A1AA] mt-1">Pregado em 22/06/2026 • 42 min</p>
            <Button size="sm" className="mt-4" variant="outline">Ouvir novamente</Button>
          </div>
        </Section>

        <Section title="Estudos Recomendados">
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Section>
      </div>

      {/* Explorar Modulos */}
      <Section title="Explorar Módulos">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Sermões', path: '/sermoes' },
            { label: 'Estudos Bíblicos', path: '/estudos' },
            { label: 'Vida Espiritual', path: '/vida-espiritual' },
            { label: 'Professor EBD', path: '/professor-ebd' },
            { label: 'Comunidade', path: '/comunidade' },
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="bg-[#1C1C1C] border border-[#333333] hover:border-[#C9A962] rounded-2xl p-5 text-center transition-all"
            >
              <div className="font-medium">{item.label}</div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}