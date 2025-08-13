import json
import numpy as np 
from sentence_transformers import SentenceTransformer

model=SentenceTransformer("all-MiniLM-L6-v2")
# encoding tells Python how to interpret those bytes as readable text.
with open("recipes.json",encoding="utf-8") as f:
    recipes=json.load(f)

for r in recipes:
    desc = r.get("description", "")
    emb = model.encode(desc, convert_to_numpy=True).astype("float32")
    r["embedding"] = emb.tolist()  # Convert vector to list of floats

#open is used to open files and"w" means write and "r" means to read the file
with open("recipes_with_vectors.json", "w", encoding="utf-8") as f:
    json.dump(recipes, f, ensure_ascii=False, indent=2)