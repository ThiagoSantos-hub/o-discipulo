import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'E-mail ou senha incorretos.' 
        : 'Ocorreu um erro ao fazer login. Tente novamente.')
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-2xl bg-[#C9A962] flex items-center justify-center">
              <span className="text-[#0F0F0F] text-2xl font-bold">✝</span>
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="text-[#A1A1AA] mt-2">Entre na sua conta para continuar sua jornada</p>
        </div>

        <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-[#C9A962]"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#A1A1AA]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-[#C9A962]"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/forgot-password" className="text-[#C9A962] hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-[#A1A1AA]">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-[#C9A962] hover:underline">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
