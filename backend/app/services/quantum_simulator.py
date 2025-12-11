"""
Quantum Monte Carlo Simulation menggunakan IBM Qiskit
untuk estimasi probabilitas keberhasilan bisnis.
"""

import numpy as np
from typing import Dict, Any
from app.schemas import ExtractedVariables

# Import Qiskit
try:
    from qiskit import QuantumCircuit
    from qiskit_aer import AerSimulator
    from qiskit.visualization import plot_histogram
    QISKIT_AVAILABLE = True
except ImportError:
    QISKIT_AVAILABLE = False
    print("Warning: Qiskit not installed, using mock simulator")


def run_quantum_simulation(variables: ExtractedVariables) -> Dict[str, Any]:
    """
    Jalankan simulasi quantum untuk menghitung probabilitas risiko.
    
    Menggunakan Quantum Circuit dengan:
    - Hadamard gates untuk superposition
    - Rotation gates berdasarkan variabel bisnis
    - Measurement untuk collapse probabilitas
    """
    if QISKIT_AVAILABLE:
        return _run_qiskit_simulation(variables)
    else:
        return _run_mock_simulation(variables)


def _run_qiskit_simulation(variables: ExtractedVariables) -> Dict[str, Any]:
    """
    Real Qiskit quantum simulation - ENHANCED VERSION.
    
    Circuit Design:
    - 8 qubits representing comprehensive business risk factors:
      [0] Modal Risk
      [1] Sector Risk
      [2] Location Risk
      [3] Time Risk
      [4] Market Risk (target_market)
      [5] Competition Risk
      [6] Team Risk
      [7] Business Model Risk
    - Rotation angles based on extracted variables
    - Multi-layer entanglement to model complex risk correlations
    """
    n_qubits = 8
    shots = 1024
    
    # Create quantum circuit
    qc = QuantumCircuit(n_qubits, n_qubits)
    
    # ========== CALCULATE ROTATION ANGLES ==========
    theta_modal = calculate_modal_angle(variables.modal)
    theta_sektor = calculate_sektor_angle(variables.sektor)
    theta_lokasi = calculate_lokasi_angle(variables.lokasi)
    theta_tahun = calculate_tahun_angle(variables.tahun)
    theta_market = calculate_market_angle(variables.target_market)
    theta_competition = calculate_competition_angle(variables.competitors)
    theta_team = calculate_team_angle(variables.team_size)
    theta_model = calculate_business_model_angle(variables.business_model)
    
    # ========== LAYER 1: SUPERPOSITION ==========
    for i in range(n_qubits):
        qc.h(i)
    
    # ========== LAYER 2: PARAMETER ENCODING ==========
    qc.ry(theta_modal, 0)        # Modal risk
    qc.ry(theta_sektor, 1)       # Sector risk
    qc.ry(theta_lokasi, 2)       # Location risk
    qc.ry(theta_tahun, 3)        # Time risk
    qc.ry(theta_market, 4)       # Market risk
    qc.ry(theta_competition, 5)  # Competition risk
    qc.ry(theta_team, 6)         # Team risk
    qc.ry(theta_model, 7)        # Business model risk
    
    # ========== LAYER 3: ENTANGLEMENT (Risk Correlations) ==========
    # Core business factors (0-3)
    qc.cx(0, 1)  # Modal affects sector viability
    qc.cx(1, 2)  # Sector affects location choice
    qc.cx(2, 3)  # Location affects time/regulatory
    
    # Market & Competition layer (4-5)
    qc.cx(1, 4)  # Sector constrains target market
    qc.cx(4, 5)  # Market size affects competition intensity
    
    # Execution layer (6-7)
    qc.cx(0, 6)  # Capital affects team size
    qc.cx(6, 7)  # Team capability affects business model execution
    
    # Cross-layer correlations
    qc.cx(5, 7)  # Competition affects model defensibility
    qc.cx(3, 4)  # Timing affects market readiness
    
    # ========== LAYER 4: PHASE CORRECTION ==========
    # Add RZ gates for fine-tuning based on risk categories
    qc.rz(np.pi/4, 0)   # Modal phase
    qc.rz(np.pi/6, 1)   # Sector phase
    qc.rz(np.pi/8, 4)   # Market phase
    qc.rz(np.pi/5, 5)   # Competition phase
    
    # ========== LAYER 5: MEASUREMENT ==========
    qc.measure(range(n_qubits), range(n_qubits))
    
    # ========== RUN SIMULATION ==========
    simulator = AerSimulator()
    job = simulator.run(qc, shots=shots)
    result = job.result()
    counts = result.get_counts(qc)
    
    # ========== CALCULATE SUCCESS PROBABILITY ==========
    # Enhanced success criterion: weighted by qubit importance
    # Core qubits (0-3) weight = 2x, Extended qubits (4-7) weight = 1x
    success_count = 0
    for state, count in counts.items():
        core_zeros = state[4:].count('0')  # First 4 qubits (right side in Qiskit)
        ext_zeros = state[:4].count('0')   # Last 4 qubits
        
        # Weighted success: need majority 0s in core + decent ext
        if (core_zeros >= 3) or (core_zeros >= 2 and ext_zeros >= 2):
            success_count += count
    
    success_probability = success_count / shots
    
    # ========== GENERATE DISTRIBUTION ==========
    prob_distribution = _counts_to_distribution_8q(counts, shots)
    
    return {
        "success_probability": success_probability,
        "raw_counts": counts,
        "probability_distribution": prob_distribution,
        "metadata": {
            "simulator": "qiskit-aer",
            "shots": shots,
            "n_qubits": n_qubits,
            "circuit_depth": qc.depth(),
            "rotation_angles": {
                "modal": round(theta_modal, 4),
                "sektor": round(theta_sektor, 4),
                "lokasi": round(theta_lokasi, 4),
                "tahun": round(theta_tahun, 4),
                "target_market": round(theta_market, 4),
                "competitors": round(theta_competition, 4),
                "team_size": round(theta_team, 4),
                "business_model": round(theta_model, 4)
            }
        }
    }


def _run_mock_simulation(variables: ExtractedVariables) -> Dict[str, Any]:
    """Fallback mock simulation if Qiskit not available"""
    np.random.seed(hash(str(variables)) % 2**32)
    
    # Base probability dengan sedikit randomness
    base_prob = 0.65
    
    # Adjust based on variables
    if variables.modal > 1_000_000_000:
        base_prob -= 0.1  # Higher capital = higher risk
    elif variables.modal < 100_000_000:
        base_prob -= 0.05
    
    if variables.sektor in ["Teknologi", "F&B"]:
        base_prob += 0.05
    
    if "jakarta" in variables.lokasi.lower():
        base_prob += 0.03
    
    # Add quantum-like noise
    noise = np.random.normal(0, 0.05)
    success_probability = np.clip(base_prob + noise, 0.3, 0.95)
    
    return {
        "success_probability": success_probability,
        "raw_counts": {"mock": 1024},
        "probability_distribution": np.random.rand(16).tolist(),
        "metadata": {
            "simulator": "mock",
            "shots": 1024,
            "n_qubits": 4,
            "circuit_depth": 6,
            "rotation_angles": {
                "modal": 0.5,
                "sektor": 0.3,
                "lokasi": 0.2,
                "tahun": 0.4
            }
        }
    }


def calculate_modal_angle(modal: float) -> float:
    """Convert modal to rotation angle (0 to π)"""
    # Normalize: 0 = low modal (high risk), 10B+ = high modal (moderate risk)
    normalized = np.log10(max(modal, 1)) / 10  # log scale
    return np.clip(normalized * np.pi, 0, np.pi)


def calculate_sektor_angle(sektor: str) -> float:
    """Convert sector to rotation angle based on risk profile"""
    sektor_risk = {
        "Teknologi": 0.6,    # Moderate-high volatility
        "F&B": 0.5,          # Moderate risk
        "Retail": 0.55,      # Moderate risk
        "Properti": 0.4,     # Lower risk, stable
        "Kesehatan": 0.35,   # Lower risk
        "Pendidikan": 0.3,   # Low risk
        "Manufaktur": 0.45,  # Moderate
        "Jasa": 0.5,         # Moderate
        "Pertanian": 0.6,    # Higher volatility
        "Finansial": 0.55,   # Moderate-high
        "Lainnya": 0.5
    }
    risk_factor = sektor_risk.get(sektor, 0.5)
    return risk_factor * np.pi


def calculate_lokasi_angle(lokasi: str) -> float:
    """Convert location to rotation angle based on market potential"""
    lokasi_lower = lokasi.lower()
    
    # Tier 1 cities = lower angle (lower risk, better market)
    if any(city in lokasi_lower for city in ["jakarta", "surabaya", "bandung"]):
        return 0.3 * np.pi
    # Tier 2 cities
    elif any(city in lokasi_lower for city in ["medan", "semarang", "makassar", "bali"]):
        return 0.4 * np.pi
    # Other areas
    else:
        return 0.5 * np.pi


def calculate_tahun_angle(tahun: int) -> float:
    """Convert year to rotation angle based on economic outlook"""
    current_year = 2025
    years_ahead = tahun - current_year
    
    # Near term = lower risk, far term = higher uncertainty
    if years_ahead <= 1:
        return 0.2 * np.pi
    elif years_ahead <= 3:
        return 0.35 * np.pi
    else:
        return 0.5 * np.pi


def calculate_market_angle(target_market: str) -> float:
    """Convert target market to rotation angle based on TAM (Total Addressable Market)"""
    if not target_market or target_market == "Tidak disebutkan" or target_market is None:
        return 0.5 * np.pi  # Default: moderate risk
    
    market_lower = str(target_market).lower()
    
    # B2B Enterprise = lower risk (predictable revenue)
    if any(keyword in market_lower for keyword in ["enterprise", "b2b", "korporat", "bumn"]):
        return 0.3 * np.pi
    # Mass Market B2C = moderate-high risk (need scale)
    elif any(keyword in market_lower for keyword in ["b2c", "konsumen", "umkm", "retail"]):
        return 0.55 * np.pi
    # Niche/Specialized = moderate risk
    elif any(keyword in market_lower for keyword in ["niche", "spesialis", "premium"]):
        return 0.4 * np.pi
    # Default
    else:
        return 0.5 * np.pi


def calculate_competition_angle(competitors: str) -> float:
    """Convert competitor info to rotation angle based on competitive intensity"""
    if not competitors or competitors == "Tidak disebutkan" or competitors is None:
        return 0.5 * np.pi  # Default: moderate
    
    comp_lower = str(competitors).lower()
    
    # Count indicators of high competition
    high_comp_keywords = ["gojek", "grab", "tokopedia", "shopee", "bukalapak", "unicorn", 
                          "banyak", "ramai", "ketat", "saturated", "crowded"]
    low_comp_keywords = ["belum ada", "sedikit", "pioneer", "first mover", "blue ocean", "monopoli"]
    
    high_count = sum(1 for kw in high_comp_keywords if kw in comp_lower)
    low_count = sum(1 for kw in low_comp_keywords if kw in comp_lower)
    
    # High competition = higher angle (more risk)
    if high_count > low_count:
        return 0.65 * np.pi
    # Low competition = lower angle (less risk)
    elif low_count > high_count:
        return 0.25 * np.pi
    # Moderate
    else:
        return 0.45 * np.pi


def calculate_team_angle(team_size: str) -> float:
    """Convert team size to rotation angle based on execution capability"""
    if not team_size or team_size == "Tidak disebutkan" or team_size is None:
        return 0.5 * np.pi  # Default
    
    team_lower = str(team_size).lower()
    
    # Try to extract number
    import re
    numbers = re.findall(r'\d+', team_lower)
    
    if numbers:
        size = int(numbers[0])
        # Optimal team: 20-100 people (lower risk)
        if 20 <= size <= 100:
            return 0.3 * np.pi
        # Small team <20 (higher execution risk)
        elif size < 20:
            return 0.55 * np.pi
        # Large team >100 (coordination risk)
        else:
            return 0.45 * np.pi
    
    # Keyword-based fallback
    if any(kw in team_lower for kw in ["besar", "puluhan", "ratusan"]):
        return 0.4 * np.pi
    elif any(kw in team_lower for kw in ["kecil", "startup", "lean"]):
        return 0.55 * np.pi
    else:
        return 0.5 * np.pi


def calculate_business_model_angle(business_model: str) -> float:
    """Convert business model to rotation angle based on scalability & defensibility"""
    if not business_model or business_model == "Tidak disebutkan" or business_model is None:
        return 0.5 * np.pi  # Default
    
    model_lower = str(business_model).lower()
    
    # SaaS/Platform = lowest risk (scalable, recurring revenue)
    if any(kw in model_lower for kw in ["saas", "platform", "marketplace", "subscription"]):
        return 0.25 * np.pi
    # Transactional/Commission = moderate risk
    elif any(kw in model_lower for kw in ["commission", "komisi", "transaction fee", "take rate"]):
        return 0.4 * np.pi
    # Traditional/Asset-heavy = higher risk
    elif any(kw in model_lower for kw in ["asset", "inventory", "offline", "traditional"]):
        return 0.6 * np.pi
    # Freemium/Ad-based = moderate-high risk (monetization challenge)
    elif any(kw in model_lower for kw in ["freemium", "iklan", "ads", "advertising"]):
        return 0.55 * np.pi
    # Default
    else:
        return 0.5 * np.pi


def _counts_to_distribution(counts: Dict[str, int], shots: int) -> list:
    """Convert measurement counts to probability distribution (4-qubit legacy)"""
    # Create 16 bins for 4-qubit states
    distribution = []
    for i in range(16):
        state = format(i, '04b')
        prob = counts.get(state, 0) / shots
        distribution.append(prob)
    return distribution


def _counts_to_distribution_8q(counts: Dict[str, int], shots: int) -> list:
    """Convert measurement counts to probability distribution (8-qubit)"""
    # For 8 qubits, we have 256 possible states
    # Aggregate into 16 bins for visualization (group by first 4 qubits)
    distribution = [0.0] * 16
    
    for state, count in counts.items():
        # Take first 4 bits (representing core business factors)
        bin_index = int(state[4:], 2) if len(state) >= 8 else int(state, 2)
        bin_index = min(bin_index, 15)  # Safety clamp
        distribution[bin_index] += count / shots
    
    return distribution
