from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class RoleEnum(str, Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    PATIENT = "patient"

class UserCreate(BaseModel):
    password: str
    full_name: str
    tenant_name: str # The clinic/practice name
    role: RoleEnum = RoleEnum.DOCTOR
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    aadhaar_number: Optional[str] = None

class OtpRequest(BaseModel):
    phone_number: Optional[str] = None
    aadhaar_number: Optional[str] = None

class OtpVerify(BaseModel):
    ref_id: str
    otp: str

class UserResponse(BaseModel):
    id: int
    email: Optional[EmailStr] = None
    full_name: str
    role: RoleEnum
    tenant_id: int
    verification_status: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    tenant_id: Optional[int] = None

class AppointmentSchema(BaseModel):
    id: int
    tenant_id: int
    app_id: str
    patient_id: int
    doctor_id: int
    datetime: datetime
    status: str
    
class OrderSchema(BaseModel):
    id: int
    tenant_id: int
    app_id: str
    patient_id: int
    amount: float
    status: str
    
class AIPrescriptionOverrideSchema(BaseModel):
    id: int
    tenant_id: int
    app_id: str
    consultation_id: int
    ai_remedy: str
    doctor_remedy: str
    reason: Optional[str] = None
    
class MateriaMedicaEntrySchema(BaseModel):
    id: int
    tenant_id: Optional[int] = None
    app_id: str
    remedy_name: str
    content: str
