interface DashboardCardProps {
  title: string
  value: string
  change: string
  changeColor?: string
}

export function DashboardCard({ title, value, change, changeColor = 'text-emerald-400' }: DashboardCardProps) {
  return (
    <div className="bg-[#1C1C1C] border border-[#333333] rounded-2xl p-6">
      <div className="text-sm text-[#A1A1AA] mb-1">{title}</div>
      <div className="text-3xl font-semibold tracking-tight mb-2">{value}</div>
      <div className={`text-sm font-medium ${changeColor}`}>{change} este mês</div>
    </div>
  )
}