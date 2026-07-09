from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum, Float, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class RoleEnum(str, enum.Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    PATIENT = "patient"

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    name = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    users = relationship("User", back_populates="tenant", cascade="all, delete-orphan")
    patients = relationship("Patient", back_populates="tenant", cascade="all, delete-orphan")
    consultations = relationship("Consultation", back_populates="tenant", cascade="all, delete-orphan")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.DOCTOR, nullable=False)
    full_name = Column(String)
    
    tenant = relationship("Tenant", back_populates="users")

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tenant = relationship("Tenant", back_populates="patients")
    consultations = relationship("Consultation", back_populates="patient", cascade="all, delete-orphan")

class Consultation(Base):
    __tablename__ = "consultations"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    intake_summary = Column(Text)
    prescribed_remedy = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    tenant = relationship("Tenant", back_populates="consultations")
    patient = relationship("Patient", back_populates="consultations")

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    datetime = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")

class AIPrescriptionOverride(Base):
    __tablename__ = "ai_prescription_overrides"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    app_id = Column(String, index=True, default="homeoassist")
    consultation_id = Column(Integer, ForeignKey("consultations.id"), nullable=False)
    ai_remedy = Column(String, nullable=False)
    doctor_remedy = Column(String, nullable=False)
    reason = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class MateriaMedicaEntry(Base):
    __tablename__ = "materia_medica_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    app_id = Column(String, index=True, default="homeoassist")
    remedy_name = Column(String, nullable=False, index=True)
    content = Column(Text, nullable=False)
