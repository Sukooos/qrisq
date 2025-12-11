const RISK_FACTORS = ['Modal', 'Sektor', 'Lokasi', 'Waktu', 'Eksternal']
const IMPACT_LEVELS = ['Very Low', 'Low', 'Medium', 'High', 'Very High']

function getColor(value) {
  // Color scale from green to red
  if (value < 0.2) return 'bg-green-500'
  if (value < 0.4) return 'bg-green-400'
  if (value < 0.5) return 'bg-yellow-400'
  if (value < 0.6) return 'bg-orange-400'
  if (value < 0.75) return 'bg-orange-500'
  return 'bg-red-500'
}

function getTextColor(value) {
  if (value < 0.5) return 'text-gray-900'
  return 'text-white'
}

export default function ChartHeatmap({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-xs text-gray-500 font-medium"></th>
            {IMPACT_LEVELS.map((level, index) => (
              <th key={index} className="p-2 text-center text-xs text-gray-400 font-medium">
                {level}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 text-sm text-gray-400 font-medium whitespace-nowrap">
                {RISK_FACTORS[rowIndex]}
              </td>
              {row.map((value, colIndex) => (
                <td key={colIndex} className="p-1">
                  <div 
                    className={`
                      aspect-square rounded-lg flex items-center justify-center
                      ${getColor(value)} ${getTextColor(value)}
                      text-xs font-bold transition-transform hover:scale-110 cursor-default
                    `}
                    title={`${RISK_FACTORS[rowIndex]} - ${IMPACT_LEVELS[colIndex]}: ${(value * 100).toFixed(1)}%`}
                  >
                    {(value * 100).toFixed(0)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <span>Low Risk</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <div className="w-4 h-4 bg-red-500 rounded"></div>
        </div>
        <span>High Risk</span>
      </div>
    </div>
  )
}
