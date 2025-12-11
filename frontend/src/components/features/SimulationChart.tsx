'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap } from 'lucide-react';

interface SimulationChartProps {
    probability: number;
}

export const SimulationChart = ({ probability }: SimulationChartProps) => {
    // Generate mock convergence data
    // Simulates Monte Carlo convergence: starts volatile, settles at probability
    const generateData = () => {
        const data = [];
        let currentProb = 50; // start at 50%
        const target = probability * 100;

        for (let shot = 0; shot <= 1024; shot += 32) {
            // Add noise that decreases as shots increase
            const noise = (Math.random() - 0.5) * (1000 / (shot + 50));

            // Move towards target
            currentProb = currentProb + (target - currentProb) * 0.1 + noise;

            // Clamp
            currentProb = Math.max(0, Math.min(100, currentProb));

            data.push({
                shots: shot,
                probability: Number(currentProb.toFixed(1))
            });
        }
        return data;
    };

    const data = generateData();

    return (
        <Card className="bg-gray-900/40 border-gray-800">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-gray-400 font-mono uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-quantum-400" />
                    Quantum Convergence (1024 Shots)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                            <XAxis
                                dataKey="shots"
                                stroke="#4b5563"
                                tick={{ fontSize: 10 }}
                                tickFormatter={(val) => `${val}`}
                            />
                            <YAxis
                                domain={[0, 100]}
                                stroke="#4b5563"
                                tick={{ fontSize: 10 }}
                                unit="%"
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }}
                                itemStyle={{ color: '#38bdf8' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="probability"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorProb)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
