from fastapi import APIRouter

router = APIRouter()

@router.post("/test")
def test():
    # In reality, call SES/SendGrid/Twilio/FCM here
    return {"sent": True}
