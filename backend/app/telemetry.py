import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging

logger = logging.getLogger("telemetry")
logger.setLevel(logging.INFO)

class TelemetryMiddleware(BaseHTTPMiddleware):
    """
    Tracks precise duration of API operations, DB calls, and LLM latency.
    """
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        
        response = await call_next(request)
        
        process_time = time.perf_counter() - start_time
        logger.info(f"Path: {request.url.path} | Method: {request.method} | Status: {response.status_code} | Latency: {process_time:.4f}s")
        
        # Append latency to response headers for debugging
        response.headers["X-Process-Time"] = str(process_time)
        return response
