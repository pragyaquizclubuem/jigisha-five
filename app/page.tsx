import PageWrapper from "@/components/wrappers/PageWrapper";
import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/sections/homepage/AboutUs";
import Venue from "@/components/home/Venue";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <PageWrapper>
      <HomeHero />
      <AboutUs />
      <Venue />
      <Gallery />
      <FAQ />
    </PageWrapper>
  );
}