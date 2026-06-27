import { useState } from 'react'
import { Search, Bell } from 'lucide-react'
export function Topbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchQuery.trim()) alert(`Busca: ${searchQuery}`) }
  return (
    <header className="h-20 border-b border-[#333333] bg-[#0F0F0F]/95 backdrop-blur flex items-center px-6 lg:px-8">
      <div className="flex flex-1 items-center justify-between max-w-7xl mx-auto">
        <div className="hidden md:block"><div className="text-sm text-[#A1A1AA]">Bem-vindo de volta,</div><div className="font-semibold text-lg">Thiago</div></div>
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" /><input type="text" placeholder="Buscar sermões, estudos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1C1C1C] border border-[#333333] focus:border-[#C9A962] rounded-2xl pl-11 pr-4 py-3 text-sm placeholder:text-[#A1A1AA] focus:outline-none" /></div></form>
        <div className="flex items-center gap-3"><button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#1C1C1C] border border-[#333333]"><Bell className="h-5 w-5" /><div className="absolute top-2 right-2 h-2 w-2 bg-[#C9A962] rounded-full" /></button><div className="flex items-center gap-3 pl-3 border-l border-[#333333]"><div className="hidden md:block text-right text-sm"><div className="font-medium">Thiago Santos</div><div className="text-xs text-[#A1A1AA]">Membro Premium</div></div><div className="h-10 w-10 rounded-full bg-[#C9A962] flex items-center justify-center text-[#0F0F0F] font-semibold">TS</div></div></div>
      </div>
    </header>
  )
}