import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await resetPassword(email)

    if (error) {
      setError('Não foi possível enviar o e-mail de recuperação. Verifique o endereço.')
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-3">E-mail enviado!</h2>
          <p className="text-[#A1A1AA]">
            Enviamos instruções de recuperação de senha para <strong>{email}</strong>.
          </p>
          <Link to="/login" className="inline-block mt-6 text-[#C9A962] hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Recuperar senha</h1>
          <p className="text-[#A1A1AA] mt-2">Enviaremos um link para redefinir sua senha</p>
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

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar link de recuperação'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-[#C9A962] hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
