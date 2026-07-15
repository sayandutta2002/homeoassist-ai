import os
import logging
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

class TriageResponse(BaseModel):
    response: str = Field(description="The response to the patient. If is_complete is True, this should be a polite wrap-up message.")
    is_complete: bool = Field(description="True if enough information has been gathered and triage is complete, False otherwise.")
    assigned_doctor_id: int | None = Field(description="ID of the doctor to assign (1 for default), only if is_complete is True.")
    primary_complaint: str | None = Field(description="The summarized primary complaint, only if is_complete is True.")

class ConversationalAgent:
    """
    Handles LLM-driven Intelligent Probing using Gemini.
    """
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            logger.warning("GEMINI_API_KEY environment variable not set. LLM calls will fail.")
            self.client = None
        else:
            self.client = genai.Client(api_key=self.api_key)

    def chat_with_patient(self, messages: List[Dict[str, str]]) -> TriageResponse:
        if not self.client:
            self.api_key = os.environ.get("GEMINI_API_KEY")
            if self.api_key:
                self.client = genai.Client(api_key=self.api_key)
            else:
                raise ValueError("GEMINI_API_KEY is missing. Please set it in your environment.")
        
        system_instruction = (
            "You are HomeoAssist AI, an expert homeopathic triage assistant. "
            "Your job is to ask the patient clarifying questions about their symptoms (modalities, time of day, triggers) "
            "to gather a complete picture for the doctor. "
            "Keep your questions empathetic, concise, and focused on gathering medical history. "
            "Do NOT ask too many questions at once; ask one clarifying question at a time. "
            "Once you feel you have gathered enough information (typically 3-5 exchanges), "
            "set is_complete to True, assign doctor_id to 1, and summarize the primary_complaint."
        )
        
        contents = []
        for msg in messages:
            role = "user" if msg["role"] == "user" else "model"
            contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])]))
            
        response = self.client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=TriageResponse,
                temperature=0.2,
            )
        )
        return response.parsed
