from fastapi import APIRouter

router = APIRouter()

@router.get("/spend")
def spend():
    return {"total": 125432.55, "currency": "USD", "month": "2025-10"}

@router.get("/compliance")
def compliance():
    return {"inPolicyRate": 0.78, "oopRate": 0.22}
