from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(prefix="/admin", tags=["Admin Verification"])

@router.get("/pending-practitioners")
def get_pending(db: Session = Depends(database.get_db)):
    pending_users = db.query(models.User).filter(
        models.User.role == models.RoleEnum.DOCTOR,
        models.User.verification_status == models.VerificationStatus.PENDING
    ).all()
    return pending_users

@router.post("/approve-practitioner/{user_id}")
def approve_practitioner(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.verification_status = models.VerificationStatus.APPROVED
    db.commit()
    db.refresh(user)
    return {"message": f"Dr. {user.full_name} has been approved and activated."}

@router.post("/reject-practitioner/{user_id}")
def reject_practitioner(user_id: int, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.verification_status = models.VerificationStatus.REJECTED
    db.commit()
    db.refresh(user)
    return {"message": f"Dr. {user.full_name} has been rejected."}
