import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TriageChat from './pages/patient/TriageChat';
import Checkout from './pages/patient/Checkout';
import Login from './pages/auth/Login';
import Onboarding from './pages/auth/Onboarding';
import Dashboard from './pages/doctor/Dashboard';
import ClinicalInterface from './pages/doctor/ClinicalInterface';
import Ledger from './pages/doctor/Ledger';
import Telemetry from './pages/admin/Telemetry';
import PractitionerVerification from './pages/admin/PractitionerVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/triage" element={<TriageChat />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/clinical-interface" element={<ClinicalInterface />} />
        <Route path="/doctor/ledger" element={<Ledger />} />
        <Route path="/admin/telemetry" element={<Telemetry />} />
        <Route path="/admin/verification" element={<PractitionerVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
