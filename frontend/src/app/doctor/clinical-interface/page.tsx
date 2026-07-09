"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, Users, Calendar, Pill, ShoppingCart, Settings, LogOut, 
  ChevronDown, Plus
} from "lucide-react";

export default function ClinicalInterfacePage() {
  const [activeTab, setActiveTab] = useState("Consultation Notes");

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 flex items-center gap-3">
          {/* Mock Caduceus Icon */}
          <div className="w-8 h-8 text-[var(--color-primary)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-bold text-xl text-[#0f172a]">HomeoAssist AI</span>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#e6eeff] text-[#0d47a1] rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <Users className="w-5 h-5" />
            Patients
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <Calendar className="w-5 h-5" />
            Appointments
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <Pill className="w-5 h-5" />
            <div className="flex flex-col">
              <span>Remedies</span>
              <span className="text-xs text-gray-400 font-normal">(Materia Medica)</span>
            </div>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <ShoppingCart className="w-5 h-5" />
            E-commerce Orders
          </a>
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <Settings className="w-5 h-5" />
            Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Log Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-gray-800">Doctor Clinical Dashboard</h1>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <span className="font-medium text-gray-700">Dr. Aisha Khan</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
            
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              
              {/* Patient Queue Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Unified Patient Queue</h2>
                    <button className="bg-[#28926c] hover:bg-[#1f7355] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                      <Plus className="w-4 h-4" />
                      Register Walk-In
                    </button>
                  </div>
                  
                  <div className="flex gap-6 border-b border-gray-200">
                    <button className="px-1 py-3 text-[#0d47a1] font-semibold border-b-2 border-[#0d47a1]">All</button>
                    <button className="px-1 py-3 text-gray-500 font-medium hover:text-gray-700">Digital</button>
                    <button className="px-1 py-3 text-gray-500 font-medium hover:text-gray-700">Walk-in</button>
                  </div>
                </div>

                <div className="p-4">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden block md:table">
                    <thead className="bg-[#f8fafc] text-gray-900 font-bold border-b border-gray-200 text-sm hidden md:table-header-group">
                      <tr>
                        <th className="px-6 py-4">Patient</th>
                        <th className="px-6 py-4">Complaint</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-[15px]">
                      <tr className="hover:bg-gray-50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Patient:</span>Priya Sharma (Digital)</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Complaint:</span>Migraine</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Status:</span>(10 min)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Patient:</span>Rahul Gupta (Walk-in)</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Complaint:</span>Skin Eczema</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Status:</span>(Now)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Patient:</span>Anjali Desai (Digital)</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Complaint:</span>Allergies</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Status:</span>(25 min)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Patient:</span>Vikram Singh (Walk-in)</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Complaint:</span>Fever</td>
                        <td className="px-6 py-4 md:table-cell block"><span className="md:hidden font-bold mr-2">Status:</span>(45 min)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Patient Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Active Patient Details: Priya Sharma</h2>
                
                <div className="flex gap-6 border-b border-gray-200 mb-6">
                  <button 
                    className={`px-1 py-3 font-medium ${activeTab === 'Profile' ? 'text-[#0d47a1] border-b-2 border-[#0d47a1]' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('Profile')}
                  >Profile</button>
                  <button 
                    className={`px-1 py-3 font-medium ${activeTab === 'Consultation Notes' ? 'text-[#0d47a1] border-b-2 border-[#0d47a1]' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('Consultation Notes')}
                  >Consultation Notes</button>
                  <button 
                    className={`px-1 py-3 font-medium ${activeTab === 'History' ? 'text-[#0d47a1] border-b-2 border-[#0d47a1]' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('History')}
                  >History</button>
                </div>

                {activeTab === 'Consultation Notes' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Current Complaints</h3>
                    <p className="text-gray-800 leading-relaxed">
                      Left-sided migraine, throbbing pain, worse with light and noise. Better with pressure and cold applications.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column (AI Copilot) */}
            <div className="w-full lg:w-96 flex flex-col">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                <div className="bg-[#0b5cce] text-white px-6 py-4">
                  <h2 className="font-bold text-lg">AI Copilot (Homeopathic CDS)</h2>
                </div>
                
                <div className="p-6 flex-1 flex flex-col gap-4 bg-[#f8fafc]">
                  <h3 className="font-bold text-gray-900 mb-2 text-[17px]">Top Remedy Matches (AI)</h3>
                  
                  {/* Remedy 1 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-900">Belladonna (92%)</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#27ae60] rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 text-sm">
                      <h4 className="font-bold text-gray-900 mb-2">Citations</h4>
                      <div className="space-y-3">
                        <p className="text-gray-700 leading-snug">
                          <strong className="text-gray-900 font-bold">Boericke:</strong> 'Congestive headache, throbbing, with flushed face and hot head. Pain worse from jar, noise, light.'
                        </p>
                        <p className="text-gray-700 leading-snug">
                          <strong className="text-gray-900 font-bold">Kent:</strong> 'Sudden onset, violent throbbing, worse lying down. Eyes red.'
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remedy 2 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-900">Nux Vomica (85%)</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#27ae60] rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  {/* Remedy 3 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-900">Sanguinaria (78%)</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#27ae60] rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <button className="w-full bg-[#0b5cce] hover:bg-[#0a4bb0] text-white py-3 rounded-lg font-bold transition-colors shadow-sm">
                      Sign Prescription
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
