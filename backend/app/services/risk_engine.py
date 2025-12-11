"""
Risk Analysis Engine
Mengolah hasil quantum simulation menjadi insight bisnis.
"""

import numpy as np
from typing import Dict, List, Any
from app.schemas import ExtractedVariables, RiskCategories


def generate_risk_analysis(
    variables: ExtractedVariables, 
    quantum_result: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Generate complete risk analysis dari hasil quantum simulation.
    
    Returns:
        - success_probability
        - risk_heatmap
        - risk_categories
        - recommendations
    """
    success_prob = quantum_result["success_probability"]
    
    # Generate risk heatmap
    risk_heatmap = generate_heatmap(variables, quantum_result)
    
    # Categorize risks
    risk_categories = categorize_risks(variables, success_prob)
    
    # Generate recommendations
    recommendations = generate_recommendations(variables, risk_categories, success_prob)
    
    return {
        "success_probability": round(success_prob, 4),
        "risk_heatmap": risk_heatmap,
        "risk_categories": risk_categories,
        "recommendations": recommendations
    }


def generate_heatmap(
    variables: ExtractedVariables, 
    quantum_result: Dict[str, Any]
) -> List[List[float]]:
    """
    Generate risk heatmap matrix 5x5.
    
    Rows: Risk factors (Modal, Sektor, Lokasi, Waktu, Eksternal)
    Cols: Impact levels (Very Low, Low, Medium, High, Very High)
    """
    prob_dist = quantum_result.get("probability_distribution", [])
    
    # Base heatmap dengan quantum-influenced values
    np.random.seed(int(variables.modal) % 1000)
    
    heatmap = []
    risk_factors = ["Modal", "Sektor", "Lokasi", "Waktu", "Eksternal"]
    
    for i, factor in enumerate(risk_factors):
        row = []
        base_risk = get_base_risk(factor, variables)
        
        for j in range(5):  # 5 impact levels
            # Combine base risk with quantum probability
            if len(prob_dist) > 0:
                quantum_influence = prob_dist[min(i * 3 + j, len(prob_dist) - 1)]
            else:
                quantum_influence = np.random.random() * 0.3
            
            value = base_risk * (0.7 + quantum_influence * 0.6)
            value = np.clip(value + np.random.normal(0, 0.05), 0, 1)
            row.append(round(value, 3))
        
        heatmap.append(row)
    
    return heatmap


def get_base_risk(factor: str, variables: ExtractedVariables) -> float:
    """Get base risk value for each factor"""
    if factor == "Modal":
        if variables.modal > 1_000_000_000:
            return 0.7  # High risk for large capital
        elif variables.modal > 500_000_000:
            return 0.5
        else:
            return 0.3
    
    elif factor == "Sektor":
        high_risk_sectors = ["Teknologi", "Pertanian", "Finansial"]
        if variables.sektor in high_risk_sectors:
            return 0.6
        return 0.4
    
    elif factor == "Lokasi":
        if "jakarta" in variables.lokasi.lower():
            return 0.3  # Lower risk in Jakarta
        return 0.5
    
    elif factor == "Waktu":
        years_ahead = variables.tahun - 2025
        return min(0.3 + years_ahead * 0.1, 0.7)
    
    else:  # Eksternal
        return 0.5  # Default moderate risk


def categorize_risks(
    variables: ExtractedVariables, 
    success_prob: float
) -> RiskCategories:
    """Categorize risks into High/Medium/Low"""
    high_risks = []
    medium_risks = []
    low_risks = []
    
    # Analyze each risk factor
    risk_pool = {
        "Regulasi": analyze_regulation_risk(variables),
        "Persaingan": analyze_competition_risk(variables),
        "Pasar": analyze_market_risk(variables),
        "Operasional": analyze_operational_risk(variables),
        "Keuangan": analyze_financial_risk(variables),
        "SDM": analyze_hr_risk(variables),
        "Teknologi": analyze_tech_risk(variables),
        "Ekonomi Makro": analyze_macro_risk(variables),
    }
    
    for risk_name, risk_score in risk_pool.items():
        if risk_score > 0.65:
            high_risks.append(risk_name)
        elif risk_score > 0.35:
            medium_risks.append(risk_name)
        else:
            low_risks.append(risk_name)
    
    return RiskCategories(
        High=high_risks,
        Medium=medium_risks,
        Low=low_risks
    )


def analyze_regulation_risk(variables: ExtractedVariables) -> float:
    """Analyze regulatory risk"""
    high_reg_sectors = ["Finansial", "Kesehatan", "Pertanian"]
    if variables.sektor in high_reg_sectors:
        return 0.7
    return 0.4


def analyze_competition_risk(variables: ExtractedVariables) -> float:
    """Analyze competition risk"""
    high_competition = ["F&B", "Retail", "Teknologi"]
    if variables.sektor in high_competition:
        return 0.75
    if "jakarta" in variables.lokasi.lower():
        return 0.65
    return 0.5


def analyze_market_risk(variables: ExtractedVariables) -> float:
    """Analyze market risk"""
    if variables.tahun > 2027:
        return 0.6  # Higher uncertainty for future
    return 0.4


def analyze_operational_risk(variables: ExtractedVariables) -> float:
    """Analyze operational risk"""
    if variables.modal > 500_000_000:
        return 0.55  # Larger operations = more complexity
    return 0.35


def analyze_financial_risk(variables: ExtractedVariables) -> float:
    """Analyze financial risk"""
    if variables.modal > 1_000_000_000:
        return 0.65
    elif variables.modal < 100_000_000:
        return 0.5  # Undercapitalized
    return 0.3


def analyze_hr_risk(variables: ExtractedVariables) -> float:
    """Analyze human resource risk"""
    if variables.sektor == "Teknologi":
        return 0.6  # Tech talent is scarce
    return 0.4


def analyze_tech_risk(variables: ExtractedVariables) -> float:
    """Analyze technology risk"""
    if variables.sektor in ["Teknologi", "Finansial"]:
        return 0.5
    return 0.3


def analyze_macro_risk(variables: ExtractedVariables) -> float:
    """Analyze macroeconomic risk"""
    years_ahead = variables.tahun - 2025
    return min(0.4 + years_ahead * 0.08, 0.7)


def generate_recommendations(
    variables: ExtractedVariables,
    risk_categories: RiskCategories,
    success_prob: float
) -> List[str]:
    """Generate actionable recommendations"""
    recommendations = []
    
    # Based on high risks
    if "Regulasi" in risk_categories.High:
        recommendations.append("Konsultasikan dengan ahli hukum dan perizinan sebelum memulai")
    
    if "Persaingan" in risk_categories.High:
        recommendations.append("Lakukan analisis kompetitor mendalam dan temukan unique value proposition")
    
    if "Keuangan" in risk_categories.High:
        recommendations.append("Pertimbangkan untuk mencari investor atau pendanaan tambahan")
    
    if "SDM" in risk_categories.High:
        recommendations.append("Bangun strategi rekrutmen dan retensi talent yang kuat")
    
    # Based on sector
    sector_recommendations = {
        "Teknologi": "Fokus pada MVP dan iterasi cepat berdasarkan feedback user",
        "F&B": "Validasi menu dan lokasi dengan soft opening terlebih dahulu",
        "Retail": "Pertimbangkan strategi omnichannel (online + offline)",
        "Properti": "Lakukan due diligence lokasi dan legalitas tanah",
        "Kesehatan": "Pastikan semua perizinan dan sertifikasi lengkap",
        "Pendidikan": "Bangun kurikulum yang sesuai kebutuhan pasar kerja",
    }
    if variables.sektor in sector_recommendations:
        recommendations.append(sector_recommendations[variables.sektor])
    
    # Based on location
    if "jakarta" in variables.lokasi.lower():
        recommendations.append("Manfaatkan ekosistem startup dan networking di Jakarta")
    else:
        recommendations.append("Eksplorasi keunggulan biaya operasional di luar kota besar")
    
    # Based on capital
    if variables.modal > 1_000_000_000:
        recommendations.append("Gunakan financial advisor untuk pengelolaan modal yang optimal")
    else:
        recommendations.append("Mulai dengan lean startup approach untuk efisiensi modal")
    
    # Based on success probability
    if success_prob < 0.5:
        recommendations.append("Pertimbangkan untuk melakukan pivot atau validasi ulang business model")
    elif success_prob > 0.75:
        recommendations.append("Siapkan strategi scaling untuk pertumbuhan cepat")
    
    # General recommendations
    recommendations.extend([
        "Buat contingency plan untuk skenario terburuk",
        "Monitor KPI secara reguler dan siap melakukan adjustment"
    ])
    
    return recommendations[:8]  # Limit to 8 recommendations
