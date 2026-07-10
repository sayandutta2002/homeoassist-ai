from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, search, consultation, triage, ecommerce, dashboard, admin, admin_verification
from app.telemetry import TelemetryMiddleware
from app import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HomeoAssist AI API",
    description="Multi-tenant multilingual CDSS and e-commerce for homeopathy.",
    version="1.0.0",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom telemetry
app.add_middleware(TelemetryMiddleware)

app.include_router(auth.router)
app.include_router(admin_verification.router)
app.include_router(search.router)
app.include_router(consultation.router)
app.include_router(triage.router)
app.include_router(ecommerce.router)
app.include_router(dashboard.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {"message": "Welcome to HomeoAssist AI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
