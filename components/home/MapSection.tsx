import SectionWrapper from "@/components/wrappers/SectionWrapper";
import MapDescription from "./MapDescription";
import MapImage from "./MapImage";

export default function MapSection() {
  return (
    <SectionWrapper id="location" className="py-10 md:py-14 lg:py-16">
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* Left side description details */}
        <div>
          <MapDescription />
        </div>

        {/* Right side framed map image preview */}
        <div className="h-full">
          <MapImage />
        </div>
      </div>
    </SectionWrapper>
  );
}
