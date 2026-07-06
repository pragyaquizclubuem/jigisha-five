import AboutUsPage from "@/components/pages/AboutUsPage";
import PageWrapper from "@/components/wrappers/PageWrapper";

export const metadata = {
  title: "About Us | Jigisha 5.0",
  description: "Learn more about Pragya, the Official Quiz Club of UEM Kolkata and the history of Jigisha.",
};

export default function About() {
  return (
    <PageWrapper>
      <AboutUsPage />
    </PageWrapper>
  );
}
