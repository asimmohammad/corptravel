import logging
from fastapi import FastAPI, Depends
from sqlalchemy import text
from db import get_db, engine, Base
from models import Policy  # etc.

# Import routers
from routers import auth, policies, booking, trips, travelers, search, arranger, notifications, reports, api_keys

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="LaaSyCorpTravel-MVP APIs")

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/healthz")
def health_check(db=Depends(get_db)):
    # simple test query to verify RDS connection
    db.execute(text("SELECT 1"))
    return {"status": "ok"}

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(api_keys.router, prefix="/api-keys", tags=["api-keys"])
app.include_router(policies.router, prefix="/policies", tags=["policies"])
app.include_router(booking.router, prefix="/bookings", tags=["bookings"])
app.include_router(trips.router, prefix="/trips", tags=["trips"])
app.include_router(travelers.router, prefix="/travelers", tags=["travelers"])
app.include_router(search.router, prefix="/search", tags=["search"])
app.include_router(arranger.router, prefix="/arranger", tags=["arranger"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
