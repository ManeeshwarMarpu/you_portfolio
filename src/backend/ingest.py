import os
import faiss
import json
from sentence_transformers import SentenceTransformer

CHUNK_SIZE = 300  # characters

model = SentenceTransformer("all-MiniLM-L6-v2")

chunks = []
metadata = []

def chunk_text(text, source):
    start = 0
    while start < len(text):
        end = start + CHUNK_SIZE
        chunk = text[start:end]
        chunks.append(chunk)
        metadata.append({
            "source": source,
            "start": start,
            "end": end
        })
        start = end

for file in os.listdir("data"):
    with open(f"data/{file}", "r", encoding="utf-8") as f:
        text = f.read()
        chunk_text(text, source=file)

embeddings = model.encode(
    chunks,
    normalize_embeddings=True,
    show_progress_bar=True
)

index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings)

faiss.write_index(index, "vectorstore/index.faiss")

with open("vectorstore/chunks.json", "w", encoding="utf-8") as f:
    json.dump(
        [{"text": c, "meta": m} for c, m in zip(chunks, metadata)],
        f,
        indent=2
    )

print(f"✅ Indexed {len(chunks)} chunks")
