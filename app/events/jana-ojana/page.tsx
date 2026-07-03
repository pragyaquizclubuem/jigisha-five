import PageWrapper from "@/components/wrappers/PageWrapper";
import RegistrationForm from "@/components/events/jana-ojana/RegistrationForm";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Jana Ojana Registration | Jigisha",
  description: "Register for the Jana Ojana Annual School Quiz Competition at Jigisha 5.0.",
};

export default function JanaOjanaPage() {
  return (
    <PageWrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 pt-24 pb-12 md:pt-28 md:pb-16 px-4 max-w-4xl mx-auto w-full">
        {/* Retro Header Panel */}
        <div className="text-center mb-10 select-none">
          <h1 className="font-roboto-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-[#252525]">
            JANA OJANA
          </h1>
          <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#513081] mt-2">
            The School Quiz Competition • Jigisha 5.0
          </p>
        </div>

        {/* Main Form Retro Panel */}
        <div className="rounded-[34px] border-2 border-[#252525] bg-[#FFEDE0] p-6 sm:p-10 md:p-12 shadow-[8px_8px_0_0_#252525] mb-12">
          <RegistrationForm />
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
