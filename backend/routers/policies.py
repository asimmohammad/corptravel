from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import PolicyDB, Policy, PolicyCreate, PolicyRule
from auth import verify_api_key, require_permissions
from datetime import datetime
from typing import List

router = APIRouter()

@router.get("", response_model=List[Policy])
def list_policies(
    db: Session = Depends(get_db),
    current_api_key = Depends(verify_api_key)
):
    policies = db.query(PolicyDB).all()
    return policies

@router.post("", response_model=Policy)
def create_policy(
    body: PolicyCreate, 
    db: Session = Depends(get_db),
    current_api_key = Depends(require_permissions(["policies"]))
):
    # Create policy without rules for now (existing schema doesn't have rules column)
    db_policy = PolicyDB(
        org_id=1,  # Default org for now
        name=body.name,
        status="draft",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(db_policy)
    db.commit()
    db.refresh(db_policy)
    
    return db_policy

@router.post("/{policy_id}/publish", response_model=Policy)
def publish_policy(
    policy_id: int, 
    db: Session = Depends(get_db),
    current_api_key = Depends(require_permissions(["policies"]))
):
    policy = db.query(PolicyDB).filter(PolicyDB.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    policy.status = "published"
    policy.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(policy)
    
    return policy
