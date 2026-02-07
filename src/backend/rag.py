import faiss
import json
import requests
import os
from pathlib import Path
from collections import defaultdict
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


# =====================================================
# App
# =====================================================
app = FastAPI(title="Portfolio AI")


# =====================================================
# Config
# =====================================================
OLLAMA_URL = os.getenv("OLLAMA_URL")
if not OLLAMA_URL:
    raise RuntimeError("OLLAMA_URL env variable not set")


# =====================================================
# Load embedding model (once)
# =====================================================
model = SentenceTransformer("all-MiniLM-L6-v2")


# =====================================================
# Load FAISS index + chunks (FAIL FAST)
# =====================================================
INDEX_PATH = Path("vectorstore/index.faiss")
CHUNKS_PATH = Path("vectorstore/chunks.json")

if not INDEX_PATH.exists():
    raise RuntimeError("FAISS index not found")

if not CHUNKS_PATH.exists():
    raise RuntimeError("chunks.json not found")

index = faiss.read_index(str(INDEX_PATH))

with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
    chunks = json.load(f)


# =====================================================
# Portfolio metadata
# =====================================================
PROJECTS_PATH = Path("data/projects.json")
if not PROJECTS_PATH.exists():
    raise RuntimeError("projects.json not found")

PROJECTS = json.loads(PROJECTS_PATH.read_text(encoding="utf-8"))
PROJECT_TITLES = [p["title"] for p in PROJECTS]

EXPERIENCE_ENTITIES = [
    "Motorola Solutions",
    "University of Houston",
    "Society of Health and Medical Technology"
]

SKILL_ENTITIES = [
    "aws", "azure", "kubernetes", "docker", "terraform",
    "prometheus", "grafana", "loki",
    "ci/cd", "github actions", "jenkins",
    "python", "go", "java", "react",
    "llm", "rag", "machine learning",
    "anomaly detection", "computer vision",
    "cloud", "devops", "sre"
]


# =====================================================
# Curated Skill → Project mapping
# =====================================================
SKILL_TO_PROJECTS = {
    "ai": [
        "AI-Powered Excel Assistant",
        "Construction Material Quality Inspection Using AI",
        "AI-Powered Kubernetes SRE Incident Response System"
    ],
    "machine learning": [
        "Construction Material Quality Inspection Using AI",
        "AI-Powered Log Drift Detection for SRE"
    ],
    "kubernetes": [
        "AI-Powered Kubernetes SRE Incident Response System",
        "AI-Powered Log Drift Detection for SRE"
    ],
    "aws": [
        "AI-Powered Log Drift Detection for SRE",
        "Real-Time Stock Market Dashboard"
    ],
    "react": [
        "My Portfolio",
        "Real-Time Stock Market Dashboard"
    ],
    "rag": [
        "AI-Powered Excel Assistant",
        "My Portfolio"
    ],
    "sre": [
        "AI-Powered Kubernetes SRE Incident Response System",
        "AI-Powered Log Drift Detection for SRE"
    ]
}


# =====================================================
# Helpers
# =====================================================
def detect_mentions(text: str, candidates: list[str]):
    t = text.lower()
    return [c for c in candidates if c.lower() in t]


def rank_projects_from_faiss(scores, idxs, top_n=2):
    project_scores = defaultdict(float)

    for score, idx in zip(scores[0], idxs[0]):
        meta = chunks[idx].get("meta", {})
        project_title = meta.get("project_title")
        if project_title:
            project_scores[project_title] += float(score)

    ranked = sorted(
        project_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [p[0] for p in ranked[:top_n]]


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


# =====================================================
# Core logic
# =====================================================
def ask_portfolio(question: str, top_k: int = 4):
    intent, skill = detect_intent(question)

    q_emb = model.encode([question], normalize_embeddings=True)
    scores, idxs = index.search(q_emb, top_k)

    context = "\n\n".join(chunks[idx]["text"] for idx in idxs[0])

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
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
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
            "intent": intent
        }
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
    return {"status": "ok"}
