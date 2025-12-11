'use client';

import { useState } from 'react';
import { analyzeRisk, AnalyzeResponse, AnalyzeRequest } from '@/lib/api';

export function useAnalysis() {
    const [result, setResult] = useState<AnalyzeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitAnalysis = async (description: string) => {
        setLoading(true);
        setError(null);
        try {
            if (description.length < 50) {
                throw new Error("Deskripsi terlalu pendek. Minimal 50 karakter untuk analisis akurat.");
            }

            const data = await analyzeRisk({ description });
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

    return { result, loading, error, submitAnalysis, resetAnalysis };
}
