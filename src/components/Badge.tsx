import { cn } from '@/lib/utils'
export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'gold' }) {
  return <div className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variant === 'gold' ? "bg-[#C9A962] text-[#0F0F0F]" : "bg-[#2A2A2A] text-[#A1A1AA]", className)} {...props} />
}