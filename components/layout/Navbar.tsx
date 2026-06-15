import { UEMLogo, PragyaLogo, IEMLogo } from "@/components/icons/Icons";
import { navigationData } from "@/constants/NavigationData";
import MobileNavigation from "./MobileNavigation";
import NavLink from "./NavLink";

// Items left of the Pragya logo: Home · About · Events
const leftNav = navigationData.slice(0, 3);
// Items right of the Pragya logo: Family · Partners · Contact
const rightNav = navigationData.slice(3);

export default function Navbar() {
  return (
    <header className="w-full bg-[#FFEDE0] sticky top-0 z-50">

      {/* DESKTOP NAVIGATION — xl (1280px) and above
          All 9 items in ONE flex row with justify-between so the
          gap between logos and nav links is identical to the gap between
          nav links themselves.                                              */}
      <nav
        className="
          hidden xl:flex
          items-center justify-between
          border-2 border-black rounded-[35px]
          bg-[#FFEDE0]
          mx-6 mt-5 mb-3
          px-8 py-2.5
        "
        aria-label="Main navigation"
      >
        {/* UEM Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <UEMLogo className="h-[60px] w-auto" />
        </div>

        {/* Left nav: Home · About · Events */}
        {leftNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}

        {/* Pragya logo — central brand mark */}
        <div className="shrink-0 flex items-center justify-center">
          <PragyaLogo className="h-[76px] w-auto" />
        </div>

        {/* Right nav: Family · Partners · Contact */}
        {rightNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}

        {/* IEM Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <IEMLogo className="h-[60px] w-auto" />
        </div>
      </nav>

      {/* MOBILE NAVIGATION — below xl (1280px) */}
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
}
