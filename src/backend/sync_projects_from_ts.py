import json
from pathlib import Path

projects = json.loads(
    Path("../data/projects.json").read_text(encoding="utf-8")
)

out = []
for p in projects:
    out.append(f"""
Project Title: {p['title']}
Date: {p.get('date', '')}
Category: {p.get('category', '')}
Tech Stack: {', '.join(p.get('tags', []))}
Description: {p.get('description', '')}
""")

Path("data/projects.md").write_text("\n---\n".join(out), encoding="utf-8")

print(f"✅ Synced {len(projects)} projects into RAG")
