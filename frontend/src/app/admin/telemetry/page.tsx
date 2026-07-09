"use client";

import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";
import { ChevronDown, Calendar, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const llmData = Array.from({ length: 40 }).map((_, i) => ({
  name: i,
  gpt4: 200 + Math.random() * 300,
  claude: 150 + Math.random() * 200,
}));

const vectorDbData = Array.from({ length: 40 }).map((_, i) => ({
  name: i,
  time: 50 + Math.random() * 80,
}));

const driftData = Array.from({ length: 20 }).map((_, i) => ({
  name: i,
  drift: (i - 10) * 1.5 + Math.random() * 2,
}));

const doctors = [
  { name: "Dr. Anya Sharma", credentials: "BHMS, MD (Hom.)", docs: "View Docs", date: "2024-05-10", tenant: "T-1024", status: "Pending" },
  { name: "Dr. Kenji Tanaka", credentials: "PhD, N.D.", docs: "View Docs", date: "2024-05-09", tenant: "T-1026", status: "Under Review" },
  { name: "Dr. Matruharmoak", credentials: "BHMS, MD (Hom.)", docs: "View Docs", date: "2024-05-09", tenant: "T-1024", status: "Pending" },
  { name: "Dr. Mark Sharah", credentials: "BHMS, O/ N.D.", docs: "View Docs", date: "2024-05-09", tenant: "T-1026", status: "Under Review" },
];

const revenueData = Array.from({ length: 15 }).map((_, i) => ({
  name: `3/${i + 16}`,
  boiron: Math.random() * 1000 + 500,
  schwabe: Math.random() * 800 + 400,
  reckeweg: Math.random() * 600 + 300,
  others: Math.random() * 400 + 100,
}));

export default function TelemetryPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-[var(--color-surface)] border-b border-[var(--color-outline-variant)] sticky top-0 z-10">
        <h1 className="text-3xl font-bold font-[var(--font-headline-lg)]">System Admin Telemetry & Ops</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Tenant ID Filter</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-[var(--color-outline-variant)] rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                <option>All Tenants</option>
                <option>T-1024 (North America)</option>
                <option>T-1025 (Europe)</option>
                <option>T-1028 (Asia)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-3 text-[var(--color-outline)] pointer-events-none" />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center bg-white border border-[var(--color-outline-variant)] rounded-md px-4 py-2 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-[var(--color-outline)]" />
              <span>Last 24 Hours</span>
              <ChevronDown className="w-4 h-4 ml-4 text-[var(--color-outline)]" />
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#4c6a95] text-white px-4 py-2 rounded-md hover:bg-[#3b5478] transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8 max-w-[var(--spacing-max-width)] mx-auto">
        
        {/* Live System Telemetry */}
        <section>
          <h2 className="text-xl font-bold mb-4">Live System Telemetry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* LLM Latency */}
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">LLM Latency (P99)</h3>
                  <p className="text-xs text-gray-500">LLM Latency Instrumentation</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">450ms</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">↓ 2%</span>
                </div>
              </div>
              <div className="h-48 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={llmData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 600]} ticks={[0, 200, 400, 600]} tickFormatter={(val) => `${val}ms`} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="gpt4" stroke="#4a7eb3" strokeWidth={2} dot={false} name="GPT-4" />
                    <Line type="monotone" dataKey="claude" stroke="#8da3b8" strokeWidth={2} dot={false} name="Claude-3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vector DB Retrieval */}
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">Vector DB Retrieval Times</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">120ms avg.</span>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">↑ 5%</span>
                </div>
              </div>
              <div className="h-48 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vectorDbData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 150]} ticks={[0, 50, 120, 150]} tickFormatter={(val) => `${val}ms`} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="time" stroke="#4a7eb3" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Drift Monitor */}
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">System Drift Monitor</h3>
                  <p className="text-xs text-gray-500">Model vs. Production Data</p>
                </div>
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-medium">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Drift Detected: +1.2% on Symptom Analysis</span>
                </div>
              </div>
              <div className="h-48 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={driftData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[-5, 15]} ticks={[-5, 0, 15]} tickFormatter={(val) => `${val}%`} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="drift">
                      {driftData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.drift > 0 ? "#4a7eb3" : "#d97736"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </section>

        {/* Doctor Verification Queue */}
        <section>
          <h2 className="text-xl font-bold mb-4">Doctor Verification Queue</h2>
          <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-[var(--color-outline-variant)]">
                <tr>
                  <th className="px-4 py-3">Doctor Name</th>
                  <th className="px-4 py-3">Credentials (Uploads)</th>
                  <th className="px-4 py-3 flex items-center">Submitted On <ChevronDown className="w-3 h-3 ml-1" /></th>
                  <th className="px-4 py-3">Tenant ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((doc, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{doc.name}</td>
                    <td className="px-4 py-3">
                      {doc.credentials} - <a href="#" className="text-blue-600 hover:underline">[{doc.docs}]</a>
                    </td>
                    <td className="px-4 py-3">{doc.date}</td>
                    <td className="px-4 py-3">{doc.tenant}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {doc.status === 'Pending' ? (
                        <button className="bg-emerald-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-emerald-700">Approve</button>
                      ) : (
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300">Review</button>
                      )}
                      <button className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-red-700">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-[var(--color-outline-variant)] flex items-center justify-center text-sm text-gray-500 gap-2">
              <button className="px-2 py-1 text-gray-400 hover:text-gray-700 disabled:opacity-50">&lt;&lt;</button>
              <button className="px-2 py-1 bg-white border border-gray-300 rounded text-blue-600 font-medium">1</button>
              <button className="px-2 py-1 hover:bg-gray-50 rounded">2</button>
              <button className="px-2 py-1 hover:bg-gray-50 rounded">3</button>
              <span>...</span>
              <button className="px-2 py-1 text-gray-600 hover:text-gray-900">&gt;</button>
              <button className="px-2 py-1 text-gray-600 hover:text-gray-900">&gt;&gt;</button>
            </div>
          </div>
        </section>

        {/* E-commerce Revenue */}
        <section>
          <h2 className="text-xl font-bold mb-4">E-commerce Revenue & Commissions</h2>
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] p-6 flex-1">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg">Partner Pharmacy Commissions (Last 30 Days)</h3>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="boiron" stackId="a" fill="#4a7eb3" />
                    <Bar dataKey="schwabe" stackId="a" fill="#5fb4a2" />
                    <Bar dataKey="reckeweg" stackId="a" fill="#d97736" />
                    <Bar dataKey="others" stackId="a" fill="#9b72b0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-outline-variant)] p-6 w-full md:w-72 flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">Total Revenue</h4>
                <div className="text-3xl font-bold">$491,250</div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">Avg. Commission Rate</h4>
                <div className="text-2xl font-bold">20%</div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">Top Partner</h4>
                <div className="text-xl font-bold">Boiron ($42,100)</div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
