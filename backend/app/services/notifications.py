import logging
import os

logger = logging.getLogger(__name__)

class NotificationService:
    """Handles automated SMS and WhatsApp triggers."""
    
    def __init__(self):
        self.provider = os.getenv("SMS_PROVIDER", "twilio")

    def send_prescription_link(self, phone: str, checkout_url: str):
        """Sends the finalized prescription and e-commerce checkout link to the patient."""
        logger.info(f"[{self.provider}] Sending WhatsApp/SMS to {phone}:")
        logger.info(f"Your prescription is ready. Purchase here: {checkout_url}")
        return True
