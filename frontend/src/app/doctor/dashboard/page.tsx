import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Pill, 
  ShoppingCart, 
  Settings, 
  LogOut,
  ChevronDown,
  Plus,
  Stethoscope
} from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Stethoscope className="text-teal-600 w-6 h-6 mr-2" />
          <span className="text-lg font-bold text-gray-800">HomeoAssist AI</span>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            <li>
              <a href="#" className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Users className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">Patients</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">Appointments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex flex-col px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <div className="flex items-center">
                  <Pill className="w-5 h-5 mr-3 text-gray-500" />
                  <span className="font-medium">Remedies</span>
                </div>
                <span className="text-xs text-gray-500 ml-8">(Materia Medica)</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <ShoppingCart className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">E-commerce Orders</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-1">
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Settings className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Settings</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-medium">Log Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-xl font-semibold text-gray-800">Doctor Clinical Dashboard</h1>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">Dr. Aisha Khan</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 flex gap-6">
          
          {/* Center Column */}
          <div className="flex-1 flex flex-col space-y-6">
            
            {/* Unified Patient Queue */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden shrink-0">
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Unified Patient Queue</h2>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Register Walk-In
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">All</button>
                  <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">Digital</button>
                  <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">Walk-in</button>
                </div>
                
                {/* Table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700 text-sm border-b border-gray-200">
                      <th className="py-3 px-4 font-semibold">Patient</th>
                      <th className="py-3 px-4 font-semibold">Complaint</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-800">
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Priya Sharma <span className="text-gray-500">(Digital)</span></td>
                      <td className="py-3 px-4">Migraine</td>
                      <td className="py-3 px-4 text-gray-600">(10 min)</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Rahul Gupta <span className="text-gray-500">(Walk-in)</span></td>
                      <td className="py-3 px-4">Skin Eczema</td>
                      <td className="py-3 px-4 text-gray-600">(Now)</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Anjali Desai <span className="text-gray-500">(Digital)</span></td>
                      <td className="py-3 px-4">Allergies</td>
                      <td className="py-3 px-4 text-gray-600">(25 min)</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Vikram Singh <span className="text-gray-500">(Walk-in)</span></td>
                      <td className="py-3 px-4">Fever</td>
                      <td className="py-3 px-4 text-gray-600">(45 min)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Patient Details */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-5 shrink-0">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Patient Details: Priya Sharma</h2>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">Profile</button>
                <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">Consultation Notes</button>
                <button className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">History</button>
              </div>
              
              <div className="mb-2">
                <h3 className="font-semibold text-gray-800 mb-1">Current Complaints</h3>
                <p className="text-gray-700 text-sm">
                  Left-sided migraine, throbbing pain, worse with light and noise. Better with pressure and cold applications.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: AI Copilot */}
          <div className="w-[350px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col shrink-0 h-fit">
            <div className="bg-[#1967d2] text-white p-4">
              <h2 className="font-medium text-lg">AI Copilot (Homeopathic CDS)</h2>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 mb-4">Top Remedy Matches (AI)</h3>
              
              <div className="space-y-4 flex-1">
                {/* Remedy 1 */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="p-3 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Belladonna (92%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 border-t border-gray-100 text-sm">
                    <h4 className="font-bold text-gray-800 mb-1">Citations</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Boericke:</span> 'Congestive headache, throbbing, with flushed face and hot head. Pain worse from jar, noise, light.'
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Kent:</span> 'Sudden onset, violent throbbing, worse lying down. Eyes red.'
                    </p>
                  </div>
                </div>

                {/* Remedy 2 */}
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Nux Vomica (85%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>

                {/* Remedy 3 */}
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Sanguinaria (78%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4">
                <button className="w-full bg-[#1967d2] hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors">
                  Sign Prescription
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
