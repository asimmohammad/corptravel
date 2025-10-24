from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, policies, search, booking, trips, travelers, arranger, reports, notifications

app = FastAPI(title="LaaSy Corporate Travel API", version="0.1.0")

origins = ["http://localhost:5173", "*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
def healthz():
    return {"ok": True}

# Routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(policies.router, prefix="/policies", tags=["policies"])
app.include_router(search.router, prefix="/search", tags=["search"])
app.include_router(booking.router, prefix="/booking", tags=["booking"])
app.include_router(trips.router, prefix="/trips", tags=["trips"])
app.include_router(travelers.router, prefix="/travelers", tags=["travelers"])
app.include_router(arranger.router, prefix="/arranger", tags=["arranger"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
