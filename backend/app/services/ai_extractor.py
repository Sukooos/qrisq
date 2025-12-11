import re
from app.schemas import ExtractedVariables


def extract_variables(description: str) -> ExtractedVariables:
    """
    Ekstrak variabel bisnis dari deskripsi teks.
    
    Untuk MVP ini menggunakan regex-based extraction.
    Bisa diganti dengan LLM/GPT-4 untuk production.
    """
    description_lower = description.lower()
    
    # Extract modal (money)
    modal = extract_modal(description)
    
    # Extract sektor
    sektor = extract_sektor(description_lower)
    
    # Extract lokasi
    lokasi = extract_lokasi(description_lower)
    
    # Extract tahun
    tahun = extract_tahun(description)
    
    return ExtractedVariables(
        modal=modal,
        sektor=sektor,
        lokasi=lokasi,
        tahun=tahun
    )


def extract_modal(text: str) -> float:
    """Extract investment amount from text"""
    # Pattern untuk angka dengan juta/miliar
    patterns = [
        (r'(\d+(?:[.,]\d+)?)\s*(?:miliar|milyar|m\b|billion)', 1_000_000_000),
        (r'(\d+(?:[.,]\d+)?)\s*(?:juta|jt|million)', 1_000_000),
        (r'(\d+(?:[.,]\d+)?)\s*(?:ribu|rb|thousand|k\b)', 1_000),
        (r'rp\.?\s*(\d+(?:[.,]\d+)?)', 1),
        (r'(\d{6,})', 1),  # Angka 6 digit atau lebih
    ]
    
    for pattern, multiplier in patterns:
        match = re.search(pattern, text.lower())
        if match:
            num_str = match.group(1).replace(',', '.').replace('.', '', match.group(1).count('.') - 1)
            try:
                return float(num_str) * multiplier
            except ValueError:
                continue
    
    return 100_000_000  # Default 100 juta


def extract_sektor(text: str) -> str:
    """Extract business sector from text"""
    sektor_keywords = {
        "F&B": ["f&b", "fnb", "food", "beverage", "makanan", "minuman", "restoran", "cafe", "kopi", "kuliner"],
        "Teknologi": ["teknologi", "tech", "software", "aplikasi", "app", "startup", "digital", "it", "saas"],
        "Retail": ["retail", "toko", "shop", "store", "e-commerce", "ecommerce", "jualan", "dagang"],
        "Properti": ["properti", "property", "real estate", "rumah", "apartemen", "gedung", "konstruksi"],
        "Kesehatan": ["kesehatan", "health", "medis", "klinik", "rumah sakit", "farmasi", "obat"],
        "Pendidikan": ["pendidikan", "education", "sekolah", "kursus", "training", "edtech"],
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
    """Extract location from text"""
    lokasi_list = [
        "jakarta selatan", "jakarta utara", "jakarta barat", "jakarta timur", "jakarta pusat",
        "jakarta", "bandung", "surabaya", "medan", "semarang", "yogyakarta", "jogja",
        "makassar", "palembang", "tangerang", "depok", "bekasi", "bogor",
        "bali", "denpasar", "malang", "solo", "balikpapan", "batam",
        "jawa barat", "jawa timur", "jawa tengah", "sumatra", "kalimantan", "sulawesi"
    ]
    
    for lokasi in lokasi_list:
        if lokasi in text:
            return lokasi.title()
    
    return "Indonesia"


def extract_tahun(text: str) -> int:
    """Extract year from text"""
    # Cari tahun 2020-2030
    match = re.search(r'\b(202[0-9]|2030)\b', text)
    if match:
        return int(match.group(1))
    
    return 2025  # Default
