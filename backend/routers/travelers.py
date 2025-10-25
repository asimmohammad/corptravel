from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import UserDB
from typing import Dict, Any, List

router = APIRouter()

@router.get("")
def list_travelers(db: Session = Depends(get_db)):
    users = db.query(UserDB).all()
    return [
        {
            "id": str(user.id),
            "name": user.email.split("@")[0].title(),  # Simple name from email
            "email": user.email,
            "loyalty": {"air": "", "hotel": "", "car": ""}
        }
        for user in users
    ]

@router.get("/{traveler_id}")
def get_traveler(traveler_id: str, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.id == int(traveler_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Traveler not found")
    
    return {
        "id": str(user.id),
        "name": user.email.split("@")[0].title(),
        "email": user.email,
        "loyalty": {"air": "", "hotel": "", "car": ""}
    }

@router.put("/{traveler_id}")
def update_traveler(traveler_id: str, body: Dict[str, Any], db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.id == int(traveler_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Traveler not found")
    
    # Update user fields if provided
    if "email" in body:
        user.email = body["email"]
    if "role" in body:
        user.role = body["role"]
    
    db.commit()
    db.refresh(user)
    
    return {
        "id": str(user.id),
        "name": user.email.split("@")[0].title(),
        "email": user.email,
        "loyalty": {"air": "", "hotel": "", "car": ""}
    }
