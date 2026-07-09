export interface EventContact {
  name: string;
  phone: string;
}

export interface EventDetail {
  id: string;
  title: string;
  description: string;
  rules: string[];
  tags: string[];
  date: string; // e.g., "September 14, 2026"
  timeRange: string; // e.g., "10:00 AM - 12:30 PM"
  teamSize: string; // e.g., "Solo / Team of two"
  mode: string; // e.g., "Offline Mode"
  quizMasters: string[]; // names of the quiz masters
  contacts: EventContact[];
  bannerImg?: string; // High-res poster for desktop
  phoneImg?: string; // High-res poster for mobile
  registerUrl?: string; // Link to registration
}

export const eventData: EventDetail[] = [
  {
    id: "fandomania",
    title: "Fandomania",
    description: "Step into the universe of your favorite movies, shows, books, comics, and pop culture icons. Whether you're a Potterhead, Marvel maniac, anime addict, or K-pop stan - this is your arena. Prove your fandom, claim your crown.\n\nThis is a general format quiz with prelims and finals.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "Fandom"],
    date: "September 14, 2026",
    timeRange: "10:00 AM - 12:30 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Drisana", "Chirag", "Argha", "Hamza"],
    contacts: [
      { name: "Hamza", phone: "+919831324865" },
      { name: "Supriyo", phone: "+919749967441" }
    ],
    bannerImg: "/images/posters/fandomania.avif",
    phoneImg: "/images/posters/fandomania.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  },
  {
    id: "fandomaniac",
    title: "Fandomania",
    description: "Step into the universe of your favorite movies, shows, books, comics, and pop culture icons. Whether you're a Potterhead, Marvel maniac, anime addict, or K-pop stan - this is your arena. Prove your fandom, claim your crown.\n\nThis is a general format quiz with prelims and finals.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "Fandom"],
    date: "September 14, 2026",
    timeRange: "10:00 AM - 12:30 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Drisana Pisi", "Chirag Chakraborty", "Argha Dutta", "Hamza Sheikh Hamedur Rahman"],
    contacts: [
      { name: "Hamza", phone: "+919831324865" },
      { name: "Supriyo", phone: "+919749967441" }
    ],
    bannerImg: "/images/posters/fandomania.avif",
    phoneImg: "/images/posters/fandomania.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  }
];
