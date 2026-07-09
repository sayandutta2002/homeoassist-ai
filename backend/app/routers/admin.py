from fastapi import APIRouter

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

@router.get("/telemetry")
async def get_telemetry():
    return {"latency": "15ms"}
