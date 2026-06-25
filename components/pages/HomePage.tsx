import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/home/AboutUs";
import Countdown from "@/components/home/Countdown";
import Challenge from "@/components/home/Challenge";
import Quizzes from "@/components/home/Quizzes";
import Venue from "@/components/home/Venue";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";
import BrochureSection from "../home/BrochureSection";
import MapSection from "../home/MapSection";
import EventCountdown from "../home/EventCountdown";

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Write your code here to orchestrate or customize the homepage */}
      <HomeHero />
      <EventCountdown targetDate="2027-01-01T00:00:00"/>
      <AboutUs />
      {/* <Countdown /> */}
      {/* <Challenge /> */}
      {/* <Quizzes /> */}
      {/* <Venue /> */}
      <BrochureSection/>
      <MapSection/>
      <Gallery />
      <FAQ />
    </div>
  );
}
