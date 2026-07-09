'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Search, User, Phone, School, Eye, CheckCircle, Edit } from 'lucide-react';

interface Registration {
  _id: string;
  studentName: string;
  schoolName: string;
  class: string;
  mobileNumber: string;
  altMobileNumber: string;
  idCardUrl: string;
  isAttended: boolean;
}

export default function AdminAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [editFormData, setEditFormData] = useState({
    studentName: '',
    mobileNumber: '',
    altMobileNumber: ''
  });

  const [attendanceLoadingId, setAttendanceLoadingId] = useState<string | null>(null);

  const [nonAttendedList, setNonAttendedList] = useState<Registration[]>([]);
  const [nonAttendedLoading, setNonAttendedLoading] = useState(false);
  const [nonAttendedPage, setNonAttendedPage] = useState(1);
  const [nonAttendedTotalPages, setNonAttendedTotalPages] = useState(1);
  const [nonAttendedTotalCount, setNonAttendedTotalCount] = useState(0);

  const fetchNonAttended = async (page = 1) => {
    setNonAttendedLoading(true);
    try {
      const url = `/api/admin/registrations?isAttended=false&page=${page}&limit=10&sortBy=studentName&sortOrder=asc`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setNonAttendedList(data.registrations || []);
        setNonAttendedPage(data.page || 1);
        setNonAttendedTotalPages(data.totalPages || 1);
        setNonAttendedTotalCount(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching non-attended list:', error);
    } finally {
      setNonAttendedLoading(false);
    }
  };

  useEffect(() => {
    fetchNonAttended(1);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setRegistrations([]);
      return;
    }

    setLoading(true);
    try {
      const url = `/api/admin/registrations/search?q=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations || []);
      } else {
        setRegistrations([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttended = async (id: string) => {
    setAttendanceLoadingId(id);
    try {
      const response = await fetch(`/api/admin/registrations/${id}/attendance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAttended: true }),
      });

      if (response.ok) {
        setRegistrations(prev => 
          prev.map(reg => 
            reg._id === id ? { ...reg, isAttended: true } : reg
          )
        );
        toast.success('Participant marked as attended!');
        fetchNonAttended(nonAttendedPage);
      } else {
        toast.error('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Error marking attendance');
    } finally {
      setAttendanceLoadingId(null);
    }
  };

  const openModal = (url: string) => {
    setCurrentImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageUrl('');
  };

  const openEditModal = (reg: Registration) => {
    setEditingRegistration(reg);
    // Strip code '+91 ' if present for display in edit input
    const mob = reg.mobileNumber.replace('+91 ', '');
    const altMob = (reg.altMobileNumber || '').replace('+91 ', '');
    setEditFormData({
      studentName: reg.studentName,
      mobileNumber: mob,
      altMobileNumber: altMob
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingRegistration(null);
    setEditFormData({
      studentName: '',
      mobileNumber: '',
      altMobileNumber: ''
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mobileNumber' || name === 'altMobileNumber') {
      const digits = value.replace(/\D/g, '');
      setEditFormData(prev => ({ ...prev, [name]: digits }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRegistration) return;

    try {
      const response = await fetch(`/api/admin/registrations/${editingRegistration._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: editFormData.studentName,
          mobileNumber: `+91 ${editFormData.mobileNumber}`,
          altMobileNumber: editFormData.altMobileNumber ? `+91 ${editFormData.altMobileNumber}` : ''
        }),
      });

      if (response.ok) {
        setRegistrations(prev => 
          prev.map(reg => 
            reg._id === editingRegistration._id 
              ? { 
                  ...reg, 
                  studentName: editFormData.studentName,
                  mobileNumber: `+91 ${editFormData.mobileNumber}`,
                  altMobileNumber: editFormData.altMobileNumber ? `+91 ${editFormData.altMobileNumber}` : ''
                }
              : reg
          )
        );
        
        toast.success('Registration updated successfully!');
        fetchNonAttended(nonAttendedPage);
        closeEditModal();
      } else {
        toast.error('Failed to update registration');
      }
    } catch (error) {
      console.error('Error updating registration:', error);
      toast.error('Error updating registration');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, contact number, or school name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#72388f] focus:ring-1 focus:ring-[#72388f] outline-none text-gray-800"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !searchTerm.trim()}
            className="px-6 py-3 bg-[#72388f] text-white rounded-lg hover:bg-[#361152] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold cursor-pointer"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {registrations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Search Results ({registrations.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {registrations.map((registration) => (
              <div key={registration._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{registration.studentName}</p>
                            <button
                              onClick={() => openEditModal(registration)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-xs font-bold cursor-pointer"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 font-bold uppercase mt-1">Class {registration.class}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{registration.mobileNumber}</p>
                          {registration.altMobileNumber && (
                            <p className="text-sm text-gray-500">{registration.altMobileNumber}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <School className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 max-w-xs truncate">{registration.schoolName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 self-end lg:self-auto">
                    {registration.idCardUrl ? (
                      <button
                        onClick={() => openModal(registration.idCardUrl)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        View ID
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-bold uppercase mr-2">No ID Attached</span>
                    )}
                    
                    {!registration.isAttended ? (
                      <button
                        onClick={() => markAttended(registration._id)}
                        disabled={attendanceLoadingId === registration._id}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-lg hover:bg-green-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {attendanceLoadingId === registration._id ? (
                          <>
                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-current" />
                            Marking...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Mark Attended
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        Attended
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && registrations.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
          <p className="text-gray-500 text-lg font-medium">No registrations found matching your search.</p>
        </div>
      )}
      {/* Non-Attended Participants Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mt-8">
        <div className="px-6 py-4 bg-gray-50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Non-Attended Participants ({nonAttendedTotalCount})
            </h2>
            <p className="text-xs text-gray-500 font-semibold uppercase mt-0.5">
              Quick-mark gate entry checklist
            </p>
          </div>
          <button 
            onClick={() => fetchNonAttended(nonAttendedPage)}
            className="text-xs font-bold text-[#72388f] hover:text-[#361152] flex items-center gap-1 cursor-pointer"
          >
            🔄 Refresh List
          </button>
        </div>

        {nonAttendedLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#72388f] mx-auto"></div>
            <p className="text-gray-500 text-sm mt-2 font-semibold uppercase">Loading checklist...</p>
          </div>
        ) : nonAttendedList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/50 border-b border-gray-200">
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">Participant</th>
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">Class</th>
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">School</th>
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">Mobile</th>
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">ID Card</th>
                  <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {nonAttendedList.map((reg) => (
                  <tr key={reg._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{reg.studentName}</td>
                    <td className="px-6 py-4 font-semibold text-xs text-gray-500 uppercase">Class {reg.class}</td>
                    <td className="px-6 py-4 text-gray-700 text-sm max-w-xs truncate">{reg.schoolName}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{reg.mobileNumber}</td>
                    <td className="px-6 py-4">
                      {reg.idCardUrl ? (
                        <button
                          onClick={() => openModal(reg.idCardUrl)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View ID
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-bold uppercase">No ID</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEditModal(reg)}
                          className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => markAttended(reg._id)}
                          disabled={attendanceLoadingId === reg._id}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded font-bold text-xs cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
                        >
                          {attendanceLoadingId === reg._id ? (
                            <>
                              <span className="animate-spin rounded-full h-2.5 w-2.5 border-b-2 border-current" />
                              Marking...
                            </>
                          ) : (
                            '✓ Mark Attended'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p className="font-bold text-lg">All participants have attended!</p>
            <p className="text-sm mt-1">Excellent gate management completion rate.</p>
          </div>
        )}

        {/* Pagination controls */}
        {nonAttendedTotalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => fetchNonAttended(nonAttendedPage - 1)}
              disabled={nonAttendedPage === 1 || nonAttendedLoading}
              className="px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-700 font-bold text-xs hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs text-gray-600 font-bold">
              Page {nonAttendedPage} of {nonAttendedTotalPages}
            </span>
            <button
              onClick={() => fetchNonAttended(nonAttendedPage + 1)}
              disabled={nonAttendedPage === nonAttendedTotalPages || nonAttendedLoading}
              className="px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-700 font-bold text-xs hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* end container */}

      {/* ID Card Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col shadow-2xl border-2 border-gray-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">ID Card Document</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl"
              >
                ✕
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
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-8">
                    <p className="text-lg font-bold">No document available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Registration Modal */}
      {editModalOpen && editingRegistration && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full border-2 border-gray-200 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Edit Registration</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 bg-white">
              <div>
                <label htmlFor="editStudentName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Student Name
                </label>
                <input
                  type="text"
                  id="editStudentName"
                  name="studentName"
                  value={editFormData.studentName}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800 font-semibold"
                />
              </div>
              
              <div>
                <label htmlFor="editMobileNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-[#72388f]">
                  <span className="px-3 py-2 text-gray-500 border-r bg-gray-50 font-bold text-sm">+91</span>
                  <input
                    type="tel"
                    id="editMobileNumber"
                    name="mobileNumber"
                    value={editFormData.mobileNumber}
                    onChange={handleEditChange}
                    required
                    maxLength={10}
                    className="w-full px-3 py-2 border-none outline-none font-semibold text-gray-800"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="editAltMobileNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Alternative Mobile Number (Optional)
                </label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-[#72388f]">
                  <span className="px-3 py-2 text-gray-500 border-r bg-gray-50 font-bold text-sm">+91</span>
                  <input
                    type="tel"
                    id="editAltMobileNumber"
                    name="altMobileNumber"
                    value={editFormData.altMobileNumber}
                    onChange={handleEditChange}
                    maxLength={10}
                    className="w-full px-3 py-2 border-none outline-none font-semibold text-gray-800"
                    placeholder="Enter alternative mobile number"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 font-bold text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#72388f] text-white font-bold text-sm rounded-lg hover:bg-[#361152] transition-colors cursor-pointer shadow-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
