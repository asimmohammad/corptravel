from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import BookingRequest, BookingResponse, BookingDB, UserDB
from datetime import datetime
import secrets

router = APIRouter()

@router.post("", response_model=BookingResponse)
def create_booking(req: BookingRequest, db: Session = Depends(get_db)):
    # Generate a unique booking ID
    booking_id = "CONF" + secrets.token_hex(8).upper()
    
    # Calculate total amount
    total_amount = sum(item.price for item in req.items)
    
    # Convert booking items to dict for JSON storage
    items_dict = [item.dict() for item in req.items]
    
    # For now, use a default user (in production, get from auth token)
    user = db.query(UserDB).first()
    if not user:
        raise HTTPException(status_code=400, detail="No users found in database")
    
    # Create booking record
    booking = BookingDB(
        id=booking_id,
        user_id=user.id,
        items=items_dict,
        total_amount=total_amount,
        currency=req.items[0].currency if req.items else "USD",
        status="confirmed",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    return {"id": booking_id}
