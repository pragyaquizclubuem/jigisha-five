import PageWrapper from "@/components/wrappers/PageWrapper";
import QmForm from "@/components/admin/QmForm";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "QM Data Generator | Jigisha 5.0",
  description: "Internal tool for generating Quiz Master JSON data.",
};

export default function QmFormPage() {
  return (
    <PageWrapper>
      <Toaster position="top-center" />
      <div className="flex-1 py-16 md:py-24 px-4 max-w-6xl mx-auto w-full flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <h1 className="font-roboto-condensed text-4xl sm:text-5xl font-bold uppercase tracking-wide text-[#252525] mb-4">
            QM Data Generator
          </h1>
          <p className="font-body text-[#513081] font-medium max-w-2xl mx-auto">
            Use this internal tool to generate formatted JSON objects for the `QmData.ts` constant file.
          </p>
        </div>
        
        <QmForm />
      </div>
    </PageWrapper>
  );
}
