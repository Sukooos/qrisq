import { ArrowLeft, Download, TrendingUp, AlertTriangle, CheckCircle, Info, Lightbulb } from 'lucide-react'
import ChartHeatmap from './ChartHeatmap'
import ProbabilityGauge from './ProbabilityGauge'

export default function ResultCard({ result, onReset }) {
  const { 
    success_probability, 
    risk_heatmap, 
    risk_categories, 
    recommendations,
    extracted_variables,
    quantum_metadata
  } = result

  const getRiskLevel = (prob) => {
    if (prob >= 0.7) return { text: 'Rendah', color: 'text-green-400', bg: 'bg-green-900/30' }
    if (prob >= 0.5) return { text: 'Sedang', color: 'text-yellow-400', bg: 'bg-yellow-900/30' }
    return { text: 'Tinggi', color: 'text-red-400', bg: 'bg-red-900/30' }
  }

  const riskLevel = getRiskLevel(success_probability)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Analisis Baru
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Main Result Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Probability & Variables */}
        <div className="space-y-6">
          {/* Probability Card */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 quantum-glow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-quantum-400" />
              Probabilitas Keberhasilan
            </h3>
            
            <ProbabilityGauge probability={success_probability} />
            
            <div className={`mt-4 p-3 rounded-lg ${riskLevel.bg}`}>
              <p className="text-sm">
                Level Risiko: <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.text}</span>
              </p>
            </div>
          </div>

          {/* Extracted Variables */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-400" />
              Variabel Terdeteksi
            </h3>
            
            <div className="space-y-3">
              {[
                { label: 'Modal', value: `Rp ${(extracted_variables.modal / 1_000_000).toLocaleString()} juta` },
                { label: 'Sektor', value: extracted_variables.sektor },
                { label: 'Lokasi', value: extracted_variables.lokasi },
                { label: 'Tahun', value: extracted_variables.tahun },
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantum Metadata */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
            <h3 className="text-sm font-medium mb-3 text-gray-400">Quantum Metadata</h3>
            <div className="font-mono text-xs text-gray-500 space-y-1">
              <p>Simulator: {quantum_metadata.simulator}</p>
              <p>Shots: {quantum_metadata.shots}</p>
              <p>Qubits: {quantum_metadata.n_qubits}</p>
              <p>Circuit Depth: {quantum_metadata.circuit_depth}</p>
            </div>
          </div>
        </div>

        {/* Center Column - Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Heatmap */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Risk Heatmap</h3>
            <ChartHeatmap data={risk_heatmap} />
          </div>

          {/* Risk Categories */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* High Risk */}
            <div className="bg-red-900/20 rounded-xl p-4 border border-red-800/50">
              <h4 className="flex items-center gap-2 font-medium text-red-400 mb-3">
                <AlertTriangle className="w-4 h-4" />
                Risiko Tinggi
              </h4>
              <ul className="space-y-2">
                {risk_categories.High.map((risk, index) => (
                  <li key={index} className="text-sm text-red-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {risk}
                  </li>
                ))}
                {risk_categories.High.length === 0 && (
                  <li className="text-sm text-gray-500">Tidak ada</li>
                )}
              </ul>
            </div>

            {/* Medium Risk */}
            <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-800/50">
              <h4 className="flex items-center gap-2 font-medium text-yellow-400 mb-3">
                <AlertTriangle className="w-4 h-4" />
                Risiko Sedang
              </h4>
              <ul className="space-y-2">
                {risk_categories.Medium.map((risk, index) => (
                  <li key={index} className="text-sm text-yellow-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Low Risk */}
            <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/50">
              <h4 className="flex items-center gap-2 font-medium text-green-400 mb-3">
                <CheckCircle className="w-4 h-4" />
                Risiko Rendah
              </h4>
              <ul className="space-y-2">
                {risk_categories.Low.map((risk, index) => (
                  <li key={index} className="text-sm text-green-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Rekomendasi Strategis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-3">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-quantum-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
