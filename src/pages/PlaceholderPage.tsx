import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/EmptyState'

interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  // Página Explorar rica
  if (title === "Explorar") {
    return (
      <div className="space-y-10">
        {/* Banner Superior */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1C1C] via-[#0F0F0F] to-black border border-[#333333] py-12 px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter">Explorar</h1>
            <p className="mt-3 text-xl text-[#C9A962]">
              Descubra todos os recursos disponíveis para fortalecer sua caminhada com Deus.
            </p>
          </div>
        </div>

        {/* Barra de Pesquisa Visual */}
        <div className="max-w-2xl">
          <input
            type="text"
            placeholder="Pesquisar módulos..."
            className="w-full rounded-2xl border border-[#333333] bg-[#1C1C1C] px-6 py-4 text-lg placeholder:text-[#A1A1AA] focus:border-[#C9A962] focus:outline-none"
          />
        </div>

        {/* Categorias */}
        <div className="space-y-10">
          {/* Estudar */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">📖 Estudar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Estudos Bíblicos", desc: "Estudos temáticos e por livros da Bíblia", path: "/estudos" },
                { title: "Aprendendo a Bíblia", desc: "Organização, livros, personagens e quiz", path: "/estudos" },
                { title: "Professor EBD", desc: "Material para Escola Bíblica Dominical", path: "/professor-ebd" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 hover:border-[#C9A962] transition-all group">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#C9A962]">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-4">{item.desc}</p>
                  <Link to={item.path} className="text-sm text-[#C9A962] hover:underline">Abrir →</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Ensinar */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🎙️ Ensinar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "Sermões", desc: "Gerador e biblioteca de sermões", path: "/sermoes" },
                { title: "Ministério", desc: "Ferramentas para líderes e pastores", path: "/ministerio" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 hover:border-[#C9A962] transition-all group">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#C9A962]">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-4">{item.desc}</p>
                  <Link to={item.path} className="text-sm text-[#C9A962] hover:underline">Abrir →</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Vida Espiritual */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🙏 Vida Espiritual</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {["Devocional Diário", "Plano de Leitura", "Diário Espiritual", "Versículo do Dia", "Gerador de Orações"].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-5 hover:border-[#C9A962] transition-all">
                  <div className="font-medium mb-1">{item}</div>
                  <Link to="/vida-espiritual" className="text-xs text-[#C9A962] hover:underline">Acessar</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Comunidade */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🤝 Comunidade</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Comunidade", desc: "Feed e interação entre membros" },
                { title: "Lives", desc: "Transmissões ao vivo" },
                { title: "Avisos", desc: "Comunicados da igreja" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 hover:border-[#C9A962] transition-all">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-3">{item.desc}</p>
                  <span className="text-xs text-[#C9A962]">Em breve</span>
                </div>
              ))}
            </div>
          </div>

          {/* Minha Evolução */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🏅 Minha Evolução</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Minha Jornada", desc: "Seu progresso espiritual" },
                { title: "Conquistas", desc: "Medalhas e níveis" },
                { title: "Biblioteca", desc: "Seus conteúdos salvos" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6 hover:border-[#C9A962] transition-all group">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#C9A962]">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-4">{item.desc}</p>
                  <Link to="/conquistas" className="text-sm text-[#C9A962] hover:underline">Ver →</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recursos Premium */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold">⭐ Recursos Premium</h2>
              <span className="px-3 py-1 text-xs rounded-full bg-[#C9A962] text-[#0F0F0F] font-medium">Premium</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "IA Premium", desc: "Geração avançada de conteúdo" },
                { title: "Cursos Exclusivos", desc: "Formação ministerial" },
                { title: "Biblioteca Avançada", desc: "Acesso completo a recursos" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-[#C9A962]/30 rounded-2xl p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-3">{item.desc}</p>
                  <span className="text-xs text-[#C9A962]">Disponível no plano Premium</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Placeholder genérico para outras páginas
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