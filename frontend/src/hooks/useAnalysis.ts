'use client';

import { useState } from 'react';
import { analyzeRisk, AnalyzeResponse, ModelProvider } from '@/lib/api';

export function useAnalysis() {
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modelProvider, setModelProvider] = useState<ModelProvider>('groq');

    const submitAnalysis = async (description: string) => {
        setLoading(true);
        setError(null);
        try {
            if (description.length < 50) {
                throw new Error("Deskripsi terlalu pendek. Minimal 50 karakter untuk analisis akurat.");
            }

            const data = await analyzeRisk({ description, model_provider: modelProvider });
            setResult(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Terjadi kesalahan saat menghubungi Quantum Engine.");
            }
        } finally {
            setLoading(false);
        }
    };

    const resetAnalysis = () => {
        setResult(null);
        setError(null);
    };

    return { result, loading, error, submitAnalysis, resetAnalysis, modelProvider, setModelProvider };
}

