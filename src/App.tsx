import { Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { HomePage } from '@/pages/HomePage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { Dashboard } from '@/pages/admin/Dashboard'

function App() {
  return (
    <div className="flex h-screen bg-[#0F0F0F] text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explorar" element={<PlaceholderPage title="Explorar" />} />
              <Route path="/biblioteca" element={<PlaceholderPage title="Minha Biblioteca" />} />
              <Route path="/sermoes" element={<PlaceholderPage title="Sermões" />} />
              <Route path="/estudos" element={<PlaceholderPage title="Estudos Bíblicos" />} />
              <Route path="/professor-ebd" element={<PlaceholderPage title="Professor EBD" />} />
              <Route path="/vida-espiritual" element={<PlaceholderPage title="Vida Espiritual" />} />
              <Route path="/comunidade" element={<PlaceholderPage title="Comunidade" />} />
              <Route path="/conquistas" element={<PlaceholderPage title="Conquistas" />} />
              <Route path="/perfil" element={<PlaceholderPage title="Meu Perfil" />} />
              <Route path="/configuracoes" element={<PlaceholderPage title="Configurações" />} />

              {/* Admin Routes - Fase 2 */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App