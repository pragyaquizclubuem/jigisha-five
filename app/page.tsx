import PageWrapper from "@/components/wrappers/PageWrapper";
import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/sections/homepage/AboutUs";
import Venue from "@/components/home/Venue";

export default function Home() {
  return (
    <PageWrapper>
      <HomeHero />
      <AboutUs />
      <Venue />
    </PageWrapper>
  );
}