import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md h-screen overflow-hidden flex font-[Inter]">
      {/* SideNavBar */}
      <nav className="bg-inverse-surface text-on-primary-fixed shadow-sm docked left-0 h-screen w-64 flex-col h-full p-sm space-y-base hidden md:flex shrink-0">
        <div className="mb-lg px-xs mt-4">
          <h1 className="text-headline-md font-headline-md font-black text-primary-fixed">HomeoAssist AI</h1>
        </div>
        <div className="flex items-center space-x-sm mb-lg px-xs">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center">
            <img
              alt="Doctor profile picture"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Oo-hnDaYd1rogUv0OIBsVrxlC0fxhsiNg-ittnjptOWS2MwA8xNdgndgXyINRO9tpEPR7VXjH91WxLKN26INJiYi_x4CTSnCVCtHunXZMEhfwIUregJ5e_mooO0di4d616AKZrxR5GM4d9ivQvlreq9B5MEC6zKIUdcbaVe6NSvj6W9fAWq1QMnExxjwB2KZakhklSJpzdNrF-FfndRUzBe1qnnKVXRfHr9BuIVzmad2-RpB-yTXIF72xHu3D9Cvdnm_Au2D-Jk0"
            />
          </div>
          <div>
            <h2 className="text-label-md font-label-md font-semibold text-inverse-on-surface">Dr. Clinical Assistant</h2>
            <p className="text-label-sm font-label-sm text-outline-variant">HomeoAssist AI Copilot</p>
          </div>
        </div>
        <button className="bg-primary text-on-primary font-label-md text-label-md py-3 px-4 rounded-lg w-full flex items-center justify-center space-x-xs hover:bg-primary-container transition-colors mb-md shadow-md">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Consultation</span>
        </button>
        <div className="flex-grow space-y-xs overflow-y-auto pr-2 custom-scrollbar">
          <a
            className="bg-secondary text-on-secondary rounded-lg font-bold px-4 py-3 flex items-center space-x-sm scale-95 transition-transform shadow-sm"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-label-md font-label-md">Dashboard</span>
          </a>
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-label-md font-label-md">Patient Queue</span>
          </a>
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">book_2</span>
            <span className="text-label-md font-label-md">Materia Medica</span>
          </a>
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">medication</span>
            <span className="text-label-md font-label-md">Prescriptions</span>
          </a>
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-label-md font-label-md">Analytics</span>
          </a>

          <div className="pt-md mt-sm border-t border-outline-variant/20">
            <h3 className="text-label-sm font-label-sm text-outline-variant uppercase tracking-wider mb-xs px-4">
              Waiting List
            </h3>
            <div className="space-y-1">
              <div className="px-4 py-2 flex items-center justify-between hover:bg-on-surface-variant/10 rounded-lg cursor-pointer bg-on-surface-variant/5">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,108,73,0.5)]"></div>
                  <span className="text-label-md font-label-md text-inverse-on-surface font-bold">Rahul S.</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">In Progress</span>
                  <span className="text-label-sm font-label-sm text-outline-variant">10:30 AM</span>
                </div>
              </div>
              <div className="px-4 py-2 flex items-center justify-between hover:bg-on-surface-variant/10 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                  <span className="text-label-md font-label-md text-inverse-on-surface">Anita K.</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-tighter">Waiting</span>
                  <span className="text-label-sm font-label-sm text-outline-variant">11:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-sm border-t border-outline-variant/20 space-y-xs mt-auto">
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-label-md font-label-md">Settings</span>
          </a>
          <a
            className="text-on-secondary-fixed-variant px-4 py-3 flex items-center space-x-sm hover:bg-on-surface-variant/10 rounded-lg transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="text-label-md font-label-md">Support</span>
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row bg-surface h-full overflow-hidden relative">
        {/* Center Panel: Patient Overview */}
        <section className="w-full md:w-1/2 p-md flex flex-col h-full overflow-y-auto custom-scrollbar border-r border-outline-variant/30">
          <header className="mb-md flex justify-between items-end">
            <div>
              <p className="text-label-md font-label-md text-primary font-semibold mb-1">Active Consultation</p>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Rahul S.</h2>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center space-x-1 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-label-sm font-label-sm font-medium">
                <span className="material-symbols-outlined text-[16px] text-secondary">vital_signs</span>
                <span>34 yrs • M</span>
              </span>
            </div>
          </header>

          {/* Patient Info Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md mb-md shadow-sm">
            <div className="flex justify-between items-start mb-sm">
              <h3 className="text-title-lg font-title-lg text-on-surface flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary">person</span>
                Demographics &amp; Vitals
              </h3>
              <button className="text-primary hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-sm text-body-sm font-body-sm text-on-surface-variant">
              <div>
                <span className="font-semibold text-on-surface">ID:</span> PT-84729
              </div>
              <div>
                <span className="font-semibold text-on-surface">Blood Group:</span> O+
              </div>
              <div>
                <span className="font-semibold text-on-surface">Weight:</span> 72 kg
              </div>
              <div>
                <span className="font-semibold text-on-surface">BP:</span> 120/80 mmHg
              </div>
            </div>
          </div>

          {/* AI Synthesized Intake */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md mb-md shadow-sm flex-1 flex flex-col">
            <h3 className="text-title-lg font-title-lg text-on-surface flex items-center mb-md border-b border-outline-variant/50 pb-sm">
              <span className="material-symbols-outlined mr-2 text-secondary">psychology</span>
              AI Synthesized Intake
            </h3>
            <div className="mb-md">
              <p className="text-label-md font-label-md text-on-surface-variant mb-2">Extracted Symptoms (Rubrics):</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold border border-error/20 flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">priority_high</span> Throbbing Pain
                </span>
                <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-label-sm font-label-sm font-medium border border-outline-variant/30">
                  Right-Sided
                </span>
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold border border-secondary/20 flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">ac_unit</span> Better by Cold
                </span>
                <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-label-sm font-label-sm font-medium border border-outline-variant/30">
                  Sudden Onset
                </span>
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold border border-secondary/20 flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">water_drop_off</span> Thirstless
                </span>
              </div>
            </div>
            <div className="flex-1 bg-surface-container rounded-lg p-sm border border-outline-variant/30 overflow-y-auto custom-scrollbar flex flex-col space-y-sm">
              <p className="text-label-sm font-label-sm text-outline-variant text-center uppercase tracking-widest mb-2">
                Summarized Transcript
              </p>
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50 shadow-sm ml-4 self-end w-[85%]">
                <p className="text-body-sm font-body-sm text-on-surface">
                  "Doctor, I have a severe throbbing headache that started suddenly yesterday. It's mostly on the right
                  side."
                </p>
              </div>
              <div className="bg-surface-container p-3 rounded-lg border border-primary/20 mr-4 self-start w-[85%]">
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  "Does anything make it feel better or worse?"
                </p>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50 shadow-sm ml-4 self-end w-[85%]">
                <p className="text-body-sm font-body-sm text-on-surface">
                  "Yes, applying a cold pack helps a lot. Moving around makes the throbbing much worse. I just want to
                  lie still."
                </p>
              </div>
            </div>
          </div>
          {/* Padding for sticky bottom area */}
          <div className="h-40 md:hidden"></div>
        </section>

        {/* Right Panel: AI Copilot & Materia Medica Analysis */}
        <section className="w-full md:w-1/2 flex flex-col h-full relative">
          <div className="p-md overflow-y-auto custom-scrollbar h-full pb-48">
            <header className="mb-md">
              <h2 className="text-headline-md font-headline-md text-on-surface flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary-container">science</span>
                Materia Medica Analysis
              </h2>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                AI-powered repertorization based on synthesized rubrics.
              </p>
            </header>

            {/* Analysis Cards */}
            <div className="space-y-sm">
              {/* Top Match */}
              <div className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-3 py-1 rounded-bl-lg text-label-sm font-label-sm font-bold flex items-center shadow-sm">
                  <span className="material-symbols-outlined text-[14px] mr-1">star</span> Top Match
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-title-lg font-title-lg text-on-surface font-bold">Belladonna</h4>
                  <span className="text-headline-md font-headline-md text-secondary font-black">92%</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mb-3 flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">book</span> Kent's Repertory
                </p>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] mr-2">check_circle</span>{' '}
                    Throbbing pain (Head)
                  </div>
                  <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] mr-2">check_circle</span>{' '}
                    Right-sided laterality
                  </div>
                  <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] mr-2">check_circle</span>{' '}
                    Sudden onset, violent
                  </div>
                </div>
                <button className="w-full border border-primary text-primary hover:bg-primary/5 py-2 rounded-lg text-label-md font-label-md font-medium transition-colors">
                  Review Full Monograph
                </button>
              </div>

              {/* Second Match */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-title-lg font-title-lg text-on-surface">Bryonia Alba</h4>
                  <span className="text-headline-md font-headline-md text-on-surface-variant font-bold">78%</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mb-3 flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">book</span> Boericke's Materia Medica
                </p>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[16px] mr-2">check_circle</span>{' '}
                    Worse from motion
                  </div>
                  <div className="flex items-center text-body-sm font-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-error text-[16px] mr-2">cancel</span> Better by cold
                    (Less typical)
                  </div>
                </div>
              </div>

              {/* Third Match */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-title-lg font-title-lg text-on-surface">Glonoinum</h4>
                  <span className="text-headline-md font-headline-md text-on-surface-variant font-bold">65%</span>
                </div>
                <p className="text-label-sm font-label-sm text-outline-variant mb-3">
                  Throbbing headache, but usually associated with sun exposure or heat, not typical sudden right-sided
                  onset.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Area: Prescription Form */}
          <div className="absolute bottom-0 right-0 w-full bg-surface-container-lowest border-t border-outline-variant/30 shadow-[0px_-4px_24px_rgba(15,23,42,0.08)] p-md z-10">
            <h3 className="text-label-md font-label-md text-on-surface font-semibold mb-sm flex items-center">
              <span className="material-symbols-outlined mr-2 text-primary text-[18px]">edit_document</span> Draft
              Prescription
            </h3>
            <div className="grid grid-cols-3 gap-sm mb-md">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Remedy</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                  type="text"
                  defaultValue="Belladonna"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Potency</label>
                <select className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                  <option>30C</option>
                  <option>200C</option>
                  <option>1M</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Dosage</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant text-on-surface text-body-sm rounded-lg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  defaultValue="4 pills, 3 times/day"
                />
              </div>
            </div>
            <button className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#005a3c] hover:shadow-lg transition-all active:scale-[0.98] shadow-lg">
              <span className="material-symbols-outlined">send</span>
              <span className="font-bold tracking-wide">Digitally Sign &amp; Dispatch to Pharmacy</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
