from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain.agents import create_agent
from langchain_core.tools import tool
from dotenv import load_dotenv

load_dotenv()

class PortfolioRAG:
    def __init__(self):
        # ✅ Must match ingest.py model
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
        self.vector_db = Chroma(
            persist_directory="./vectorstore", 
            embedding_function=self.embeddings
        )
        # Using Gemini 3 Pro (Free Tier) for high-speed RAG
        self.llm = ChatGoogleGenerativeAI(model="gemini-3-pro-flash")

    @tool
    def search_projects(query: str) -> str:
        """Searches Maneeshwar's portfolio for specific projects and technical skills."""
        docs = self.vector_db.similarity_search(query, k=2)
        return "\n\n".join([d.page_content for d in docs])

    def ask(self, query: str):
        # Modern v1.x create_agent pattern
        agent = create_agent(model=self.llm, tools=[self.search_projects])
        result = agent.invoke({"messages": [("user", query)]})
        return {
            "answer": result["messages"][-1].content,
            "projects": [] # Metadata can be extracted from tool_outputs
        }