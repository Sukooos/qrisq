"""
AI Variable Extractor - Simplified
LLM extraction with regex fallback
"""

import re
from typing import Optional, Dict, Any
from app.schemas import ExtractedVariables
from app.config import get_settings
from app.services.llm_client import extract_with_llm


def extract_variables(description: str, provider: str = None) -> ExtractedVariables:
    """
    Extract business variables using LLM with regex fallback.
    Args:
        description: Business scenario text
        provider: Override provider ("groq" or "gemini"). If None, uses config.
    """
    settings = get_settings()
    
    # Try LLM extraction first if enabled
    if settings.use_llm_extraction and (settings.groq_api_key or settings.gemini_api_key):
        llm_result = extract_with_llm(description, provider=provider)
        
        if llm_result:
            # Helper to safely convert list to string (LLM sometimes returns lists)
            def safe_str(val):
                if val is None:
                    return None
                if isinstance(val, list):
                    return ', '.join(str(v) for v in val)
                return str(val)
            
            return ExtractedVariables(
                # Core fields
                modal=float(llm_result.get("modal", 100_000_000)),
                sektor=llm_result.get("sektor", "Lainnya"),
                lokasi=llm_result.get("lokasi", "Indonesia"),
                tahun=int(llm_result.get("tahun", 2025)),
                # Extended fields - use safe_str for optional fields
                target_market=safe_str(llm_result.get("target_market")),
                competitors=safe_str(llm_result.get("competitors")),
                unique_value=safe_str(llm_result.get("unique_value")),
                timeline=safe_str(llm_result.get("timeline")),
                team_size=llm_result.get("team_size"),
                business_model=safe_str(llm_result.get("business_model"))
            )
        else:
            print("[Extractor] LLM failed, using regex fallback")
    
    # Fallback to regex extraction
    return extract_variables_regex(description)


def extract_variables_regex(description: str) -> ExtractedVariables:
    """Regex-based extraction (fallback method)."""
    description_lower = description.lower()
    
    return ExtractedVariables(
        modal=extract_modal(description),
        sektor=extract_sektor(description_lower),
        lokasi=extract_lokasi(description_lower),
        tahun=extract_tahun(description)
    )


def extract_modal(text: str) -> float:
    patterns = [
        (r'(\d+(?:[.,]\d+)?)\s*(?:miliar|milyar|m\b|billion)', 1_000_000_000),
        (r'(\d+(?:[.,]\d+)?)\s*(?:juta|jt|million)', 1_000_000),
        (r'(\d+(?:[.,]\d+)?)\s*(?:ribu|rb|thousand|k\b)', 1_000),
        (r'rp\.?\s*(\d+(?:[.,]\d+)?)', 1),
        (r'(\d{9,})', 1),
    ]
    
    for pattern, multiplier in patterns:
        match = re.search(pattern, text.lower())
        if match:
            num_str = match.group(1).replace(',', '.').replace('.', '', match.group(1).count('.') - 1)
            try:
                return float(num_str) * multiplier
            except ValueError:
                continue
    
    return 100_000_000


def extract_sektor(text: str) -> str:
    sektor_keywords = {
        "F&B": ["f&b", "fnb", "food", "beverage", "makanan", "minuman", "restoran", "cafe", "kopi", "kuliner", "coffee"],
        "Teknologi": ["teknologi", "tech", "software", "aplikasi", "app", "startup", "digital", "it", "saas", "ai"],
        "Retail": ["retail", "toko", "shop", "store", "e-commerce", "ecommerce", "jualan", "dagang"],
        "Properti": ["properti", "property", "real estate", "rumah", "apartemen", "gedung", "konstruksi", "kos"],
        "Kesehatan": ["kesehatan", "health", "medis", "klinik", "rumah sakit", "farmasi", "obat"],
        "Pendidikan": ["pendidikan", "education", "sekolah", "kursus", "training", "edtech", "les"],
        "Manufaktur": ["manufaktur", "manufacturing", "pabrik", "produksi", "industri"],
        "Jasa": ["jasa", "service", "konsultan", "konsultasi", "agency"],
        "Pertanian": ["pertanian", "agrikultur", "agriculture", "farm", "tani", "kebun"],
        "Finansial": ["finansial", "financial", "fintech", "bank", "investasi", "asuransi"],
    }
    
    for sektor, keywords in sektor_keywords.items():
        if any(keyword in text for keyword in keywords):
            return sektor
    
    return "Lainnya"


def extract_lokasi(text: str) -> str:
    lokasi_list = [
        "jakarta selatan", "jakarta utara", "jakarta barat", "jakarta timur", "jakarta pusat",
        "jakarta", "bandung", "surabaya", "medan", "semarang", "yogyakarta", "jogja",
        "makassar", "palembang", "tangerang", "depok", "bekasi", "bogor",
        "bali", "denpasar", "malang", "solo", "balikpapan", "batam",
    ]
    
    for lokasi in lokasi_list:
        if lokasi in text:
            return lokasi.title()
    
    return "Indonesia"


def extract_tahun(text: str) -> int:
    match = re.search(r'\b(202[0-9]|2030)\b', text)
    if match:
        return int(match.group(1))
    return 2025
