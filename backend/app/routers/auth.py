from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import models, schemas, auth, database
from ..services.auth_integrations import send_aadhaar_otp, verify_aadhaar_otp, send_mobile_otp, verify_mobile_otp

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    if user.email:
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
            
    if user.phone_number:
        db_phone = db.query(models.User).filter(models.User.phone_number == user.phone_number).first()
        if db_phone:
            raise HTTPException(status_code=400, detail="Phone number already registered")
        
    tenant = db.query(models.Tenant).filter(models.Tenant.name == user.tenant_name).first()
    if not tenant:
        tenant = models.Tenant(name=user.tenant_name)
        db.add(tenant)
        db.commit()
        db.refresh(tenant)
        
    hashed_pwd = auth.get_password_hash(user.password)
    
    # If Doctor, default to PENDING status for Admin Approval
    v_status = models.VerificationStatus.PENDING if user.role == models.RoleEnum.DOCTOR else models.VerificationStatus.APPROVED
    
    new_user = models.User(
        email=user.email,
        phone_number=user.phone_number,
        aadhaar_number=user.aadhaar_number,
        hashed_password=hashed_pwd,
        full_name=user.full_name,
        role=user.role,
        tenant_id=tenant.id,
        verification_status=v_status
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    # Can login with email or phone number
    user = db.query(models.User).filter(
        (models.User.email == form_data.username) | (models.User.phone_number == form_data.username)
    ).first()
    
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # Check Verification Status for Doctors
    if user.role == models.RoleEnum.DOCTOR and user.verification_status == models.VerificationStatus.PENDING:
        raise HTTPException(status_code=403, detail="Your account is pending Admin verification. Please wait for approval.")
    elif user.role == models.RoleEnum.DOCTOR and user.verification_status == models.VerificationStatus.REJECTED:
        raise HTTPException(status_code=403, detail="Your verification was rejected by Admin.")
        
    access_token = auth.create_access_token(
        data={"sub": str(user.id), "tenant_id": user.tenant_id, "role": user.role}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/send-aadhaar-otp")
async def send_aadhaar(request: schemas.OtpRequest):
    if not request.aadhaar_number:
        raise HTTPException(status_code=400, detail="Aadhaar number required")
    ref_id = await send_aadhaar_otp(request.aadhaar_number)
    return {"ref_id": ref_id, "message": "OTP sent to Aadhaar linked mobile number"}

@router.post("/verify-aadhaar-otp")
async def verify_aadhaar(request: schemas.OtpVerify):
    is_valid = await verify_aadhaar_otp(request.ref_id, request.otp)
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"verified": True, "message": "Aadhaar verified successfully"}

@router.post("/send-mobile-otp")
async def send_mobile(request: schemas.OtpRequest, db: Session = Depends(database.get_db)):
    if not request.phone_number:
        raise HTTPException(status_code=400, detail="Phone number required")
    ref_id = await send_mobile_otp(request.phone_number, db)
    return {"ref_id": ref_id, "message": "OTP sent to mobile number"}

@router.post("/verify-mobile-otp")
async def verify_mobile(request: schemas.OtpVerify, db: Session = Depends(database.get_db)):
    is_valid = await verify_mobile_otp(request.ref_id, request.otp, db)
    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    return {"verified": True, "message": "Mobile verified successfully"}
