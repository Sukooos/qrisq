'use client';

import { motion } from 'framer-motion';

export function RiskHeatmap({ matrix }: { matrix: number[][] }) {
    const labelsX = ["Very Low", "Low", "Med", "High", "Critical"];
    const labelsY = ["Modal", "Sektor", "Lokasi", "Waktu", "Eksternal"];

    return (
        <div className="p-4 bg-gray-950/50 rounded-lg border border-quantum-800/50">
            <h4 className="text-sm font-semibold text-quantum-300 mb-4 tracking-wider uppercase text-center">
                Quantum Risk Matrix
            </h4>

            <div className="flex">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-around mr-3 text-xs text-gray-400 font-mono">
                    {labelsY.map((label) => (
                        <span key={label} className="h-8 flex items-center">{label}</span>
                    ))}
                </div>

                {/* Matrix Grid */}
                <div className="flex-1 grid grid-cols-5 gap-1">
                    {matrix.map((row, i) => (
                        row.map((val, j) => {
                            // Calculate color intensity
                            // Low value (good) -> Blue/Green, High value (bad) -> Red
                            // Value is 0-1
                            const intensity = Math.min(val, 1);
                            let bgColor;
                            if (intensity < 0.3) bgColor = `rgba(14, 165, 233, ${0.2 + intensity})`; // Blue
                            else if (intensity < 0.6) bgColor = `rgba(250, 204, 21, ${intensity})`; // Yellow
                            else bgColor = `rgba(239, 68, 68, ${intensity})`; // Red

                            return (
                                <motion.div
                                    key={`${i}-${j}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (i * 5 + j) * 0.02 }}
                                    className="h-8 rounded-sm relative group cursor-pointer"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-white whitespace-nowrap z-10 pointer-events-none transition-opacity">
                                        Risk: {(val * 100).toFixed(1)}%
                                    </div>
                                </motion.div>
                            );
                        })
                    ))}
                </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between pl-16 mt-2 text-[10px] text-gray-500 font-mono uppercase">
                {labelsX.map((label) => (
                    <span key={label} className="w-full text-center">{label}</span>
                ))}
            </div>
        </div>
    );
}
