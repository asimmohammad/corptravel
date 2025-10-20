
from typing import List, Literal, Optional, Dict, Any
from pydantic import BaseModel, EmailStr

Role = Literal["OrgAdmin","TravelManager","Arranger","Traveler"]
Mode = Literal["flights","hotels","cars"]

class AuthTokenResponse(BaseModel):
    access_token: str
    role: Role
    org_external_id: str
