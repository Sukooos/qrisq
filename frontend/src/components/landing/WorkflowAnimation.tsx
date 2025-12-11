'use client';

import { motion } from 'framer-motion';
import { Database, BrainCircuit, Cpu, FileText, Share2, Sparkles } from 'lucide-react';

export const WorkflowAnimation = () => {
    // Node definitions
    const nodes = [
        { id: "input", icon: FileText, label: "User Scenario", x: 10, y: 50, color: "text-white bg-gray-800" },
        { id: "llm", icon: BrainCircuit, label: "Groq LLM Extraction", x: 35, y: 20, color: "text-purple-400 bg-purple-900/40 border-purple-500/50" },
        { id: "quantum", icon: Cpu, label: "Qiskit Simulation", x: 60, y: 50, color: "text-quantum-400 bg-quantum-900/40 border-quantum-500/50" },
        { id: "ai", icon: Sparkles, label: "AI Insights", x: 85, y: 30, color: "text-amber-400 bg-amber-900/40 border-amber-500/50" },
    ];

    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gray-950/50 overflow-hidden rounded-xl border border-gray-800/50">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Line 1: Input -> LLM */}
                <motion.path
                    d="M100,150 C150,150 200,80 300,80"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                {/* Line 2: LLM -> Quantum */}
                <motion.path
                    d="M380,80 C480,80 500,150 600,150"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                {/* Line 3: Quantum -> AI */}
                <motion.path
                    d="M700,150 C750,150 800,100 850,100"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 3 }}
                />

                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6b7280" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>

                {/* Moving Particles along paths */}
                <circle r="4" fill="#a855f7">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M100,150 C150,150 200,80 300,80" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </circle>
                <circle r="4" fill="#0ea5e9">
                    <animateMotion dur="1.5s" begin="1.5s" repeatCount="indefinite" path="M380,80 C480,80 500,150 600,150" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </circle>
                <circle r="4" fill="#f59e0b">
                    <animateMotion dur="1.5s" begin="3s" repeatCount="indefinite" path="M700,150 C750,150 800,100 850,100" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </circle>
            </svg>

            {/* Nodes Container */}
            <div className="relative w-[90%] h-[70%] flex items-center justify-between pointer-events-none">
                {/* Node 1: User */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0 }}
                    className="flex flex-col items-center gap-2 z-10"
                >
                    <div className="w-16 h-16 rounded-xl bg-gray-800 border-2 border-gray-700 flex items-center justify-center shadow-lg relative">
                        <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                        <FileText className="text-gray-300 w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-gray-900/80 px-2 py-1 rounded">User Prompt</span>
                </motion.div>

                {/* Node 2: LLM */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ delay: 1.25, duration: 0.3 }}
                    className="flex flex-col items-center gap-2 z-10 -mt-16"
                >
                    <div className="w-20 h-20 rounded-2xl bg-purple-950/80 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <BrainCircuit className="text-purple-400 w-10 h-10 animate-pulse-slow" />
                    </div>
                    <span className="text-xs font-mono text-purple-300 bg-purple-950/50 px-2 py-1 rounded border border-purple-500/30">Groq LLM</span>
                </motion.div>

                {/* Node 3: Quantum */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ delay: 2.75, duration: 0.3 }}
                    className="flex flex-col items-center gap-2 z-10"
                >
                    <div className="w-20 h-20 rounded-2xl bg-quantum-950/80 border-2 border-quantum-500 flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                        <Cpu className="text-quantum-400 w-10 h-10 animate-spin-slow" />
                    </div>
                    <span className="text-xs font-mono text-quantum-300 bg-quantum-950/50 px-2 py-1 rounded border border-quantum-500/30">Qiskit Aer</span>
                </motion.div>

                {/* Node 4: Insight */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 4.25, duration: 0.3 }}
                    className="flex flex-col items-center gap-2 z-10 -mt-12"
                >
                    <div className="w-16 h-16 rounded-xl bg-amber-950/80 border-2 border-amber-500 flex items-center justify-center shadow-lg">
                        <Share2 className="text-amber-400 w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono text-amber-500 bg-amber-950/50 px-2 py-1 rounded border border-amber-500/30">Insights</span>
                </motion.div>
            </div>

            {/* Floating Tags */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                className="absolute top-10 right-10 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded text-xs font-mono text-green-400"
            >
                Probability: 98%
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }}
                className="absolute bottom-10 left-10 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded text-xs font-mono text-quantum-300"
            >
                Running 1024 shots...
            </motion.div>
        </div>
    );
};
