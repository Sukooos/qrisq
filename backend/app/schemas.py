from pydantic import BaseModel, Field
from typing import List, Dict


class AnalyzeRequest(BaseModel):
    """Request schema for risk analysis"""
    description: str = Field(
        ..., 
        min_length=50,
        description="Deskripsi skenario bisnis minimal 50 karakter",
        examples=["Investasi 500 juta di F&B Jakarta Selatan tahun 2026"]
    )


class ExtractedVariables(BaseModel):
    """Extracted variables from business description"""
    modal: float = Field(default=0, description="Modal investasi dalam rupiah")
    sektor: str = Field(default="Unknown", description="Sektor bisnis")
    lokasi: str = Field(default="Unknown", description="Lokasi bisnis")
    tahun: int = Field(default=2025, description="Tahun proyeksi")


class RiskCategories(BaseModel):
    """Risk categories grouped by severity"""
    High: List[str] = []
    Medium: List[str] = []
    Low: List[str] = []


class AnalyzeResponse(BaseModel):
    """Response schema for risk analysis"""
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
    quantum_metadata: Dict = Field(
        default={},
        description="Metadata dari quantum simulation"
    )
