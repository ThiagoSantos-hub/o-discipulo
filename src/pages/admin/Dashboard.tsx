import { DashboardCard } from '@/components/admin/DashboardCard'

const mockStats = [
  { title: 'Usuários Totais', value: '12.847', change: '+18%', color: 'text-emerald-400' },
  { title: 'Usuários Ativos', value: '8.392', change: '+12%', color: 'text-emerald-400' },
  { title: 'Assinaturas Ativas', value: '4.721', change: '+24%', color: 'text-emerald-400' },
  { title: 'Receita Mensal', value: 'R$ 87.450', change: '+31%', color: 'text-emerald-400' },
  { title: 'Sermões Publicados', value: '1.284', change: '+9%', color: 'text-emerald-400' },
  { title: 'Estudos Bíblicos', value: '672', change: '+14%', color: 'text-emerald-400' },
  { title: 'Comentários Hoje', value: '341', change: '-4%', color: 'text-rose-400' },
  { title: 'Pedidos de Oração', value: '89', change: '+27%', color: 'text-emerald-400' },
]

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-[#A1A1AA] mt-1">Visão geral da plataforma — Dados fictícios (Fase 2)</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {mockStats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeColor={stat.color}
          />
        ))}
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-4 text-sm">
            {[
              'Novo usuário cadastrado: Maria Oliveira',
              'Sermão "A Graça que Transforma" publicado',
              'Assinatura Premium ativada - João Mendes',
              'Comentário reportado em Estudo de Romanos',
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-[#A1A1AA]">
                <div className="h-2 w-2 rounded-full bg-[#C9A962]" />
                {activity}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Top Conteúdos da Semana</h3>
          <div className="space-y-3 text-sm">
            {[
              { name: 'Sermão: Vivendo com Propósito', views: '4.8k' },
              { name: 'Estudo: O Poder da Oração', views: '3.2k' },
              { name: 'Devocional: Paz em Meio ao Caos', views: '2.9k' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="text-[#C9A962] font-medium">{item.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}