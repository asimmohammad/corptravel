from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from db import get_db
from models import ApiKeyDB, ApiKeyUsageDB
from datetime import datetime, timedelta
import hashlib
import secrets
from typing import Optional

security = HTTPBearer()

class ApiKeyAuth:
    def __init__(self):
        self.required_permissions = []
    
    def __call__(self, permissions: list = None):
        if permissions:
            self.required_permissions = permissions
        return self

# Create a dependency for API key authentication
def verify_api_key(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    request: Request = None,
    db: Session = Depends(get_db)
) -> ApiKeyDB:
    """
    Verify API key and secret from Authorization header
    Format: Bearer <api_key>:<api_secret>
    """
    if not credentials:
        raise HTTPException(status_code=401, detail="Missing API credentials")
    
    try:
        # Parse API key and secret from Bearer token
        api_key, api_secret = credentials.credentials.split(":", 1)
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid API credentials format")
    
    # Find API key in database
    api_key_record = db.query(ApiKeyDB).filter(
        ApiKeyDB.api_key == api_key,
        ApiKeyDB.is_active == True
    ).first()
    
    if not api_key_record:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    # Verify API secret
    if api_key_record.api_secret != api_secret:
        raise HTTPException(status_code=401, detail="Invalid API secret")
    
    # Check rate limiting
    if not check_rate_limit(api_key_record, db):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    # Log API usage
    log_api_usage(api_key_record, request, db)
    
    # Update last used timestamp
    api_key_record.last_used = datetime.utcnow()
    db.commit()
    
    return api_key_record

def check_rate_limit(api_key_record: ApiKeyDB, db: Session) -> bool:
    """Check if API key is within rate limits"""
    one_hour_ago = datetime.utcnow() - timedelta(hours=1)
    
    usage_count = db.query(ApiKeyUsageDB).filter(
        ApiKeyUsageDB.api_key_id == api_key_record.id,
        ApiKeyUsageDB.created_at >= one_hour_ago
    ).count()
    
    return usage_count < api_key_record.rate_limit

def log_api_usage(api_key_record: ApiKeyDB, request: Request, db: Session):
    """Log API usage for monitoring and rate limiting"""
    if request:
        usage = ApiKeyUsageDB(
            api_key_id=api_key_record.id,
            endpoint=request.url.path,
            method=request.method,
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
            created_at=datetime.utcnow()
        )
        db.add(usage)
        db.commit()

def require_permissions(permissions: list):
    """Decorator to require specific permissions"""
    def permission_checker(api_key_record: ApiKeyDB = Depends(verify_api_key)):
        if api_key_record.permissions:
            user_permissions = api_key_record.permissions
            if not all(perm in user_permissions for perm in permissions):
                raise HTTPException(
                    status_code=403, 
                    detail=f"Missing required permissions: {permissions}"
                )
        return api_key_record
    return permission_checker

# Create authentication dependency
api_auth = ApiKeyAuth()

# Common permission sets
ADMIN_PERMISSIONS = ["admin", "users", "policies", "bookings", "trips", "reports"]
USER_PERMISSIONS = ["bookings", "trips"]
READONLY_PERMISSIONS = ["policies", "trips"]
