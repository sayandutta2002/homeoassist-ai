import React, { useState } from 'react';

const Onboarding: React.FC = () => {
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
      <main className="flex-grow flex flex-col items-center py-xl px-margin">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <header className="flex items-center space-x-md mb-lg">
            <button
              aria-label="Go Back"
              className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none rounded-full p-2 hover:bg-surface-variant"
            >
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </button>
            <h1 className="text-headline-lg font-headline-lg text-primary-fixed-variant md:text-headline-lg font-headline-lg-mobile">
              Practitioner Verification Application
            </h1>
          </header>

          {/* Stepper */}
          <div className="mb-xl px-md">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-surface-variant rounded-full z-0"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 bg-secondary rounded-full z-0 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center border-4 border-surface shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>cloud_done</span>
                </div>
                <span className="text-label-sm font-label-sm text-secondary">Personal Details</span>
              </div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary border-4 border-secondary flex items-center justify-center shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="text-label-md font-label-md font-bold">2</span>
                </div>
                <span className="text-label-sm font-label-sm text-primary">Medical Credentials</span>
              </div>

              <div className="relative z-10 flex flex-col items-center group opacity-50">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface-variant border-4 border-surface-variant flex items-center justify-center shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="text-label-md font-label-md font-bold">3</span>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Identity Verification</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(15,23,42,0.05)] border border-outline-variant p-lg">
            <h2 className="text-title-lg font-title-lg mb-md text-on-surface">Step 2: Medical Credentials</h2>
            
            {successMessage ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
                <p className="font-bold">Success</p>
                <p>{successMessage}</p>
              </div>
            ) : (
              <>
                <p className="text-body-md font-body-md text-on-surface-variant mb-lg">
                  Please provide your official registration details and clinical qualifications to proceed with verification.
                </p>
                
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form className="space-y-xl" onSubmit={handleSendOtp}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="fullName">Full Name (As per Medical Records)</label>
                      <input
                        className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-low text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm cursor-not-allowed px-4 py-3"
                        disabled
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="tenantName">Clinic / Tenant Name</label>
                      <input
                        className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                        id="tenantName"
                        placeholder="e.g. Wellness Clinic"
                        type="text"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="medicalCouncil">State Medical Council</label>
                      <div className="relative">
                        <select
                          className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
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
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="regNumber">Registration Number</label>
                      <input
                        className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                        id="regNumber"
                        placeholder="e.g. CCH-12345"
                        type="text"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="qualification">Highest Qualification</label>
                      <div className="relative">
                        <select
                          className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
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
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-xs">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="aadhaarNumber">Aadhaar Number (12 digits)</label>
                      <input
                        className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
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

                  <hr className="border-outline-variant/50" />

                  <div className="space-y-md">
                    <h3 className="text-body-lg font-body-lg text-on-surface">Document Upload</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Please upload clear, legible copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                      <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                        <input accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="licenseUpload" type="file" />
                        <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
                        </div>
                        <span className="text-label-md font-label-md text-primary group-hover:underline">Upload Medical License</span>
                      </div>
                      <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                        <input accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="idUpload" type="file" />
                        <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
                        </div>
                        <span className="text-label-md font-label-md text-primary group-hover:underline">Upload Government ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF8E1] border-l-4 border-[#FFC107] p-md flex items-start space-x-sm rounded-xl">
                    <span className="material-symbols-outlined text-[#FFC107] mt-0.5">info</span>
                    <div>
                      <p className="text-body-sm font-body-sm text-[#856404]">
                        <strong className="font-bold">Please note:</strong> Your account will remain locked until our admin team manually verifies your credentials.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-md">
                    <button
                      className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center space-x-2 hover:scale-[1.02] disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? 'Sending OTP...' : 'Submit for Clinical Review'}</span>
                      {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          <div className="h-xl"></div>
        </div>
      </main>

      <footer className="w-full py-lg px-margin flex flex-col md:flex-row justify-between items-center max-w-max-width mx-auto bg-surface-container-highest dark:bg-inverse-surface text-on-surface dark:text-inverse-on-surface">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
        </div>
        <div className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant">© 2024 HomeoAssist AI. Clinical Grade Homeopathy.</div>
      </footer>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Verify Aadhaar OTP</h3>
            <p className="text-sm text-gray-600 mb-6">Enter the OTP sent to your Aadhaar-linked mobile number.</p>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              className="w-full rounded-lg border-gray-300 p-3 border mb-6 focus:ring-primary focus:border-primary"
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowOtpModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50" disabled={loading}>Cancel</button>
              <button onClick={handleVerifyOtp} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50" disabled={loading || !otp}>{loading ? 'Verifying...' : 'Verify & Register'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
