from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

DELEGATIONS = []  # store arranger->traveler

@router.get("/travelers")
def arranger_travelers():
    return [{"id": 1, "name": "Jane Doe", "email": "jane@corp.com"},
            {"id": 2, "name": "Chris Lee", "email": "chris@corp.com"}]

@router.post("/delegate")
def set_delegate(payload: Dict[str, Any]):
    DELEGATIONS.append(payload)
    return {"ok": True, "count": len(DELEGATIONS)}
