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
    Real Qiskit quantum simulation.
    
    Circuit Design:
    - 4 qubits representing: Modal Risk, Sector Risk, Location Risk, Time Risk
    - Rotation angles based on extracted variables
    - Entanglement to model risk correlations
    """
    n_qubits = 4
    shots = 1024
    
    # Create quantum circuit
    qc = QuantumCircuit(n_qubits, n_qubits)
    
    # Calculate rotation angles based on business variables
    theta_modal = calculate_modal_angle(variables.modal)
    theta_sektor = calculate_sektor_angle(variables.sektor)
    theta_lokasi = calculate_lokasi_angle(variables.lokasi)
    theta_tahun = calculate_tahun_angle(variables.tahun)
    
    # Apply Hadamard gates for superposition
    for i in range(n_qubits):
        qc.h(i)
    
    # Apply rotation gates based on risk factors
    qc.ry(theta_modal, 0)   # Modal risk
    qc.ry(theta_sektor, 1)  # Sector risk
    qc.ry(theta_lokasi, 2)  # Location risk
    qc.ry(theta_tahun, 3)   # Time risk
    
    # Add entanglement (risk correlation)
    qc.cx(0, 1)  # Modal affects sector risk
    qc.cx(1, 2)  # Sector affects location risk
    qc.cx(2, 3)  # Location affects time risk
    
    # Additional rotation for fine-tuning
    qc.rz(np.pi/4, 0)
    qc.rz(np.pi/6, 1)
    
    # Measure all qubits
    qc.measure(range(n_qubits), range(n_qubits))
    
    # Run simulation
    simulator = AerSimulator()
    job = simulator.run(qc, shots=shots)
    result = job.result()
    counts = result.get_counts(qc)
    
    # Calculate success probability
    # Success = states with more 0s than 1s (lower risk)
    success_count = 0
    for state, count in counts.items():
        if state.count('0') >= state.count('1'):
            success_count += count
    
    success_probability = success_count / shots
    
    # Generate probability distribution for heatmap
    prob_distribution = _counts_to_distribution(counts, shots)
    
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
                "tahun": round(theta_tahun, 4)
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


def _counts_to_distribution(counts: Dict[str, int], shots: int) -> list:
    """Convert measurement counts to probability distribution"""
    # Create 16 bins for 4-qubit states
    distribution = []
    for i in range(16):
        state = format(i, '04b')
        prob = counts.get(state, 0) / shots
        distribution.append(prob)
    return distribution
