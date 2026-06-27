import {
  Home,
  BookOpen,
  BookText,
  Users,
  Heart,
  HeartHandshake,
  Award,
  User,
  Settings,
  Church,
  MessageCircle,
} from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

export const navItems: NavItem[] = [
  { label: 'Início', path: '/', icon: Home },
  { label: 'Minha Biblioteca', path: '/biblioteca', icon: BookOpen },
  { label: 'Sermões', path: '/sermoes', icon: BookText },
  { label: 'Estudos Bíblicos', path: '/estudos', icon: BookOpen },
  { label: 'Professor EBD', path: '/professor-ebd', icon: Church },
  { label: 'Vida Espiritual', path: '/vida-espiritual', icon: Heart },
  { label: 'Conselheiro Espiritual', path: '/conselheiro-espiritual', icon: HeartHandshake },
  { label: 'Comunidade', path: '/comunidade', icon: Users },
  { label: 'Conquistas', path: '/conquistas', icon: Award },
  { label: 'Central de Feedback', path: '/feedback', icon: MessageCircle },
  { label: 'Meu Perfil', path: '/perfil', icon: User },
  { label: 'Configurações', path: '/configuracoes', icon: Settings },
]