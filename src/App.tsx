import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { HomePage } from '@/pages/HomePage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { Dashboard } from '@/pages/admin/Dashboard'
import { FeedbackPage } from '@/pages/FeedbackPage'
import { FeedbacksPage } from '@/pages/admin/FeedbacksPage'
import { ConselheiroEspiritualPage } from '@/pages/ConselheiroEspiritualPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AuthProvider } from '@/contexts/AuthContext'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { useAuth } from '@/contexts/AuthContext'
import PrayerNotebookPage from '@/pages/PrayerNotebookPage'
import ReadingPlanPage from '@/pages/ReadingPlanPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex justify-center items-center min-h-screen">Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        element={
          <AuthProvider>
            <div className="flex h-screen bg-[#0F0F0F] text-white overflow-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                  <div className="mx-auto max-w-7xl">
                    <Outlet />
                  </div>
                </main>
              </div>
            </div>
          </AuthProvider>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/biblioteca" element={<PlaceholderPage title="Minha Biblioteca" />} />
        <Route path="/sermoes" element={<PlaceholderPage title="Sermões" />} />
        <Route path="/estudos" element={<PlaceholderPage title="Estudos Bíblicos" />} />
        <Route path="/professor-ebd" element={<PlaceholderPage title="Professor EBD" />} />
        <Route path="/vida-espiritual" element={<PlaceholderPage title="Vida Espiritual" />} />
        <Route path="/conselheiro-espiritual" element={<ConselheiroEspiritualPage />} />
        <Route path="/comunidade" element={<PlaceholderPage title="Comunidade" />} />
        <Route path="/conquistas" element={<PlaceholderPage title="Conquistas" />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/caderno-oracao" element={<ProtectedRoute><PrayerNotebookPage /></ProtectedRoute>} />
        <Route path="/plano-leitura" element={<ProtectedRoute><ReadingPlanPage /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="feedbacks" element={<FeedbacksPage />} />
      </Route>
    </Routes>
  )
}

export default App