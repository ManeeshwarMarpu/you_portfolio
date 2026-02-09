import faiss
import json
import requests
import os
from pathlib import Path
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


# =====================================================
# App
# =====================================================
app = FastAPI(title="Portfolio AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://maneeshwar.com",  # Your production domain
        "http://localhost",         # Your local dev (Nginx port 80)
        "http://localhost:5173",    # Vite's default port if bypassing Nginx
    ],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =====================================================
# Config
# =====================================================
OLLAMA_URL = os.getenv("OLLAMA_URL")
if not OLLAMA_URL:
    raise RuntimeError("OLLAMA_URL env variable not set")


# =====================================================
# Paths (Docker-safe)
# =====================================================
BASE_PATH = Path("/app")

INDEX_PATH = BASE_PATH / "vectorstore" / "index.faiss"
CHUNKS_PATH = BASE_PATH / "vectorstore" / "chunks.json"
PROJECTS_PATH = BASE_PATH / "data" / "projects.json"


# =====================================================
# Load embedding model (once)
# =====================================================
model = SentenceTransformer("all-MiniLM-L6-v2")


# =====================================================
# Load vectorstore (SAFE)
# =====================================================
def load_vectorstore():
    if not INDEX_PATH.exists() or not CHUNKS_PATH.exists():
        return None, []

    index = faiss.read_index(str(INDEX_PATH))
    chunks = json.loads(CHUNKS_PATH.read_text(encoding="utf-8"))
    return index, chunks


def load_projects():
    if not PROJECTS_PATH.exists():
        return []
    return json.loads(PROJECTS_PATH.read_text(encoding="utf-8"))


FAISS_INDEX, CHUNKS = load_vectorstore()
PROJECTS = load_projects()
PROJECT_TITLES = [p["title"] for p in PROJECTS]


# =====================================================
# Metadata
# =====================================================
EXPERIENCE_ENTITIES = [
    "Motorola Solutions",
    "University of Houston",
    "Society of Health and Medical Technology",
]

SKILL_ENTITIES = [
    "aws", "azure", "kubernetes", "docker", "terraform",
    "prometheus", "grafana", "loki",
    "ci/cd", "github actions", "jenkins",
    "python", "go", "java", "react",
    "llm", "rag", "machine learning",
    "anomaly detection", "computer vision",
    "cloud", "devops", "sre",
]


SKILL_TO_PROJECTS = {
    "ai": [
        "AI-Powered Excel Assistant",
        "Construction Material Quality Inspection Using AI",
        "AI-Powered Kubernetes SRE Incident Response System",
    ],
    "machine learning": [
        "Construction Material Quality Inspection Using AI",
        "AI-Powered Log Drift Detection for SRE",
    ],
    "kubernetes": [
        "AI-Powered Kubernetes SRE Incident Response System",
        "AI-Powered Log Drift Detection for SRE",
    ],
    "aws": [
        "AI-Powered Log Drift Detection for SRE",
        "Real-Time Stock Market Dashboard",
    ],
    "react": [
        "My Portfolio",
        "Real-Time Stock Market Dashboard",
    ],
    "rag": [
        "AI-Powered Excel Assistant",
        "My Portfolio",
    ],
    "sre": [
        "AI-Powered Kubernetes SRE Incident Response System",
        "AI-Powered Log Drift Detection for SRE",
    ],
}


# =====================================================
# Helpers
# =====================================================
def detect_mentions(text: str, candidates: list[str]):
    t = text.lower()
    return [c for c in candidates if c.lower() in t]


def detect_intent(question: str):
    q = question.lower()

    for skill in SKILL_TO_PROJECTS:
        if skill in q:
            return "SKILL", skill

    if any(w in q for w in ["project", "built", "build", "develop", "explain"]):
        return "PROJECT", None

    if any(w in q for w in ["worked", "experience", "company"]):
        return "EXPERIENCE", None

    return "GENERAL", None


def rank_projects_from_faiss(scores, idxs, top_n=2):
    project_scores = defaultdict(float)

    for score, idx in zip(scores[0], idxs[0]):
        meta = CHUNKS[idx].get("meta", {})
        title = meta.get("project_title")
        if title:
            project_scores[title] += float(score)

    ranked = sorted(project_scores.items(), key=lambda x: x[1], reverse=True)
    return [p[0] for p in ranked[:top_n]]


# =====================================================
# Core Logic
# =====================================================
def ask_portfolio(question: str, top_k: int = 4):
    if FAISS_INDEX is None or not CHUNKS:
        return {
            "answer": "Portfolio knowledge base is still initializing.",
            "entities": {},
        }

    intent, skill = detect_intent(question)

    q_emb = model.encode([question], normalize_embeddings=True)
    scores, idxs = FAISS_INDEX.search(q_emb, top_k)

    context = "\n\n".join(CHUNKS[idx]["text"] for idx in idxs[0])

    if intent == "PROJECT":
        top_projects = rank_projects_from_faiss(scores, idxs)
    elif intent == "SKILL":
        top_projects = SKILL_TO_PROJECTS.get(skill, [])[:2]
    else:
        top_projects = []

    prompt = f"""
You are Maneeshwar, a software engineer answering a recruiter visiting your portfolio.

Rules:
- Speak in first person
- Be concise and confident
- Reference ONLY these projects
- Do NOT invent anything

User intent: {intent}

Relevant projects:
{chr(10).join(f"- {p}" for p in top_projects) if top_projects else "None"}

Context:
{context}

Question:
{question}

Answer:
"""

    try:
        res = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": "mistral:latest",
                "prompt": prompt,
                "stream": False,
            },
            timeout=120,
        )
        res.raise_for_status()
        answer = res.json()["response"].strip()
    except Exception as e:
        raise RuntimeError(f"Ollama error: {e}")

    return {
        "answer": answer,
        "entities": {
            "projects": top_projects,
            "skills": detect_mentions(question, SKILL_ENTITIES),
            "experience": detect_mentions(question, EXPERIENCE_ENTITIES),
            "intent": intent,
        },
    }


# =====================================================
# API
# =====================================================
class AskRequest(BaseModel):
    question: str


@app.post("/ask")
def ask(req: AskRequest):
    try:
        return ask_portfolio(req.question)
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@app.get("/health")
def health():
    return {
        "status": "ok",
        "faiss_loaded": FAISS_INDEX is not None,
        "chunks_count": len(CHUNKS),
        "projects_count": len(PROJECTS),
        "ollama_config": OLLAMA_URL
    }

@app.get("/health/ollama")
def check_ollama():
    try:
        res = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        return {"ollama_status": "connected", "models": res.json()}
    except Exception as e:
        return {"ollama_status": "offline", "error": str(e)}