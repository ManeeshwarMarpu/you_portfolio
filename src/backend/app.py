from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import traceback

from rag import ask_portfolio

app = FastAPI(title="Portfolio AI")

# =====================================================
# CORS (dev + prod safe)
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://localhost",        # Docker / nginx
        "https://maneeshwar.com"  # ← replace later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Models
# =====================================================
class Question(BaseModel):
    question: str


# =====================================================
# Health check (MANDATORY for prod)
# =====================================================
@app.get("/health")
def health():
    return {"status": "ok"}


# =====================================================
# Core RAG endpoint
# =====================================================
@app.post("/ask")
def ask(q: Question):
    try:
        return ask_portfolio(q.question)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=503, detail=str(e))


# =====================================================
# Optional AI endpoints (SAFE STUBS)
# These WILL NOT crash prod even if unused
# =====================================================
@app.post("/api/sentiment")
def sentiment_api(payload: dict):
    return {
        "status": "disabled",
        "message": "Sentiment module not enabled in prod"
    }


@app.post("/api/anomaly")
def anomaly_api(payload: dict):
    return {
        "status": "disabled",
        "message": "Anomaly detection module not enabled in prod"
    }


@app.post("/api/forecast")
def forecast_api(payload: dict):
    return {
        "status": "disabled",
        "message": "Forecasting module not enabled in prod"
    }


@app.post("/api/prompt-lab")
def prompt_lab_api(payload: dict):
    return {
        "status": "disabled",
        "message": "Prompt lab not enabled in prod"
    }
