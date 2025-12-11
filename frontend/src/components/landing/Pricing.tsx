'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const plans = [
    {
        name: "Starter",
        price: "Free",
        desc: "For early-stage founders testing ideas.",
        features: [
            "5 Simulations / day",
            "Basic Probability Score",
            "4 Core Variables Analysis",
            "Standard Support"
        ]
    },
    {
        name: "Pro",
        price: "$49",
        desc: "For serious entrepreneurs and consultants.",
        popular: true,
        features: [
            "Unlimited Simulations",
            "Full Quantum Summary",
            "Detailed Action Items",
            "Export to PDF Report",
            "Priority Support"
        ]
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For VCs, Incubators, and Corporations.",
        features: [
            "API Access",
            "Custom Risk Models",
            "On-premise Deployment",
            "Dedicated Account Manager",
            "SLA 99.9%"
        ]
    }
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-gray-950 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Simple Pricing
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Start for free, scale when you need powerful insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <Card
                            key={i}
                            className={`relative flex flex-col ${plan.popular ? 'border-quantum-500 shadow-glow bg-gray-900/60' : 'border-gray-800 bg-gray-900/30'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-quantum-500 text-white text-xs font-bold rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                                <CardDescription className="text-gray-400">{plan.desc}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                                            <Check className="w-4 h-4 text-quantum-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={plan.popular ? 'glow' : 'outline'}
                                >
                                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
