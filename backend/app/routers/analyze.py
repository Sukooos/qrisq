from fastapi import APIRouter, HTTPException
from app.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.ai_extractor import extract_variables
from app.services.quantum_simulator import run_quantum_simulation
from app.services.risk_engine import generate_risk_analysis

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_risk(request: AnalyzeRequest):
    """
    Analisis risiko bisnis menggunakan Quantum-AI hybrid approach.
    
    1. Ekstraksi variabel dari teks menggunakan AI
    2. Simulasi quantum Monte Carlo untuk probabilitas
    3. Generate risk categories dan rekomendasi
    """
    try:
        # Step 1: Extract variables from description
        variables = extract_variables(request.description)
        
        # Step 2: Run quantum simulation
        quantum_result = run_quantum_simulation(variables)
        
        # Step 3: Generate complete risk analysis
        analysis = generate_risk_analysis(variables, quantum_result)
        
        return AnalyzeResponse(
            success_probability=analysis["success_probability"],
            risk_heatmap=analysis["risk_heatmap"],
            risk_categories=analysis["risk_categories"],
            recommendations=analysis["recommendations"],
            extracted_variables=variables,
            quantum_metadata=quantum_result["metadata"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
