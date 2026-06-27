import { useState } from 'react'
import { Search } from 'lucide-react'
export function SearchBar({ placeholder = "Buscar...", onSearch }: { placeholder?: string; onSearch?: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim() && onSearch) onSearch(query.trim()) }
  return <form onSubmit={handleSubmit} className="relative"><div className="relative"><Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" /><input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder} className="w-full bg-[#1C1C1C] border border-[#333333] focus:border-[#C9A962] rounded-2xl pl-14 pr-6 py-4 text-base placeholder:text-[#A1A1AA] focus:outline-none" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#C9A962] text-[#0F0F0F] rounded-xl text-sm font-semibold">Buscar</button></div></form>
}