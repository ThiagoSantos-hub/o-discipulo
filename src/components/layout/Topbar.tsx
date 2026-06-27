import { Bell } from 'lucide-react'

export function Topbar() {
  return (
    <header className="h-20 border-b border-[#333333] bg-[#0F0F0F]/95 backdrop-blur-lg flex items-center px-6 lg:px-8 z-20">
      <div className="flex flex-1 items-center justify-between max-w-7xl mx-auto w-full">
        {/* Left side */}
        <div className="flex items-center">
          {/* Mobile menu handled inside Sidebar */}
        </div>

        {/* Right actions: Notifications + Avatar only */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#1C1C1C] text-[#A1A1AA] hover:text-white transition-colors border border-[#333333]">
            <Bell className="h-5 w-5" />
            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C9A962]" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#333333]">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium">Thiago Santos</div>
              <div className="text-xs text-[#A1A1AA]">Membro Premium</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#C9A962] flex items-center justify-center text-[#0F0F0F] font-semibold ring-2 ring-[#C9A962]/20">
              TS
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}