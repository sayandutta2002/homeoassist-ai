from fastapi import APIRouter

router = APIRouter(
    prefix="/ecommerce",
    tags=["ecommerce"]
)

@router.post("/checkout")
async def checkout_link():
    return {"message": "Automated checkout link generated"}

@router.get("/orders")
async def get_orders():
    return {"orders": []}

@router.post("/cart")
async def add_to_cart():
    return {"message": "Added to cart"}
