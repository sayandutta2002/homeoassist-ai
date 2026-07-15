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

from app.services.llm_agent import ConversationalAgent

agent = ConversationalAgent()

@router.post("/chat")
async def chat_with_triage(request: TriageRequest):
    # Convert request messages to dict format expected by agent
    messages_dict = [{"role": m.role, "content": m.content} for m in request.messages]
    
    # Call the Gemini LLM agent
    try:
        triage_response = agent.chat_with_patient(messages_dict)
        return triage_response.dict()
    except Exception as e:
        return {
            "response": f"I apologize, but I am experiencing technical difficulties. Error: {str(e)}",
            "is_complete": False
        }

@router.post("/route")
async def passive_routing():
    return {"message": "AI triage routing", "assigned_doctor_id": 1}
