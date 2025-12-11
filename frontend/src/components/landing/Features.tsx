'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, BrainCircuit, Activity, Globe2, ShieldCheck, Zap } from 'lucide-react';

const features = [
    {
        icon: BrainCircuit,
        title: "LLM-Powered Extraction",
        desc: "Automatically extracts complex business variables from natural language scenarios using specialized AI models."
    },
    {
        icon: Cpu,
        title: "Quantum Simulation",
        desc: "Runs 1024-shot Monte Carlo simulations on Qiskit Aer simulators for probabilistic risk modeling."
    },
    {
        icon: Activity,
        title: "Real-time Heatmaps",
        desc: "Visualizes risk distribution across multiple dimensions (Modal, Sector, Location) instantly."
    },
    {
        icon: Globe2,
        title: "Market Intelligence",
        desc: "Scans local Indonesian market data to provide context-aware insights and competitor analysis."
    },
    {
        icon: ShieldCheck,
        title: "Regulatory Compliance",
        desc: "Checks against local regulations and potential legal pitfalls for your specific sector."
    },
    {
        icon: Zap,
        title: "Actionable Insights",
        desc: "Doesn't just give you a score. Provides concrete action items to mitigate risks and improve success odds."
    }
];

export const Features = () => {
    return (
        <section id="docs" className="py-24 bg-gray-950 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Why <span className="text-quantum-400">Quantum</span>?
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Traditional risk analysis is linear. Q-RISQ uses quantum superposition to analyze infinite possibilities simultaneously.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <Card key={i} className="bg-gray-900/30 border-gray-800 hover:border-quantum-500/50 transition-colors group">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-quantum-500/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-gray-300 group-hover:text-quantum-400" />
                                </div>
                                <CardTitle className="text-xl text-white group-hover:text-quantum-300 transition-colors">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
