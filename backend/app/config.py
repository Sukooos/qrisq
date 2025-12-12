"""
Application Configuration using Pydantic Settings
"""

from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Application
    app_name: str = "Q-RISQ API"
    app_env: str = "development"
    debug: bool = True
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:5173"
    
    # Quantum
    quantum_shots: int = 1024
    use_mock_simulator: bool = False
    
    # LLM Provider Selection
    llm_provider: str = "groq"  # "groq" | "gemini"
    use_llm_extraction: bool = True  # Set to False to use regex fallback
    
    # Groq LLM
    groq_api_key: str | None = None
    groq_model: str = "llama-3.3-70b-versatile"
    
    # Google Gemini LLM
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.0-flash"  # Fast, reliable JSON output
    
    # Optional: OpenAI (legacy)
    openai_api_key: str | None = None
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins string to list"""
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    @property
    def is_production(self) -> bool:
        return self.app_env == "production"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance"""
    return Settings()
