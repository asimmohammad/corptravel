from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import ApiKeyDB, UserDB
from auth import verify_api_key, require_permissions
from datetime import datetime
from typing import List, Optional
import secrets
import hashlib

router = APIRouter()

@router.post("/bootstrap", response_model=dict)
def bootstrap_admin_key(
    app_name: str = "Admin Bootstrap",
    db: Session = Depends(get_db)
):
    """Create the first admin API key without authentication (bootstrap only)"""
    
    # Check if any API keys exist
    existing_keys = db.query(ApiKeyDB).count()
    if existing_keys > 0:
        raise HTTPException(status_code=400, detail="Bootstrap key already exists. Use regular generation endpoint.")
    
    # Generate API key and secret
    api_key = f"ak_{secrets.token_urlsafe(32)}"
    api_secret = secrets.token_urlsafe(64)
    
    # Create admin API key record
    api_key_record = ApiKeyDB(
        app_name=app_name,
        api_key=api_key,
        api_secret=api_secret,
        permissions=["admin", "users", "policies", "bookings", "trips", "reports"],
        rate_limit=10000,
        user_id=None,
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(api_key_record)
    db.commit()
    db.refresh(api_key_record)
    
    return {
        "id": api_key_record.id,
        "app_name": api_key_record.app_name,
        "api_key": api_key_record.api_key,
        "api_secret": api_key_record.api_secret,
        "permissions": api_key_record.permissions,
        "rate_limit": api_key_record.rate_limit,
        "created_at": api_key_record.created_at.isoformat(),
        "warning": "Store the API secret securely. It cannot be retrieved again."
    }

class ApiKeyCreate:
    def __init__(self, app_name: str, permissions: list = None, rate_limit: int = 1000):
        self.app_name = app_name
        self.permissions = permissions or []
        self.rate_limit = rate_limit

class ApiKeyResponse:
    def __init__(self, id: int, app_name: str, api_key: str, is_active: bool, 
                 permissions: list, rate_limit: int, created_at: datetime):
        self.id = id
        self.app_name = app_name
        self.api_key = api_key
        self.is_active = is_active
        self.permissions = permissions
        self.rate_limit = rate_limit
        self.created_at = created_at

@router.post("/generate", response_model=dict)
def generate_api_key(
    app_name: str,
    permissions: List[str] = None,
    rate_limit: int = 1000,
    user_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_api_key: ApiKeyDB = Depends(require_permissions(["admin"]))
):
    """Generate a new API key and secret"""
    
    # Generate API key and secret
    api_key = f"ak_{secrets.token_urlsafe(32)}"
    api_secret = secrets.token_urlsafe(64)
    
    # Create API key record
    api_key_record = ApiKeyDB(
        app_name=app_name,
        api_key=api_key,
        api_secret=api_secret,
        permissions=permissions or [],
        rate_limit=rate_limit,
        user_id=user_id,
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(api_key_record)
    db.commit()
    db.refresh(api_key_record)
    
    return {
        "id": api_key_record.id,
        "app_name": api_key_record.app_name,
        "api_key": api_key_record.api_key,
        "api_secret": api_key_record.api_secret,
        "permissions": api_key_record.permissions,
        "rate_limit": api_key_record.rate_limit,
        "created_at": api_key_record.created_at.isoformat(),
        "warning": "Store the API secret securely. It cannot be retrieved again."
    }

@router.get("/", response_model=List[dict])
def list_api_keys(
    db: Session = Depends(get_db),
    current_api_key: ApiKeyDB = Depends(require_permissions(["admin"]))
):
    """List all API keys (admin only)"""
    api_keys = db.query(ApiKeyDB).all()
    
    return [
        {
            "id": key.id,
            "app_name": key.app_name,
            "api_key": key.api_key,
            "is_active": key.is_active,
            "permissions": key.permissions,
            "rate_limit": key.rate_limit,
            "created_at": key.created_at.isoformat() if key.created_at else None,
            "last_used": key.last_used.isoformat() if key.last_used else None
        }
        for key in api_keys
    ]

@router.get("/{api_key_id}", response_model=dict)
def get_api_key(
    api_key_id: int,
    db: Session = Depends(get_db),
    current_api_key: ApiKeyDB = Depends(require_permissions(["admin"]))
):
    """Get specific API key details (admin only)"""
    api_key = db.query(ApiKeyDB).filter(ApiKeyDB.id == api_key_id).first()
    
    if not api_key:
        raise HTTPException(status_code=404, detail="API key not found")
    
    return {
        "id": api_key.id,
        "app_name": api_key.app_name,
        "api_key": api_key.api_key,
        "is_active": api_key.is_active,
        "permissions": api_key.permissions,
        "rate_limit": api_key.rate_limit,
        "created_at": api_key.created_at.isoformat() if api_key.created_at else None,
        "last_used": api_key.last_used.isoformat() if api_key.last_used else None
    }

@router.put("/{api_key_id}/toggle", response_model=dict)
def toggle_api_key(
    api_key_id: int,
    db: Session = Depends(get_db),
    current_api_key: ApiKeyDB = Depends(require_permissions(["admin"]))
):
    """Toggle API key active status (admin only)"""
    api_key = db.query(ApiKeyDB).filter(ApiKeyDB.id == api_key_id).first()
    
    if not api_key:
        raise HTTPException(status_code=404, detail="API key not found")
    
    api_key.is_active = not api_key.is_active
    api_key.updated_at = datetime.utcnow()
    db.commit()
    
    return {
        "id": api_key.id,
        "app_name": api_key.app_name,
        "is_active": api_key.is_active,
        "message": f"API key {'activated' if api_key.is_active else 'deactivated'}"
    }

@router.delete("/{api_key_id}")
def delete_api_key(
    api_key_id: int,
    db: Session = Depends(get_db),
    current_api_key: ApiKeyDB = Depends(require_permissions(["admin"]))
):
    """Delete API key (admin only)"""
    api_key = db.query(ApiKeyDB).filter(ApiKeyDB.id == api_key_id).first()
    
    if not api_key:
        raise HTTPException(status_code=404, detail="API key not found")
    
    db.delete(api_key)
    db.commit()
    
    return {"message": "API key deleted successfully"}

@router.get("/my/status", response_model=dict)
def get_my_api_key_status(
    current_api_key: ApiKeyDB = Depends(verify_api_key)
):
    """Get current API key status and usage info"""
    return {
        "app_name": current_api_key.app_name,
        "api_key": current_api_key.api_key,
        "permissions": current_api_key.permissions,
        "rate_limit": current_api_key.rate_limit,
        "is_active": current_api_key.is_active,
        "last_used": current_api_key.last_used.isoformat() if current_api_key.last_used else None
    }
