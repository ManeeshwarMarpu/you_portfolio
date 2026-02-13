import os
import json
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from dotenv import load_dotenv

load_dotenv()

def run_ingestion():
    # Path to your projects.json
    data_path = os.path.join("..", "data", "projects.json")
    
    with open(data_path, "r") as f:
        projects = json.load(f)

    documents = [
        Document(
            page_content=f"Project: {p['title']}. Tech: {', '.join(p['tags'])}. Description: {p['description']}",
            metadata={"title": p['title']}
        ) for p in projects
    ]

    # ✅ FIX: Use the stable Gemini embedding model
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
    
    vector_db = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory="./vectorstore"
    )
    print("✅ Ingestion complete with gemini-embedding-001!")

if __name__ == "__main__":
    run_ingestion()