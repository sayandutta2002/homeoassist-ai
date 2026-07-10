import React from 'react';

const ClinicalInterface: React.FC = () => {
  return (
    <div className="bg-[#f8f9ff] text-[#0d1c2e] font-body-md h-screen overflow-hidden flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="bg-[#ffffff] border-b border-[#e2e8f0] h-16 flex items-center justify-between px-lg shrink-0 z-10 shadow-[0px_4px_12px_rgba(15,23,42,0.02)]">
        <div className="flex items-center space-x-3">
          <span className="material-symbols-outlined text-[#00685f] text-[28px]">vital_signs</span>
          <h1 className="text-title-lg font-bold text-[#0f172a] tracking-tight">Clinical Intelligence Interface</h1>
        </div>
        <div className="flex items-center space-x-md">
          <span className="bg-[#eff4ff] text-[#00685f] px-4 py-1.5 rounded-full text-label-md font-semibold border border-[#00685f]/20">
            Status: Secure Connection
          </span>
          <div className="w-8 h-8 rounded-full bg-[#00685f] text-white flex items-center justify-center font-bold text-label-sm">
            DR
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 p-md gap-gutter grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        
        {/* Left Column: Patient Demographics & Vitals */}
        <section className="md:col-span-3 flex flex-col h-full space-y-md overflow-y-auto">
          {/* Patient Card */}
          <div className="bg-[#ffffff] rounded-xl border border-[#cbd5e1] p-md shadow-sm">
            <h2 className="text-title-lg font-bold text-[#0f172a] mb-4">Patient Profile</h2>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#dce9ff] text-[#00685f] flex items-center justify-center text-headline-md font-bold">
                JD
              </div>
              <div>
                <p className="text-headline-md font-bold text-[#0f172a]">John Doe</p>
                <p className="text-label-md text-[#475569]">ID: #HA-9824</p>
              </div>
            </div>
            
            <div className="space-y-3 text-body-sm text-[#475569]">
              <div className="flex justify-between border-b border-[#cbd5e1]/40 pb-2">
                <span className="font-semibold text-[#0f172a]">Age / Sex</span>
                <span>45 Y / M</span>
              </div>
              <div className="flex justify-between border-b border-[#cbd5e1]/40 pb-2">
                <span className="font-semibold text-[#0f172a]">Blood Group</span>
                <span>O Positive</span>
              </div>
              <div className="flex justify-between border-b border-[#cbd5e1]/40 pb-2">
                <span className="font-semibold text-[#0f172a]">Weight</span>
                <span>78 kg</span>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="bg-[#ffffff] rounded-xl border border-[#cbd5e1] p-md shadow-sm flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-title-lg font-bold text-[#0f172a]">Recent Vitals</h2>
              <button className="text-[#00685f] hover:bg-[#00685f]/10 p-1 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">add</span></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#cbd5e1]/50">
                <p className="text-label-sm text-[#475569] mb-1">Blood Pressure</p>
                <p className="text-body-lg font-bold text-[#0f172a]">128/82</p>
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#cbd5e1]/50">
                <p className="text-label-sm text-[#475569] mb-1">Heart Rate</p>
                <p className="text-body-lg font-bold text-[#0f172a]">72 bpm</p>
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#cbd5e1]/50">
                <p className="text-label-sm text-[#475569] mb-1">Temperature</p>
                <p className="text-body-lg font-bold text-[#0f172a]">98.6°F</p>
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#cbd5e1]/50">
                <p className="text-label-sm text-[#475569] mb-1">SpO2</p>
                <p className="text-body-lg font-bold text-[#0f172a]">99%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Center Column: AI Symptom Intake / Chat */}
        <section className="md:col-span-5 bg-[#ffffff] rounded-xl border border-[#cbd5e1] shadow-sm flex flex-col h-full overflow-hidden relative">
          <div className="p-md border-b border-[#cbd5e1] bg-[#ffffff] z-10 flex justify-between items-center">
            <h2 className="text-title-lg font-bold text-[#0f172a] flex items-center">
              <span className="material-symbols-outlined text-[#006c49] mr-2">smart_toy</span>
              AI Intake Assistant
            </h2>
            <span className="flex items-center text-label-sm text-[#006c49] font-bold bg-[#e6fffa] px-2 py-1 rounded">
               <span className="w-2 h-2 bg-[#006c49] rounded-full mr-1.5 animate-pulse"></span> Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-md space-y-4 bg-[#f8fafc]">
             {/* Chat Messages */}
             <div className="flex flex-col space-y-4">
                <div className="bg-[#ffffff] border border-[#cbd5e1] p-3 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm">
                   <p className="text-body-sm text-[#0f172a]">Hello John, I am the AI clinical assistant. Can you describe what is bothering you today in detail?</p>
                </div>
                
                <div className="bg-[#00685f] text-white p-3 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm">
                   <p className="text-body-sm">I have been experiencing severe joint pain in my knees, especially when I wake up. It feels very stiff.</p>
                </div>

                <div className="bg-[#ffffff] border border-[#cbd5e1] p-3 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm">
                   <p className="text-body-sm text-[#0f172a]">I understand. Does the stiffness improve after you start moving around, or does it stay the same?</p>
                </div>

                <div className="bg-[#00685f] text-white p-3 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm">
                   <p className="text-body-sm">It definitely gets better after I move around for about 15 minutes. Cold weather makes it much worse though.</p>
                </div>
             </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#cbd5e1] bg-[#ffffff]">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type patient response or clinical note..." 
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-4 pr-12 py-3 text-body-md focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00685f] p-2 hover:bg-[#eff4ff] rounded-full transition-colors">
                  <span className="material-symbols-outlined">send</span>
                </button>
             </div>
          </div>
        </section>

        {/* Right Column: Materia Medica Repertory */}
        <section className="md:col-span-4 bg-[#ffffff] rounded-xl border border-[#cbd5e1] shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-md border-b border-[#cbd5e1] bg-[#ffffff] z-10">
            <h2 className="text-title-lg font-bold text-[#0f172a] flex items-center">
              <span className="material-symbols-outlined text-[#008378] mr-2">medical_information</span>
              Clinical Repertory
            </h2>
            <p className="text-label-sm text-[#475569] mt-1">Real-time symptom rubrics and differential diagnosis</p>
          </div>

          <div className="flex-1 overflow-y-auto p-md space-y-md">
             {/* Extracted Rubrics */}
             <div>
               <h3 className="text-label-md font-bold text-[#0f172a] mb-2 uppercase tracking-wide">Extracted Rubrics</h3>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-[#eff4ff] text-[#00685f] border border-[#00685f]/20 px-3 py-1 rounded-full text-label-sm font-semibold">
                   Joint Pain - Knees
                 </span>
                 <span className="bg-[#eff4ff] text-[#00685f] border border-[#00685f]/20 px-3 py-1 rounded-full text-label-sm font-semibold">
                   Stiffness - Morning
                 </span>
                 <span className="bg-[#eff4ff] text-[#00685f] border border-[#00685f]/20 px-3 py-1 rounded-full text-label-sm font-semibold">
                   Better from Motion
                 </span>
                 <span className="bg-[#ffdad6] text-[#93000a] border border-[#93000a]/20 px-3 py-1 rounded-full text-label-sm font-semibold">
                   Worse from Cold
                 </span>
               </div>
             </div>

             <hr className="border-[#cbd5e1]/40" />

             {/* Differential Diagnosis Cards */}
             <div>
                <h3 className="text-label-md font-bold text-[#0f172a] mb-3 uppercase tracking-wide">Top AI Matches</h3>
                
                <div className="space-y-3">
                  {/* Match 1 */}
                  <div className="border border-[#00685f] rounded-lg p-3 bg-[#f4fffc] shadow-[0px_4px_12px_rgba(15,23,42,0.02)] relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-[#00685f] text-white px-2 py-0.5 rounded-bl text-[10px] font-bold">95% Match</div>
                     <h4 className="text-body-lg font-bold text-[#0f172a] mb-1">Rhus toxicodendron</h4>
                     <p className="text-body-sm text-[#475569] mb-2">Keynotes perfectly align with "<span className="italic">better from motion, worse from initial movement, worse from cold/damp</span>".</p>
                     <button className="text-[#00685f] text-label-sm font-bold hover:underline">View Monograph →</button>
                  </div>

                  {/* Match 2 */}
                  <div className="border border-[#cbd5e1] rounded-lg p-3 bg-[#ffffff] hover:border-[#00685f]/50 transition-colors">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="text-body-lg font-bold text-[#0f172a]">Bryonia alba</h4>
                       <span className="text-[#475569] text-label-sm font-bold">60%</span>
                     </div>
                     <p className="text-body-sm text-[#475569]">Contraindicated by "<span className="italic text-[#93000a]">better from motion</span>" (Bryonia is strictly worse from motion).</p>
                  </div>
                  
                  {/* Match 3 */}
                  <div className="border border-[#cbd5e1] rounded-lg p-3 bg-[#ffffff] hover:border-[#00685f]/50 transition-colors">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="text-body-lg font-bold text-[#0f172a]">Calcarea fluorica</h4>
                       <span className="text-[#475569] text-label-sm font-bold">55%</span>
                     </div>
                     <p className="text-body-sm text-[#475569]">Shares joint stiffness better by motion, but lacks the acute morning stiffness typical of Rhus tox.</p>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="p-4 border-t border-[#cbd5e1] bg-[#ffffff]">
            <button className="w-full bg-[#00685f] hover:bg-[#005049] text-white font-label-md py-2.5 rounded-lg transition-colors shadow-sm">
              Generate Prescription Draft
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ClinicalInterface;
