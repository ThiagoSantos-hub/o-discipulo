import { ReactNode } from 'react'
import { BookOpen } from 'lucide-react'
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-[#333333] rounded-3xl bg-[#1C1C1C]/50"><div className="mb-6 text-[#C9A962]"><BookOpen className="h-12 w-12" /></div><h3 className="text-2xl font-semibold tracking-tight mb-3">{title}</h3><p className="max-w-md text-[#A1A1AA] mb-8">{description}</p>{action}</div>
}