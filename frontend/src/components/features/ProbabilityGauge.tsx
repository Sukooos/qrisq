'use client';

import { motion } from 'framer-motion';

export function ProbabilityGauge({ probability }: { probability: number }) {
    const percentage = Math.round(probability * 100);

    // Color based on probability
    const getColor = (p: number) => {
        if (p < 0.4) return '#ef4444'; // Red
        if (p < 0.7) return '#fbbf24'; // Amber
        return '#00FA9A'; // SpringGreen/Quantum Accent
    };

    const color = getColor(probability);

    return (
        <div className="relative flex flex-col items-center justify-center p-6">
            <div className="relative w-48 h-48">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-quantum-900/30"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDasharray: "0 553" }}
                        animate={{ strokeDasharray: `${probability * 553} 553` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        cx="96"
                        cy="96"
                        r="88"
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeLinecap="round"
                        style={{
                            filter: `drop-shadow(0 0 8px ${color})`
                        }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl font-bold font-mono text-white text-glow"
                    >
                        {percentage}%
                    </motion.span>
                    <span className="text-xs text-quantum-300 uppercase tracking-widest mt-1">
                        Success Rate
                    </span>
                </div>
            </div>

            {/* Status Label */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-4 py-1 rounded-full text-sm font-semibold border border-opacity-50"
                style={{ borderColor: color, color: color, backgroundColor: `${color}10` }}
            >
                {probability > 0.7 ? "OPTIMAL" : probability > 0.4 ? "MODERATE" : "HIGH RISK"}
            </motion.div>
        </div>
    );
}
