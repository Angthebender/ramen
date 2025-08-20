from flask import Flask,jsonify,request
from flask_cors import CORS 
import json 
from pathlib import Path

#now we wil be doing the some math so we will import something here
import numpy as np 
from sentence_transformers import SentenceTransformer
import faiss#this is an is a tool made by meta people for quick similarity search between large vectors
app=Flask(__name__)
CORS(app)

BASE_DIR=Path(__file__).parent
with open(BASE_DIR / "recipes_with_vectors.json", encoding="utf-8") as file:
    recipes=json.load(file)


# Load the sentence embedding model once
model=SentenceTransformer("all-MiniLM-L6-v2")#so this si a model thats pretrained to convert sentecnes into 2d vectors

# Build FAISS index for similarity search
embs=np.array([r["embedding"] for r in recipes],dtype="float32")
d = embs.shape[1]  # dimension size, e.g. 384
index = faiss.IndexFlatL2(d)
index.add(embs)

@app.route("/api/ramen", methods=["GET"])
def list_ramen():
    results=[]#we create a disctionary for this and store all the reults of the searches in this
    for i,r in enumerate(recipes):
        results.append({
            "id":r.get("id"),
            "img_url":r.get("image"),
            "name":r.get("name"),
            "description": r.get("description"), 
            
            "prep_time": r.get("prep_time"),
            "cook_time": r.get("cook_time"),
            "total_time": r.get("total_time"),

        })
    return  jsonify(results)

@app.route("/api/ramen/search_name",methods=["GET"])
def search_name():
    name=request.args.get("name",default="",type=str)
    

    results=[]
    for i,r in enumerate(recipes):
        if name and name.lower() in r.get("name","").lower():
            results.append({
            "id":r.get("id"),
            "img_url":r.get("image"),
            "name":r.get("name"),
            "description": r.get("description"),
            
            "prep_time": r.get("prep_time"),
            "cook_time": r.get("cook_time"),
            "total_time": r.get("total_time"),

        })
    return jsonify(results)


# Define the search endpoint
@app.route("/api/ramen/search_desc",methods=["GET"])
def search_desc():
    desc=request.args.get("desc",default="",type=str)
    if not desc:
        return jsonify({"error":"there was no description"}),404
    
    #encode the users discription
    q_emb=model.encode([desc],convert_to_numpy=True).astype("float32")
    distance,idxs = index.search(q_emb,k=5)#it will give us the top 5 
    results = []
    for dist, idx in zip(distance[0], idxs[0]):
        r = recipes[idx]
        results.append({
            "img_url":r.get("image"),
            "id": r.get("id"),
            "name": r.get("name"),
            "description": r.get("description"),
            
            "prep_time": r.get("prep_time"),
            "cook_time": r.get("cook_time"),
            "total_time": r.get("total_time"),

        })
    return jsonify(results)




@app.route("/api/ramen/<int:idx>", methods=["GET"])

def get_ramen(idx):
    if idx<0 or idx>=len(recipes):
        return jsonify({"error":"recipie not found"}),404

    r=recipes[idx]
    result={
            "id":r.get("id"),
            "img_url":r.get("image"),
            "name":r.get("name"),
            "description":r.get("description"),
            "ingredients":r.get("ingredients"),
            "instructions":r.get("instructions"),
            "prep_time": r.get("prep_time"),
            "cook_time": r.get("cook_time"),
            "total_time": r.get("total_time"),

        }
    
    return jsonify(result)

