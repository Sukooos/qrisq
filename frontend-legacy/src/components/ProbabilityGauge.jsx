import { useEffect, useState } from 'react'

export default function ProbabilityGauge({ probability }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    // Animate the number counting up
    const duration = 1500
    const steps = 60
    const increment = probability / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= probability) {
        setDisplayValue(probability)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [probability])

  const percentage = displayValue * 100
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (displayValue * circumference)
  
  // Color based on probability
  const getColor = () => {
    if (probability >= 0.7) return { stroke: '#22c55e', text: 'text-green-400' }
    if (probability >= 0.5) return { stroke: '#eab308', text: 'text-yellow-400' }
    return { stroke: '#ef4444', text: 'text-red-400' }
  }
  
  const color = getColor()

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="#374151"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke={color.stroke}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${color.stroke})`
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color.text}`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      
      {/* Confidence interval */}
      <p className="text-sm text-gray-500 mt-2">
        Confidence: ±5%
      </p>
    </div>
  )
}
