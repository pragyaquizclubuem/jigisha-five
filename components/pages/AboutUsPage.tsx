import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about-us/AboutHero";
import TheStory from "@/components/about-us/TheStory";
import AboutPragya from "@/components/about-us/AboutPragya";
import AboutTimeline from "@/components/about-us/AboutTimeline";
import AboutStats from "@/components/about-us/AboutStats";

export default function AboutUsPage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <AboutHero />
      <TheStory />
      <AboutPragya />
      <AboutTimeline />
      <AboutStats />
      <Footer />
    </div>
  );
}
