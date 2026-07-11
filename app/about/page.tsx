import AboutUsPage from "@/components/pages/AboutUsPage";
import ComingSoon from "@/components/ui/coming-soon";
import PageWrapper from "@/components/wrappers/PageWrapper";

import { constructMetadata } from "@/constants/MetaData";

export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn more about Pragya, the Official Quiz Club of UEM Kolkata and the history of Jigisha.",
});

export default function About() {
  return (
    <PageWrapper>
      {/* <AboutUsPage /> */}
      <ComingSoon/>
    </PageWrapper>
  );
}
