from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import PortfolioRAG

app = FastAPI()

# ✅ Update for maneeshwar.com deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "https://maneeshwar.com", 
        "https://www.maneeshwar.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the RAG logic
rag_system = PortfolioRAG()

class ChatInput(BaseModel):
    question: str

@app.post("/ask")
async def ask_portfolio(data: ChatInput):
    try:
        # Get answer from Gemini-powered RAG
        result = rag_system.ask(data.question)
        
        return {
            "answer": result["answer"],
            "entities": {"projects": result["projects"]}
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="The AI is currently napping. Try again later!")

@app.get("/")
async def root():
    return {"message": "Maneeshwar's Portfolio AI API is live!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Inside app.py
@app.post("/ask")
async def ask_portfolio(data: ChatInput):
    try:
        result = rag_system.ask(data.question)
        return {
            "answer": result["answer"],
            "entities": {"projects": result["projects"]}
        }
    except Exception as e:
        # ✅ This will tell you exactly what's wrong (e.g., "API Key Expired")
        print(f"CRITICAL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))