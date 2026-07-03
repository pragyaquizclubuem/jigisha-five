'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import Fuse from 'fuse.js';
import { schools } from '@/constants/Schools';
import ThankYou from './ThankYou';
import Image from 'next/image';
import { VegIcon, NonVegIcon } from '@/components/icons/Icons';

const stopWords = new Set(['the', 'for', 'of', 'and']);
const getAcronym = (schoolName: string): string => {
  if (!schoolName) return '';
  return schoolName
    .split(/\s+/)
    .filter(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return cleanWord.length > 0 && !stopWords.has(cleanWord);
    })
    .map(word => {
      if (word.length > 1 && word === word.toUpperCase()) {
        return word;
      }
      return word.charAt(0);
    })
    .join('')
    .toUpperCase();
};

const endYear = new Date().getFullYear() - 10;
const startYear = new Date().getFullYear() - 20;
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}) => (
  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg">
    <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors">
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>

    <div className="flex gap-2">
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(parseInt(value))}
        className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#513081] transition-colors"
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
        className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#513081] transition-colors"
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors">
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  </div>
);

const classes = ['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function RegistrationForm() {
  const [mode, setMode] = useState<'individual' | 'school'>('individual');

  // Individual Form State
  const [formData, setFormData] = useState({
    studentName: '',
    schoolName: '',
    mobileNumber: '',
    altMobileNumber: '',
    class: '',
    email: '',
    foodOption: 'NON_VEG',
  });
  const [dob, setDob] = useState<Date | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);

  // School Form State
  const [schoolFormData, setSchoolFormData] = useState({
    contactName: '',
    schoolName: '',
    mobileNumber: '',
    email: '',
  });
  const [schoolDocument, setSchoolDocument] = useState<File | null>(null);
  const [schoolStudents, setSchoolStudents] = useState<Array<{ id: string, name: string, class: string, age: string, foodOption: string }>>([
    { id: crypto.randomUUID(), name: '', class: '', age: '', foodOption: 'NON_VEG' }
  ]);

  // Common State
  const [agreeRules, setAgreeRules] = useState(false);
  const [agreePartner, setAgreePartner] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Modals
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [schoolSuggestions, setSchoolSuggestions] = useState<string[]>([]);
  const [isSchoolInputFocused, setIsSchoolInputFocused] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);
  const [registeredStudentName, setRegisteredStudentName] = useState('');
  const [registeredSchoolName, setRegisteredSchoolName] = useState('');

  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => new Fuse(schools, {
    includeScore: true,
    threshold: 0.4,
    minMatchCharLength: 2,
  }), []);

  const getApproxOpenDate = (className: string): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let approxAge = 0;
    switch (className) {
      case 'VI': approxAge = 11; break;
      case 'VII': approxAge = 12; break;
      case 'VIII': approxAge = 13; break;
      case 'IX': approxAge = 14; break;
      case 'X': approxAge = 15; break;
      case 'XI': approxAge = 16; break;
      case 'XII': approxAge = 17; break;
      default: return now;
    }
    return new Date(currentYear - approxAge, 5, 15);
  };

  useEffect(() => {
    return () => {
      if (idCardPreview && idCardPreview.startsWith('blob:')) {
        URL.revokeObjectURL(idCardPreview);
      }
    };
  }, [idCardPreview]);

  // Validation Logic
  useEffect(() => {
    if (mode === 'individual') {
      const hasSamePhone = formData.mobileNumber && formData.altMobileNumber && formData.mobileNumber === formData.altMobileNumber;
      const isMobilePatternInvalid = formData.mobileNumber.length > 0 && /^(\d)\1{9}$/.test(formData.mobileNumber);
      const isAltPatternInvalid = formData.altMobileNumber.length > 0 && /^(\d)\1{9}$/.test(formData.altMobileNumber);
      const isMobileValid = formData.mobileNumber.length === 10 && !isMobilePatternInvalid;
      const isAltMobileValid = formData.altMobileNumber.length === 0 || (formData.altMobileNumber.length === 10 && !isAltPatternInvalid && !hasSamePhone);
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

      setErrors(prev => ({
        ...prev,
        mobileNumber: isMobilePatternInvalid ? 'Invalid number pattern (repeating digits).' : (formData.mobileNumber && formData.mobileNumber.length !== 10) ? 'Number must be 10 digits.' : null,
        altMobileNumber: hasSamePhone
          ? 'Alternate number must be different from WhatsApp number.'
          : isAltPatternInvalid
            ? 'Invalid number pattern (repeating digits).'
            : (formData.altMobileNumber && formData.altMobileNumber.length !== 10)
              ? 'Number must be 10 digits.'
              : null
      }));

      let isAgeValid = false;
      if (dob) {
        const age = new Date().getFullYear() - dob.getFullYear();
        isAgeValid = age >= 10 && age <= 20;
      }

      const allValid =
        !!formData.studentName &&
        !!formData.schoolName &&
        isMobileValid &&
        isAltMobileValid &&
        !!formData.class &&
        isEmailValid &&
        isAgeValid &&
        !!idCard &&
        agreeRules &&
        agreePartner;

      setIsFormValid(allValid);
    } else {
      const isMobileValid = schoolFormData.mobileNumber.length === 10 && !/^(\d)\1{9}$/.test(schoolFormData.mobileNumber);
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolFormData.email);

      let allStudentsValid = true;
      if (schoolStudents.length === 0) allStudentsValid = false;
      schoolStudents.forEach(s => {
        const sAge = parseInt(s.age, 10);
        if (!s.name || !s.class || !s.age || !s.foodOption || isNaN(sAge) || sAge < 10 || sAge > 20) allStudentsValid = false;
      });

      const allValid =
        !!schoolFormData.contactName &&
        !!schoolFormData.schoolName &&
        isMobileValid &&
        isEmailValid &&
        !!schoolDocument &&
        allStudentsValid &&
        agreeRules &&
        agreePartner;

      setIsFormValid(allValid);
    }
  }, [
    mode,
    formData, dob, idCard,
    schoolFormData, schoolDocument, schoolStudents,
    agreeRules, agreePartner
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'mobileNumber' || name === 'altMobileNumber') {
      const digits = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'schoolName') {
      if (value) {
        const suggestions: string[] = [];
        const upperCaseValue = value.toUpperCase();
        if (value.length > 1 && value === upperCaseValue) {
          const acronymSuggestions = schools.filter(school => getAcronym(school).startsWith(upperCaseValue));
          suggestions.push(...acronymSuggestions);
        }
        const fuseResults = fuse.search(value).map(result => result.item);
        const combined = [...suggestions, ...fuseResults];
        const uniqueSuggestions = [...new Set(combined)];
        const filteredSuggestions = uniqueSuggestions.filter(s => s.toLowerCase() !== value.toLowerCase());
        const finalSuggestions = [value, ...filteredSuggestions];
        setSchoolSuggestions(finalSuggestions.slice(0, 5));
      } else {
        setSchoolSuggestions([]);
      }
    }
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber') {
      const digits = value.replace(/\D/g, '');
      setSchoolFormData(prev => ({ ...prev, [name]: digits }));
    } else {
      setSchoolFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'schoolName') {
      if (value) {
        const suggestions: string[] = [];
        const upperCaseValue = value.toUpperCase();
        if (value.length > 1 && value === upperCaseValue) {
          const acronymSuggestions = schools.filter(school => getAcronym(school).startsWith(upperCaseValue));
          suggestions.push(...acronymSuggestions);
        }
        const fuseResults = fuse.search(value).map(result => result.item);
        const combined = [...suggestions, ...fuseResults];
        const uniqueSuggestions = [...new Set(combined)];
        const filteredSuggestions = uniqueSuggestions.filter(s => s.toLowerCase() !== value.toLowerCase());
        const finalSuggestions = [value, ...filteredSuggestions];
        setSchoolSuggestions(finalSuggestions.slice(0, 5));
      } else {
        setSchoolSuggestions([]);
      }
    }
  };

  const handleSchoolSelect = (schoolName: string) => {
    if (mode === 'individual') {
      setFormData(prev => ({ ...prev, schoolName }));
    } else {
      setSchoolFormData(prev => ({ ...prev, schoolName }));
    }
    setSchoolSuggestions([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        toast.error('Please upload a JPG, PNG or PDF file');
        return;
      }

      if (mode === 'individual') {
        setIdCard(file);
        if (idCardPreview && idCardPreview.startsWith('blob:')) {
          URL.revokeObjectURL(idCardPreview);
        }
        if (file.type.startsWith('image/')) {
          setIdCardPreview(URL.createObjectURL(file));
        } else {
          setIdCardPreview('pdf');
        }
      } else {
        setSchoolDocument(file);
        if (idCardPreview && idCardPreview.startsWith('blob:')) {
          URL.revokeObjectURL(idCardPreview);
        }
        if (file.type.startsWith('image/')) {
          setIdCardPreview(URL.createObjectURL(file));
        } else {
          setIdCardPreview('pdf');
        }
      }
      toast.success('Document uploaded successfully!');
    }
  };

  const handleRemoveIdCard = () => {
    if (idCardPreview && idCardPreview.startsWith('blob:')) {
      URL.revokeObjectURL(idCardPreview);
    }
    if (mode === 'individual') {
      setIdCard(null);
    } else {
      setSchoolDocument(null);
    }
    setIdCardPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast('Document removed.');
  };

  const handleReplaceIdCard = () => fileInputRef.current?.click();

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') return;
    if (!/\d/.test(e.key)) { e.preventDefault(); return; }
    const rawDigits = input.value.replace(/\D/g, '');
    if (rawDigits.length >= 8) e.preventDefault();
  };

  // Add School Student
  const addStudent = () => {
    setSchoolStudents(prev => [...prev, { id: crypto.randomUUID(), name: '', class: '', age: '', foodOption: 'NON_VEG' }]);
  };

  const removeStudent = (id: string) => {
    setSchoolStudents(prev => prev.filter(s => s.id !== id));
  };

  const updateStudent = (id: string, field: string, value: string) => {
    setSchoolStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Please fill all the necessary fields and accept terms.');
      return;
    }
    setSubmitting(true);
    setErrors({});

    const data = new FormData();

    if (mode === 'individual') {
      Object.entries(formData).forEach(([key, value]) => {
        if ((key === 'mobileNumber' || key === 'altMobileNumber') && value) {
          data.append(key, `+91 ${value}`);
        } else {
          data.append(key, value);
        }
      });
      data.append('dob', dob!.toISOString());
      if (idCard) data.append('idCard', idCard);

      try {
        const response = await fetch('/api/events/jana-ojana/register', { method: 'POST', body: data });
        const result = await response.json();
        setSubmitting(false);

        if (response.ok) {
          toast.success(result.message || 'Registration Successful!');
          setRegisteredStudentName(formData.studentName);
          setRegisteredSchoolName(formData.schoolName);
          setShowThankYou(true);

          // Reset
          setFormData({ studentName: '', schoolName: '', mobileNumber: '', altMobileNumber: '', class: '', email: '', foodOption: 'NON_VEG' });
          setDob(null); setIdCard(null); setAgreeRules(false); setAgreePartner(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          toast.error(result.message || 'Registration failed.');
        }
      } catch (error) {
        setSubmitting(false);
        toast.error('An unexpected error occurred.');
      }
    } else {
      // School submission
      data.append('contactName', schoolFormData.contactName);
      data.append('schoolName', schoolFormData.schoolName);
      data.append('mobileNumber', `+91 ${schoolFormData.mobileNumber}`);
      data.append('email', schoolFormData.email);
      data.append('students', JSON.stringify(schoolStudents));
      if (schoolDocument) data.append('document', schoolDocument);

      try {
        const response = await fetch('/api/events/jana-ojana/register-school', { method: 'POST', body: data });
        const result = await response.json();
        setSubmitting(false);

        if (response.ok) {
          toast.success(result.message || 'School Registration Successful!');
          setRegisteredStudentName(schoolFormData.contactName);
          setRegisteredSchoolName(schoolFormData.schoolName);
          setShowThankYou(true);

          // Reset
          setSchoolFormData({ contactName: '', schoolName: '', mobileNumber: '', email: '' });
          setSchoolStudents([{ id: crypto.randomUUID(), name: '', class: '', age: '', foodOption: 'NON_VEG' }]);
          setSchoolDocument(null); setAgreeRules(false); setAgreePartner(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          toast.error(result.message || 'Registration failed.');
        }
      } catch (error) {
        setSubmitting(false);
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const handleBackFromThankYou = () => setShowThankYou(false);

  const Loader = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#FFEDE0] border-2 border-[#252525] rounded-[24px] p-8 flex flex-col items-center shadow-[8px_8px_0_0_#252525]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#513081] mb-4"></div>
        <p className="text-[#252525] font-bold uppercase tracking-wider text-sm">Submitting your registration...</p>
        <p className="text-[#252525]/60 text-xs mt-1 font-semibold uppercase">Please wait a moment</p>
      </div>
    </div>
  );

  const Modals = () => (
    <>
      {showGuidelines && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-fade-in" onClick={() => setShowGuidelines(false)}>
          <div className="bg-[#FFEDE0] border-4 border-[#252525] rounded-2xl p-6 md:p-10 max-w-2xl w-full shadow-[8px_8px_0_0_#252525] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold font-roboto-condensed text-[#513081] uppercase">Registration Guidelines</h3>
              <button onClick={() => setShowGuidelines(false)} className="text-[#252525] hover:text-red-500 font-bold text-xl">&times;</button>
            </div>
            <div className="prose prose-sm text-[#252525]">
              <p>1. Please ensure all details are filled correctly.</p>
              <p>2. A valid school ID card is required for verification.</p>
              <p>3. Age limits apply based on the class selected.</p>
              <p>4. Teams must consist of students from the same school.</p>
              <p>5. The decision of the quizmaster is final and binding.</p>
              {/* Expand guidelines here as needed */}
            </div>
            <button onClick={() => setShowGuidelines(false)} className="mt-8 px-6 py-3 bg-[#513081] text-white font-bold uppercase text-sm rounded-xl border-2 border-black w-full shadow-[4px_4px_0_0_#000]">Close</button>
          </div>
        </div>
      )}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-fade-in" onClick={() => setShowTerms(false)}>
          <div className="bg-[#FFEDE0] border-4 border-[#252525] rounded-2xl p-6 md:p-10 max-w-2xl w-full shadow-[8px_8px_0_0_#252525] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold font-roboto-condensed text-[#513081] uppercase">Terms & Conditions</h3>
              <button onClick={() => setShowTerms(false)} className="text-[#252525] hover:text-red-500 font-bold text-xl">&times;</button>
            </div>
            <div className="prose prose-sm text-[#252525]">
              <p>By registering for Jana Ojana, you agree to the following terms and conditions:</p>
              <p>1. You consent to the collection and use of your registration data for event management.</p>
              <p>2. You agree to abide by the rules of the venue and the event coordinators.</p>
              <p>3. Jigisha reserves the right to disqualify any participant found violating rules or providing false information.</p>
              {/* Expand T&C here as needed */}
            </div>
            <button onClick={() => setShowTerms(false)} className="mt-8 px-6 py-3 bg-[#513081] text-white font-bold uppercase text-sm rounded-xl border-2 border-black w-full shadow-[4px_4px_0_0_#000]">Close</button>
          </div>
        </div>
      )}
    </>
  );

  if (showThankYou) {
    return (
      <ThankYou
        studentName={registeredStudentName}
        schoolName={registeredSchoolName}
        onBack={handleBackFromThankYou}
      />
    );
  }

  return (
    <>
      {submitting && <Loader />}
      <Modals />

      {/* Registration Mode Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-full p-1 border-2 border-[#252525] shadow-[4px_4px_0_0_#252525]">
          <button
            type="button"
            onClick={() => setMode('individual')}
            className={`px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${mode === 'individual' ? 'bg-[#513081] text-white shadow-inner' : 'text-[#252525] hover:bg-gray-100'}`}
          >
            Individual Registration
          </button>
          <button
            type="button"
            onClick={() => setMode('school')}
            className={`px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${mode === 'school' ? 'bg-[#513081] text-white shadow-inner' : 'text-[#252525] hover:bg-gray-100'}`}
          >
            School Registration
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold font-roboto-condensed uppercase tracking-tight text-[#513081] mb-1">
            {mode === 'individual' ? 'Participant Details' : 'School Details'}
          </h2>
          <div className="h-1.5 w-16 bg-[#513081] rounded-full mb-6 mx-auto sm:mx-0"></div>
        </div>

        {mode === 'individual' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Individual Form Fields */}
            <div className="relative flex flex-col gap-1">
              <label htmlFor="studentName" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Participant Name *</label>
              <input type="text" name="studentName" id="studentName" value={formData.studentName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="e.g. John Doe" />
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="schoolName" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">School Name *</label>
              <input type="text" name="schoolName" id="schoolName" value={formData.schoolName} onChange={handleChange} onFocus={() => setIsSchoolInputFocused(true)} onBlur={() => setTimeout(() => setIsSchoolInputFocused(false), 200)} required className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="Start typing your school..." autoComplete="off" />
              {isSchoolInputFocused && schoolSuggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border-2 border-[#252525] rounded-xl mt-[82px] max-h-60 overflow-y-auto shadow-[4px_4px_0_0_#252525] divide-y divide-[#252525]/10">
                  {schoolSuggestions.map((school, index) => (
                    <li key={index} onMouseDown={() => handleSchoolSelect(school)} className="px-4 py-3 cursor-pointer hover:bg-[#D7ABFF]/20 text-[#252525] font-semibold text-sm transition-colors">{school}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="mobileNumber" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">WhatsApp Number *</label>
              <div className={`flex items-center rounded-xl border-2 border-[#252525] bg-white transition-all overflow-hidden ${errors.mobileNumber ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-[#D7ABFF]'}`}>
                <span className="px-4 py-3 text-gray-500 bg-gray-50 border-r-2 border-[#252525] font-bold text-sm">+91</span>
                <input type="tel" name="mobileNumber" id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required maxLength={10} className="w-full px-4 py-3 outline-none text-[#252525] font-semibold" placeholder="10-digit number" />
              </div>
              {errors.mobileNumber && <p className="text-red-500 text-xs font-bold mt-1">{errors.mobileNumber}</p>}
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="altMobileNumber" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Alternate Number (Optional)</label>
              <div className={`flex items-center rounded-xl border-2 border-[#252525] bg-white transition-all overflow-hidden ${errors.altMobileNumber ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-[#D7ABFF]'}`}>
                <span className="px-4 py-3 text-gray-500 bg-gray-50 border-r-2 border-[#252525] font-bold text-sm">+91</span>
                <input type="tel" name="altMobileNumber" id="altMobileNumber" value={formData.altMobileNumber} onChange={handleChange} maxLength={10} className="w-full px-4 py-3 outline-none text-[#252525] font-semibold" placeholder="10-digit number" />
              </div>
              {errors.altMobileNumber && <p className="text-red-500 text-xs font-bold mt-1">{errors.altMobileNumber}</p>}
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-2">Select Class *</label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-3">
                {classes.map((c) => (
                  <button type="button" key={c} onClick={() => setFormData(prev => ({ ...prev, class: c }))} className={`text-center py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-lg sm:rounded-xl cursor-pointer transition-all border-2 border-[#252525] font-bold text-xs sm:text-sm uppercase tracking-wider ${formData.class === c ? 'bg-[#513081] text-white shadow-inner transform scale-98' : 'bg-white text-[#252525] hover:bg-[#D7ABFF]/10'}`}>Class {c}</button>
                ))}
              </div>
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Email Address *</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none font-semibold text-[#252525] focus:ring-2 focus:ring-[#D7ABFF] ${errors.email ? 'border-red-500' : 'border-[#252525] bg-white'}`} placeholder="e.g. john@example.com" />
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email}</p>}
            </div>
            <div className="relative flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Date of Birth *</label>
              <div className="relative">
                <DatePicker wrapperClassName="w-full" selected={dob} onChange={(date: Date | null) => setDob(date)} dateFormat="dd/MM/yyyy" className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholderText="DD/MM/YYYY" openToDate={formData.class ? getApproxOpenDate(formData.class) : new Date(new Date().getFullYear() - 15, 5, 15)} minDate={new Date(new Date().getFullYear() - 20, new Date().getMonth(), new Date().getDate())} maxDate={new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate())} required onKeyDown={handleDateKeyDown} renderCustomHeader={CustomHeader} calendarClassName="border-2 border-[#252525] rounded-xl shadow-[4px_4px_0_0_#252525] bg-white" dayClassName={(date) => { const baseClasses = "text-center p-2 mx-0.5 rounded-full transition-colors duration-200 font-semibold text-sm"; const isInMonth = date.getMonth() === (dob || new Date()).getMonth(); const isSelected = dob && date.toDateString() === dob.toDateString(); if (isSelected) return `${baseClasses} bg-[#513081] text-white`; if (isInMonth) return `${baseClasses} hover:bg-[#D7ABFF]/20 text-[#252525]`; return `${baseClasses} text-gray-400 hover:bg-[#D7ABFF]/10`; }} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 5H4v8h12V7z" clipRule="evenodd" /></svg></div>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-2">Food Preference *</label>
              <div className="flex gap-2 sm:gap-4">
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, foodOption: 'VEG' }))} className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-3 sm:py-3.5 border-2 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer bg-white ${formData.foodOption === 'VEG' ? 'border-[#0f8a42] text-[#0f8a42] ring-2 ring-[#0f8a42]/30' : 'border-[#252525] text-gray-500 hover:border-gray-400'}`}><VegIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />Vegetarian</button>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, foodOption: 'NON_VEG' }))} className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-3 sm:py-3.5 border-2 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer bg-white ${formData.foodOption === 'NON_VEG' ? 'border-[#8b4513] text-[#8b4513] ring-2 ring-[#8b4513]/30' : 'border-[#252525] text-gray-500 hover:border-gray-400'}`}><NonVegIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /><span className="whitespace-nowrap">Non-Veg</span></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Form Fields */}
            <div className="relative flex flex-col gap-1">
              <label htmlFor="contactName" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Teacher/Contact Person Name *</label>
              <input type="text" name="contactName" id="contactName" value={schoolFormData.contactName} onChange={handleSchoolChange} required className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="e.g. Mr. Smith" />
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="schoolName" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">School Name *</label>
              <input type="text" name="schoolName" id="schoolName" value={schoolFormData.schoolName} onChange={handleSchoolChange} onFocus={() => setIsSchoolInputFocused(true)} onBlur={() => setTimeout(() => setIsSchoolInputFocused(false), 200)} required className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="Start typing your school..." autoComplete="off" />
              {isSchoolInputFocused && schoolSuggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border-2 border-[#252525] rounded-xl mt-[82px] max-h-60 overflow-y-auto shadow-[4px_4px_0_0_#252525] divide-y divide-[#252525]/10">
                  {schoolSuggestions.map((school, index) => (
                    <li key={index} onMouseDown={() => handleSchoolSelect(school)} className="px-4 py-3 cursor-pointer hover:bg-[#D7ABFF]/20 text-[#252525] font-semibold text-sm transition-colors">{school}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="mobileNumber" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Contact Mobile Number *</label>
              <div className={`flex items-center rounded-xl border-2 border-[#252525] bg-white transition-all overflow-hidden focus-within:ring-2 focus-within:ring-[#D7ABFF]`}>
                <span className="px-4 py-3 text-gray-500 bg-gray-50 border-r-2 border-[#252525] font-bold text-sm">+91</span>
                <input type="tel" name="mobileNumber" id="mobileNumber" value={schoolFormData.mobileNumber} onChange={handleSchoolChange} required maxLength={10} className="w-full px-4 py-3 outline-none text-[#252525] font-semibold" placeholder="10-digit number" />
              </div>
            </div>
            <div className="relative flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1.5">Contact Email Address *</label>
              <input type="email" name="email" id="email" value={schoolFormData.email} onChange={handleSchoolChange} required className="w-full px-4 py-3 rounded-xl border-2 border-[#252525] bg-white text-[#252525] font-semibold outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="e.g. school@example.com" />
            </div>
          </div>
        )}

        {/* Dynamic Students Section for School Mode */}
        {mode === 'school' && (
          <div className="mt-12 bg-white/50 border-2 border-[#252525] rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-bold font-roboto-condensed text-[#513081] uppercase tracking-wider mb-6">Students List</h3>
            <div className="space-y-6">
              {schoolStudents.map((student, index) => (
                <div key={student.id} className="bg-white border-2 border-[#252525] rounded-xl p-4 sm:p-6 shadow-[4px_4px_0_0_#252525] relative">
                  <h4 className="absolute -top-3 left-4 bg-[#FFEDE0] px-2 font-bold text-xs uppercase tracking-wider text-[#252525] border-2 border-[#252525] rounded-full">Student {index + 1}</h4>
                  {schoolStudents.length > 1 && (
                    <button type="button" onClick={() => removeStudent(student.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-[#513081]">Name *</label>
                      <input type="text" value={student.name} onChange={(e) => updateStudent(student.id, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-[#252525] bg-white text-[#252525] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#D7ABFF]" placeholder="Name" required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-[#513081]">Class *</label>
                      <div className="relative">
                        <select value={student.class} onChange={(e) => updateStudent(student.id, 'class', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-[#252525] bg-white text-[#252525] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#D7ABFF] appearance-none pr-8" required>
                          <option value="" disabled>Select</option>
                          {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#252525]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-[#513081]">Age *</label>
                      <input 
                        type="number" 
                        min="10" 
                        max="20" 
                        value={student.age} 
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.length > 2) val = val.slice(0, 2);
                          updateStudent(student.id, 'age', val);
                        }} 
                        className={`w-full px-3 py-2 rounded-lg border-2 bg-white text-[#252525] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#D7ABFF] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${student.age && (parseInt(student.age, 10) < 10 || parseInt(student.age, 10) > 20) ? 'border-red-500' : 'border-[#252525]'}`} 
                        placeholder="Age" 
                        required 
                      />
                      {student.age && (parseInt(student.age, 10) < 10 || parseInt(student.age, 10) > 20) && (
                        <p className="text-red-500 text-[10px] font-bold">Must be 10-20</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-[#513081]">Food *</label>
                      <div className="relative">
                        <select value={student.foodOption} onChange={(e) => updateStudent(student.id, 'foodOption', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-[#252525] bg-white text-[#252525] font-semibold text-sm outline-none focus:ring-2 focus:ring-[#D7ABFF] appearance-none pr-8" required>
                          <option value="NON_VEG">Non-Veg</option>
                          <option value="VEG">Veg</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#252525]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" onClick={addStudent} className="w-full border-2 border-dashed border-[#513081] text-[#513081] bg-[#D7ABFF]/10 font-bold py-3 rounded-xl hover:bg-[#D7ABFF]/20 transition-colors uppercase text-sm tracking-wider flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add Another Student
              </button>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className="mt-8">
          <label className="text-xs font-bold uppercase text-[#513081] tracking-wider mb-1 block">
            {mode === 'individual' ? 'School ID Card Upload *' : 'Authorization Document Upload *'}
          </label>
          {mode === 'school' && (
            <p className="text-[10px] text-gray-500 font-semibold mb-2 leading-tight">
              Please upload a document from the school authority authorizing the teacher/contact person to register students on behalf of the school.
            </p>
          )}
          <input
            type="file"
            id="idCard"
            name="idCard"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
            required={mode === 'individual' ? !idCard : !schoolDocument}
          />
          {!(mode === 'individual' ? idCard : schoolDocument) ? (
            <label htmlFor="idCard" className="group relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#252525]/30 rounded-2xl cursor-pointer hover:border-[#513081] hover:bg-[#D7ABFF]/5 transition-all duration-300">
              <div className="space-y-2 text-center p-4">
                <svg className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#513081] transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="text-sm"><span className="font-bold text-[#513081] uppercase tracking-wider group-hover:underline">Upload Document</span></div>
                <p className="text-xs text-gray-500 font-semibold uppercase">JPG, PNG or PDF up to 5MB</p>
              </div>
            </label>
          ) : (
            <div className="p-5 border-2 border-[#252525] rounded-2xl bg-white shadow-[4px_4px_0_0_#252525] flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                {idCardPreview === 'pdf' ? (
                  <div className="w-16 h-16 flex-shrink-0 bg-red-50 border-2 border-[#252525] rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm3 1a1 1 0 100 2h2a1 1 0 100-2H9zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" /></svg>
                  </div>
                ) : idCardPreview ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#252525]">
                    <Image src={idCardPreview} alt="Preview" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                ) : null}
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{mode === 'individual' ? idCard!.name : schoolDocument!.name}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase">{((mode === 'individual' ? idCard!.size : schoolDocument!.size) / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button type="button" onClick={handleRemoveIdCard} className="px-4 py-2 text-xs font-bold text-red-500 uppercase tracking-wider hover:underline">Remove</button>
                <button type="button" onClick={handleReplaceIdCard} className="px-4 py-2 border-2 border-[#252525] bg-white text-[#513081] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-gray-50 transition-all shadow-[2px_2px_0_0_#252525] hover:-translate-y-0.5">Replace</button>
              </div>
            </div>
          )}
        </div>

        {/* Agreements Section */}
        <div className="mt-8 pt-6 border-t-2 border-[#252525]/10 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input type="checkbox" checked={agreeRules} onChange={(e) => setAgreeRules(e.target.checked)} className="peer sr-only" required />
              <div className="w-5 h-5 border-2 border-[#252525] rounded bg-white peer-checked:bg-[#513081] peer-checked:border-[#513081] transition-colors"></div>
              <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-sm font-semibold text-[#252525] select-none">
              I have read the <button type="button" onClick={(e) => { e.preventDefault(); setShowGuidelines(true); }} className="text-[#513081] hover:underline font-bold">registration guidelines</button> and <button type="button" onClick={(e) => { e.preventDefault(); setShowTerms(true); }} className="text-[#513081] hover:underline font-bold">terms and conditions</button>. *
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input type="checkbox" checked={agreePartner} onChange={(e) => setAgreePartner(e.target.checked)} className="peer sr-only" required />
              <div className="w-5 h-5 border-2 border-[#252525] rounded bg-white peer-checked:bg-[#513081] peer-checked:border-[#513081] transition-colors"></div>
              <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-sm font-semibold text-[#252525] select-none">
              {mode === 'individual'
                ? 'I will bring my ID Card on the event day and my partner for quiz will mandatorily be from the same school. *'
                : 'Our students will bring ID Cards on the event day and their partners will mandatorily be from our school. *'
              }
            </span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="pt-6 flex justify-center sm:justify-end">
          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className="w-full sm:w-auto text-center py-4 px-8 rounded-full border-2 border-[#252525] bg-[#513081] text-[#FFEDE0] font-bold uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#252525] active:translate-y-0 active:shadow-none disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
          >
            {submitting ? 'Submitting...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </>
  );
}
