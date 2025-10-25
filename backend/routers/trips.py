from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Trip as TripModel, TripDB, UserDB
from typing import List

router = APIRouter()

@router.get("", response_model=List[TripModel])
def list_trips(db: Session = Depends(get_db)):
    # For now, get trips for the first user (in production, get from auth token)
    user = db.query(UserDB).first()
    if not user:
        return []
    
    trips = db.query(TripDB).filter(TripDB.traveler_id == user.id).all()
    return trips
