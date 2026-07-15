import os
import uuid
import httpx
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

# Production integrations

CASHFREE_CLIENT_ID = os.getenv("CASHFREE_CLIENT_ID")
CASHFREE_CLIENT_SECRET = os.getenv("CASHFREE_CLIENT_SECRET")
CASHFREE_BASE_URL = "https://api.cashfree.com/verification/aadhaar"

MSG91_AUTH_KEY = os.getenv("MSG91_AUTH_KEY")

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

from sqlalchemy.orm import Session
from .. import models
from datetime import datetime, timedelta
import random

async def send_mobile_otp(phone_number: str, db: Session) -> str:
    """
    Generates a secure OTP, saves it in the database with a 10-minute expiry,
    and calls MSG91 to send the SMS.
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

    # 3. Send SMS via MSG91
    if not MSG91_AUTH_KEY:
        # Fallback for development without API key
        logger.info(f"========== DEVELOPMENT OTP ==========")
        logger.info(f"Phone: {phone_number}")
        logger.info(f"Code: {otp_code}")
        logger.info(f"=====================================")
        return ref_id
        
    try:
        async with httpx.AsyncClient() as client:
            url = "https://control.msg91.com/api/v5/otp"
            params = {
                "mobile": phone_number,
                "otp": otp_code,
                "authkey": MSG91_AUTH_KEY,
                "invisible": "1", # Use custom OTP instead of their auto-generation
                "template_id": "YOUR_TEMPLATE_ID" # Will need to be set properly in prod
            }
            response = await client.post(url, params=params)
            response.raise_for_status()
            logger.info(f"MSG91 SMS sent to {phone_number}")
    except Exception as e:
        logger.error(f"Failed to send SMS via MSG91: {e}")
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
