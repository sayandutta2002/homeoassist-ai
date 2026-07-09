import { ArrowLeft, BookOpen, AlertTriangle, Stethoscope, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CopilotPage({ params }: { params: { patientId: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col h-screen">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/doctor/dashboard" className="text-slate-400 hover:text-slate-600 transition">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-bold text-slate-800 text-xl">Consultation: {params.patientId}</h1>
            <p className="text-sm text-slate-500">AI Triage Completed at 10:45 AM</p>
          </div>
        </div>
        <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Override Ledger
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Patient Context */}
        <div className="w-1/3 bg-white border-r border-slate-200 overflow-y-auto p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Patient Triage Data</h2>
          <div className="bg-slate-50 p-4 rounded-xl mb-6">
            <h3 className="font-medium text-slate-800 mb-2">Chief Complaint</h3>
            <p className="text-slate-600 text-sm">Severe left-sided headache, throbbing pain, worse with light and noise. Accompanied by mild nausea.</p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2 items-start">
              <Stethoscope className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-slate-700 text-sm">Vitals (Reported)</h4>
                <p className="text-slate-500 text-sm">Temp: 98.6°F | BP: Normal</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Copilot & Materia Medica */}
        <div className="w-2/3 bg-slate-50 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-blue-50/50 backdrop-blur-[2px] z-0 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Materia Medica Copilot</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm">98% Match</span>
                  Spigelia
                </h3>
              </div>
              <p className="text-slate-600 mb-4">
                Highly indicated for left-sided migraines, throbbing pain, and photophobia. Aligns perfectly with the patient's reported symptoms of severe left-sided cephalalgia.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition flex justify-center items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Prescribe Spigelia 200C
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 opacity-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-sm">75% Match</span>
                  Sanguinaria Canadensis
                </h3>
              </div>
              <p className="text-slate-600">
                Secondary consideration. Typically right-sided, but covers throbbing headaches with nausea. Less indicated due to the left-sided nature of current complaint.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
