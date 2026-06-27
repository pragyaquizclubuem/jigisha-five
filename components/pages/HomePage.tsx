import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/home/AboutUs";
import OurQuizzes from "@/components/home/OurQuizzes";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";
import BrochureSection from "../home/BrochureSection";
import MapSection from "../home/MapSection";
import EventCountdown from "../home/EventCountdown";
import Footer from "../layout/Footer";

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Write your code here to orchestrate or customize the homepage */}
      <HomeHero />
      <AboutUs />
      <EventCountdown targetDate="2027-01-01T00:00:00"/>
      <BrochureSection/>
      <OurQuizzes />
      <MapSection/>
      <Gallery />
      <FAQ />
      <Footer/>
    </div>
  );
}
