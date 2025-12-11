# Q-RISQ Backend

Backend API untuk Q-RISQ - Hybrid Quantum-AI Risk Analysis System.

## Tech Stack
- FastAPI
- Qiskit (IBM Quantum Simulator)
- Pydantic
- NumPy

## Setup

### 1. Create Virtual Environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Server
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Health Check
```
GET /health
```

### Analyze Risk
```
POST /api/analyze
Content-Type: application/json

{
  "description": "Investasi 500 juta di F&B Jakarta Selatan tahun 2026"
}
```

## Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app entry
│   ├── schemas.py       # Pydantic models
│   ├── routers/
│   │   └── analyze.py   # Analysis endpoints
│   └── services/
│       ├── ai_extractor.py      # Variable extraction
│       ├── quantum_simulator.py # Qiskit simulation
│       └── risk_engine.py       # Risk analysis logic
└── requirements.txt
```
