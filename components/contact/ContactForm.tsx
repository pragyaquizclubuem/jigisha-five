"use client";

import SectionWrapper from "@/components/wrappers/SectionWrapper";
import { MailIcon, PhoneIcon, ArrowRightIcon } from "@/components/icons/Icons";

export default function ContactForm() {
    const contactPersons = [
        { name: "John", number: "+91 98765 43210" },
        { name: "Jane", number: "+91 98765 43211" },
        { name: "Mike", number: "+91 98765 43212" },
        { name: "Sarah", number: "+91 98765 43213" },
        { name: "Alex", number: "+91 98765 43214" },
        { name: "Emma", number: "+91 98765 43215" }
    ];

    return (
        <SectionWrapper className="bg-transparent pt-6 pb-12 md:pt-10 md:pb-16 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24 bg-[#F4D21F] rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] animate-[bounce_5s_infinite]"></div>
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-24 h-24 md:w-32 md:h-32 bg-[#513081] rounded-lg border-4 border-black shadow-[6px_6px_0_0_#000] rotate-12 animate-[pulse_3s_infinite]"></div>
            <div className="absolute top-1/2 left-1/4 w-10 h-10 md:w-16 md:h-16 bg-[#25D366] rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] animate-[bounce_4s_infinite_0.5s] hidden sm:block"></div>
            <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] rotate-45 animate-[spin_10s_linear_infinite] hidden md:block"></div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-6">
                    <div className="inline-flex mb-3">
                        <span className="font-bold text-xs uppercase tracking-[0.2em] bg-white text-black px-4 py-2 border-2 border-black rounded-full shadow-[4px_4px_0_0_#000]">
                            Reach Out To Us
                        </span>
                    </div>
                    <h2 className="font-roboto-condensed text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight text-[#252525]">
                        Let's build <br className="md:hidden" />
                        <span className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-[#513081] px-4 py-1 border-4 border-black shadow-[6px_6px_0_0_#000] inline-block -rotate-2 ml-2">something great</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Email Card */}
                    <div className="bg-white border-4 border-black p-4 sm:p-6 rounded-2xl shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 transition-all duration-300 group flex items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-[#F4D21F] border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:rotate-12 transition-transform">
                            <MailIcon className="w-6 h-6 md:w-8 md:h-8 text-black" />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-roboto-condensed text-xl md:text-2xl font-bold uppercase mb-1 text-black">Email Us</h3>
                            <a href="mailto:hello@jigisha.com" className="text-base sm:text-lg md:text-xl font-bold text-black hover:text-[#513081] transition-colors border-b-2 border-transparent hover:border-[#513081] inline-block truncate w-full">
                                hello@jigisha.com
                            </a>
                        </div>
                    </div>

                    {/* Phones Card */}
                    <div className="bg-white border-4 border-black p-4 sm:p-6 rounded-2xl shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 transition-all duration-300 group flex items-center md:items-start gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-[#513081] text-white border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:-rotate-12 transition-transform">
                            <PhoneIcon className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="w-full">
                            <h3 className="font-roboto-condensed text-xl md:text-2xl font-bold uppercase mb-2 text-black">Call Us</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                {contactPersons.slice(0, 4).map((person, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">{person.name}</span>
                                        <a href={`tel:${person.number.replace(/\s+/g, '')}`} className="font-bold text-sm text-black hover:text-[#513081] transition-colors flex items-center gap-1.5 group/link">
                                            <span className="w-1.5 h-1.5 rounded-full bg-black group-hover/link:bg-[#513081] transition-colors shrink-0"></span>
                                            {person.number}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-2 md:mt-0 relative z-20">
                    <a 
                        href="#start-chat-section"
                        className="group flex items-center gap-3 md:gap-4 bg-[#252525] text-white px-6 py-4 md:px-10 md:py-5 rounded-full border-4 border-black shadow-[6px_6px_0_0_#F4D21F] md:shadow-[8px_8px_0_0_#F4D21F] hover:shadow-[10px_10px_0_0_#F4D21F] md:hover:shadow-[12px_12px_0_0_#F4D21F] hover:-translate-y-1 transition-all duration-300 max-w-full"
                    >
                        <span className="font-bold text-[13px] sm:text-base md:text-xl uppercase tracking-widest group-hover:text-[#F4D21F] transition-colors whitespace-nowrap">Start a Chat Online</span>
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#F4D21F] text-black border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:rotate-45 transition-transform duration-300 shrink-0">
                            <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                    </a>
                </div>
            </div>
        </SectionWrapper>
    );
}
