import { Bell, Menu } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick?: () => void
  isMobileOpen?: boolean
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-[#333333] bg-[#0F0F0F] flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger Button - Mobile/Tablet */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-[#A1A1AA] hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="font-semibold text-lg">Painel Administrativo</h1>
          <p className="text-xs text-[#A1A1AA] hidden sm:block">Bem-vindo, Pr. Thiago</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-[#1C1C1C] text-[#A1A1AA] hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#C9A962] rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#333333]">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium">Pr. Thiago Santos</div>
            <div className="text-xs text-[#A1A1AA]">Administrador</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-[#C9A962] flex items-center justify-center text-[#0F0F0F] font-semibold">
            TS
          </div>
        </div>
      </div>
    </header>
  )
}