import EventPage from "@/components/pages/EventPage";
import { constructMetadata } from "@/constants/MetaData";

export const metadata = constructMetadata({
  title: "Events",
  description: "Explore the exciting events, quizzes, and competitions hosted at Jigisha 5.0.",
});
export default function Page() {
  return (
    <EventPage />
  );
}