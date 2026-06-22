// import HomePage from "@/components/pages/HomePage";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center font-sans">
//      <h1>Welcome to Jigisha !</h1>
//     </div>
//   );
// }

import PageWrapper from "@/components/wrappers/PageWrapper";
import AboutUs from "@/components/sections/homepage/AboutUs";
import Venue from "@/components/home/Venue";

export default function Home() {
  return (
    <PageWrapper>
      <AboutUs />
      <Venue />
    </PageWrapper>
  );
}