'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Calendar, School, User, Phone, Mail, Eye, RefreshCw, X } from 'lucide-react';

interface Registration {
  _id: string;
  studentName: string;
  schoolName: string;
  class: string;
  dob: string | null;
  age?: number | null;
  email: string;
  mobileNumber: string;
  altMobileNumber: string;
  contactName?: string;
  idCardUrl: string;
  createdAt: string;
  isAttended: boolean;
  certificateIssued: boolean;
  foodOption: string;
}

interface TableData {
  registrations: Registration[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export default function AdminTable() {
  const [data, setData] = useState<TableData>({
    registrations: [],
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 10
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [attendanceLoadingId, setAttendanceLoadingId] = useState<string | null>(null);
  const [certificateLoadingId, setCertificateLoadingId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const params = new URLSearchParams({
        page: data.page.toString(),
        limit: data.limit.toString(),
        search: searchTerm,
        class: classFilter,
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/admin/registrations?${params}`);
      const result = await response.json();
      setData(prev => ({ ...prev, ...result }));
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [data.page, data.limit, searchTerm, classFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleRefresh = () => {
    fetchRegistrations(true);
  };

  const toggleAttendance = async (id: string, newValue: boolean) => {
    setAttendanceLoadingId(id);
    try {
      const response = await fetch(`/api/admin/registrations/${id}/attendance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAttended: newValue }),
      });

      if (response.ok) {
        setData(prev => ({
          ...prev,
          registrations: prev.registrations.map(reg =>
            reg._id === id ? { ...reg, isAttended: newValue } : reg
          )
        }));
      } else {
        console.error('Failed to update attendance');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    } finally {
      setAttendanceLoadingId(null);
    }
  };

  const toggleCertificate = async (id: string, newValue: boolean) => {
    setCertificateLoadingId(id);
    try {
      const response = await fetch(`/api/admin/registrations/${id}/certificate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ certificateIssued: newValue }),
      });

      if (response.ok) {
        setData(prev => ({
          ...prev,
          registrations: prev.registrations.map(reg =>
            reg._id === id ? { ...reg, certificateIssued: newValue } : reg
          )
        }));
      } else {
        console.error('Failed to update certificate status');
      }
    } catch (error) {
      console.error('Error updating certificate status:', error);
    } finally {
      setCertificateLoadingId(null);
    }
  };

  const openModal = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageUrl('');
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTimestamp = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const classes = ['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#72388f] to-[#361152] text-white p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">All Registrations</h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#72388f] font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#72388f]"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#72388f] appearance-none bg-white font-medium"
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show:</label>
              <select
                value={data.limit}
                onChange={(e) => setData(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
                className="px-3 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#72388f] font-medium"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72388f] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading registrations...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('studentName')}
                >
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Student Name
                    {sortBy === 'studentName' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('schoolName')}
                >
                  <div className="flex items-center gap-1">
                    <School className="h-4 w-4" />
                    School Name
                    {sortBy === 'schoolName' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('class')}
                >
                  <div className="flex items-center gap-1">
                    Class
                    {sortBy === 'class' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('dob')}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                    {sortBy === 'dob' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Registration Date
                    {sortBy === 'createdAt' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Contact
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Certificate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Food
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID Card
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.registrations.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center text-gray-500 font-semibold">
                    No registrations found matching the filters.
                  </td>
                </tr>
              ) : (
                data.registrations.map((registration) => (
                  <tr key={registration._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {registration.studentName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {registration.schoolName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#72388f] text-white">
                        Class {registration.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {registration.dob ? formatDate(registration.dob) : registration.age ? `${registration.age} years` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span title={new Date(registration.createdAt).toLocaleString('en-IN')}>
                        {formatTimestamp(registration.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registration.contactName && (
                        <div className="text-xs font-bold text-[#72388f] mb-1">{registration.contactName} (Teacher)</div>
                      )}
                      <div className="text-sm text-gray-900 font-medium">{registration.mobileNumber}</div>
                      {registration.altMobileNumber && (
                        <div className="text-sm text-gray-500">{registration.altMobileNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate font-medium">
                        {registration.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleAttendance(registration._id, !registration.isAttended)}
                        disabled={attendanceLoadingId === registration._id}
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          registration.isAttended
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {attendanceLoadingId === registration._id ? (
                          <>
                            <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1.5" />
                            Loading...
                          </>
                        ) : registration.isAttended ? (
                          '✓ Attended'
                        ) : (
                          '○ Not Attended'
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleCertificate(registration._id, !registration.certificateIssued)}
                        disabled={certificateLoadingId === registration._id}
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          registration.certificateIssued
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {certificateLoadingId === registration._id ? (
                          <>
                            <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1.5" />
                            Loading...
                          </>
                        ) : registration.certificateIssued ? (
                          '✓ Issued'
                        ) : (
                          '○ Not Issued'
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registration.idCardUrl ? (
                        <button
                          onClick={() => openModal(registration.idCardUrl)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-bold uppercase">No Attachment</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          registration.foodOption === 'NON_VEG'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-green-50 text-green-800 border border-green-200'
                        }`}
                      >
                        {registration.foodOption === 'NON_VEG' ? '🔺 Non-Veg' : '🟢 Veg'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setData(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={data.page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setData(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
            disabled={data.page === data.totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">
              Showing <span className="font-bold">{(data.page - 1) * data.limit + 1}</span> to{' '}
              <span className="font-bold">
                {Math.min(data.page * data.limit, data.total)}
              </span>{' '}
              of <span className="font-bold">{data.total}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setData(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={data.page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {[...Array(Math.min(5, data.totalPages))].map((_, i) => {
                const pageNum = Math.max(1, data.page - 2) + i;
                if (pageNum > data.totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setData(prev => ({ ...prev, page: pageNum }))}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-semibold cursor-pointer ${
                      pageNum === data.page
                        ? 'z-10 bg-[#72388f] border-[#72388f] text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setData(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                disabled={data.page === data.totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* ID Card Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full flex flex-col shadow-2xl border-2 border-gray-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">ID Card Document</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-gray-50">
              <div className="flex justify-center">
                {currentImageUrl ? (
                  <div className="w-full">
                    {(() => {
                      const url = currentImageUrl.toLowerCase();
                      const isPdf = url.includes('mime=application%2fpdf') || url.includes('.pdf');
                      if (isPdf) {
                        return (
                          <div className="w-full h-[70vh] border border-gray-300 rounded-lg overflow-hidden bg-white">
                            <iframe
                              src={currentImageUrl}
                              className="w-full h-full"
                              title="ID Card PDF"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div className="relative w-full h-[70vh] flex justify-center bg-white border border-gray-300 rounded-lg overflow-hidden p-2">
                            <img
                              src={currentImageUrl}
                              alt="ID Card"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const errorDiv = target.parentElement;
                                if (errorDiv) {
                                  errorDiv.innerHTML = `
                                    <div class="flex items-center justify-center h-full text-center text-gray-500">
                                      <div>
                                        <div class="text-4xl mb-2">❌</div>
                                        <p class="text-lg font-bold">Failed to load image</p>
                                        <p class="text-sm">The attachment could not be displayed</p>
                                      </div>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                        );
                      }
                    })()}
                    
                    {/* Download button */}
                    <div className="mt-4 flex justify-center">
                      <a
                        href={currentImageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-[#72388f] text-white font-bold rounded-lg hover:bg-[#361152] transition-colors duration-300 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Document
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-8">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-lg font-bold">No document available</p>
                    <p className="text-sm">The ID card document could not be loaded.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
