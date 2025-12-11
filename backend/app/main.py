from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze

app = FastAPI(
    title="Q-RISQ API",
    description="Hybrid Quantum-AI Decision Support System for Risk Analysis",
    version="1.0.0-MVP",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Untuk development, production harus lebih strict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze.router, prefix="/api", tags=["Analysis"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Q-RISQ API",
        "version": "1.0.0-MVP",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "quantum_simulator": "ready"}
