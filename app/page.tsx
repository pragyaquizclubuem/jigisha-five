import PageWrapper from "@/components/wrappers/PageWrapper";
import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/sections/homepage/AboutUs";
import Venue from "@/components/home/Venue";
import FAQ from "@/components/sections/homepage/FAQ";

export default function Home() {
  return (
    <PageWrapper>
      <HomeHero />
      <AboutUs />
      <Venue />
      <FAQ />
    </PageWrapper>
  );
}