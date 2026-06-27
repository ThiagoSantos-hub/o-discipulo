import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { navItems } from '@/constants/navigation'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  return (
    <>
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1C1C1C] rounded-xl border border-[#333333]"><Menu className="h-5 w-5" /></button>
      <div className={cn("fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-[#1C1C1C] border-r border-[#333333] transition-all duration-300", isCollapsed ? "w-20" : "w-72", isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex h-20 items-center justify-between px-6 border-b border-[#333333]">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C9A962] text-[#0F0F0F]"><span className="text-xl font-bold">✝</span></div>
            {!isCollapsed && <div><div className="font-semibold text-xl tracking-tight">O Discípulo</div><div className="text-[10px] text-[#A1A1AA] -mt-1">BETA</div></div>}
          </div>
          <button onClick={toggleCollapse} className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#2A2A2A] text-[#A1A1AA]">{isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}</button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => { const Icon = item.icon; return <NavLink key={item.path} to={item.path} onClick={() => setIsMobileOpen(false)} className={({ isActive }) => cn("nav-link group", isActive ? "bg-[#C9A962] text-[#0F0F0F]" : "text-[#A1A1AA] hover:text-white hover:bg-[#2A2A2A]") }><Icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "mx-auto")} />{!isCollapsed && <span>{item.label}</span>}</NavLink> })}
        </nav>
        <div className="p-4 border-t border-[#333333] text-xs text-[#A1A1AA]">{!isCollapsed && <div className="px-4"><div>O Discípulo (BETA)</div><div className="mt-0.5">v0.1.0 • Fase 1</div></div>}</div>
      </div>
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setIsMobileOpen(false)} />}
    </>
  )
}