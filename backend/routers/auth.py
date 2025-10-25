from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import (
    LoginRequest, LoginResponse, UserDB,
    InitiateRegistrationRequest, InitiateRegistrationResponse,
    RegisterRequest, RegisterResponse
)
from pydantic import BaseModel
import hashlib
import secrets
import bcrypt
from datetime import datetime

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(UserDB).filter(UserDB.email == body.email).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if user.password_hash:
        # Check if it's bcrypt hash (starts with $2b$) or old sha256 hash
        if user.password_hash.startswith('$2b$'):
            # New bcrypt hash
            if not bcrypt.checkpw(body.password.encode('utf-8'), user.password_hash.encode('utf-8')):
                raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            # Legacy sha256 hash (for existing demo users)
            password_hash = hashlib.sha256(body.password.encode()).hexdigest()
            if user.password_hash != password_hash:
                raise HTTPException(status_code=401, detail="Invalid credentials")
    else:
        # For demo purposes, accept any password if user exists and has no password_hash
        pass
    
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

@router.post("/initiate-registration", response_model=InitiateRegistrationResponse)
def initiate_registration(body: InitiateRegistrationRequest, db: Session = Depends(get_db)):
    """Check if email exists and return whether user is existing or new"""
    user = db.query(UserDB).filter(UserDB.email == body.email).first()
    return {"existing": user is not None}

@router.post("/register", response_model=RegisterResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user with email and password"""
    # Check if user already exists
    existing_user = db.query(UserDB).filter(UserDB.email == body.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    # Hash the password
    password_hash = bcrypt.hashpw(body.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Create new user
    new_user = UserDB(
        org_id=1,  # Default org for now
        email=body.email,
        display_name=body.email.split('@')[0].title(),
        status="active",
        auth_provider="email",
        password_hash=password_hash,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Generate access token
    access_token = secrets.token_urlsafe(32)
    
    # Determine role based on email or use default
    if "admin" in body.email:
        role = "OrgAdmin"
    elif "tmgr" in body.email:
        role = "TravelManager"
    elif "arranger" in body.email:
        role = "Arranger"
    else:
        role = "Traveler"
    
    return {"access_token": access_token, "role": role}

class UpdateProfileRequest(BaseModel):
    full_name: str
    role: str
    company_name: str
    team_size: str

@router.put("/profile", response_model=dict)
def update_profile(body: UpdateProfileRequest, db: Session = Depends(get_db)):
    """Update user profile information"""
    # Get the current user from the request (in production, this would come from JWT token)
    # For now, we'll get the most recently created user
    user = db.query(UserDB).order_by(UserDB.created_at.desc()).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user profile
    user.display_name = body.full_name
    user.meta_json = {
        "role": body.role,
        "company_name": body.company_name,
        "team_size": body.team_size
    }
    user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(user)
    
    return {"message": "Profile updated successfully"}
