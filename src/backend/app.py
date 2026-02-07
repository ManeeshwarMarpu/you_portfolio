from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import ask_portfolio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask(q: Question):
    return ask_portfolio(q.question)

@app.post("/api/sentiment")
def sentiment_api(payload: dict):
    text = payload.get("text")
    return analyze_sentiment(text)

@app.post("/api/anomaly")
def anomaly_api(payload: dict):
    return detect_anomaly(payload["data"])

@app.post("/api/forecast")
def forecast_api(payload: dict):
    return run_forecast(payload)

@app.post("/api/prompt-lab")
def prompt_lab_api(payload: dict):
    return run_prompt_lab(payload)