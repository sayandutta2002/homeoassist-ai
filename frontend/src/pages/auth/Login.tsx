import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Activity, Smartphone, Mail, Lock, LogIn, UserPlus, ShieldCheck, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>(
    searchParams.get('tab') === 'doctor' ? 'doctor' : 'patient'
  );

  // Patient State
  const [patientStep, setPatientStep] = useState<'phone' | 'otp' | 'register'>('phone');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Doctor State
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await fetch('/auth/send-mobile-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      });
      if (res.ok) {
        setPatientStep('otp');
      } else {
        alert('Failed to send OTP');
      }
    } catch (e) {
      console.error(e);
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('/auth/verify-mobile-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp })
      });
      if (res.ok) {
        // Attempt login
        const loginRes = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: mobile, password: '' })
        });
        if (loginRes.ok) {
          localStorage.setItem('role', 'patient');
          navigate('/triage'); // Redirect patient to triage for now
        } else {
          // If login fails, user might not be registered
          setPatientStep('register');
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (e) {
      console.error(e);
      alert('Error verifying OTP');
    }
  };

  const handlePatientRegister = async () => {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          mobile,
          email, // optional
          role: 'patient'
        })
      });
      if (res.ok) {
        // Attempt login again
        const loginRes = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: mobile, password: '' })
        });
        if (loginRes.ok) {
          localStorage.setItem('role', 'patient');
          navigate('/triage');
        } else {
          alert('Login failed after registration');
        }
      } else {
        alert('Registration failed');
      }
    } catch (e) {
      console.error(e);
      alert('Error during registration');
    }
  };

  const handleDoctorLogin = async () => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: doctorEmail, password: doctorPassword })
      });
      if (res.ok) {
        localStorage.setItem('role', 'doctor');
        navigate('/doctor/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (e) {
      console.error(e);
      alert('Error during login');
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-lg antialiased">
      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-md md:p-margin relative overflow-hidden">
        {/* Subtle Ambient Background Element */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30 z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-surface-container-high blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-container blur-[150px] opacity-10"></div>
        </div>
        <div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant/30 rounded-[12px] shadow-[0px_12px_32px_rgba(15,23,42,0.1)] z-10 overflow-hidden shadow-sm">
          {/* Header Area */}
          <div className="p-lg pb-md border-b border-outline-variant/30 bg-surface/50 text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-sm border border-primary/20 shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
              <Activity className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-headline-md font-headline-md text-on-surface">Welcome to HomeoAssist</h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Unified Authentication Gateway</p>
          </div>
          <div className="p-lg">
            {/* Role Toggle (Segmented Control) */}
            <div className="flex p-1 bg-surface-container-low rounded-lg border border-outline-variant/30 mb-lg" role="tablist">
              <button 
                aria-selected={activeTab === 'patient'} 
                className={`flex-1 py-sm text-center rounded transition-all text-label-md font-label-md ${
                  activeTab === 'patient' 
                    ? 'bg-surface-container-lowest text-primary border border-outline-variant/20 shadow-sm font-bold bg-primary/10' 
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
                onClick={() => {
                  setActiveTab('patient');
                  setPatientStep('phone');
                }}
              >
                Patient Portal
              </button>
              <button 
                aria-selected={activeTab === 'doctor'} 
                className={`flex-1 py-sm text-center rounded transition-all text-label-md font-label-md ${
                  activeTab === 'doctor' 
                    ? 'bg-surface-container-lowest text-primary border border-outline-variant/20 shadow-sm font-bold bg-primary/10' 
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
                onClick={() => setActiveTab('doctor')}
              >
                Doctor Portal
              </button>
            </div>
            
            {/* Patient View */}
            {activeTab === 'patient' && (
              <div className="block animate-[fadeIn_0.3s_ease-in-out]">
                {patientStep === 'phone' && (
                  <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="mobile">Mobile Number</label>
                      <div className="relative">
                        <Smartphone className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input 
                          className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                          id="mobile" 
                          placeholder="+1 (555) 000-0000" 
                          type="tel" 
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary py-sm rounded-lg text-label-md font-label-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] transition-all" type="submit">
                      Send OTP
                    </button>
                  </form>
                )}

                {patientStep === 'otp' && (
                  <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="otp">Enter OTP</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input 
                          className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all tracking-[0.5em] font-mono text-center" 
                          id="otp" 
                          placeholder="000000" 
                          type="text" 
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <div className="text-right mt-1">
                        <button type="button" onClick={() => setPatientStep('phone')} className="text-label-sm text-primary hover:underline">Change Mobile Number</button>
                      </div>
                    </div>
                    <button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary py-sm rounded-lg text-label-md font-label-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] transition-all" type="submit">
                      Verify & Login
                    </button>
                  </form>
                )}

                {patientStep === 'register' && (
                  <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); handlePatientRegister(); }}>
                    <div className="text-center mb-md">
                      <p className="text-body-md text-on-surface-variant">Looks like you're new here!</p>
                      <p className="text-label-md text-on-surface font-medium">Create your patient profile</p>
                    </div>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="fullName">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input 
                          className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                          id="fullName" 
                          placeholder="John Doe" 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="reg-mobile">Mobile Number *</label>
                      <div className="relative">
                        <Smartphone className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input 
                          className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface opacity-70" 
                          id="reg-mobile" 
                          type="tel" 
                          value={mobile}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="email">Email Address (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <input 
                          className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                          id="email" 
                          placeholder="john@example.com" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary py-sm rounded-lg text-label-md font-label-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] transition-all" type="submit">
                      Register & Login
                    </button>
                  </form>
                )}
                
                {patientStep === 'phone' && (
                  <p className="mt-lg text-center text-body-sm font-body-sm text-on-surface-variant">
                    By continuing, you agree to our <Link className="text-primary hover:underline" to="#">Terms of Service</Link> and <Link className="text-primary hover:underline" to="#">Privacy Policy</Link>.
                  </p>
                )}
              </div>
            )}
            
            {/* Doctor View */}
            {activeTab === 'doctor' && (
              <div className="block animate-[fadeIn_0.3s_ease-in-out]">
                <form className="space-y-md" onSubmit={(e) => { e.preventDefault(); handleDoctorLogin(); }}>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-xs" htmlFor="doc-email">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                      <input 
                        className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                        id="doc-email" 
                        placeholder="doctor@clinic.com" 
                        type="email" 
                        value={doctorEmail}
                        onChange={(e) => setDoctorEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-xs">
                      <label className="block text-label-md font-label-md text-on-surface" htmlFor="doc-password">Secure Password</label>
                      <Link className="text-label-sm font-label-sm text-primary hover:underline" to="#">Forgot Password?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                      <input 
                        className="w-full pl-[44px] pr-sm py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                        id="doc-password" 
                        placeholder="••••••••" 
                        type="password" 
                        value={doctorPassword}
                        onChange={(e) => setDoctorPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-on-primary py-sm rounded-lg text-label-md font-label-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] transition-all flex items-center justify-center gap-xs" type="submit">
                    <LogIn className="w-5 h-5" />
                    Secure Login
                  </button>
                </form>
                <div className="mt-lg pt-md border-t border-outline-variant/30 text-center bg-surface-container-low p-md rounded-lg">
                  <Link className="text-label-md font-label-md text-primary hover:underline flex items-center justify-center gap-xs font-bold" to="/onboarding">
                    <UserPlus className="w-5 h-5" />
                    New Practitioner? Apply for Verification.
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
