import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, UploadCloud, Info, ChevronDown, Globe } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Dr. Sarah Jenkins');
  const [medicalCouncil, setMedicalCouncil] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [qualification, setQualification] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [tenantName, setTenantName] = useState('');
  
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [refId, setRefId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (aadhaarNumber.length !== 12) {
      setError('Aadhaar must be 12 digits');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/auth/send-aadhaar-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaar_number: aadhaarNumber }),
      });
      
      if (!response.ok) throw new Error('Failed to send OTP');
      
      const data = await response.json();
      setRefId(data.ref_id || 'dummy_ref_id');
      setShowOtpModal(true);
    } catch (err: any) {
      setError(err.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const verifyRes = await fetch('/auth/verify-aadhaar-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref_id: refId, otp }),
      });
      
      if (!verifyRes.ok) throw new Error('Invalid OTP');

      const registerRes = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          medical_council: medicalCouncil,
          reg_number: regNumber,
          qualification,
          aadhaar_number: aadhaarNumber,
          tenant_name: tenantName,
        }),
      });

      if (!registerRes.ok) throw new Error('Registration failed');

      setShowOtpModal(false);
      setSuccessMessage('Your account has been created and is pending Admin Verification.');
    } catch (err: any) {
      setError(err.message || 'Error during verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface antialiased relative">
      {/* TopNavBar */}
      <nav className="bg-surface dark:bg-inverse-surface w-full z-50 docked full-width top-0 border-b border-outline-variant dark:border-outline flat no shadows hidden md:flex">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-max-width mx-auto">
          <div className="flex items-center gap-md">
            <span className="text-title-lg font-title-lg font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
            <div className="hidden md:flex gap-md ml-lg">
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="#">Consult</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="/triage">AI Triage</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="/checkout">Order</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="#">Library</Link>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-primary hover:bg-surface-variant transition-colors text-label-md font-label-md">
              <Globe className="w-5 h-5" />
              Language
            </button>
            <Link to="/login" className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-label-md font-label-md inline-block">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center py-xl px-margin mt-10 md:mt-0">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="flex items-center space-x-md mb-lg">
            <button
              onClick={() => navigate('/login')}
              aria-label="Go Back"
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none rounded-full p-2 hover:bg-surface-variant"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <h1 className="text-headline-lg font-headline-lg text-primary-fixed-variant md:text-headline-lg font-headline-lg-mobile">
              Practitioner Verification
            </h1>
          </header>

          {/* Stepper */}
          <div className="mb-xl px-md">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-surface-variant rounded-full z-0"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 bg-secondary rounded-full z-0 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center border-4 border-surface shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <CheckCircle2 className="w-5 h-5 text-on-secondary" />
                </div>
                <span className="text-label-sm font-label-sm text-secondary font-semibold">Personal Details</span>
              </div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary border-4 border-secondary flex items-center justify-center shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="text-label-md font-label-md font-bold">2</span>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-semibold">Medical Credentials</span>
              </div>

              <div className="relative z-10 flex flex-col items-center group opacity-50">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface-variant border-4 border-surface-variant flex items-center justify-center shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="text-label-md font-label-md font-bold">3</span>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant font-semibold">Verification</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(15,23,42,0.05)] border border-outline-variant p-6 md:p-10">
            <h2 className="text-title-lg font-title-lg mb-md text-on-surface font-semibold">Step 2: Medical Credentials</h2>
            
            {successMessage ? (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm">
                <p className="font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Success</p>
                <p className="mt-1">{successMessage}</p>
              </div>
            ) : (
              <>
                <p className="text-body-md font-body-md text-on-surface-variant mb-8">
                  Please provide your official registration details and clinical qualifications to proceed with verification.
                </p>
                
                {error && <div className="text-red-500 mb-6 font-medium text-sm p-3 bg-red-50 rounded-md border border-red-100">{error}</div>}

                <form className="space-y-8" onSubmit={handleSendOtp}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="fullName">Full Name (As per Medical Records)</label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-low text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm cursor-not-allowed px-4 py-3"
                        disabled
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="tenantName">Clinic / Tenant Name</label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                        id="tenantName"
                        placeholder="e.g. Wellness Clinic"
                        type="text"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="medicalCouncil">State Medical Council</label>
                      <div className="relative">
                        <select
                          className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
                          id="medicalCouncil"
                          value={medicalCouncil}
                          onChange={(e) => setMedicalCouncil(e.target.value)}
                          required
                        >
                          <option disabled value="">Select issuing council...</option>
                          <option value="maharashtra">Maharashtra Council of Homoeopathy</option>
                          <option value="delhi">Delhi Board of Homoeopathic System of Medicine</option>
                          <option value="kerala">Travancore-Cochin Medical Council</option>
                          <option value="cch">Central Council of Homoeopathy (CCH)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="regNumber">Registration Number</label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                        id="regNumber"
                        placeholder="e.g. CCH-12345"
                        type="text"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="qualification">Highest Qualification</label>
                      <div className="relative">
                        <select
                          className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
                          id="qualification"
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          required
                        >
                          <option disabled value="">Select qualification...</option>
                          <option value="bhms">BHMS (Bachelor of Homoeopathic Medicine and Surgery)</option>
                          <option value="md">MD Homeo (Doctor of Medicine in Homoeopathy)</option>
                          <option value="phd">PhD in Homoeopathy</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="aadhaarNumber">Aadhaar Number (12 digits)</label>
                      <input
                        className="mt-1 block w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                        id="aadhaarNumber"
                        placeholder="e.g. 1234 5678 9012"
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                        maxLength={12}
                        required
                      />
                    </div>
                  </div>

                  <hr className="border-t border-outline-variant/30" />

                  <div className="space-y-4">
                    <h3 className="text-body-lg font-body-lg text-on-surface font-semibold">Document Upload</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Please upload clear, legible copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                        <input accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="licenseUpload" type="file" />
                        <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform border border-outline-variant/30">
                          <UploadCloud className="text-primary w-8 h-8" />
                        </div>
                        <span className="text-label-md font-label-md text-primary font-medium group-hover:underline">Upload Medical License</span>
                      </div>
                      <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                        <input accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="idUpload" type="file" />
                        <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform border border-outline-variant/30">
                          <UploadCloud className="text-primary w-8 h-8" />
                        </div>
                        <span className="text-label-md font-label-md text-primary font-medium group-hover:underline">Upload Government ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF8E1] border border-[#FFC107]/30 p-4 flex items-start space-x-3 rounded-xl shadow-sm">
                    <Info className="text-[#FFC107] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-body-sm font-body-sm text-[#856404]">
                        <strong className="font-semibold">Please note:</strong> Your account will remain locked until our admin team manually verifies your credentials.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      className="bg-primary hover:bg-primary/90 text-on-primary font-label-md font-medium text-label-md py-3 px-8 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center space-x-2 hover:scale-[1.02] disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? 'Sending OTP...' : 'Submit for Clinical Review'}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          <div className="h-20"></div>
        </div>
      </main>

      <footer className="w-full py-6 px-margin flex flex-col md:flex-row justify-between items-center bg-surface-container-highest dark:bg-inverse-surface text-on-surface dark:text-inverse-on-surface border-t border-outline-variant/30">
        <div className="flex items-center space-x-2 mb-4 md:mb-0 max-w-max-width mx-auto w-full px-4 justify-between">
          <span className="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
          <div className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant">© 2024 HomeoAssist AI. Clinical Grade Homeopathy.</div>
        </div>
      </footer>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Verify Aadhaar OTP</h3>
            <p className="text-sm text-gray-500 mb-6">Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.</p>
            {error && <div className="text-red-600 text-sm mb-4 font-medium bg-red-50 p-3 rounded-md">{error}</div>}
            <input
              type="text"
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              className="w-full rounded-lg border-gray-300 p-4 text-center text-2xl tracking-widest border mb-6 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow"
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowOtpModal(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors" disabled={loading}>Cancel</button>
              <button onClick={handleVerifyOtp} className="px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 font-medium transition-colors" disabled={loading || otp.length !== 6}>{loading ? 'Verifying...' : 'Verify & Register'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
