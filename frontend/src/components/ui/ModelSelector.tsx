'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Zap, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { ModelProvider } from '@/lib/api';

interface ModelOption {
    id: ModelProvider;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const models: ModelOption[] = [
    {
        id: 'groq',
        name: 'Groq Llama 3.3',
        description: 'Ultra fast inference',
        icon: <Zap className="w-4 h-4" />,
        color: 'text-orange-400'
    },
    {
        id: 'gemini',
        name: 'Gemini 2.5 Flash',
        description: 'Smart reasoning',
        icon: <Sparkles className="w-4 h-4" />,
        color: 'text-blue-400'
    }
];

interface ModelSelectorProps {
    value: ModelProvider;
    onChange: (provider: ModelProvider) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedModel = models.find(m => m.id === value) || models[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/50 hover:border-quantum-500/50 transition-all text-sm"
            >
                <span className={selectedModel.color}>{selectedModel.icon}</span>
                <span className="text-gray-200">{selectedModel.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 z-50 min-w-[220px] rounded-xl bg-gray-900/95 border border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden"
                >
                    {models.map((model) => (
                        <button
                            key={model.id}
                            onClick={() => {
                                onChange(model.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800/60 transition-colors
                                ${model.id === value ? 'bg-quantum-600/20 border-l-2 border-quantum-500' : ''}`}
                        >
                            <span className={model.color}>{model.icon}</span>
                            <div>
                                <div className="text-sm font-medium text-gray-200">{model.name}</div>
                                <div className="text-xs text-gray-500">{model.description}</div>
                            </div>
                        </button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
