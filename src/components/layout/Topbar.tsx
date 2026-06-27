import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function Topbar() {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <header className="h-20 border-b border-[#333333] bg-[#0F0F0F]/95 backdrop-blur-lg flex items-center px-6 lg:px-8 z-20">
      <div className="flex flex-1 items-center justify-between max-w-7xl mx-auto w-full">
        {/* Left side */}
        <div className="flex items-center">
          {/* Mobile menu handled inside Sidebar */}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#1C1C1C] text-[#A1A1AA] hover:text-white transition-colors border border-[#333333]">
            <Bell className="h-5 w-5" />
            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C9A962]" />
          </button>

          {/* User / Login */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#333333]">
            {user ? (
              /* Usuário logado */ 
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário'}
                  </div>
                  <div className="text-xs text-[#A1A1AA]">Membro</div>
                </div>

                <div className="h-10 w-10 rounded-full bg-[#C9A962] flex items-center justify-center text-[#0F0F0F] font-semibold ring-2 ring-[#C9A962]/20">
                  {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>

                <div className="flex flex-col gap-1">
                  <Link 
                    to="/perfil" 
                    className="text-xs text-[#C9A962] hover:underline"
                  >
                    Meu Perfil
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-xs text-red-400 hover:text-red-500 text-left"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              /* Não logado */ 
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium bg-[#C9A962] text-[#0F0F0F] rounded-xl hover:bg-[#d4b36e] transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}