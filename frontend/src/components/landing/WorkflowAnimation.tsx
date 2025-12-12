'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, FileText, Share2, Sparkles } from 'lucide-react';

export const WorkflowAnimation = () => {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gray-950/50 overflow-hidden rounded-xl border border-gray-800/50">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

            {/* ================= DESKTOP VIEW (SVG Connected Flow) ================= */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
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

                    {/* Moving Particles */}
                    <circle r="4" fill="#a855f7"><animateMotion dur="1.5s" repeatCount="indefinite" path="M100,150 C150,150 200,80 300,80" keyPoints="0;1" keyTimes="0;1" calcMode="linear" /></circle>
                    <circle r="4" fill="#0ea5e9"><animateMotion dur="1.5s" begin="1.5s" repeatCount="indefinite" path="M380,80 C480,80 500,150 600,150" keyPoints="0;1" keyTimes="0;1" calcMode="linear" /></circle>
                    <circle r="4" fill="#f59e0b"><animateMotion dur="1.5s" begin="3s" repeatCount="indefinite" path="M700,150 C750,150 800,100 850,100" keyPoints="0;1" keyTimes="0;1" calcMode="linear" /></circle>
                </svg>

                {/* Desktop Nodes Layout */}
                <div className="relative w-full h-full flex items-center justify-between px-16 pointer-events-none">
                    <NodeItem icon={FileText} label="User Prompt" color="gray" delay={0} size="desktop" />
                    <NodeItem icon={BrainCircuit} label="AI Extract" color="purple" delay={1.25} size="desktop-lg" yOffset="-mt-16" />
                    <NodeItem icon={Cpu} label="Qiskit Aer" color="quantum" delay={2.75} size="desktop-lg" />
                    <NodeItem icon={Share2} label="Insights" color="amber" delay={4.25} size="desktop" yOffset="-mt-12" />
                </div>
            </div>

            {/* ================= MOBILE VIEW (Vertical Stack) ================= */}
            <div className="md:hidden flex flex-col items-center justify-center gap-6 py-8 w-full">
                <NodeItem icon={FileText} label="Input" color="gray" delay={0} size="mobile" />

                {/* Animated Line 1 */}
                <div className="relative w-0.5 h-12 bg-gray-800 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <NodeItem icon={BrainCircuit} label="AI Extract" color="purple" delay={0.5} size="mobile" />

                {/* Animated Line 2 */}
                <div className="relative w-0.5 h-12 bg-gray-800 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-quantum-400 to-transparent"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <NodeItem icon={Cpu} label="Quantum Sim" color="quantum" delay={1} size="mobile" />

                {/* Animated Line 3 */}
                <div className="relative w-0.5 h-12 bg-gray-800 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-amber-400 to-transparent"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, delay: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <NodeItem icon={Share2} label="Insights" color="amber" delay={1.5} size="mobile" />
            </div>

            {/* Floating Tags (Responsive) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                className="absolute top-4 right-4 md:top-10 md:right-10 bg-gray-900 border border-gray-700 px-2 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-xs font-mono text-green-400 z-20"
            >
                Probability: 98%
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }}
                className="absolute bottom-4 left-4 md:bottom-10 md:left-10 bg-gray-900 border border-gray-700 px-2 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-xs font-mono text-quantum-300 z-20"
            >
                Running 1024 shots...
            </motion.div>
        </div>
    );
};

// Reusable Node Component
const NodeItem = ({ icon: Icon, label, color, delay, size, yOffset = "" }: any) => {
    // Config based on color
    const colors: any = {
        gray: { bg: "bg-gray-800", border: "border-gray-700", text: "text-gray-300", badge: "text-gray-400 bg-gray-900/80" },
        purple: { bg: "bg-purple-950/80", border: "border-purple-500", text: "text-purple-400", badge: "text-purple-300 bg-purple-950/50 border-purple-500/30" },
        quantum: { bg: "bg-quantum-950/80", border: "border-quantum-500", text: "text-quantum-400", badge: "text-quantum-300 bg-quantum-950/50 border-quantum-500/30" },
        amber: { bg: "bg-amber-950/80", border: "border-amber-500", text: "text-amber-400", badge: "text-amber-500 bg-amber-950/50 border-amber-500/30" }
    };

    const c = colors[color] || colors.gray;

    // Sizes
    const isMobile = size === "mobile";
    const isLarge = size === "desktop-lg";

    // Dimensions
    const boxSize = isMobile ? "w-12 h-12 rounded-lg" : isLarge ? "w-20 h-20 rounded-2xl" : "w-16 h-16 rounded-xl";
    const iconSize = isMobile ? "w-6 h-6" : isLarge ? "w-10 h-10" : "w-8 h-8";
    const textSize = isMobile ? "text-[10px]" : "text-xs";

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isLarge ? 1.1 : 1, opacity: 1 }}
            transition={{ delay, duration: 0.3 }}
            className={`flex flex-col items-center gap-2 z-10 ${!isMobile ? yOffset : ''}`}
        >
            <div className={`${boxSize} ${c.bg} border-2 ${c.border} flex items-center justify-center shadow-lg relative`}>
                <Icon className={`${c.text} ${iconSize}`} />
            </div>
            <span className={`${textSize} font-mono ${c.badge} px-2 py-1 rounded border ${color === 'gray' ? 'border-transparent' : ''}`}>
                {label}
            </span>
        </motion.div>
    )
}
