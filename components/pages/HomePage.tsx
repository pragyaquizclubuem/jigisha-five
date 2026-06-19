import HomeHero from "@/components/home/HomeHero";
import AboutUs from "@/components/home/AboutUs";
import Countdown from "@/components/home/Countdown";
import Challenge from "@/components/home/Challenge";
import Quizzes from "@/components/home/Quizzes";
import Venue from "@/components/home/Venue";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Write your code here to orchestrate or customize the homepage */}
      <HomeHero />
      <AboutUs />
      <Countdown />
      <Challenge />
      <Quizzes />
      <Venue />
      <Gallery />
      <FAQ />
    </div>
  );
}
