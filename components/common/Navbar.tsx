import { UEMLogo, PragyaLogo, IEMLogo } from "./Icons";
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
          <UEMLogo className="h-[77px] w-auto" />
        </div>

        {/* Centre: left links · Pragya · right links */}
        <div className="flex items-center gap-1.5 2xl:gap-2.5">

          {leftNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}

          {/* Pragya logo — central brand mark */}
          <div className="mx-2 2xl:mx-4 flex-shrink-0">
            <PragyaLogo className="h-[91px] w-auto" />
          </div>

          {rightNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* IEM Logo */}
        <div className="flex-shrink-0">
          <IEMLogo className="h-[79px] w-auto" />
        </div>
      </nav>

      {/* MOBILE NAVIGATION — below xl (1280px) */}
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
}
