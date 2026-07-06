'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import AdminStats from '@/components/admin/AdminStats';
import AdminTable from '@/components/admin/AdminTable';
import AdminAttendance from '@/components/admin/AdminAttendance';
import AdminCentralRegistration from '@/components/admin/AdminCentralRegistration';
import AdminCertificates from '@/components/admin/AdminCertificates';

type AdminTab = 'dashboard' | 'attendance' | 'central-registration' | 'certificate';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf7e3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72388f]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fcf7e3] text-[#361152] flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Constant Header Banner */}
      <div className="bg-gradient-to-r from-[#72388f] to-[#361152] text-white p-6 shadow-md border-b-2 border-[#72388f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-200 mt-1.5 text-sm">Jigisha 5.0 Event Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-center bg-white/10 hover:bg-white/20 text-white border border-white/40 px-4 py-2.5 rounded-lg transition-colors duration-300 font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto p-6 flex-1 flex flex-col">
        {/* Constant Tab Navigation Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
          <nav className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-[#72388f] text-white' 
                  : 'text-gray-600 hover:text-[#72388f]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'attendance' 
                  ? 'bg-[#72388f] text-white' 
                  : 'text-gray-600 hover:text-[#72388f]'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('central-registration')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'central-registration' 
                  ? 'bg-[#72388f] text-white' 
                  : 'text-gray-600 hover:text-[#72388f]'
              }`}
            >
              Central Registration
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'certificate' 
                  ? 'bg-[#72388f] text-white' 
                  : 'text-gray-600 hover:text-[#72388f]'
              }`}
            >
              Certificates
            </button>
          </nav>
        </div>

        {/* Toggle-based Page Render area (No full page reload) */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'dashboard' && (
            <>
              <AdminStats />
              <AdminTable />
            </>
          )}
          {activeTab === 'attendance' && <AdminAttendance />}
          {activeTab === 'central-registration' && <AdminCentralRegistration />}
          {activeTab === 'certificate' && <AdminCertificates />}
        </div>
      </div>
    </div>
  );
}
