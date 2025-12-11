from pydantic import BaseModel, Field
from typing import List, Dict, Optional


class AnalyzeRequest(BaseModel):
    """Request schema for risk analysis"""
    description: str = Field(
        ..., 
        min_length=50,
        description="Deskripsi skenario bisnis minimal 50 karakter",
        examples=["Investasi 500 juta di F&B Jakarta Selatan tahun 2026"]
    )


class ExtractedVariables(BaseModel):
    """Extracted variables from business description - Enhanced version"""
    # Core variables (for Qiskit)
    modal: float = Field(default=100_000_000, description="Modal investasi dalam rupiah")
    sektor: str = Field(default="Lainnya", description="Sektor bisnis")
    lokasi: str = Field(default="Indonesia", description="Lokasi bisnis")
    tahun: int = Field(default=2025, description="Tahun proyeksi")
    
    # Extended variables (for richer analysis)
    target_market: Optional[str] = Field(default=None, description="Target pasar/customer")
    competitors: Optional[str] = Field(default=None, description="Deskripsi kompetitor")
    unique_value: Optional[str] = Field(default=None, description="Unique value proposition")
    timeline: Optional[str] = Field(default=None, description="Timeline/fase bisnis")
    team_size: Optional[int] = Field(default=None, description="Estimasi ukuran tim")
    business_model: Optional[str] = Field(default=None, description="Model bisnis")


class RiskCategories(BaseModel):
    """Risk categories grouped by severity"""
    High: List[str] = []
    Medium: List[str] = []
    Low: List[str] = []


class AIInsights(BaseModel):
    """AI-generated insights and analysis"""
    market_analysis: str = Field(default="", description="Analisis pasar dari AI")
    key_risks: List[str] = Field(default=[], description="Risiko utama yang teridentifikasi")
    opportunities: List[str] = Field(default=[], description="Peluang yang teridentifikasi")
    recommendations: List[str] = Field(default=[], description="Rekomendasi berbasis AI")
    confidence_note: str = Field(default="", description="Catatan kepercayaan analisis")


class QuantumSummary(BaseModel):
    """LLM-generated summary of quantum simulation results"""
    executive_summary: str = Field(default="", description="Ringkasan eksekutif 2-3 kalimat")
    probability_explanation: str = Field(default="", description="Penjelasan mengapa probabilitas segitu")
    risk_breakdown: str = Field(default="", description="Breakdown risiko berdasarkan quantum calculation")
    key_insight: str = Field(default="", description="Insight kunci dari simulasi quantum")
    action_items: List[str] = Field(default=[], description="Action items berdasarkan hasil quantum")


class AnalyzeResponse(BaseModel):
    """Response schema for risk analysis - Enhanced with Quantum Summary"""
    success_probability: float = Field(
        ..., 
        ge=0.0, 
        le=1.0,
        description="Probabilitas keberhasilan 0.0 - 1.0"
    )
    risk_heatmap: List[List[float]] = Field(
        ...,
        description="Matrix heatmap risiko"
    )
    risk_categories: RiskCategories
    recommendations: List[str] = Field(
        ...,
        description="Daftar rekomendasi mitigasi risiko"
    )
    extracted_variables: ExtractedVariables
    quantum_summary: Optional[QuantumSummary] = Field(
        default=None,
        description="AI summary dari hasil quantum simulation"
    )
    ai_insights: Optional[AIInsights] = Field(
        default=None,
        description="Insight tambahan dari AI"
    )
    quantum_metadata: Dict = Field(
        default={},
        description="Metadata dari quantum simulation"
    )

