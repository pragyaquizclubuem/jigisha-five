
import Image from "next/image";
import { navigationData } from "@/constants/NavigationData";
import MobileNavigation from "./MobileNavigation";
import NavLink from "./NavLink";

// Items left of the Pragya logo: Home · About · Events
const leftNav = navigationData.slice(0, 3);
// Items right of the Pragya logo: Family · Partners · Contact
const rightNav = navigationData.slice(3);

export default function Navbar() {
  return (
    <header className="w-full bg-[#FFEDE0] sticky top-0 z-50 relative">

      {/* DESKTOP NAVIGATION — xl (1280px) and above */}
      <nav
        className="
          hidden xl:flex
          items-center justify-between
          border border-black rounded-2xl
          mx-4 my-2 2xl:mx-8
          px-4 py-1.5
        "
        aria-label="Main navigation"
      >
        {/* UEM Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/uem-logo.svg"
            width={106}
            height={77}
            alt="University of Engineering & Management"
            className="object-contain h-[77px] w-auto"
            priority
          />
        </div>

        {/* Centre: left links · Pragya · right links */}
        <div className="flex items-center gap-1.5 2xl:gap-2.5">

          {leftNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}

          {/* Pragya logo — central brand mark */}
          <div className="mx-2 2xl:mx-4 flex-shrink-0">
            <Image
              src="/images/pragya-logo.svg"
              width={96}
              height={91}
              alt="Pragya — UEM Kolkata Quiz Club"
              className="object-contain h-[91px] w-auto"
              priority
            />
          </div>

          {rightNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* IEM Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/iem-logo.svg"
            width={109}
            height={79}
            alt="Institute of Engineering & Management"
            className="object-contain h-[79px] w-auto"
            priority
          />
        </div>
      </nav>

      {/* MOBILE NAVIGATION — below xl (1280px) */}
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
}
