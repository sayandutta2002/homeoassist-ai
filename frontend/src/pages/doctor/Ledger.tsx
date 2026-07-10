import { useState } from 'react';

const Ledger: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen p-lg font-[Inter] relative">
      {/* Top Navbar Simulation */}
      <nav className="flex items-center space-x-md mb-lg border-b border-outline-variant/30 pb-sm">
        <div className="flex items-center space-x-2 text-primary font-bold text-title-lg">
          <span className="material-symbols-outlined text-[24px]">eco</span>
          <span>HomeoAssist AI</span>
        </div>
        <div className="flex space-x-md text-body-md font-medium text-on-surface-variant">
          <span className="cursor-pointer hover:text-primary transition-colors">Dashboard</span>
          <span className="cursor-pointer hover:text-primary transition-colors">Patients</span>
          <span className="cursor-pointer text-primary border-b-2 border-primary pb-1">Prescriptions</span>
          <span className="cursor-pointer hover:text-primary transition-colors">Profile</span>
        </div>
      </nav>

      <h1 className="text-display-lg font-display-lg font-bold text-on-surface mb-lg">
        Prescription &amp; AI Override Ledger
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-md">
        {/* Patient Information Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <h2 className="text-title-lg font-title-lg font-bold mb-md">Patient Information</h2>
          <div className="space-y-sm">
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Patient Name</label>
              <input
                className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2 cursor-not-allowed"
                type="text"
                disabled
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Patient ID</label>
              <input
                className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2 cursor-not-allowed"
                type="text"
                disabled
                defaultValue="#HA-12345"
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Age</label>
              <input
                className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2 cursor-not-allowed"
                type="text"
                disabled
                defaultValue="45"
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Date</label>
              <input
                className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2 cursor-not-allowed"
                type="text"
                disabled
                defaultValue="October 26, 2023"
              />
            </div>
          </div>
        </div>

        {/* Prescription Details Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <h2 className="text-title-lg font-title-lg font-bold mb-md">Prescription Details</h2>
          
          <div className="mb-md">
            <label className="block text-label-md font-label-md text-on-surface-variant mb-2">AI Recommendation</label>
            <div className="bg-[#e6f4ea] border border-[#34a853] rounded-lg p-3 flex items-start space-x-3">
              <span className="material-symbols-outlined text-[#34a853] mt-0.5">check_circle</span>
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">AI Suggested Remedy</p>
                <p className="text-body-sm text-on-surface-variant">Arnica montana, 30C</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-title-lg font-title-lg font-bold mb-sm">Doctor's Prescription</h3>
            <div className="space-y-sm">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Remedy</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2">
                  <option>Rhus toxicodendron</option>
                  <option>Arnica montana</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Potency</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2">
                  <option>200C</option>
                  <option>30C</option>
                  <option>1M</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">Dosage Instructions</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface text-body-md rounded-lg px-3 py-2"
                  type="text"
                  defaultValue="Take 5 pills twice daily for 3 days."
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#1967d2] hover:bg-[#1557b0] text-white font-label-md text-label-md py-3 rounded-lg transition-colors mt-2"
              >
                Submit Prescription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Signature */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm mb-xl flex justify-between items-start">
        <h2 className="text-title-lg font-title-lg font-bold">Digital Signature</h2>
        <div className="w-1/3">
          <label className="block text-label-md font-label-md text-on-surface-variant mb-2">Signature pad</label>
          <div className="border border-dashed border-outline-variant bg-surface-container rounded-lg h-32 flex items-center justify-center relative">
             <div className="font-['Brush_Script_MT',cursive] text-4xl text-on-surface opacity-80" style={{fontFamily: "'Brush Script MT', cursive, 'Dancing Script'"}}>Emily Carter</div>
             <div className="absolute bottom-4 left-4 right-4 border-b border-outline-variant"></div>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-2 text-center">Dr. Emily Carter, MD (Homeopathy)</p>
        </div>
      </div>

      {/* Clinical Override Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.1)] w-full max-w-lg overflow-hidden border border-outline-variant/30">
            <div className="px-md py-sm border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="text-title-lg font-title-lg font-bold text-on-surface">Clinical Override Confirmation</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-md space-y-md">
              <div className="flex items-start space-x-sm">
                <span className="material-symbols-outlined text-[#f29900] mt-0.5">warning</span>
                <p className="text-body-sm font-body-sm text-on-surface">
                  You have selected a remedy (Rhus toxicodendron) that differs from the AI recommendation (Arnica montana). Please provide a clinical justification for this override.
                </p>
              </div>
              
              <div>
                <label className="block text-label-md font-label-md font-semibold text-on-surface mb-2">Justification Reason</label>
                <textarea 
                  className="w-full h-32 bg-surface-container-lowest border-2 border-[#1967d2] text-on-surface text-body-md rounded-lg p-3 outline-none focus:ring-4 focus:ring-[#1967d2]/20 transition-all resize-none"
                  placeholder="Enter your clinical reasoning here..."
                ></textarea>
              </div>
            </div>

            <div className="px-md py-sm bg-surface-container-low flex justify-end space-x-3 rounded-b-xl border-t border-outline-variant/30">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-variant rounded-lg font-label-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#1967d2] hover:bg-[#1557b0] text-white rounded-lg font-label-md transition-colors"
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ledger;
