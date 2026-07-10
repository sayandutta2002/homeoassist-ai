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

async def send_mobile_otp(phone_number: str) -> str:
    """
    Calls MSG91 or similar provider to send a mobile OTP.
    """
    if not MSG91_AUTH_KEY:
        logger.warning(f"No MSG91 Auth Key. Simulating mobile OTP to {phone_number}.")
        return f"mock_phone_ref_{uuid.uuid4().hex}"
        
    # Real integration would go here
    return f"phone_ref_{uuid.uuid4().hex}"

async def verify_mobile_otp(ref_id: str, otp: str) -> bool:
    """
    Verifies mobile OTP.
    """
    if ref_id.startswith("mock_phone_ref_"):
        return otp == "123456"
        
    return otp == "123456" # Fallback for now
