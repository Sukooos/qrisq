import { Atom } from 'lucide-react'

export default function Header() {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Atom className="w-10 h-10 text-quantum-400 animate-spin-slow" />
            <div className="absolute inset-0 blur-lg bg-quantum-500/30 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-quantum-400 to-purple-400 bg-clip-text text-transparent">
              Q-RISQ
            </h1>
            <p className="text-xs text-gray-400">Quantum Risk Intelligence System</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <span className="px-3 py-1 rounded-full bg-quantum-900/50 border border-quantum-700/50 text-quantum-300">
            MVP v1.0
          </span>
        </nav>
      </div>
    </header>
  )
}
