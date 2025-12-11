"""
Groq LLM Client for Variable Extraction & Quantum Summary
Enhanced version with sequential flow: Extract → Qiskit → Summarize
"""

import json
from typing import Optional, Dict, Any, List
from groq import Groq
from app.config import get_settings

# ============== EXTRACTION PROMPT ==============
EXTRACTION_PROMPT = """Kamu adalah asisten AI senior yang ahli dalam menganalisis proposal dan deskripsi bisnis Indonesia.

Dari teks berikut, ekstrak informasi secara KOMPREHENSIF dalam format JSON. Jika informasi tidak tersedia, gunakan null.

FIELD WAJIB:
1. "modal": jumlah investasi/modal dalam Rupiah (angka). Estimasi jika tidak eksplisit.
2. "sektor": kategori bisnis (SATU dari: F&B, Teknologi, Retail, Properti, Kesehatan, Pendidikan, Manufaktur, Jasa, Pertanian, Finansial, Lainnya)
3. "lokasi": lokasi bisnis (kota/daerah Indonesia, atau "Indonesia")
4. "tahun": tahun target (angka 4 digit, default 2025)

FIELD OPSIONAL (isi jika disebutkan atau bisa disimpulkan):
5. "target_market": siapa target customer/pasar
6. "competitors": kompetitor atau pemain di industri yang sama
7. "unique_value": keunikan/diferensiasi bisnis
8. "timeline": fase atau timeline bisnis (misal: "Q3 2026", "6 bulan", dll)
9. "team_size": estimasi ukuran tim yang dibutuhkan
10. "business_model": model bisnis (B2B, B2C, SaaS, marketplace, dll)

PENTING: Jawab HANYA dengan JSON valid. Untuk field opsional yang tidak ada info, gunakan null.

Teks untuk dianalisis:
"""

# ============== QUANTUM SUMMARY PROMPT ==============
QUANTUM_SUMMARY_PROMPT = """Kamu adalah Dr. Amelia Chen, seorang Quantum Risk Analyst dengan PhD di Quantum Computing dari MIT dan 15 tahun pengalaman sebagai Partner di McKinsey untuk evaluasi investasi high-tech di Asia Tenggara.

MISI: Berikan analisis risiko bisnis ULTRA-MENDALAM berdasarkan simulasi quantum computing, dengan fokus pada konteks pasar Indonesia dan regional SEA.

═══════════════════════════════════════════════════════════════
📊 DATA BISNIS YANG DIANALISIS:
═══════════════════════════════════════════════════════════════
- Sektor: {sektor}
- Lokasi: {lokasi}  
- Modal: Rp {modal:,.0f}
- Tahun Target: {tahun}
- Target Market: {target_market}
- Kompetitor: {competitors}
- Unique Value Proposition: {unique_value}

═══════════════════════════════════════════════════════════════
⚛️ HASIL SIMULASI QUANTUM COMPUTING:
═══════════════════════════════════════════════════════════════
- **Success Probability**: {success_probability:.1%} (dari 1024-shot Monte Carlo pada Qiskit Aer)
- **Quantum State Fidelity**: {shots} iterasi
- **Circuit Topology**: {circuit_depth} layers, {n_qubits}-qubit entangled state
- **Parameter Encoding** (Rotation Angles pada Pauli-Y Gates):
  * θ_modal = {theta_modal:.4f} rad (amplitudo investasi)
  * θ_sektor = {theta_sektor:.4f} rad (market saturation)
  * θ_lokasi = {theta_lokasi:.4f} rad (geographic risk)
  * θ_tahun = {theta_tahun:.4f} rad (temporal volatility)
  * θ_market = {theta_market:.4f} rad (TAM & customer access)
  * θ_competition = {theta_competition:.4f} rad (competitive intensity)
  * θ_team = {theta_team:.4f} rad (execution capability)
  * θ_model = {theta_model:.4f} rad (business model scalability)

═══════════════════════════════════════════════════════════════
🚨 KATEGORISASI RISIKO (dari Risk Engine):
═══════════════════════════════════════════════════════════════
- **HIGH RISK** (P > 0.7): {high_risks}
- **MEDIUM RISK** (0.4 < P ≤ 0.7): {medium_risks}
- **LOW RISK** (P ≤ 0.4): {low_risks}

═══════════════════════════════════════════════════════════════
🎯 INSTRUKSI ANALISIS (STEP-BY-STEP):
═══════════════════════════════════════════════════════════════

1. **EXECUTIVE SUMMARY**: 
   - Analisis menggunakan framework BCG Matrix (Star/Cash Cow/Question Mark/Dog)
   - Bandingkan dengan startup serupa yang sukses/gagal di Indonesia (contoh: Gojek, Bukalapak, dll)
   - Sebutkan 1 peluang terbesar dan 1 ancaman terbesar
   - Berikan rekomendasi GO/NO-GO/CONDITIONAL dengan justifikasi ekonomi

2. **PROBABILITY EXPLANATION**:
   - Jelaskan secara KUANTITATIF kenapa probabilitas di {success_probability:.1%}
   - Hubungkan dengan rotation angles: sudut >π/4 (0.785) = risk tinggi, <π/6 (0.524) = risk rendah
   - Analisis kontribusi MASING-MASING qubit (modal, sektor, lokasi, tahun) terhadap probability final
   - Sebutkan variabel mana yang paling DOMINAN mempengaruhi hasil (gunakan istilah "entanglement strength")
   - Proyeksikan: "Jika modal dinaikkan 2x, probabilitas akan menjadi ~X%"

3. **RISK BREAKDOWN**:
   - Untuk SETIAP kategori risiko (High/Medium/Low), jelaskan:
     * Mengapa risiko ini muncul (root cause analysis)
     * Dampak finansial estimasi (dalam Rupiah atau % revenue)
     * Probabilitas terjadi dalam 12 bulan ke depan
     * Mitigation strategy konkret
   - HARUS menyebut regulasi spesifik Indonesia jika relevan (contoh: UU ITE, OJK, BKPM, dll)
   - HARUS menyebut kondisi makro ekonomi 2025 (inflasi, suku bunga BI, kurs USD/IDR)

4. **KEY INSIGHT**:
   - Berikan 1 insight yang TIDAK OBVIOUS, yang hanya bisa didapat dari analisis quantum (bukan analisis klasik)
   - Gunakan analogi sederhana untuk menjelaskan konsep quantum (contoh: "superposisi seperti...")
   - Insight harus ACTIONABLE dan mengubah strategi bisnis jika diterapkan

5. **ACTION ITEMS** (MINIMAL 5, MAKSIMAL 7):
   - Setiap action HARUS:
     * Spesifik (siapa yang execute, kapan deadline)
     * Measurable (ada metric sukses yang jelas)
     * Achievable (realistis dalam 3-6 bulan)
     * Relevant (langsung impact ke success probability)
   - Prioritaskan berdasarkan impact vs effort matrix
   - Format: "[PRIORITY] Action - Expected Impact: X%"

═══════════════════════════════════════════════════════════════
📝 OUTPUT FORMAT (JSON):
═══════════════════════════════════════════════════════════════

{{
  "executive_summary": "3-4 kalimat. HARUS include: (1) verdict GO/NO-GO, (2) 1 comparable case study Indonesia, (3) specific number/metric, (4) biggest opportunity & threat",
  "probability_explanation": "4-5 kalimat. HARUS include: (1) breakdown per-qubit contribution, (2) hubungan rotation angles dengan risk, (3) proyeksi 'what-if' scenario, (4) istilah quantum computing (entanglement/superposition/fidelity)",
  "risk_breakdown": "HARUS struktur: **HIGH**: [detail + Rp impact] | **MEDIUM**: [detail + % impact] | **LOW**: [detail + mitigation]. Min 3 paragraf.",
  "key_insight": "1-2 kalimat insight NON-OBVIOUS dari quantum analysis yang mengubah strategi. Gunakan analogi sederhana.",
  "action_items": ["[HIGH] Action 1 - Impact: 15-20%", "[HIGH] Action 2 - Impact: 10-15%", "[MEDIUM] Action 3 - Impact: 5-10%", "[MEDIUM] Action 4 - Impact: 3-5%", "[LOW] Action 5 - Impact: 1-3%"]
}}

═══════════════════════════════════════════════════════════════
⚠️ CRITICAL RULES:
═══════════════════════════════════════════════════════════════
- HANYA output JSON valid, tanpa markdown wrapper
- SEMUA field WAJIB diisi dengan analisis mendalam (min 50 kata per field utama)
- Gunakan terminologi quantum computing + bisnis strategis
- Reference data riil Indonesia (regulasi, ekonomi makro, comparable companies)
- NO GENERIC ADVICE. Semua harus spesifik untuk bisnis ini.
- Tone: Authoritative namun accessible (seperti Harvard Business Review)
"""


def extract_with_llm(description: str) -> Optional[Dict[str, Any]]:
    """
    Extract business variables using Groq SDK - Enhanced version
    Returns dict with all extracted fields or None if failed
    """
    settings = get_settings()
    
    print(f"[LLM-EXTRACT] Checking API key: {'SET' if settings.groq_api_key else 'NOT SET'}")
    
    if not settings.groq_api_key:
        print("[LLM-EXTRACT] WARNING: GROQ_API_KEY not set, falling back to regex")
        return None
    
    try:
        print(f"[LLM-EXTRACT] Calling Groq API: {description[:50]}...")
        client = Groq(api_key=settings.groq_api_key)
        
        completion = client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {
                    "role": "system",
                    "content": "Kamu adalah asisten ekstraksi data bisnis profesional. Selalu jawab dalam format JSON valid."
                },
                {
                    "role": "user",
                    "content": EXTRACTION_PROMPT + description
                }
            ],
            temperature=0.1,
            max_completion_tokens=500,
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        print(f"[LLM-EXTRACT] Raw response: {content[:150]}...")
        
        extracted = json.loads(content)
        print(f"[LLM-EXTRACT] SUCCESS: sektor={extracted.get('sektor')}, modal={extracted.get('modal')}")
        return extracted
        
    except Exception as e:
        print(f"[LLM-EXTRACT] ERROR: {e}")
        return None


def summarize_quantum_results(
    variables: Dict[str, Any],
    quantum_result: Dict[str, Any],
    risk_categories: Dict[str, List[str]]
) -> Optional[Dict[str, Any]]:
    """
    Generate LLM summary of quantum simulation results.
    This is called AFTER Qiskit simulation to explain the results.
    """
    settings = get_settings()
    
    if not settings.groq_api_key:
        return None
    
    try:
        print(f"[LLM-SUMMARY] Generating quantum summary...")
        client = Groq(api_key=settings.groq_api_key)
        
        # Get metadata from quantum result
        metadata = quantum_result.get("metadata", {})
        rotation_angles = metadata.get("rotation_angles", {})
        
        # Format the prompt with all data
        prompt = QUANTUM_SUMMARY_PROMPT.format(
            sektor=variables.get('sektor', 'Unknown'),
            lokasi=variables.get('lokasi', 'Indonesia'),
            modal=variables.get('modal', 0),
            tahun=variables.get('tahun', 2025),
            target_market=variables.get('target_market', 'Tidak disebutkan'),
            competitors=variables.get('competitors', 'Tidak disebutkan'),
            unique_value=variables.get('unique_value', 'Tidak disebutkan'),
            success_probability=quantum_result.get('success_probability', 0),
            shots=metadata.get('shots', 1024),
            circuit_depth=metadata.get('circuit_depth', 'N/A'),
            n_qubits=metadata.get('n_qubits', 8),
            theta_modal=rotation_angles.get('modal', 0),
            theta_sektor=rotation_angles.get('sektor', 0),
            theta_lokasi=rotation_angles.get('lokasi', 0),
            theta_tahun=rotation_angles.get('tahun', 0),
            theta_market=rotation_angles.get('target_market', 0),
            theta_competition=rotation_angles.get('competitors', 0),
            theta_team=rotation_angles.get('team_size', 0),
            theta_model=rotation_angles.get('business_model', 0),
            high_risks=', '.join(risk_categories.get('High', [])) or 'None',
            medium_risks=', '.join(risk_categories.get('Medium', [])) or 'None',
            low_risks=', '.join(risk_categories.get('Low', [])) or 'None'
        )
        
        completion = client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {
                    "role": "system",
                    "content": "Kamu adalah Dr. Amelia Chen, Quantum Risk Analyst expert. WAJIB generate JSON dengan 5 field: executive_summary, probability_explanation, risk_breakdown, key_insight, action_items. TIDAK BOLEH skip field apapun. Gunakan bahasa Indonesia profesional."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_completion_tokens=1500,
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        print(f"[LLM-SUMMARY] Raw response (FULL): {content}")
        
        summary = json.loads(content)
        print(f"[LLM-SUMMARY] Parsed fields: {list(summary.keys())}")
        print(f"[LLM-SUMMARY] key_insight present: {bool(summary.get('key_insight'))}")
        print(f"[LLM-SUMMARY] SUCCESS!")
        return summary
        
    except Exception as e:
        print(f"[LLM-SUMMARY] ERROR: {e}")
        return None
