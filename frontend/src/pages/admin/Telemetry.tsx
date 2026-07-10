

const Telemetry: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen p-lg font-[Inter]">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-lg bg-[#3b5998] p-3 text-white rounded-t-lg -mx-lg -mt-lg mb-6 shadow-sm">
        <div className="flex items-center space-x-2 font-bold text-title-lg ml-md">
          <span className="material-symbols-outlined text-[24px]">eco</span>
          <span>HomeoAssist AI</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-md">
        <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface">System Admin Telemetry &amp; Ops</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-label-md">
             <span className="font-bold">Tenant ID Filter</span>
             <select className="bg-surface-container-lowest border border-outline-variant rounded px-3 py-1.5 w-64 shadow-sm">
               <option>All Tenants</option>
               <option>T-1024 (North America)</option>
               <option>T-1025 (Europe)</option>
               <option>T-1028 (Asia)</option>
             </select>
          </div>
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded px-3 py-1.5 shadow-sm text-label-md cursor-pointer hover:bg-surface-variant">
             <span className="material-symbols-outlined text-[18px] mr-1">calendar_today</span>
             Last 24 Hours
             <span className="material-symbols-outlined text-[18px] ml-1">expand_more</span>
          </div>
          <button className="flex items-center bg-[#4a729e] hover:bg-[#3d5f85] text-white rounded px-4 py-1.5 font-label-md shadow-sm transition-colors">
            <span className="material-symbols-outlined text-[18px] mr-1">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      <h2 className="text-title-lg font-bold mb-4">Live System Telemetry</h2>
      
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
        {/* LLM Latency */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-body-lg">LLM Latency (P99)</h3>
              <p className="text-label-sm text-outline-variant">LLM Latency Instrumentation</p>
            </div>
            <div className="flex items-center">
              <span className="text-headline-md font-bold mr-2">450ms</span>
              <span className="bg-[#e6f4ea] text-[#34a853] px-2 py-0.5 rounded text-label-sm font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 2%
              </span>
            </div>
          </div>
          {/* Mock Chart */}
          <div className="h-32 mt-4 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <path d="M0,30 Q5,25 10,28 T20,20 T30,25 T40,15 T50,22 T60,10 T70,18 T80,5 T90,15 T100,10" fill="none" stroke="#4a729e" strokeWidth="1.5" />
              <path d="M0,35 Q5,32 10,34 T20,30 T30,32 T40,28 T50,30 T60,25 T70,28 T80,22 T90,25 T100,20" fill="none" stroke="#a0aec0" strokeWidth="1.5" />
            </svg>
            <div className="absolute right-0 bottom-8 text-[10px] bg-surface-container-low px-1 rounded text-outline-variant">GPT-4</div>
            <div className="absolute right-0 bottom-2 text-[10px] bg-surface-container-low px-1 rounded text-outline-variant">Claude-3</div>
          </div>
        </div>

        {/* Vector DB Retrieval Times */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
           <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-body-lg">Vector DB Retrieval Times</h3>
            </div>
            <div className="flex items-center">
              <span className="text-headline-md font-bold mr-2">120ms avg.</span>
              <span className="bg-[#fce8e6] text-[#ea4335] px-2 py-0.5 rounded text-label-sm font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 5%
              </span>
            </div>
          </div>
          {/* Mock Chart */}
          <div className="h-32 mt-4">
             <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <path d="M0,25 Q5,22 10,24 T20,28 T30,22 T40,26 T50,20 T60,15 T70,25 T80,18 T90,20 T100,15" fill="none" stroke="#4a729e" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* System Drift Monitor */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
           <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-body-lg">System Drift Monitor</h3>
              <p className="text-label-sm text-outline-variant">Model vs. Production Data</p>
            </div>
            <div className="flex items-center">
               <span className="text-label-sm font-bold text-[#b06000] flex items-center bg-[#fff4e5] px-2 py-1 rounded">
                 <span className="material-symbols-outlined text-[14px] mr-1">warning</span>
                 Drift Detected: +1.2% on Symptom Analysis
               </span>
            </div>
          </div>
          {/* Mock Bar Chart */}
          <div className="h-32 mt-4 flex items-end justify-between px-2">
            {[ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15 ].map((val, i) => (
              <div key={i} className={`w-3 ${val < 0 ? 'bg-[#d27e36] mb-4' : 'bg-[#4a729e]'}`} style={{ height: `${Math.abs(val) * 5}px`, transform: val < 0 ? 'translateY(100%)' : 'none' }}></div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-title-lg font-bold mb-4">Doctor Verification Queue</h2>
      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm mb-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/50 text-label-md font-bold text-on-surface">
              <th className="p-4">Doctor Name</th>
              <th className="p-4">Credentials (Uploads)</th>
              <th className="p-4 flex items-center cursor-pointer">Submitted On <span className="material-symbols-outlined text-[16px] ml-1">expand_more</span></th>
              <th className="p-4">Tenant ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-sm">
            <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/20">
              <td className="p-4 font-semibold">Dr. Anya Sharma</td>
              <td className="p-4">BHMS, MD (Hom.) - <a href="#" className="text-[#1967d2] hover:underline">[View Docs]</a></td>
              <td className="p-4">2024-05-10</td>
              <td className="p-4">T-1024</td>
              <td className="p-4"><span className="bg-[#fff4e5] text-[#b06000] px-3 py-1 rounded-full text-label-sm font-bold">Pending</span></td>
              <td className="p-4 space-x-2">
                <button className="bg-[#34a853] hover:bg-[#2d9249] text-white px-3 py-1 rounded font-bold text-label-sm">Approve</button>
                <button className="bg-[#ea4335] hover:bg-[#ce3b2f] text-white px-3 py-1 rounded font-bold text-label-sm">Reject</button>
              </td>
            </tr>
            <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/20">
              <td className="p-4 font-semibold">Dr. Kenji Tanaka</td>
              <td className="p-4">PhD, N.D. - <a href="#" className="text-[#1967d2] hover:underline">[View Docs]</a></td>
              <td className="p-4">2024-05-09</td>
              <td className="p-4">T-1026</td>
              <td className="p-4"><span className="bg-[#fff8e1] text-[#f29900] px-3 py-1 rounded-full text-label-sm font-bold">Under Review</span></td>
              <td className="p-4 space-x-2">
                <button className="bg-[#34a853] hover:bg-[#2d9249] text-white px-3 py-1 rounded font-bold text-label-sm">Approve</button>
                <button className="bg-[#ea4335] hover:bg-[#ce3b2f] text-white px-3 py-1 rounded font-bold text-label-sm">Reject</button>
              </td>
            </tr>
            <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/20">
              <td className="p-4 font-semibold">Dr. Matruharmnsk</td>
              <td className="p-4">BHMS, MD (Hom.) - <a href="#" className="text-[#1967d2] hover:underline">[View Docs]</a></td>
              <td className="p-4">2024-05-09</td>
              <td className="p-4">T-1024</td>
              <td className="p-4"><span className="bg-[#fff4e5] text-[#b06000] px-3 py-1 rounded-full text-label-sm font-bold">Pending</span></td>
              <td className="p-4 space-x-2">
                <button className="bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant px-3 py-1 rounded font-bold text-label-sm">Review</button>
                <button className="bg-[#ea4335] hover:bg-[#ce3b2f] text-white px-3 py-1 rounded font-bold text-label-sm">Reject</button>
              </td>
            </tr>
            <tr className="border-b border-outline-variant/30 hover:bg-surface-variant/20">
              <td className="p-4 font-semibold">Dr. Mark Sharah</td>
              <td className="p-4">BHMS, O/ N.D. - <a href="#" className="text-[#1967d2] hover:underline">[View Docs]</a></td>
              <td className="p-4">2024-05-09</td>
              <td className="p-4">T-1026</td>
              <td className="p-4"><span className="bg-[#fff8e1] text-[#f29900] px-3 py-1 rounded-full text-label-sm font-bold">Under Review</span></td>
              <td className="p-4 space-x-2">
                <button className="bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant px-3 py-1 rounded font-bold text-label-sm">Review</button>
                <button className="bg-[#ea4335] hover:bg-[#ce3b2f] text-white px-3 py-1 rounded font-bold text-label-sm">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-surface-container-lowest p-3 flex justify-center items-center space-x-4 text-outline-variant text-label-md">
           <span className="material-symbols-outlined cursor-not-allowed">first_page</span>
           <span className="material-symbols-outlined cursor-not-allowed">chevron_left</span>
           <span className="bg-surface-container text-on-surface px-3 py-1 rounded border border-outline-variant font-bold">1</span>
           <span className="cursor-pointer hover:text-on-surface">2</span>
           <span className="cursor-pointer hover:text-on-surface">3</span>
           <span>...</span>
           <span className="material-symbols-outlined cursor-pointer hover:text-on-surface">chevron_right</span>
           <span className="material-symbols-outlined cursor-pointer hover:text-on-surface">last_page</span>
        </div>
      </div>

      <h2 className="text-title-lg font-bold mb-4">E-commerce Revenue &amp; Commissions</h2>
      <div className="flex flex-col lg:flex-row gap-md">
        {/* Chart Panel */}
        <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm relative">
           <h3 className="font-bold text-body-lg mb-6">Partner Pharmacy Commissions (Last 30 Days)</h3>
           {/* Mock Stacked Bar Chart */}
           <div className="h-64 flex items-end justify-between px-4 pb-8 border-b border-outline-variant/30">
              {[20, 30, 45, 60, 40, 25, 65, 80, 95, 60, 75, 45, 40, 55, 45, 65, 75, 70, 65, 40, 20].map((h, i) => (
                <div key={i} className="w-6 flex flex-col justify-end" style={{height: `${h}%`}}>
                   <div className="w-full bg-[#34a853] h-[15%] rounded-t-sm"></div>
                   <div className="w-full bg-[#fbbc04] h-[20%]"></div>
                   <div className="w-full bg-[#4285f4] h-[35%]"></div>
                   <div className="w-full bg-[#3b5998] h-[30%] rounded-b-sm"></div>
                </div>
              ))}
           </div>
           
           {/* Legend overlay */}
           <div className="absolute right-md top-md bg-surface-container-lowest border border-outline-variant rounded p-3 shadow-md">
             <p className="text-label-sm font-bold text-on-surface mb-2">Total Commission</p>
             <p className="text-title-lg font-black text-on-surface mb-3">$98,250</p>
             <div className="space-y-1 text-label-sm text-on-surface-variant">
               <div className="flex items-center"><span className="w-3 h-3 bg-[#4285f4] mr-2"></span> Boiron</div>
               <div className="flex items-center"><span className="w-3 h-3 bg-[#34a853] mr-2"></span> Schwabe</div>
               <div className="flex items-center"><span className="w-3 h-3 bg-[#fbbc04] mr-2"></span> Dr. Reckeweg</div>
               <div className="flex items-center"><span className="w-3 h-3 bg-[#8e24aa] mr-2"></span> Others</div>
             </div>
           </div>
        </div>

        {/* Stats Panel */}
        <div className="w-full lg:w-64 bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="text-label-md text-on-surface-variant font-bold mb-1">Total Revenue</h3>
             <p className="text-display-lg font-black text-on-surface tracking-tighter mb-6">$491,250</p>
             
             <h3 className="text-label-md text-on-surface-variant font-bold mb-1">Avg. Commission Rate</h3>
             <p className="text-headline-lg font-black text-on-surface mb-6">20%</p>
           </div>
           
           <div>
             <h3 className="text-label-md text-on-surface-variant font-bold mb-1">Top Partner</h3>
             <p className="text-title-lg font-bold text-on-surface">Boiron ($42,100)</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Telemetry;
