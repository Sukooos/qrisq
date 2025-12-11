import { useState } from 'react'
import { Send, Sparkles, AlertCircle } from 'lucide-react'

const SAMPLE_SCENARIOS = [
  "Investasi 500 juta di bisnis F&B Jakarta Selatan tahun 2026 dengan konsep cafe kopi premium",
  "Membangun startup teknologi fintech dengan modal 2 miliar di Bandung untuk tahun 2025",
  "Membuka franchise retail fashion di Surabaya dengan investasi 300 juta tahun 2026",
  "Investasi properti apartemen 5 miliar di BSD Tangerang untuk disewakan mulai 2027",
]

export default function InputBox({ onAnalyze, error }) {
  const [description, setDescription] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    setDescription(e.target.value)
    setCharCount(e.target.value.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description.length >= 50) {
      onAnalyze(description)
    }
  }

  const handleSampleClick = (sample) => {
    setDescription(sample)
    setCharCount(sample.length)
  }

  const isValid = charCount >= 50

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-quantum-200 to-purple-300 bg-clip-text text-transparent">
            Analisis Risiko Bisnis
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Gunakan kekuatan <span className="text-quantum-400">Quantum Computing</span> + <span className="text-purple-400">AI</span> untuk menganalisis risiko investasi Anda
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-800 quantum-glow">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Deskripsikan Skenario Bisnis Anda
          </label>
          
          <textarea
            value={description}
            onChange={handleChange}
            placeholder="Contoh: Investasi 500 juta di bisnis F&B Jakarta Selatan tahun 2026..."
            className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-quantum-500 focus:border-transparent
                     transition-all duration-300"
          />
          
          <div className="flex items-center justify-between mt-3 mb-6">
            <span className={`text-sm ${isValid ? 'text-green-400' : 'text-gray-500'}`}>
              {charCount}/50 karakter minimum
            </span>
            {!isValid && charCount > 0 && (
              <span className="text-yellow-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Tambahkan detail lebih lanjut
              </span>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2
                      transition-all duration-300 ${
                        isValid
                          ? 'bg-gradient-to-r from-quantum-600 to-purple-600 hover:from-quantum-500 hover:to-purple-500 text-white shadow-lg hover:shadow-quantum-500/25'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
          >
            <Sparkles className="w-5 h-5" />
            Analisis Risiko
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Sample Scenarios */}
        <div className="mt-8">
          <p className="text-sm text-gray-400 mb-3">Atau coba contoh skenario:</p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_SCENARIOS.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample)}
                className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 
                         border border-gray-700 rounded-lg text-gray-300
                         transition-all duration-200 text-left"
              >
                {sample.slice(0, 50)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: '⚛️', title: 'Quantum Simulation', desc: 'Monte Carlo berbasis Qiskit' },
          { icon: '🤖', title: 'AI Analysis', desc: 'Ekstraksi variabel otomatis' },
          { icon: '📊', title: 'Visual Insights', desc: 'Heatmap & rekomendasi' },
        ].map((feature, index) => (
          <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-medium text-white">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
