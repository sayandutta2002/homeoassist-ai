"use client";

import React, { useState } from 'react';
import { 
  Leaf,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';

export default function LedgerPage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col relative">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-8 shrink-0">
        <div className="flex items-center gap-2">
          <Leaf className="text-emerald-600 w-6 h-6" />
          <span className="text-xl font-bold text-gray-800">HomeoAssist AI</span>
        </div>
        
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-gray-500 hover:text-gray-900">Dashboard</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Patients</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Prescriptions</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Profile</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Prescription & AI Override Ledger</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Patient Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Patient Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Patient Name</label>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 font-medium">
                  John Doe
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Patient ID</label>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 font-medium">
                  #HA-12345
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Age</label>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 font-medium">
                  45
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 font-medium">
                  October 26, 2023
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Prescription Details</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">AI Recommendation</label>
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">AI Suggested Remedy</div>
                  <div className="text-gray-800">Arnica montana, 30C</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="font-bold text-gray-900">Doctor's Prescription</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remedy</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Rhus toxicodendron</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Potency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>200C</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Instructions</label>
                <input 
                  type="text" 
                  value="Take 5 pills twice daily for 3 days."
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors">
                Submit Prescription
              </button>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">Digital Signature</h2>
          </div>
          
          <div className="flex-1 max-w-sm">
            <label className="block text-sm text-gray-700 mb-2">Signature pad</label>
            <div className="border border-dashed border-gray-300 rounded-md h-24 bg-gray-50 flex items-center justify-center relative mb-2">
               {/* Faked signature image using styled text to look handwritten */}
               <span className="font-['Brush_Script_MT',cursive] text-4xl text-gray-800 italic" style={{fontFamily: 'cursive'}}>Emily Carter</span>
            </div>
            <div className="text-sm text-gray-700">
              Dr. Emily Carter, MD (Homeopathy)
            </div>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div className="absolute inset-0 bg-gray-500/30 flex items-center justify-center z-50 p-4 min-h-screen">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 relative -top-20">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Clinical Override Confirmation</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5">
              <div className="flex gap-3 text-sm text-gray-800 mb-4 font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  You have selected a remedy (Rhus toxicodendron) that differs from the AI recommendation (Arnica montana). Please provide a clinical justification for this override.
                </p>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-800 mb-2">Justification Reason</label>
                <textarea 
                  className="w-full border-2 border-blue-400 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none shadow-sm"
                  placeholder="Enter your clinical reasoning here..."
                ></textarea>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors shadow-sm"
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
