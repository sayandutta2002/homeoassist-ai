from fastapi import APIRouter

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)

@router.get("/stats")
async def get_dashboard_stats():
    return {
        "stats": {
            "total_patients": 142,
            "today_appointments": 12,
            "ai_routed": 8,
            "walk_ins": 4
        },
        "queue": [
            {
                "id": 1,
                "patient_name": "Rahul Verma",
                "time": "10:30 AM",
                "type": "AI Routed",
                "status": "Waiting",
                "complaint": "Severe Headache"
            },
            {
                "id": 2,
                "patient_name": "Priya Singh",
                "time": "11:00 AM",
                "type": "Walk-in",
                "status": "Scheduled",
                "complaint": "Skin Rash"
            }
        ]
    }
