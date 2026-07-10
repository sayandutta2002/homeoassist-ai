

const Onboarding: React.FC = () => {
  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface antialiased">
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
              {/* Progress Line */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-surface-variant rounded-full z-0"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-1 bg-secondary rounded-full z-0 transition-all duration-500"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center border-4 border-surface shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    cloud_done
                  </span>
                </div>
                <span className="text-label-sm font-label-sm text-secondary">Personal Details</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary border-4 border-secondary flex items-center justify-center shadow-sm mb-2 transition-transform group-hover:scale-110">
                  <span className="text-label-md font-label-md font-bold">2</span>
                </div>
                <span className="text-label-sm font-label-sm text-primary">Medical Credentials</span>
              </div>

              {/* Step 3 */}
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
            <p className="text-body-md font-body-md text-on-surface-variant mb-lg">
              Please provide your official registration details and clinical qualifications to proceed with verification.
            </p>

            <form className="space-y-xl">
              {/* 2-Column Grid for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Full Name */}
                <div className="space-y-xs">
                  <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="fullName">
                    Full Name (As per Medical Records)
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-low text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm cursor-not-allowed px-4 py-3"
                    disabled
                    id="fullName"
                    type="text"
                    defaultValue="Dr. Sarah Jenkins"
                  />
                </div>

                {/* State Medical Council */}
                <div className="space-y-xs">
                  <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="medicalCouncil">
                    State Medical Council
                  </label>
                  <div className="relative">
                    <select
                      className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
                      id="medicalCouncil"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select issuing council...
                      </option>
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

                {/* Registration Number */}
                <div className="space-y-xs">
                  <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="regNumber">
                    Registration Number
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm px-4 py-3 transition-colors hover:border-primary/50"
                    id="regNumber"
                    placeholder="e.g. CCH-12345"
                    type="text"
                  />
                </div>

                {/* Highest Qualification */}
                <div className="space-y-xs">
                  <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="qualification">
                    Highest Qualification
                  </label>
                  <div className="relative">
                    <select
                      className="mt-1 block w-full rounded-lg border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 sm:text-sm appearance-none px-4 py-3 transition-colors hover:border-primary/50"
                      id="qualification"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select qualification...
                      </option>
                      <option value="bhms">BHMS (Bachelor of Homoeopathic Medicine and Surgery)</option>
                      <option value="md">MD Homeo (Doctor of Medicine in Homoeopathy)</option>
                      <option value="phd">PhD in Homoeopathy</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-outline-variant/50" />

              {/* File Uploads */}
              <div className="space-y-md">
                <h3 className="text-body-lg font-body-lg text-on-surface">Document Upload</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Please upload clear, legible copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  {/* Medical License */}
                  <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                    <input
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="licenseUpload"
                      type="file"
                    />
                    <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
                    </div>
                    <span className="text-label-md font-label-md text-primary group-hover:underline">
                      Upload Medical License
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                      Drag &amp; drop files here or click to browse
                    </span>
                  </div>

                  {/* Gov ID */}
                  <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer group h-48">
                    <input
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="idUpload"
                      type="file"
                    />
                    <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
                    </div>
                    <span className="text-label-md font-label-md text-primary group-hover:underline">
                      Upload Government ID
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                      Drag &amp; drop files here or click to browse
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Warning Banner */}
              <div className="bg-[#FFF8E1] border-l-4 border-[#FFC107] p-md flex items-start space-x-sm rounded-xl">
                <span className="material-symbols-outlined text-[#FFC107] mt-0.5">info</span>
                <div>
                  <p className="text-body-sm font-body-sm text-[#856404]">
                    <strong className="font-bold">Please note:</strong> Your account will remain locked until our admin
                    team manually verifies your credentials. This process typically takes 1-2 business days to ensure
                    clinical safety and compliance.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-md">
                <button
                  className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center space-x-2 hover:scale-[1.02]"
                  type="button"
                >
                  <span>Submit for Clinical Review</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
          {/* Safe Area Spacer */}
          <div className="h-xl"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-lg px-margin flex flex-col md:flex-row justify-between items-center max-w-max-width mx-auto bg-surface-container-highest dark:bg-inverse-surface text-on-surface dark:text-inverse-on-surface">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">
            HomeoAssist AI
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
          <a
            className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            Healthcare Ethics
          </a>
          <a
            className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            Contact Us
          </a>
        </div>
        <div className="text-body-sm font-body-sm text-on-surface-variant dark:text-on-secondary-fixed-variant">
          © 2024 HomeoAssist AI. Clinical Grade Homeopathy.
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
