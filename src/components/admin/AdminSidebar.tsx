import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  FolderOpen,
  Church,
  Heart,
  Users2,
  MessageCircle,
  Library,
  Star,
  Trophy,
  Gamepad2,
  Bell,
  DollarSign,
  BarChart3,
  FileText,
  Plug,
  Bot,
  Settings,
  User,
  LogOut,
} from 'lucide-react'

interface AdminSidebarProps {
  isMobileOpen?: boolean
  onClose?: () => void
}

const adminMenuItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Usuários', path: '/admin/usuarios', icon: Users },
  { label: 'Assinaturas', path: '/admin/assinaturas', icon: CreditCard },
  { label: 'Conteúdos', path: '/admin/conteudos', icon: BookOpen },
  { label: 'Categorias', path: '/admin/categorias', icon: FolderOpen },
  { label: 'Sermões', path: '/admin/sermoes', icon: Church },
  { label: 'Estudos Bíblicos', path: '/admin/estudos', icon: BookOpen },
  { label: 'Professor EBD', path: '/admin/professor-ebd', icon: Users2 },
  { label: 'Vida Espiritual', path: '/admin/vida-espiritual', icon: Heart },
  { label: 'Comunidade', path: '/admin/comunidade', icon: Users2 },
  { label: 'Comentários', path: '/admin/comentarios', icon: MessageCircle },
  { label: 'Feedbacks', path: '/admin/feedbacks', icon: MessageCircle },
  { label: 'Biblioteca', path: '/admin/biblioteca', icon: Library },
  { label: 'Favoritos', path: '/admin/favoritos', icon: Star },
  { label: 'Conquistas', path: '/admin/conquistas', icon: Trophy },
  { label: 'Gamificação', path: '/admin/gamificacao', icon: Gamepad2 },
  { label: 'Notificações', path: '/admin/notificacoes', icon: Bell },
  { label: 'Financeiro', path: '/admin/financeiro', icon: DollarSign },
  { label: 'Relatórios', path: '/admin/relatorios', icon: BarChart3 },
  { label: 'Logs', path: '/admin/logs', icon: FileText },
  { label: 'Integrações', path: '/admin/integracoes', icon: Plug },
  { label: 'IA', path: '/admin/ia', icon: Bot },
  { label: 'Configurações', path: '/admin/configuracoes', icon: Settings },
  { label: 'Meu Perfil', path: '/admin/perfil', icon: User },
]

export function AdminSidebar({ isMobileOpen = false, onClose }: AdminSidebarProps) {
  const handleNavClick = () => {
    if (onClose) onClose()
  }

  return (
    <div 
      className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#1C1C1C] border-r border-[#333333] h-full flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="p-6 border-b border-[#333333]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#C9A962] flex items-center justify-center text-[#0F0F0F]">
            <span className="font-bold text-xl">✝</span>
          </div>
          <div>
            <div className="font-semibold text-xl">O Discípulo</div>
            <div className="text-xs text-[#A1A1AA]">Admin • BETA</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-sm">
        {adminMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#C9A962] text-[#0F0F0F] font-medium'
                    : 'text-[#A1A1AA] hover:bg-[#2A2A2A] hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#333333]">
        <button
          onClick={() => {
            if (onClose) onClose()
            alert('Logout simulado (Fase 2)')
          }}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-[#A1A1AA] hover:bg-[#2A2A2A] hover:text-white rounded-xl transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}