import faiss
import json
import requests
from pathlib import Path
from collections import defaultdict
from sentence_transformers import SentenceTransformer


# =====================================================
# Load embedding model
# =====================================================
model = SentenceTransformer("all-MiniLM-L6-v2")


# =====================================================
# Load FAISS index + chunks
# =====================================================
index = faiss.read_index("vectorstore/index.faiss")

with open("vectorstore/chunks.json", "r", encoding="utf-8") as f:
    chunks = json.load(f)


# =====================================================
# Portfolio metadata
# =====================================================
projects_path = Path("../data/projects.json")
if not projects_path.exists():
    raise FileNotFoundError("projects.json not found")

PROJECTS = json.loads(projects_path.read_text(encoding="utf-8"))
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
# Curated Skill → Project mapping (SOURCE OF TRUTH)
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
    """
    Deterministically rank projects using FAISS retrieval metadata.
    """
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
    """
    Determine user intent.
    """
    q = question.lower()

    for skill in SKILL_TO_PROJECTS:
        if skill in q:
            return "SKILL", skill

    if any(word in q for word in ["project", "build", "built", "develop", "explain"]):
        return "PROJECT", None

    if any(word in q for word in ["worked", "experience", "company"]):
        return "EXPERIENCE", None

    return "GENERAL", None


# =====================================================
# Core RAG function (FINAL)
# =====================================================
def ask_portfolio(question: str, top_k: int = 4):
    # ---- Detect intent FIRST ----
    intent, skill = detect_intent(question)

    # ---- Embed question ----
    q_emb = model.encode([question], normalize_embeddings=True)

    # ---- FAISS search (always, for context) ----
    scores, idxs = index.search(q_emb, top_k)

    retrieved_chunks = [chunks[idx]["text"] for idx in idxs[0]]
    context = "\n\n".join(retrieved_chunks)

    # ---- Resolve projects based on intent ----
    if intent == "PROJECT":
        top_projects = rank_projects_from_faiss(scores, idxs)

    elif intent == "SKILL":
        top_projects = SKILL_TO_PROJECTS.get(skill, [])[:2]

    else:
        top_projects = []

    # ---- Prompt (LLM never decides cards) ----
    prompt = f"""
You are Maneeshwar, a software engineer answering a recruiter visiting your portfolio.

Tone:
- Confident
- Concise
- Human
- No buzzwords
- No definitions of tools

Rules:
- Speak in first person
- Reference ONLY the projects listed below
- Do NOT invent or mix projects

User intent: {intent}

Relevant projects:
{chr(10).join(f"- {p}" for p in top_projects) if top_projects else "None"}

Portfolio context:
{context}

Question:
{question}

Answer:
"""

    # ---- Call Ollama ----
    res = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )

    res.raise_for_status()
    answer_text = res.json()["response"].strip()

    # ---- Deterministic entities for UI ----
    entities = {
        "projects": top_projects,
        "skills": detect_mentions(question, SKILL_ENTITIES),
        "experience": detect_mentions(question, EXPERIENCE_ENTITIES),
        "intent": intent
    }

    return {
        "answer": answer_text,
        "entities": entities
    }
