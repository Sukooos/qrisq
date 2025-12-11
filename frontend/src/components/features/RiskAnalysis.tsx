'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysis } from '@/hooks/useAnalysis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProbabilityGauge } from './ProbabilityGauge';
import { RiskHeatmap } from './RiskHeatmap';
import { QuantumInsights } from './QuantumInsights';
import { Loader2, RefreshCw, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function RiskAnalysis() {
    const { result, loading, error, submitAnalysis, resetAnalysis } = useAnalysis();
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        submitAnalysis(input);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">

            {/* INPUT SECTION */}
            <AnimatePresence mode="wait">
                {!result && (
                    <motion.div
                        key="input-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-quantum-700/50 shadow-glow">
                            <CardHeader>
                                <CardTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-quantum-300 to-quantum-500">
                                    Business Scenario Input
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Masukkan detail bisnis Anda untuk dianalisis oleh Quantum-AI Engine
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-quantum-500 to-purple-600 rounded-lg blur opacity-25 group-focus-within:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Contoh: Saya ingin membuka coffee shop di Jakarta Selatan dengan modal 500 juta tahun 2026..."
                                            className="relative w-full h-32 bg-gray-950 text-white rounded-lg p-4 border border-gray-800 focus:outline-none focus:border-quantum-500 transition-colors resize-none font-mono text-sm leading-relaxed"
                                        />
                                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                            {input.length} chars
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="p-3 bg-red-950/50 border border-red-800 rounded-md text-red-400 text-sm flex items-center gap-2"
                                        >
                                            <AlertTriangle className="w-4 h-4" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-lg font-bold tracking-wider"
                                        variant="glow"
                                        isLoading={loading}
                                        disabled={input.length < 50}
                                    >
                                        {loading ? "QUANTUM PROCESSING..." : "ANALYZE RISK"}
                                        {!loading && <Send className="ml-2 w-5 h-5" />}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        key="result-section"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        {/* Summary Section (Full Width) */}
                        {result.quantum_summary && (
                            <QuantumInsights
                                summary={result.quantum_summary}
                                probability={result.success_probability}
                            />
                        )}


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Column 1: Probability Gauge & Stats */}
                            <Card className="border-quantum-500/30 overflow-hidden relative h-fit">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-quantum-400 to-purple-500" />
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <CheckCircle2 className="text-quantum-400" />
                                        Success Probability
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ProbabilityGauge probability={result.success_probability} />

                                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                                        <div className="bg-gray-900/50 p-3 rounded border border-gray-800">
                                            <span className="text-gray-400 block text-xs uppercase">Modal</span>
                                            <span className="font-mono text-white text-lg">
                                                {(result.extracted_variables.modal / 1000000).toLocaleString('id-ID')} Jt
                                            </span>
                                        </div>
                                        <div className="bg-gray-900/50 p-3 rounded border border-gray-800">
                                            <span className="text-gray-400 block text-xs uppercase">Sektor</span>
                                            <span className="font-mono text-white text-lg truncate">
                                                {result.extracted_variables.sektor}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Column 2: Risk Heatmap & Top Risks */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Risk Matrix</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RiskHeatmap matrix={result.risk_heatmap} />
                                    </CardContent>
                                </Card>

                                <Card className="border-red-900/20 bg-gray-900/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm uppercase tracking-wider text-gray-400">Top Identified Risks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {result.risk_categories.High.length > 0 ? (
                                                result.risk_categories.High.map(risk => (
                                                    <span key={risk} className="px-3 py-1 rounded-full bg-red-900/30 border border-red-700/50 text-red-400 text-xs font-medium">
                                                        {risk}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 text-sm italic">No high risks identified</span>
                                            )}
                                            {result.risk_categories.Medium.map(risk => (
                                                <span key={risk} className="px-3 py-1 rounded-full bg-yellow-900/30 border border-yellow-700/50 text-yellow-400 text-xs font-medium">
                                                    {risk}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 pb-10">
                            <Button
                                onClick={resetAnalysis}
                                size="lg"
                                className="bg-quantum-600 hover:bg-quantum-500 text-white shadow-lg shadow-quantum-500/20"
                            >
                                <RefreshCw className="mr-2 w-5 h-5" />
                                Start New Analysis
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
