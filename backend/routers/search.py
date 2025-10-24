from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import Offer

router = APIRouter()

def mk_offers(mode: str) -> List[Offer]:
    base = []
    for i in range(10):
        name = ("Flight" if mode == "flights" else "Hotel" if mode == "hotels" else "Car") + f" {i+1}"
        base.append(Offer(
            id=f"{mode}-{i}",
            mode=mode,  # type: ignore
            name=name,
            description="NONSTOP • 2h 10m" if mode == "flights" else None,
            price=round(120 + i * 12.5, 2),
            currency="USD",
            policyStatus="in" if i % 4 != 0 else "out",
        ))
    return base

@router.get("/flights", response_model=List[Offer])
def flights(origin: Optional[str] = None, destination: Optional[str] = None, departDate: Optional[str] = None):
    return mk_offers("flights")

@router.get("/hotels", response_model=List[Offer])
def hotels(city: Optional[str] = None, checkIn: Optional[str] = None, checkOut: Optional[str] = None):
    return mk_offers("hotels")

@router.get("/cars", response_model=List[Offer])
def cars(city: Optional[str] = None, pickup: Optional[str] = None, dropoff: Optional[str] = None):
    return mk_offers("cars")
