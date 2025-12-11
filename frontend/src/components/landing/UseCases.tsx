'use client';

import { Card, CardContent } from '@/components/ui/card';

const cases = [
    {
        title: "Startup Founders",
        desc: "Validate business ideas before burning cash. Check market fit and potential pitfalls in seconds.",
        stat: "80% Faster Validation"
    },
    {
        title: "Venture Capital",
        desc: "Screen deck submissions with AI+Quantum precision. Identify high-risk factors automatically.",
        stat: "10x Deal Flow Analysis"
    },
    {
        title: "Enterprise Strategy",
        desc: "Make data-driven decisions for expansion, mergers, or new product launches.",
        stat: "99% Risk Detection"
    }
];

export const UseCases = () => {
    return (
        <section id="use-cases" className="py-24 bg-gray-950/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((useCase, i) => (
                        <div key={i} className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-transparent border border-gray-800">
                            <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                                {useCase.desc}
                            </p>
                            <div className="pt-4 border-t border-gray-800 w-full max-w-[200px] mx-auto">
                                <span className="text-quantum-400 font-mono font-bold">{useCase.stat}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
