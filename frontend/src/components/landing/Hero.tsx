'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { WorkflowAnimation } from '@/components/landing/WorkflowAnimation';

export const Hero = () => {
    const scrollToDemo = () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-quantum-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quantum-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

            <div className="container relative z-10 px-4 md:px-6 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-quantum-500/30 bg-quantum-500/10 text-quantum-300 text-sm font-medium mb-6">
                        🚀 The Future of Risk Intelligence
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Predict Risk with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-400 to-purple-500">
                            Quantum Precision
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
                        Harness the power of Quantum Computing and LLMs to analyze business risks with 99.9% accuracy. From startup validation to enterprise decision making.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            variant="glow"
                            size="lg"
                            className="w-full sm:w-auto text-base px-8 py-6"
                            onClick={scrollToDemo}
                        >
                            Try Demo Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto text-base px-8 py-6 border-gray-700 hover:bg-white/5"
                        >
                            <PlayCircle className="mr-2 w-5 h-5" /> Watch Video
                        </Button>
                    </div>
                </motion.div>

                {/* Dashboard Preview / Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-16 relative mx-auto max-w-5xl rounded-xl border border-quantum-500/20 bg-gray-900/50 backdrop-blur-sm shadow-2xl p-2 md:p-4 min-h-[300px] flex items-center justify-center"
                >
                    <WorkflowAnimation />

                    {/* Glow behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-quantum-500 to-purple-600 rounded-xl blur opacity-20 -z-10" />
                </motion.div>
            </div>
        </section>
    );
};
