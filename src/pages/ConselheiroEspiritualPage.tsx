import { HeartHandshake, BookOpen, Heart, Award, MessageCircle, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/Section'

export function ConselheiroEspiritualPage() {
  const acompanhamentoCards = [
    {
      title: 'Plano de Leitura',
      description: 'Acompanhe seu progresso na leitura bíblica diária.',
      icon: BookOpen,
    },
    {
      title: 'Vida de Oração',
      description: 'Registre e acompanhe seus momentos de oração.',
      icon: Heart,
    },
    {
      title: 'Devocional',
      description: 'Reflexões e estudos para o seu dia a dia.',
      icon: MessageCircle,
    },
    {
      title: 'Desafios Espirituais',
      description: 'Participe de desafios para crescer na fé.',
      icon: Award,
    },
    {
      title: 'Pedidos de Oração',
      description: 'Compartilhe e interceda por pedidos.',
      icon: HeartHandshake,
    },
    {
      title: 'Minha Caminhada',
      description: 'Visualize sua jornada espiritual completa.',
      icon: TrendingUp,
    },
    {
      title: 'Conquistas Espirituais',
      description: 'Medalhas e marcos da sua caminhada com Deus.',
      icon: Award,
    },
  ]

  const mensagensConselheiro = [
    'Hoje ainda não registramos um momento de oração. Que tal dedicar alguns minutos agora?',
    'Continue firme na leitura da Palavra. Cada versículo fortalece sua alma.',
    'Cada pequeno passo fortalece sua caminhada. Deus está com você.',
    'Lembre-se: a oração é o oxigênio da alma.',
    'Você está crescendo! Continue perseverando nos estudos bíblicos.',
  ]

  const minhaCaminhadaMock = [
    { label: 'Dias consecutivos estudando', value: '14', unit: 'dias' },
    { label: 'Dias consecutivos orando', value: '21', unit: 'dias' },
    { label: 'Capítulos lidos', value: '47', unit: 'capítulos' },
    { label: 'Estudos concluídos', value: '8', unit: 'estudos' },
    { label: 'Medalhas conquistadas', value: '12', unit: 'medalhas' },
    { label: 'Plano atual', value: 'Leitura do Novo Testamento', unit: '' },
  ]

  return (
    <div className="space-y-10">
      {/* Banner Premium */}
      <div className="premium-card p-8 md:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#1A1A1A] border border-[#C9A962]/30 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-[#C9A962]/10">
                <HeartHandshake className="h-8 w-8 text-[#C9A962]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Conselheiro Espiritual</h1>
            </div>
            <p className="text-xl text-[#C9A962] max-w-2xl">
              "Seu companheiro de discipulado para incentivar sua caminhada diária com Deus."
            </p>
          </div>
        </div>
      </div>

      {/* Card de Boas-Vindas / Exemplo de Conversa */}
      <Card className="border-l-4 border-[#C9A962]">
        <div className="flex gap-4">
          <div className="mt-1">
            <div className="p-3 rounded-full bg-[#C9A962]/10">
              <HeartHandshake className="h-6 w-6 text-[#C9A962]" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl mb-3">Mensagem do Conselheiro</h3>
            <div className="prose prose-invert text-[#E5E5E5] space-y-3">
              <p>Olá!</p>
              <p>Estou feliz em acompanhar sua caminhada com Cristo.</p>
              <p>Todos os dias estarei aqui para incentivar você a crescer na Palavra de Deus, na oração e na comunhão com o Pai.</p>
              <p className="italic text-[#C9A962]/80">— Conselheiro Espiritual</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Cards de Acompanhamento */}
      <Section title="Acompanhamento Espiritual">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {acompanhamentoCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card key={index} className="hover:border-[#C9A962]/40 transition-colors group">
                <div className="flex flex-col h-full">
                  <div className="p-3 rounded-xl bg-[#C9A962]/10 w-fit mb-4 group-hover:bg-[#C9A962]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#C9A962]" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                  <p className="text-sm text-[#A0A0A0] flex-1">{card.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#C9A962]">Em breve</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* Área Sobre Você */}
      <Section title="Sobre Você">
        <Card>
          <p className="text-sm text-[#A0A0A0] mb-6">Esta informação nos ajudará a personalizar sua experiência (visual apenas nesta fase).</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Há quanto tempo você aceitou Jesus?</label>
              <select className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A962]">
                <option>Menos de 1 ano</option>
                <option>1 a 3 anos</option>
                <option>3 a 5 anos</option>
                <option>Mais de 5 anos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Você congrega regularmente?</label>
              <select className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A962]">
                <option>Sim, todos os domingos</option>
                <option>Sim, algumas vezes por mês</option>
                <option>Estou buscando uma igreja</option>
                <option>Não no momento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Você participa de algum ministério?</label>
              <input 
                type="text" 
                placeholder="Ex: Louvor, Ensino, Acolhimento..." 
                className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-[#666] focus:outline-none focus:border-[#C9A962]" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quanto tempo deseja estudar por dia?</label>
              <select className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A962]">
                <option>15 minutos</option>
                <option>30 minutos</option>
                <option>45 minutos</option>
                <option>1 hora ou mais</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Em quais áreas deseja crescer espiritualmente?</label>
              <textarea 
                placeholder="Ex: Oração, leitura bíblica, discipulado, evangelismo..." 
                rows={3}
                className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-[#666] focus:outline-none focus:border-[#C9A962] resize-y"
              />
            </div>
          </div>
        </Card>
      </Section>

      {/* Área Minha Caminhada */}
      <Section title="Minha Caminhada">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {minhaCaminhadaMock.map((item, index) => (
            <Card key={index} className="text-center">
              <div className="text-3xl font-bold text-[#C9A962] mb-1">{item.value}</div>
              <div className="text-sm text-[#A0A0A0]">{item.label}</div>
              {item.unit && <div className="text-xs text-[#666] mt-0.5">{item.unit}</div>}
            </Card>
          ))}
        </div>
      </Section>

      {/* Mensagens do Conselheiro */}
      <Section title="Mensagens do Conselheiro">
        <div className="space-y-3">
          {mensagensConselheiro.map((mensagem, index) => (
            <div 
              key={index} 
              className="premium-card p-5 flex gap-4 items-start border-l-4 border-[#C9A962]/60"
            >
              <div className="mt-0.5">
                <MessageCircle className="h-5 w-5 text-[#C9A962]" />
              </div>
              <p className="text-[#E5E5E5]">{mensagem}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#666] mt-4 text-center">Estas são mensagens ilustrativas. Em breve, serão personalizadas para você.</p>
      </Section>
    </div>
  )
}