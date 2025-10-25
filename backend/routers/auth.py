from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import LoginRequest, LoginResponse, UserDB
import hashlib
import secrets

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(UserDB).filter(UserDB.email == body.email).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # For demo purposes, accept any password if user exists and has no password_hash
    # In production, implement proper password verification
    if user.password_hash:
        password_hash = hashlib.sha256(body.password.encode()).hexdigest()
        if user.password_hash != password_hash:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a simple token (in production, use JWT)
    access_token = secrets.token_urlsafe(32)
    
    # Determine role based on email or use default
    if "admin" in user.email:
        role = "OrgAdmin"
    elif "tmgr" in user.email:
        role = "TravelManager"
    elif "arranger" in user.email:
        role = "Arranger"
    else:
        role = "Traveler"
    
    return {"access_token": access_token, "role": role}
