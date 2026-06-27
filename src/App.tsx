import { Routes, Route, Outlet } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      {/* === ÁREA DO USUÁRIO (com AuthProvider) === */}
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
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />
      </Route>

      {/* === ÁREA ADMINISTRATIVA (sem AuthProvider) === */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="feedbacks" element={<FeedbacksPage />} />
      </Route>
    </Routes>
  )
}

export default App