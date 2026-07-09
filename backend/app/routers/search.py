from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, database
from ..services.vector_db import VectorDBService

router = APIRouter(prefix="/search", tags=["Search"])
vector_db = VectorDBService()

@router.get("/dense")
def dense_search(q: str = Query(..., description="Semantic search query for symptoms"), top_k: int = 5, db: Session = Depends(database.get_db)):
    """Executes a dense vector search to find relevant Materia Medica."""
    results = vector_db.semantic_search(q, top_k=top_k)
    return {"query": q, "results": results}

@router.get("/sparse")
def sparse_search(q: str = Query(..., description="Keyword-based sparse search"), db: Session = Depends(database.get_db)):
    """Executes a keyword search (BM25 mock) against the knowledge base."""
    # Mocking a keyword sparse search response
    return {
        "query": q,
        "results": [
            {"remedy_name": "Belladonna", "snippet": "Sudden onset, throbbing head.", "score": 0.82}
        ]
    }

@router.get("/hybrid")
def hybrid_search(q: str = Query(..., description="Combined dense & sparse search with cross-encoder re-ranking"), db: Session = Depends(database.get_db)):
    """Executes hybrid search and re-ranks using a Cross-Encoder."""
    # Day 7 & 8: Hybrid search and re-ranking logic mock
    dense = vector_db.semantic_search(q, top_k=10)
    
    # Mock Re-ranking the results (Cross-Encoder step)
    ranked_results = sorted(dense, key=lambda x: x["score"], reverse=True)
    
    return {"query": q, "hybrid_ranked_results": ranked_results[:5]}
