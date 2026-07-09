import HomeHero from "@/components/home/hero/HomeHero";
import AboutUs from "@/components/home/about-us/AboutUs";
import OurQuizzes from "@/components/home/quizzes/OurQuizzes";
import Gallery from "@/components/home/gallery/Gallery";
import FAQ from "@/components/home/faq/FAQ";
import BrochureSection from "@/components/home/brochure/BrochureSection";
import MapSection from "@/components/home/map/MapSection";
import EventCountdown from "@/components/home/counter/EventCountdown";
import AnnouncementStrip from '@/components/home/AnnouncementStrip';


export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Write your code here to orchestrate or customize the homepage */}
      <HomeHero />
      <AnnouncementStrip />
      <AboutUs />
      <EventCountdown targetDate="2027-01-01T00:00:00" />
      <BrochureSection />
      <OurQuizzes />
      <MapSection />
      <Gallery />
      <FAQ />
    </div>
  );
}
