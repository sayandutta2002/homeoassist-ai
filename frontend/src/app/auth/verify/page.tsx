import React from 'react';
import { Paperclip, Lock, ChevronDown, Plus } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Mock Logo */}
          <div className="w-8 h-8 bg-[#4a72d3] flex items-center justify-center rounded text-white relative shadow-sm">
             <Plus className="w-5 h-5 absolute" strokeWidth={4} />
             <span className="font-bold text-lg relative z-10 drop-shadow-md text-white">H</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">HomeoAssist AI</span>
        </div>
        
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 shadow-sm">
            English
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[600px] mx-auto mt-12 px-4 pb-12">
        {/* Progress Step */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-3">
            Step 2 of 2: <span className="font-bold text-gray-900">Doctor Verification</span>
          </p>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#4a72d3] rounded-full w-full"></div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Doctor Verification</h1>
          <p className="text-gray-600 text-sm mb-8">
            To access professional features, please upload your credentials for verification.
          </p>

          {/* Medical Council ID Upload */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Medical Council ID</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-[#f8fafc] flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-500 text-sm pl-2">Drag and drop zone</span>
              <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Paperclip className="w-4 h-4 text-gray-500" />
                Upload File
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 pl-1">
              Supported formats: PDF, JPEG, PNG (Max 5MB). Selected: <span className="text-gray-700 font-medium">medical_id_doc.pdf</span>
            </p>
          </div>

          {/* Government ID Upload */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Government ID</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-[#f8fafc] flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-500 text-sm pl-2">Drag and drop zone</span>
              <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Paperclip className="w-4 h-4 text-gray-500" />
                Upload File
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 pl-1">
              Supported formats: PDF, JPEG, PNG (Max 5MB). No file selected.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="flex-1 bg-[#e2e8f0] hover:bg-[#cbd5e1] text-gray-700 font-medium py-2.5 rounded-lg transition-colors">
              Back
            </button>
            <button className="flex-1 bg-[#8faae6] hover:bg-[#7a99e0] text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center shadow-sm">
              Continue
            </button>
            <div className="text-gray-400 pl-2">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
