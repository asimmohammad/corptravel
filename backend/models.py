from pydantic import BaseModel
from typing import List, Literal, Optional, Dict, Any
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

Mode = Literal["flights", "hotels", "cars"]

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    role: Literal["OrgAdmin", "Traveler", "Arranger", "TravelManager"]

class PolicyRule(BaseModel):
    key: str
    op: Literal["<=", "<", ">=", ">", "==", "in"]
    value: str

class Policy(BaseModel):
    id: int
    name: str
    status: Literal["draft", "published"]
    rules: List[PolicyRule]

class PolicyCreate(BaseModel):
    name: str
    rules: List[PolicyRule]

class Offer(BaseModel):
    id: str
    mode: Mode
    name: str
    description: Optional[str] = None
    price: float
    currency: str = "USD"
    policyStatus: Literal["in", "out"] = "in"
    details: Optional[Dict[str, Any]] = None

class SearchParams(BaseModel):
    mode: Mode
    origin: Optional[str] = None
    destination: Optional[str] = None
    departDate: Optional[str] = None
    returnDate: Optional[str] = None
    city: Optional[str] = None

class BookingItem(BaseModel):
    id: str
    mode: Mode
    price: float
    currency: str = "USD"

class BookingRequest(BaseModel):
    items: List[BookingItem]

class BookingResponse(BaseModel):
    id: str

class Trip(BaseModel):
    id: str
    traveler: str
    segments: List[str]
    startDate: str
    endDate: str
    status: Literal["upcoming", "completed", "canceled"]


# SQLAlchemy Database Models
class UserDB(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False)
    email = Column(String(254), nullable=False)
    display_name = Column(String(200))
    status = Column(String(40))
    auth_provider = Column(String(40))
    password_hash = Column(String(255))
    meta_json = Column(JSON)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationships
    bookings = relationship("BookingDB", back_populates="user")
    # trips = relationship("TripDB", back_populates="user")  # Removed due to schema mismatch


class PolicyDB(Base):
    __tablename__ = "policies"
    
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False)
    name = Column(String(200), nullable=False)
    status = Column(String(40), nullable=False, default="draft")
    created_by = Column(Integer, nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationships
    bookings = relationship("BookingDB", back_populates="policy")


class BookingDB(Base):
    __tablename__ = "bookings"
    
    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=True)
    items = Column(JSON, nullable=False)  # Store booking items as JSON
    total_amount = Column(Float, nullable=False)
    currency = Column(String(3), default="USD")
    status = Column(String(50), default="confirmed")
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationships
    user = relationship("UserDB", back_populates="bookings")
    policy = relationship("PolicyDB", back_populates="bookings")
    # trips = relationship("TripDB", back_populates="booking")  # Removed due to schema mismatch


class TripDB(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, nullable=False)
    traveler_id = Column(Integer, nullable=False)
    booking_id = Column(Integer, nullable=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(40), default="upcoming")
    trip_title = Column(String(200))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationships - removed for now due to schema mismatch
    # user = relationship("UserDB", back_populates="trips")
    # booking = relationship("BookingDB", back_populates="trips")


class ApiKeyDB(Base):
    __tablename__ = "api_keys"
    
    id = Column(Integer, primary_key=True, index=True)
    app_name = Column(String(255), nullable=False)
    api_key = Column(String(255), unique=True, index=True, nullable=False)
    api_secret = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    permissions = Column(JSON, nullable=True)  # Store permissions as JSON
    rate_limit = Column(Integer, default=1000)  # Requests per hour
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_used = Column(DateTime)
    
    # Relationships
    user_id = Column(Integer, nullable=True)  # Remove foreign key for now
    # user = relationship("UserDB", foreign_keys=[user_id])


class ApiKeyUsageDB(Base):
    __tablename__ = "api_key_usage"
    
    id = Column(Integer, primary_key=True, index=True)
    api_key_id = Column(Integer, ForeignKey("api_keys.id"), nullable=False)
    endpoint = Column(String(255), nullable=False)
    method = Column(String(10), nullable=False)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    response_code = Column(Integer, nullable=True)
    created_at = Column(DateTime)
    
    # Relationships
    api_key = relationship("ApiKeyDB", foreign_keys=[api_key_id])
