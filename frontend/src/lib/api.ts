import axios from 'axios';

// Create axios instance with default config
export const api = axios.create({
    baseURL: '/api', // Proxied by Next.js rewrites or direct if configured
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface AnalyzeRequest {
    description: string;
}

export interface QuantumSummary {
    executive_summary: string;
    probability_explanation: string;
    risk_breakdown: string;
    key_insight: string;
    action_items: string[];
}

export interface AnalyzeResponse {
    success_probability: number;
    risk_heatmap: number[][];
    risk_categories: {
        High: string[];
        Medium: string[];
        Low: string[];
    };
    recommendations: string[];
    extracted_variables: {
        modal: number;
        sektor: string;
        lokasi: string;
        tahun: number;
        target_market?: string;
        competitors?: string;
        unique_value?: string;
        timeline?: string;
        team_size?: number;
        business_model?: string;
    };
    quantum_summary?: QuantumSummary;
    quantum_metadata: Record<string, any>;
}

export const analyzeRisk = async (data: AnalyzeRequest): Promise<AnalyzeResponse> => {
    const response = await api.post<AnalyzeResponse>('/analyze', data);
    return response.data;
};
