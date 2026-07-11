import PageWrapper from "@/components/wrappers/PageWrapper";

export default function PartnersPage() {
  return (
    <PageWrapper className="bg-[#FFEDE0] pt-6 pb-12 md:pt-10 md:pb-16 relative overflow-hidden">
      <div className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24 bg-[#e56767] rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] animate-[bounce_5s_infinite]"></div>
      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-24 h-24 md:w-32 md:h-32 bg-[#2ea71b] rounded-lg border-4 border-black shadow-[6px_6px_0_0_#000] rotate-12 animate-[pulse_3s_infinite]"></div>
      <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-[#F4D21F] border-4 border-black shadow-[4px_4px_0_0_#000] rotate-45 animate-[spin_10s_linear_infinite] hidden md:block"></div>
      <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16 w-16 h-8 md:w-24 md:h-12 bg-[#6f99c0] border-4 border-black shadow-[4px_4px_0_0_#000] rounded-b-full animate-[bounce_6s_infinite_1s]" aria-hidden="true" />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 uppercase tracking-wide mb-4">
            Our Partner Network
            <br />
            <span className="text-purple-850">Is Coming Soon</span>
          </h1>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8 rounded-full"></div>

          {/* Exciting Alliances Section */}
          <div className="mb-8">
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              Exciting Alliances
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We are currently finalizing collaborations. The complete list of our esteemed partners will be revealed here shortly.
            </p>
          </div>



          {/* Decorative Dots / Separator */}
          <div className="flex justify-center gap-3 mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
          </div>

          {/* Partnership Inquiries Section */}
          <div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              Partnership Inquiries
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-2">
              Interested in joining our network? We are always looking for visionary organizations to collaborate with.
            </p>
            <p className="font-body text-base sm:text-lg">
              <span className="text-gray-600">Drop us a line at </span>
              <a
                href="mailto:contact@pragya.club"
                className="text-purple-600 font-semibold hover:text-purple-1000 hover:underline transition-colors"
              >
                contact@pragya.club
              </a>
            </p>
          </div>

          {/* Future partner sections will go here */}
          <div className="mt-16 text-center text-sm text-gray-400 border-t border-gray-200 pt-8">
            {/* 
              Future expansion: 
              - Title Sponsor
              - Associate Sponsors
              - Education Partners
              - Community Partners
              - Media Partners
              - Technology Partners
              - Institutional Partners
            */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}


