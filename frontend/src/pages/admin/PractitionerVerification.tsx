import React, { useEffect, useState } from 'react';

interface Practitioner {
  user_id: string;
  full_name: string;
  tenant_name: string;
  aadhaar_number: string;
  medical_council: string;
  reg_number: string;
}

const PractitionerVerification: React.FC = () => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPractitioners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/admin/pending-practitioners');
      if (!res.ok) throw new Error('Failed to fetch practitioners');
      const data = await res.json();
      setPractitioners(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  const handleAction = async (userId: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`/admin/${action}-practitioner/${userId}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`Failed to ${action}`);
      // Refresh list
      setPractitioners((prev) => prev.filter(p => p.user_id !== userId));
    } catch (err: any) {
      alert(err.message || `Error attempting to ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-body-md text-on-surface">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Practitioner Verification</h1>
            <p className="text-gray-600 mt-2">Review and verify pending practitioner applications.</p>
          </div>
          <button 
            onClick={fetchPractitioners}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Refresh</span>
          </button>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-3">
             <span className="material-symbols-outlined">error</span>
             <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Practitioner Name</th>
                  <th className="px-6 py-4">Tenant / Clinic</th>
                  <th className="px-6 py-4">Aadhaar Number</th>
                  <th className="px-6 py-4">Medical Council & Reg</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center space-x-2">
                         <span className="material-symbols-outlined animate-spin">progress_activity</span>
                         <span>Loading practitioners...</span>
                      </div>
                    </td>
                  </tr>
                ) : practitioners.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No pending practitioners for verification.
                    </td>
                  </tr>
                ) : (
                  practitioners.map((practitioner) => (
                    <tr key={practitioner.user_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{practitioner.full_name}</div>
                        <div className="text-gray-500 text-xs mt-1">ID: {practitioner.user_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {practitioner.tenant_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-700">
                        {practitioner.aadhaar_number}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{practitioner.medical_council}</div>
                        <div className="text-gray-500 text-xs mt-1">{practitioner.reg_number}</div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          onClick={() => handleAction(practitioner.user_id, 'approve')}
                          className="inline-flex items-center justify-center rounded-lg bg-green-50 text-green-700 px-3 py-2 text-sm font-medium hover:bg-green-100 border border-green-200 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] mr-1">check_circle</span>
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(practitioner.user_id, 'reject')}
                          className="inline-flex items-center justify-center rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm font-medium hover:bg-red-100 border border-red-200 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] mr-1">cancel</span>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PractitionerVerification;
