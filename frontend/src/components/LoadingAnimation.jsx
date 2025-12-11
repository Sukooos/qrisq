import { Atom, Zap, Brain, Database } from 'lucide-react'
import { useState, useEffect } from 'react'

const LOADING_STEPS = [
  { icon: Brain, text: 'Mengekstrak variabel bisnis...', color: 'text-purple-400' },
  { icon: Atom, text: 'Menjalankan simulasi quantum...', color: 'text-quantum-400' },
  { icon: Database, text: 'Menganalisis distribusi probabilitas...', color: 'text-green-400' },
  { icon: Zap, text: 'Menyusun rekomendasi...', color: 'text-yellow-400' },
]

export default function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length)
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 10
      })
    }, 300)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const CurrentIcon = LOADING_STEPS[currentStep].icon

  return (
    <div className="max-w-xl mx-auto text-center py-20">
      {/* Quantum Animation */}
      <div className="relative w-40 h-40 mx-auto mb-8">
        {/* Outer rings */}
        <div className="absolute inset-0 border-2 border-quantum-500/30 rounded-full animate-ping"></div>
        <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-8 border-2 border-quantum-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        
        {/* Center orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-quantum-500 to-purple-600 rounded-full animate-pulse-slow quantum-glow"></div>
            <Atom className="absolute inset-0 m-auto w-8 h-8 text-white animate-spin-slow" />
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-quantum-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '6s' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="h-20">
        <div className={`flex items-center justify-center gap-3 ${LOADING_STEPS[currentStep].color}`}>
          <CurrentIcon className="w-6 h-6" />
          <span className="text-lg font-medium">{LOADING_STEPS[currentStep].text}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mx-auto mt-4">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-quantum-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2 font-mono">
          Quantum Processing: {Math.round(progress)}%
        </p>
      </div>

      {/* Fun fact */}
      <div className="mt-8 text-sm text-gray-500 max-w-md mx-auto">
        <p className="italic">
          "Quantum computers can evaluate multiple scenarios simultaneously, 
          exploring possibilities that would take classical computers years to compute."
        </p>
      </div>
    </div>
  )
}
