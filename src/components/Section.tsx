import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
export function Section({ title, children, viewAllLink }: { title: string; children: ReactNode; viewAllLink?: string }) {
  return <div><div className="flex items-center justify-between mb-5"><h2 className="section-title">{title}</h2>{viewAllLink && <Link to={viewAllLink} className="flex items-center gap-1 text-sm text-[#C9A962] hover:underline">Ver tudo <ArrowRight className="h-4 w-4" /></Link>}</div>{children}</div>
}