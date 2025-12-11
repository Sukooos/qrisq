import { useState } from 'react'
import InputBox from './components/InputBox'
import ResultCard from './components/ResultCard'
import LoadingAnimation from './components/LoadingAnimation'
import Header from './components/Header'
import Particles from './components/Particles'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async (description) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error('Analisis gagal. Silakan coba lagi.')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen gradient-bg relative">
      <Particles />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {!result && !loading && (
            <InputBox onAnalyze={handleAnalyze} error={error} />
          )}
          
          {loading && <LoadingAnimation />}
          
          {result && (
            <ResultCard result={result} onReset={handleReset} />
          )}
        </main>
        
        <footer className="text-center py-8 text-gray-500 text-sm">
          <p>Powered by Quantum Computing & AI</p>
          <p className="mt-1">© 2025 Q-RISQ Team</p>
        </footer>
      </div>
    </div>
  )
}

export default App
