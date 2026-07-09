'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle, Award, RefreshCw, Search } from 'lucide-react';

interface Registration {
  _id: string;
  studentName: string;
  schoolName: string;
  class: string;
  isAttended: boolean;
  certificateIssued: boolean;
  idCardUrl: string;
}

export default function AdminCertificates() {
  const [pendingRegistrations, setPendingRegistrations] = useState<Registration[]>([]);
  const [completedRegistrations, setCompletedRegistrations] = useState<Registration[]>([]);
  const [allPendingRegistrations, setAllPendingRegistrations] = useState<Registration[]>([]);
  const [allCompletedRegistrations, setAllCompletedRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [issuingLoadingId, setIssuingLoadingId] = useState<string | null>(null);

  const fetchRegistrations = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const pendingResponse = await fetch('/api/admin/registrations?isAttended=true&certificateIssued=false&limit=1000');
      if (pendingResponse.ok) {
        const pendingData = await pendingResponse.json();
        const pendingRegs = pendingData.registrations || [];
        setAllPendingRegistrations(pendingRegs);
        setPendingRegistrations(pendingRegs);
      }

      const completedResponse = await fetch('/api/admin/registrations?isAttended=true&certificateIssued=true&limit=1000');
      if (completedResponse.ok) {
        const completedData = await completedResponse.json();
        const completedRegs = completedData.registrations || [];
        setAllCompletedRegistrations(completedRegs);
        setCompletedRegistrations(completedRegs);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleRefresh = () => {
    fetchRegistrations(true);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setPendingRegistrations(allPendingRegistrations);
      setCompletedRegistrations(allCompletedRegistrations);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    const filteredPending = allPendingRegistrations.filter(reg =>
      reg.studentName.toLowerCase().includes(searchLower)
    );
    
    const filteredCompleted = allCompletedRegistrations.filter(reg =>
      reg.studentName.toLowerCase().includes(searchLower)
    );

    setPendingRegistrations(filteredPending);
    setCompletedRegistrations(filteredCompleted);
  };

  const issueCertificate = async (id: string) => {
    setIssuingLoadingId(id);
    try {
      const response = await fetch(`/api/admin/registrations/${id}/certificate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ certificateIssued: true }),
      });

      if (response.ok) {
        const registration = pendingRegistrations.find(reg => reg._id === id);
        if (registration) {
          const updatedRegistration = { ...registration, certificateIssued: true };
          setPendingRegistrations(prev => prev.filter(reg => reg._id !== id));
          setCompletedRegistrations(prev => [updatedRegistration, ...prev]);
          
          setAllPendingRegistrations(prev => prev.filter(reg => reg._id !== id));
          setAllCompletedRegistrations(prev => [updatedRegistration, ...prev]);
          
          toast.success(`Certificate issued for ${registration.studentName}`);
        }
      } else {
        toast.error('Failed to issue certificate');
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast.error('Error issuing certificate');
    } finally {
      setIssuingLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72388f] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold font-roboto-condensed uppercase tracking-wider">Loading certificate data...</p>
      </div>
    );
  }

  return (
    <>
      {/* Common Search and Refresh */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by participant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Pending Certification ({pendingRegistrations.length})
            </h2>
          </div>
          
          {pendingRegistrations.length > 0 ? (
            <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
              {pendingRegistrations.map((registration) => (
                <div key={registration._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{registration.studentName}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-0.5">Class {registration.class}</p>
                    </div>
                    
                    <button
                      onClick={() => issueCertificate(registration._id)}
                      disabled={issuingLoadingId === registration._id}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#72388f] hover:bg-[#361152] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {issuingLoadingId === registration._id ? (
                        <>
                          <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-current" />
                          Issuing...
                        </>
                      ) : (
                        'Issue Certificate'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-semibold">No pending certifications</p>
              <p className="text-gray-400 text-sm mt-1">All present participants have been certified</p>
            </div>
          )}
        </div>

        {/* Issued Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Issued Certificates ({completedRegistrations.length})
            </h2>
          </div>
          
          {completedRegistrations.length > 0 ? (
            <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
              {completedRegistrations.map((registration) => (
                <div key={registration._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{registration.studentName}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-0.5">Class {registration.class}</p>
                    </div>
                    
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-semibold">No completed certifications</p>
              <p className="text-gray-400 text-sm mt-1">Certificates will appear here once issued</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
