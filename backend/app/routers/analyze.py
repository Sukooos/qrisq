from fastapi import APIRouter, HTTPException
from app.schemas import AnalyzeRequest, AnalyzeResponse, QuantumSummary
from app.services.ai_extractor import extract_variables
from app.services.quantum_simulator import run_quantum_simulation
from app.services.risk_engine import generate_risk_analysis
from app.services.llm_client import summarize_quantum_results
from app.config import get_settings

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_risk(request: AnalyzeRequest):
    """
    Analisis risiko bisnis menggunakan Quantum-AI hybrid approach.
    
    NEW FLOW (Sequential):
    1. LLM ekstraksi variabel dari teks (extended fields)
    2. Qiskit quantum simulation → probability, heatmap
    3. LLM summarize hasil quantum (explain WHY)
    4. Return complete response
    """
    try:
        settings = get_settings()
        print(f"\n{'='*50}")
        print(f"[ANALYZE] Starting analysis...")
        print(f"[ANALYZE] Input: {request.description[:80]}...")
        
        # ===== STEP 1: Extract variables from description (LLM) =====
        variables = extract_variables(request.description, provider=request.model_provider)
        print(f"[ANALYZE] Step 1 DONE: sektor={variables.sektor}, modal={variables.modal:,.0f}")
        
        # ===== STEP 2: Run quantum simulation (Qiskit) =====
        quantum_result = run_quantum_simulation(variables)
        success_prob = quantum_result['success_probability']
        print(f"[ANALYZE] Step 2 DONE: Quantum probability={success_prob:.1%}")
        
        # ===== STEP 3: Generate risk analysis (heatmap, categories) =====
        analysis = generate_risk_analysis(variables, quantum_result)
        print(f"[ANALYZE] Step 3 DONE: Heatmap generated, risks categorized")
        
        # ===== STEP 4: LLM Summarize quantum results (NEW!) =====
        quantum_summary = None
        if settings.use_llm_extraction and (settings.groq_api_key or settings.gemini_api_key):
            # Convert variables to dict for LLM
            var_dict = {
                "modal": variables.modal,
                "sektor": variables.sektor,
                "lokasi": variables.lokasi,
                "tahun": variables.tahun,
                "target_market": variables.target_market,
                "competitors": variables.competitors,
                "unique_value": variables.unique_value,
            }
            
            # Convert risk categories to dict
            risk_dict = {
                "High": analysis["risk_categories"].High,
                "Medium": analysis["risk_categories"].Medium,
                "Low": analysis["risk_categories"].Low
            }
            
            summary_data = summarize_quantum_results(var_dict, quantum_result, risk_dict, provider=request.model_provider)
            
            if summary_data:
                # Helper to safely convert any value to string
                def safe_str(val, default=""):
                    if val is None:
                        return default
                    if isinstance(val, dict):
                        # Convert dict to readable string
                        return '; '.join(f"{k}: {v}" for k, v in val.items())
                    if isinstance(val, list):
                        return ', '.join(str(v) for v in val)
                    return str(val)
                
                # Ensure action_items is a list
                action_items = summary_data.get("action_items", [])
                if isinstance(action_items, str):
                    action_items = [action_items]
                elif not isinstance(action_items, list):
                    action_items = []
                
                quantum_summary = QuantumSummary(
                    executive_summary=safe_str(summary_data.get("executive_summary")),
                    probability_explanation=safe_str(summary_data.get("probability_explanation")),
                    risk_breakdown=safe_str(summary_data.get("risk_breakdown")),
                    key_insight=safe_str(summary_data.get("key_insight")),
                    action_items=action_items
                )
                print(f"[ANALYZE] Step 4 DONE: Quantum summary generated!")
        
        # Use LLM action items as recommendations if available
        recommendations = (
            quantum_summary.action_items 
            if quantum_summary and quantum_summary.action_items 
            else analysis["recommendations"]
        )
        
        print(f"[ANALYZE] COMPLETE! Probability: {success_prob:.1%}")
        print(f"{'='*50}\n")
        
        return AnalyzeResponse(
            success_probability=analysis["success_probability"],
            risk_heatmap=analysis["risk_heatmap"],
            risk_categories=analysis["risk_categories"],
            recommendations=recommendations,
            extracted_variables=variables,
            quantum_summary=quantum_summary,
            ai_insights=None,  # Replaced by quantum_summary
            quantum_metadata=quantum_result["metadata"]
        )
        
    except Exception as e:
        print(f"[ANALYZE] ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
