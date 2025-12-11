'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuantumSummary } from '@/lib/api';
import { BrainCircuit, Lightbulb, ShieldAlert, Cpu, ListCheck } from 'lucide-react';
import { SimulationChart } from './SimulationChart';

interface QuantumInsightsProps {
    summary: QuantumSummary;
    probability: number; // Add this prop
}

export const QuantumInsights = ({ summary, probability }: QuantumInsightsProps) => {
    return (
        <div className="space-y-6">
            {/* Executive Summary & Key Insight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-quantum-500/40 bg-gray-950/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-quantum-300">
                            <Cpu className="w-5 h-5 text-quantum-400" />
                            Executive Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {summary.executive_summary || "Analisis quantum sedang diproses..."}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-purple-500/40 bg-gray-950/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-purple-300">
                            <Lightbulb className="w-5 h-5 text-purple-400" />
                            Key Quantum Insight
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {summary.key_insight || "Insight strategis sedang digenerate..."}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* New Chart Section */}
            <SimulationChart probability={probability} />

            {/* Strategic Action Items */}
            <Card className="border-teal-500/30 bg-gray-950/50">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-teal-300">
                        <ListCheck className="w-5 h-5 text-teal-400" />
                        Strategic Action Items
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {summary.action_items && summary.action_items.length > 0 ? (
                            summary.action_items.map((action, idx) => (
                                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-teal-950/20 border border-teal-500/20">
                                    <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold border border-teal-500/30">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{action}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">Menunggu rekomendasi aksi...</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Probability Explanation */}
            <Card className="border-blue-500/30">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-blue-300">
                        <BrainCircuit className="w-5 h-5 text-blue-400" />
                        Why This Probability?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {summary.probability_explanation}
                    </p>
                </CardContent>
            </Card>

            {/* Risk Breakdown */}
            <Card className="border-red-500/30">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-red-300">
                        <ShieldAlert className="w-5 h-5 text-red-400" />
                        Quantum Risk Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {summary.risk_breakdown}
                    </p>
                </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="border-green-500/30">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-green-300">
                        <ListCheck className="w-5 h-5 text-green-400" />
                        Recommended Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {summary.action_items.map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors"
                            >
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                                <span className="text-sm text-gray-300">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
