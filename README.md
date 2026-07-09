# HomeoAssist AI 🏥🤖

HomeoAssist AI is a multilingual, multi-tenant Clinical Decision Support System (CDSS) and integrated e-commerce ecosystem designed specifically for homeopathic medicine. It acts as an intelligent triage agent for patients and an analytical copilot for verified doctors.

## 🚀 Features

*   **Multilingual AI Triage Chat:** An interactive symptom checker for patients, supporting English, Hindi, and Bengali.
*   **Clinical Intelligence Interface (RAG):** A Materia Medica Copilot that suggests homeopathic remedies to doctors based on patient symptoms, including confidence scores and literature citations.
*   **Unified Clinical Dashboard:** A single pane of glass for doctors to manage AI-routed patients and physical walk-ins.
*   **AI Prescription Override Ledger:** Tracks whenever a doctor deviates from the AI's recommendation to measure system accuracy and clinical drift.
*   **E-Commerce Pharmacy Integration:** A seamless checkout flow for patients to order their prescribed remedies.
*   **System Admin Telemetry:** Live dashboards tracking LLM summary latencies and Vector Database retrieval times.
*   **Secure Doctor Onboarding:** Multi-step registration flow with strict Medical Council ID validation.

## 🏗️ Architecture

The platform uses a decoupled, multi-tenant architecture:

*   **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), React 18, Tailwind CSS, Zustand (State Management), Lucide React (Icons).
*   **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python), SQLAlchemy (ORM), SQLite (Development Database).

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python (3.9+)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/sayandutta2002/homeoassist-ai.git
cd homeoassist-ai
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
The frontend will be running at `http://localhost:3000`.

### 3. Backend Setup (FastAPI)
Open a new terminal window:
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend API will be running at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

## 📁 Repository Structure
```
homeoassist-ai/
├── backend/                  # FastAPI Application
│   ├── app/                  # Core API logic, models, schemas
│   ├── routers/              # API Endpoints (Triage, Dashboard, etc.)
│   └── scripts/              # Data ingestion scripts
└── frontend/                 # Next.js Application
    ├── src/app/              # App Router pages and layouts
    ├── src/store/            # Zustand global state
    └── public/               # Static assets
```
