import Image from "next/image";
import { mapData } from "@/constants/MapData";
import { MapPinIcon } from "@/components/icons/Icons";

// Note: Future compatibility comment for MapFramer:
// When swapping this image with MapFramer, you can import MapFramer from the approved package
// and replace the <Image /> tag and its overlay with the <MapFramer /> component:
//
// import MapFramer from "MapFramer";
// ...
// <MapFramer locationUrl={locationUrl} ... />

export default function MapImage() {
  const { mapImage, locationUrl } = mapData;

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[28px] border-12 border-[#310D59] bg-[#310D59] sm:h-[400px] md:h-[450px] lg:h-full lg:rounded-[34px] lg:border-16 shadow-sm">
      <a
        href={locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open venue location on Google Maps"
        className="group relative flex h-full w-full overflow-hidden rounded-[16px] sm:rounded-[20px] lg:rounded-[22px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#AB97C3]"
      >
        {/* Next.js Optimized Image */}
        <Image
          src={mapImage.src}
          alt={mapImage.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Interaction Overlay (Desktop only via group-hover/transition) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#310D59]/75 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          {/* Circular Pin Icon Wrapper */}
          <div className="flex h-14 w-14 scale-90 items-center justify-center rounded-full bg-white text-[#310D59] shadow-lg transition-transform duration-300 group-hover:scale-100">
            <MapPinIcon className="h-6 w-6" />
          </div>
          <span className="font-roboto-condensed text-base font-bold tracking-wider uppercase">
            View Location
          </span>
        </div>
      </a>
    </div>
  );
}
