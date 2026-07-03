"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon as ArrowTwenty } from '@/components/icons/Icons';
import socialMediaData from '@/constants/socialMediaData';

import { WhatsAppIcon, MessengerIcon, InstagramIcon } from '@/components/icons/Icons';

const ContactFormArea = () => {
    const [contactMethod, setContactMethod] = useState<'chat' | 'email'>('chat');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [ccDropdownOpen, setCcDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setCcDropdownOpen(false);
            }
        };

        const preventScrollPropagation = (e: Event) => {
            e.stopPropagation();
        };

        const el = dropdownRef.current;

        if (ccDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            if (el) {
                el.addEventListener('wheel', preventScrollPropagation, { passive: true });
                el.addEventListener('touchstart', preventScrollPropagation, { passive: true });
                el.addEventListener('touchmove', preventScrollPropagation, { passive: true });
            }
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (el) {
                el.removeEventListener('wheel', preventScrollPropagation);
                el.removeEventListener('touchstart', preventScrollPropagation);
                el.removeEventListener('touchmove', preventScrollPropagation);
            }
        };
    }, [ccDropdownOpen]);

    const countries = [
        { code: '+91', iso: 'in', name: 'India' },
        { code: '+1', iso: 'us', name: 'USA' },
        { code: '+44', iso: 'gb', name: 'UK' },
        { code: '+61', iso: 'au', name: 'Australia' },
        { code: '+971', iso: 'ae', name: 'UAE' },
        { code: '+81', iso: 'jp', name: 'Japan' },
        { code: '+49', iso: 'de', name: 'Germany' },
        { code: '+33', iso: 'fr', name: 'France' },
        { code: '+65', iso: 'sg', name: 'Singapore' },
        { code: '+86', iso: 'cn', name: 'China' },
        { code: '+7', iso: 'ru', name: 'Russia' },
        { code: '+55', iso: 'br', name: 'Brazil' }
    ];

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        message?: string;
    }>({});
    const [touchedFields, setTouchedFields] = useState<{
        name?: boolean;
        email?: boolean;
        phone?: boolean;
        message?: boolean;
    }>({});

    // Dynamic Validation Checkers
    const validateField = (field: keyof typeof formData, value: string, errors: typeof formErrors) => {
        if (field === 'name') {
            if (!value.trim()) {
                errors.name = 'Full name is required';
            } else if (value.trim().length < 2) {
                errors.name = 'Name must be at least 2 characters';
            } else {
                delete errors.name;
            }
        }
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                errors.email = 'Email address is required';
            } else if (!emailRegex.test(value)) {
                errors.email = 'Please enter a valid email address';
            } else {
                delete errors.email;
            }
        }
        if (field === 'phone') {
            const digits = value.replace(/[^\d]/g, '');
            if (!value.trim()) {
                errors.phone = 'Phone number is required';
            } else if (digits.length < 8) {
                errors.phone = 'Phone number must be at least 8 digits';
            } else if (digits.length > 12) {
                errors.phone = 'Phone number cannot exceed 12 digits';
            } else {
                delete errors.phone;
            }
        }
        if (field === 'message') {
            if (!value.trim()) {
                errors.message = 'Message content is required';
            } else if (value.trim().length < 10) {
                errors.message = 'Message must be at least 10 characters';
            } else {
                delete errors.message;
            }
        }
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        let filteredValue = value;
        if (field === 'phone') {
            // Keep only digits
            filteredValue = value.replace(/[^\d]/g, '');
            // Limit size to max 12 digits
            if (filteredValue.length > 12) return;
        }

        setFormData(prev => ({ ...prev, [field]: filteredValue }));

        if (field !== 'countryCode' && touchedFields[field]) {
            const errors = { ...formErrors };
            validateField(field, filteredValue, errors);
            setFormErrors(errors);
        }
    };

    const handleBlur = (field: keyof typeof formData) => {
        if (field === 'countryCode') return;
        setTouchedFields(prev => ({ ...prev, [field]: true }));
        const errors = { ...formErrors };
        validateField(field, formData[field], errors);
        setFormErrors(errors);
    };

    const validateAll = () => {
        const errors: typeof formErrors = {};

        validateField('name', formData.name, errors);
        validateField('email', formData.email, errors);
        validateField('phone', formData.phone, errors);
        validateField('message', formData.message, errors);

        setFormErrors(errors);
        setTouchedFields({
            name: true,
            email: true,
            phone: true,
            message: true
        });

        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            countryCode: '+91',
            phone: '',
            message: ''
        });
        setFormErrors({});
        setTouchedFields({});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateAll();
        if (isValid) {
            setIsSending(true);
            setSubmitError(null);
            setSubmitSuccess(false);

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: `${formData.countryCode} ${formData.phone}`,
                        message: formData.message,
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setSubmitSuccess(true);
                    resetForm();
                    setTimeout(() => {
                        setSubmitSuccess(false);
                    }, 6000);
                } else {
                    setSubmitError(data.message || 'Something went wrong. Please try again.');
                }
            } catch (err: any) {
                setSubmitError('A network error occurred. Please check your connection and try again.');
            } finally {
                setIsSending(false);
            }
        }
    };

    const socialLinks = {
        whatsapp: {
            name: 'WhatsApp',
            icon: <WhatsAppIcon />,
            hoverColor: 'hover:text-[#25D366] hover:border-[#25D366]',
            standardUrl: socialMediaData.whatsapp.profileUrl,
            prefilledUrl: socialMediaData.whatsapp.prefilledUrl,
            handle: socialMediaData.whatsapp.handle
        },
        messenger: {
            name: 'Messenger',
            icon: <MessengerIcon />,
            hoverColor: 'hover:text-[#00B2FF] hover:border-[#00B2FF]',
            standardUrl: socialMediaData.messenger.profileUrl,
            prefilledUrl: socialMediaData.messenger.prefilledUrl,
            handle: socialMediaData.messenger.handle
        },
        instagram: {
            name: 'Instagram',
            icon: <InstagramIcon />,
            hoverColor: 'hover:text-[#E1306C] hover:border-[#E1306C]',
            standardUrl: socialMediaData.instagram.profileUrl,
            prefilledUrl: socialMediaData.instagram.prefilledUrl,
            handle: socialMediaData.instagram.handle
        }
    };

    const hasTyped = !!(formData.name.trim() || formData.email.trim() || formData.phone.trim() || formData.message.trim());
    const activeCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

    return (
        <div className="w-full">
            {/* Component Tab Toggle */}
            <div id="start-chat-section" className="max-w-[1230px] mx-auto px-4 pt-24 pb-12 text-center">
                <span className="block mb-4 text-sm uppercase tracking-[2px] text-black/60 font-bold">
                    Get in touch
                </span>
                <h4 className="mb-8 text-3xl md:text-4xl font-bold text-[#111013] font-space">
                    Choose Your Contact Method
                </h4>
                <div className="inline-flex p-2 bg-white rounded-full border-2 border-black shadow-[4px_4px_0_0_#000]">
                    <button
                        type="button"
                        onClick={() => setContactMethod('chat')}
                        className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all ${contactMethod === 'chat' ? 'bg-[#F4D21F] text-black border-2 border-black shadow-[2px_2px_0_0_#000]' : 'bg-transparent text-black/70 hover:text-black border-2 border-transparent'}`}
                    >
                        Instant Chat
                    </button>
                    <button
                        type="button"
                        onClick={() => setContactMethod('email')}
                        className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all ${contactMethod === 'email' ? 'bg-[#F4D21F] text-black border-2 border-black shadow-[2px_2px_0_0_#000]' : 'bg-transparent text-black/70 hover:text-black border-2 border-transparent'}`}
                    >
                        Send Email Form
                    </button>
                </div>
            </div>

            {/* Consolidated Symmetrical Form Layout */}
            <div className="pb-32">
                <div className="max-w-[1230px] mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
                        {/* Dynamic Heading Left Side */}
                        <div className="w-full lg:w-[45%]">
                            <div className="mb-12 text-center lg:text-left hidden md:flex">
                                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                    <span className="text-sm font-bold uppercase tracking-[2px] text-black/60">
                                        {contactMethod === 'chat' ? 'Instant Chat' : 'Contact Us'}
                                    </span>
                                    <div className="text-black">
                                        <ArrowTwenty className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tight">
                                    {contactMethod === 'chat' ? (
                                        <>Start chatting <br /> in one click <br /> with me!</>
                                    ) : (
                                        <>Let's make <br /> your brand <br /> brilliant!</>
                                    )}
                                </h3>
                            </div>
                        </div>

                        {/* Unified inputs + dynamic bottom triggers Right Side */}
                        <div className="w-full lg:w-[55%]">
                            <div className="bg-[#FAF9F6] p-8 md:p-10 border-4 border-black rounded-2xl shadow-[8px_8px_0_0_#000]">
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div className="col-span-1">
                                            <label className="block text-black font-bold mb-2 text-sm uppercase tracking-wider">Full name*</label>
                                            <input
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                onBlur={() => handleBlur('name')}
                                                placeholder="John Doe"
                                                className="w-full bg-white border-2 border-black rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#F4D21F] transition-all"
                                            />
                                            {formErrors.name && (
                                                <span className="text-red-500 text-xs mt-1 block font-bold">{formErrors.name}</span>
                                            )}
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-span-1">
                                            <label className="block text-black font-bold mb-2 text-sm uppercase tracking-wider">Email address*</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                onBlur={() => handleBlur('email')}
                                                placeholder="john@example.com"
                                                className="w-full bg-white border-2 border-black rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#F4D21F] transition-all"
                                            />
                                            {formErrors.email && (
                                                <span className="text-red-500 text-xs mt-1 block font-bold">{formErrors.email}</span>
                                            )}
                                        </div>

                                        {/* Phone Field */}
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-black font-bold mb-2 text-sm uppercase tracking-wider">Phone Number*</label>
                                            <div className="flex gap-3 items-stretch">
                                                {/* Country Code Dropdown */}
                                                <div ref={dropdownRef} className="relative min-w-[120px]">
                                                    <button
                                                        type="button"
                                                        onClick={() => setCcDropdownOpen(!ccDropdownOpen)}
                                                        className={`w-full h-full px-4 border-2 border-black rounded-lg bg-white text-black font-bold flex items-center justify-between gap-2 hover:bg-[#eee] transition-all focus:outline-none focus:ring-4 focus:ring-[#F4D21F] ${ccDropdownOpen ? 'ring-4 ring-[#F4D21F]' : ''}`}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <img
                                                                src={`https://flagcdn.com/w20/${activeCountry.iso}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${activeCountry.iso}.png 2x`}
                                                                width="20"
                                                                alt={activeCountry.name}
                                                                className="rounded-[2px] object-cover border border-black/10"
                                                            />
                                                            <span>{activeCountry.code}</span>
                                                        </span>
                                                        <span className={`text-[10px] text-black/60 transition-transform ${ccDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                                                    </button>

                                                    {ccDropdownOpen && (
                                                        <ul className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-[280px] max-h-[260px] overflow-y-auto bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] z-50 m-0 py-2 list-none">
                                                            {countries.map(c => (
                                                                <li key={c.iso}>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            handleInputChange('countryCode', c.code);
                                                                            setCcDropdownOpen(false);
                                                                        }}
                                                                        className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${formData.countryCode === c.code ? 'bg-[#F4D21F]/20 font-bold' : 'hover:bg-black/5 font-medium'} text-black text-sm`}
                                                                    >
                                                                        <img
                                                                            src={`https://flagcdn.com/w20/${c.iso}.png`}
                                                                            srcSet={`https://flagcdn.com/w40/${c.iso}.png 2x`}
                                                                            width="20"
                                                                            alt={c.name}
                                                                            className="rounded-[2px] border border-black/10"
                                                                        />
                                                                        <span className="min-w-[45px] text-black font-bold">{c.code}</span>
                                                                        <span className="text-black/60">{c.name}</span>
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                                {/* Phone Input */}
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    onBlur={() => handleBlur('phone')}
                                                    placeholder="9876543210"
                                                    className="flex-1 min-w-0 bg-white border-2 border-black rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#F4D21F] transition-all"
                                                />
                                            </div>
                                            {formErrors.phone && (
                                                <span className="text-red-500 text-xs mt-1 block font-bold">{formErrors.phone}</span>
                                            )}
                                        </div>

                                        {/* Message Field */}
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-black font-bold mb-2 text-sm uppercase tracking-wider">How Can We Help You*</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                onBlur={() => handleBlur('message')}
                                                placeholder="Write your message here..."
                                                className="w-full min-h-[140px] bg-white border-2 border-black rounded-lg px-4 py-3 text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#F4D21F] transition-all resize-y"
                                            ></textarea>
                                            {formErrors.message && (
                                                <span className="text-red-500 text-xs mt-1 block font-bold">{formErrors.message}</span>
                                            )}
                                        </div>

                                        {/* Action Button/Links */}
                                        <div className="col-span-1 md:col-span-2 pt-4">
                                            {contactMethod === 'email' ? (
                                                <div>
                                                    <button
                                                        type="submit"
                                                        disabled={isSending}
                                                        className="w-full bg-[#513081] text-white font-bold text-lg py-4 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all focus:outline-none focus:ring-4 focus:ring-[#F4D21F] disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isSending ? 'Sending...' : 'Send Message'}
                                                    </button>

                                                    {submitSuccess && (
                                                        <div className="mt-6 p-4 bg-[#e6fcf5] text-[#0ca678] font-bold rounded-lg border-2 border-[#0ca678] text-center shadow-[4px_4px_0_0_#0ca678]">
                                                            ✨ Thank you! Your message has been sent successfully. We will get back to you shortly.
                                                        </div>
                                                    )}

                                                    {submitError && (
                                                        <div className="mt-6 p-4 bg-[#fff5f5] text-[#fa5252] font-bold rounded-lg border-2 border-[#fa5252] text-center shadow-[4px_4px_0_0_#fa5252]">
                                                            ❌ {submitError}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="block text-black font-bold mb-4 text-sm uppercase tracking-wider">
                                                        {hasTyped ? 'Send pre-filled message via:' : 'Direct connect links:'}
                                                    </label>

                                                    {!hasTyped ? (
                                                        /* Default state: 4 small round icon buttons in a single compact row */
                                                        <div className="flex flex-wrap items-center gap-4">
                                                            {Object.entries(socialLinks).map(([key, item]) => (
                                                                <a
                                                                    key={key}
                                                                    href={item.standardUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    title={`Open ${item.name}`}
                                                                    className={`w-14 h-14 flex items-center justify-center rounded-full border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white text-black ${item.hoverColor}`}
                                                                >
                                                                    <span className="w-6 h-6 flex items-center justify-center">
                                                                        {item.icon}
                                                                    </span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        /* Active state: 4 dynamic brand send buttons */
                                                        <div className="flex flex-wrap gap-4">
                                                            {Object.entries(socialLinks).map(([key, item]) => {
                                                                const structuredMessage = `Hello Barshan!\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nPhone: ${formData.countryCode} ${formData.phone.trim()}\n\nMessage:\n${formData.message.trim()}`;
                                                                const url = item.prefilledUrl(structuredMessage);

                                                                return (
                                                                    <a
                                                                        key={key}
                                                                        href={url}
                                                                        onClick={(e) => {
                                                                            if (!validateAll()) {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white text-black font-bold group ${item.hoverColor}`}
                                                                    >
                                                                        <span className="w-5 h-5 flex items-center justify-center">
                                                                            {item.icon}
                                                                        </span>
                                                                        <span>Send with {item.name}</span>
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactFormArea;