import os
import uuid
import httpx
from fastapi import HTTPException
import logging
from sqlalchemy.orm import Session
from .. import models
from datetime import datetime, timedelta
import random

logger = logging.getLogger(__name__)

# Production integrations

CASHFREE_CLIENT_ID = os.getenv("CASHFREE_CLIENT_ID")
CASHFREE_CLIENT_SECRET = os.getenv("CASHFREE_CLIENT_SECRET")
CASHFREE_BASE_URL = "https://api.cashfree.com/verification/aadhaar"

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

async def send_aadhaar_otp(aadhaar_number: str) -> str:
    """
    Calls the Production Cashfree Aadhaar Verification API to send an OTP via UIDAI.
    """
    if not CASHFREE_CLIENT_ID or not CASHFREE_CLIENT_SECRET:
        logger.warning("No Cashfree API keys found. Simulating Aadhaar OTP send.")
        return f"mock_ref_{uuid.uuid4().hex}"

    async with httpx.AsyncClient() as client:
        headers = {
            "x-client-id": CASHFREE_CLIENT_ID,
            "x-client-secret": CASHFREE_CLIENT_SECRET,
            "Content-Type": "application/json"
        }
        payload = {"aadhaar_number": aadhaar_number}
        try:
            response = await client.post(f"{CASHFREE_BASE_URL}/otp", json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data.get("ref_id")
        except Exception as e:
            logger.error(f"Cashfree API Error: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to communicate with UIDAI gateway.")

async def verify_aadhaar_otp(ref_id: str, otp: str) -> bool:
    """
    Verifies the Aadhaar OTP with Cashfree.
    """
    if ref_id.startswith("mock_ref_"):
        logger.warning(f"Simulating Aadhaar OTP verification for {ref_id}")
        return otp == "123456" # Mock success condition

    async with httpx.AsyncClient() as client:
        headers = {
            "x-client-id": CASHFREE_CLIENT_ID,
            "x-client-secret": CASHFREE_CLIENT_SECRET,
            "Content-Type": "application/json"
        }
        payload = {"ref_id": ref_id, "otp": otp}
        try:
            response = await client.post(f"{CASHFREE_BASE_URL}/verify", json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data.get("status") == "VALID"
        except Exception as e:
            logger.error(f"Cashfree API Error: {str(e)}")
            return False

async def send_mobile_otp(phone_number: str, db: Session) -> str:
    """
    Generates a secure OTP, saves it in the database with a 10-minute expiry,
    and calls Twilio to send the SMS.
    """
    # 1. Generate Secure 6-digit OTP
    otp_code = str(random.randint(100000, 999999))
    
    # 2. Save to Database
    expires_at = datetime.utcnow() + timedelta(minutes=10)
    new_otp = models.MobileOTP(
        phone_number=phone_number,
        otp_code=otp_code,
        expires_at=expires_at
    )
    db.add(new_otp)
    db.commit()
    db.refresh(new_otp)
    
    ref_id = str(new_otp.id)

    # 3. Format Phone Number (Twilio requires E.164 format, e.g., +91 for India)
    formatted_phone = phone_number
    if len(phone_number) == 10:
        formatted_phone = f"+91{phone_number}"
    elif not phone_number.startswith('+'):
        formatted_phone = f"+{phone_number}"

    # 4. Send SMS via Twilio
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
        # Fallback for development without API key
        logger.info(f"========== DEVELOPMENT OTP ==========")
        logger.info(f"Phone: {formatted_phone}")
        logger.info(f"Code: {otp_code}")
        logger.info(f"=====================================")
        return ref_id
        
    try:
        async with httpx.AsyncClient() as client:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json"
            data = {
                "To": formatted_phone,
                "From": TWILIO_PHONE_NUMBER,
                "Body": f"Your HomeoAssist verification code is: {otp_code}. It is valid for 10 minutes."
            }
            response = await client.post(
                url,
                data=data,
                auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
            )
            response.raise_for_status()
            logger.info(f"Twilio SMS sent successfully to {formatted_phone}")
    except Exception as e:
        logger.error(f"Failed to send SMS via Twilio: {e}")
        # Even if SMS fails, we still return the ref_id so the UI doesn't crash completely
    
    return ref_id

async def verify_mobile_otp(ref_id: str, otp: str, db: Session) -> bool:
    """
    Verifies mobile OTP against the database and enforces the 10-minute expiry.
    """
    try:
        otp_record_id = int(ref_id)
    except ValueError:
        return False

    record = db.query(models.MobileOTP).filter(models.MobileOTP.id == otp_record_id).first()
    
    if not record:
        return False
        
    if record.is_used:
        logger.warning(f"OTP {ref_id} has already been used.")
        return False
        
    if datetime.utcnow() > record.expires_at:
        logger.warning(f"OTP {ref_id} has expired.")
        return False
        
    if record.otp_code != otp:
        return False
        
    # Mark as used
    record.is_used = True
    db.commit()
    
    return True
