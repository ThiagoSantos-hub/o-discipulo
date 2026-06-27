import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMobileSidebar = () => setIsMobileOpen(false)

  return (
    <div className="flex h-screen bg-[#0F0F0F] text-white overflow-hidden">
      {/* Sidebar Admin - Responsiva */}
      <AdminSidebar 
        isMobileOpen={isMobileOpen} 
        onClose={closeMobileSidebar} 
      />

      {/* Overlay Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          onMenuClick={() => setIsMobileOpen(!isMobileOpen)} 
          isMobileOpen={isMobileOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}