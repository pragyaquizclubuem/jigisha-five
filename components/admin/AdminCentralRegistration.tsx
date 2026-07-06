'use client';

import { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import Fuse from 'fuse.js';
import { schools } from '@/constants/Schools';
import { CheckCircle } from 'lucide-react';
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

const startYear = 2006;
const endYear = new Date().getFullYear();
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
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#72388f] transition-colors"
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
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#72388f] transition-colors"
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

export default function AdminCentralRegistration() {
  const [formData, setFormData] = useState({
    studentName: '',
    schoolName: '',
    mobileNumber: '',
    altMobileNumber: '',
    class: '',
    email: '',
  });
  const [dob, setDob] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [schoolSuggestions, setSchoolSuggestions] = useState<string[]>([]);
  const [isSchoolInputFocused, setIsSchoolInputFocused] = useState(false);

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
    // Alternate mobile number duplicate validation
    const hasSamePhone = formData.mobileNumber && formData.altMobileNumber && formData.mobileNumber === formData.altMobileNumber;
    
    // Check repeating patterns like '0000000000', '1111111111'
    const isMobilePatternInvalid = formData.mobileNumber.length > 0 && /^(\d)\1{9}$/.test(formData.mobileNumber);
    const isAltPatternInvalid = formData.altMobileNumber.length > 0 && /^(\d)\1{9}$/.test(formData.altMobileNumber);

    const isMobileValid = formData.mobileNumber.length === 10 && !isMobilePatternInvalid;
    const isAltMobileValid = formData.altMobileNumber.length === 0 || (formData.altMobileNumber.length === 10 && !isAltPatternInvalid && !hasSamePhone);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    // Live update errors state
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

    const allValid = 
      !!formData.studentName &&
      !!formData.schoolName &&
      isMobileValid &&
      isAltMobileValid &&
      !!formData.class &&
      isEmailValid &&
      !!dob;
      
    setIsFormValid(allValid);
  }, [
    formData.studentName,
    formData.schoolName,
    formData.mobileNumber,
    formData.altMobileNumber,
    formData.class,
    formData.email,
    dob,
  ]);

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') return;
    if (!/\d/.test(e.key)) {
      e.preventDefault();
      return;
    }
    const rawDigits = input.value.replace(/\D/g, '');
    if (rawDigits.length >= 8) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mobileNumber' || name === 'altMobileNumber') {
      const digits = value.replace(/\D/g, '');
      
      setFormData(prev => ({...prev, [name]: digits}));

      const isOptionalAndEmpty = name === 'altMobileNumber' && digits.length === 0;

      if (digits.length > 0 && digits.length !== 10 && !isOptionalAndEmpty) {
          setErrors((prev) => ({...prev, [name]: 'Number must be 10 digits.'}));
      } else {
          setErrors((prev) => ({...prev, [name]: null}));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'email') {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email.' }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }

    if (name === 'schoolName') {
      if (value) {
        const suggestions: string[] = [];
        const upperCaseValue = value.toUpperCase();

        if (value.length > 1 && value === upperCaseValue) {
          const acronymSuggestions = schools.filter(school =>
            getAcronym(school).startsWith(upperCaseValue)
          );
          suggestions.push(...acronymSuggestions);
        }

        const fuseResults = fuse.search(value).map(result => result.item);
        
        const combined = [...suggestions, ...fuseResults];
        const uniqueSuggestions = [...new Set(combined)];
        
        const filteredSuggestions = uniqueSuggestions.filter(
          s => s.toLowerCase() !== value.toLowerCase()
        );
        const finalSuggestions = [value, ...filteredSuggestions];

        setSchoolSuggestions(finalSuggestions.slice(0, 5));
      } else {
        setSchoolSuggestions([]);
      }
    }
  };

  const handleSchoolSelect = (schoolName: string) => {
    setFormData(prev => ({ ...prev, schoolName }));
    setSchoolSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Please fill all the necessary fields.');
      return;
    }
    setSubmitting(true);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if ((key === 'mobileNumber' || key === 'altMobileNumber') && value) {
        data.append(key, `+91 ${value}`);
      } else {
        data.append(key, value);
      }
    });
    data.append('dob', dob!.toISOString());

    try {
      const response = await fetch('/api/admin/central-register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      setSubmitting(false);

      if (response.ok) {
        toast.success('Successfully registered! Participant marked as attended.');
        
        // Reset form
        setFormData({ 
          studentName: '', 
          schoolName: '', 
          mobileNumber: '', 
          altMobileNumber: '', 
          class: '',
          email: '',
        });
        setDob(null);
      } else {
        toast.error(result.message || 'Registration failed.');
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('An unexpected error occurred.');
    }
  };

  const Loader = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white border-2 border-[#252525] rounded-[24px] p-8 flex flex-col items-center shadow-[8px_8px_0_0_#252525]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72388f] mb-4"></div>
        <p className="text-gray-700 font-bold uppercase tracking-wider text-sm">Creating registration...</p>
        <p className="text-gray-500 text-xs mt-1 font-semibold uppercase">Please wait a moment</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Info Banner */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-bold text-sm uppercase tracking-wide">Central Registration Mode</p>
          <p className="text-green-700 text-sm mt-0.5 font-medium">Participants registered through this page will automatically be marked as attended. Ideal for walk-ins at the registration desk.</p>
        </div>
      </div>

      {submitting && <Loader />}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-[#361152] mb-6">Create New Registration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Name */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="studentName" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              Participant Name *
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800 font-semibold"
            />
          </div>

          {/* School Name with Suggestions */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="schoolName" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              School Name *
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              onFocus={() => setIsSchoolInputFocused(true)}
              onBlur={() => setTimeout(() => setIsSchoolInputFocused(false), 200)}
              placeholder="Start typing school name..."
              required
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800 font-semibold"
            />
            {isSchoolInputFocused && schoolSuggestions.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-48 overflow-y-auto">
                {schoolSuggestions.map((school, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSchoolSelect(school)}
                    className="w-full text-left px-4 py-2 hover:bg-[#72388f]/10 text-gray-800 font-semibold text-sm transition-colors border-b last:border-b-0 cursor-pointer"
                  >
                    {school}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="mobileNumber" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              Mobile Number *
            </label>
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-[#72388f]">
              <span className="px-3 py-3 text-gray-500 border-r bg-gray-50 font-bold text-sm select-none">+91</span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength={10}
                required
                className="w-full px-3 py-3 border-none outline-none font-semibold text-gray-800"
                placeholder="Enter 10-digit number"
              />
            </div>
            {errors.mobileNumber && (
              <span className="text-xs text-red-500 font-semibold uppercase mt-1">{errors.mobileNumber}</span>
            )}
          </div>

          {/* Alternative Mobile Number */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="altMobileNumber" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              Alternative Mobile Number
            </label>
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-[#72388f]">
              <span className="px-3 py-3 text-gray-500 border-r bg-gray-50 font-bold text-sm select-none">+91</span>
              <input
                type="tel"
                id="altMobileNumber"
                name="altMobileNumber"
                value={formData.altMobileNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-3 py-3 border-none outline-none font-semibold text-gray-800"
                placeholder="Enter 10-digit number"
              />
            </div>
            {errors.altMobileNumber && (
              <span className="text-xs text-red-500 font-semibold uppercase mt-1">{errors.altMobileNumber}</span>
            )}
          </div>

          {/* Class Selector */}
          <div className="relative flex flex-col gap-1">
            <span className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">Class *</span>
            <div className="flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, class: cls }));
                    setDob(getApproxOpenDate(cls));
                  }}
                  className={`px-4 py-2 border-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                    formData.class === cls
                      ? 'border-[#72388f] bg-[#72388f] text-white shadow-md'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Email Address */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. name@school.com"
              required
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800 font-semibold"
            />
            {errors.email && (
              <span className="text-xs text-red-500 font-semibold uppercase mt-1">{errors.email}</span>
            )}
          </div>

          {/* Date of Birth Picker */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="dob" className="text-xs font-bold uppercase text-[#72388f] tracking-wider mb-1.5">
              Date of Birth *
            </label>
            <div className="relative w-full">
              <DatePicker
                id="dob"
                wrapperClassName="w-full"
                selected={dob}
                onChange={(date: Date | null) => setDob(date)}
                onKeyDown={handleDateKeyDown}
                placeholderText="Select Date of Birth"
                minDate={new Date(2006, 0, 1)}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#72388f] outline-none text-gray-800 font-semibold bg-white"
                renderCustomHeader={CustomHeader}
                calendarClassName="border-2 border-gray-300 rounded-xl shadow-lg font-sans overflow-hidden bg-white"
                dayClassName={(date: Date) => {
                  const baseClasses = "rounded-lg font-semibold text-xs transition-colors p-2";
                  const isInMonth = date.getMonth() === (dob || new Date()).getMonth();
                  const isSelected = dob && date.toDateString() === dob.toDateString();
                  
                  if(isSelected) return `${baseClasses} bg-[#72388f] text-white`;
                  if(isInMonth) return `${baseClasses} hover:bg-gray-100 text-gray-800`;
                  return `${baseClasses} text-gray-400 hover:bg-gray-50`;
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 5H4v8h12V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className="w-full sm:w-auto text-center py-3.5 px-8 bg-[#72388f] text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#361152] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer shadow-md"
          >
            {submitting ? 'Creating Registration...' : 'Create Registration'}
          </button>
        </div>
      </form>
    </>
  );
}
