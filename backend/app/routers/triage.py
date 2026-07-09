from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import time

router = APIRouter(
    prefix="/triage",
    tags=["triage"]
)

class ChatMessage(BaseModel):
    role: str
    content: str

class TriageRequest(BaseModel):
    messages: List[ChatMessage]
    language: str = "en"

@router.post("/chat")
async def chat_with_triage(request: TriageRequest):
    # Simulate LLM delay
    time.sleep(1)
    
    # Mock LLM Response Logic
    last_msg = request.messages[-1].content.lower()
    
    if "headache" in last_msg:
        return {
            "response": "I understand you have a headache. Does the headache feel better with cold application or warm application?",
            "is_complete": False
        }
    elif "cold" in last_msg or "warm" in last_msg:
        return {
            "response": "Thank you for the details. Based on your symptoms, I am routing you to Dr. Sharma, our senior homeopathic specialist.",
            "is_complete": True,
            "assigned_doctor_id": 1,
            "primary_complaint": "Neurology"
        }
    else:
        return {
            "response": "Could you provide more specific details about how you are feeling? What makes it better or worse?",
            "is_complete": False
        }

@router.post("/route")
async def passive_routing():
    return {"message": "AI triage routing", "assigned_doctor_id": 1}
