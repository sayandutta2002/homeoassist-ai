from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any
from .. import models, database
from ..services.llm_agent import ConversationalAgent
from ..services.ecommerce import EcommerceService
from ..services.notifications import NotificationService

router = APIRouter(prefix="/consultations", tags=["Consultations"])

llm_agent = ConversationalAgent()
ecommerce_service = EcommerceService()
notification_service = NotificationService()

@router.post("/intake")
def process_patient_intake(chat_history: list):
    """
    Day 13: Consultation Handoff. 
    Summarizes the AI intake chat into a structured Intake Profile.
    """
    profile = llm_agent.summarize_intake(chat_history)
    return {"status": "success", "intake_profile": profile}

@router.post("/{consultation_id}/prescribe")
def authorize_prescription(consultation_id: int, prescription: Dict[str, Any], db: Session = Depends(database.get_db)):
    """
    Day 14: Doctor-in-the-Loop Workflow.
    Zero Auto-Prescription Policy: Doctors must manually hit this endpoint to authorize.
    """
    # 1. Update the consultation record (mocked)
    print(f"Doctor explicitly authorized prescription for Consultation {consultation_id}: {prescription}")
    
    # 2. Day 15: Generate E-commerce Payload & Link
    checkout_url = ecommerce_service.generate_checkout_link(prescription)
    
    # 3. Day 16: Automated Notification via SMS/WhatsApp
    # In reality, fetch patient's phone number from DB using consultation_id
    patient_phone = "+1234567890" 
    notification_service.send_prescription_link(patient_phone, checkout_url)
    
    return {
        "status": "Prescription authorized",
        "checkout_url": checkout_url,
        "notification_sent": True
    }
