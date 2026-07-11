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
    id: "jana ojana",
    title: "Jana Ojana",
    description: "Jana Ojana is the most prestigious school general quiz at Jigisha, where every question rewards curiosity and every answer brings you closer to glory. Covering every genre imaginable, it is the ultimate stage for school quizzers to challenge themselves and stand out.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["School Quiz", "General"],
    date: "August 08, 2026",
    timeRange: "10:00 AM - 03:00 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Anadir", "Piyush", "Ritam"],
    contacts: [
      { name: "Anadir", phone: "+919387796623" },
      { name: "Piyush", phone: "+917596863383" }
    ],
    bannerImg: "/images/posters/jana-ojana.avif",
    phoneImg: "/images/posters/jana-ojana.avif",
    registerUrl: "https://janaojana.pragya.club"
  },
  {
    id: "FNB",
    title: "Friday Night Blockbusters",
    description: "Friday Night Blockbuster is Jigisha's MELA Quiz, bringing together the best of music, entertainment, literature, and the arts in one unforgettable contest. Every question celebrates culture, every round tests your perspective, and every answer brings you closer to victory..",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "MELA"],
    date: "Prelims: August 15 & Finals: August 28, 2026",
    timeRange: "Prelims: 06:00 PM & Finals: 07:30 PM",
    teamSize: "Solo",
    mode: "Online Mode",
    quizMasters: ["Supriyo", "Santi", "Aniket"],
    contacts: [
      { name: "Santi", phone: "+917001478230" },
      { name: "Supriyo", phone: "+919749967441" }
    ],
    bannerImg: "/images/posters/fnb.avif",
    phoneImg: "/images/posters/fnb.avif",
    registerUrl: "https://fnb.pragya.club"
  },
  {
    id: "HTH",
    title: "Hit The Homerun",
    description: "Hit the Home Run is Jigisha's Sports Quiz. Where Messi finds Ronaldo, Kohli trusts Dhoni, Jordan challenges LeBron, Federer serves to Nadal, Djokovic returns it, Hamilton races Verstappen, and Bolt is already celebrating. If you didn't need an explanation for any of that, this quiz was made for you.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "Sports"],
    date: "August 29, 2026",
    timeRange: "10:00 AM - 01:00 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Ayush", "Dipanjan", "Siddhartha", "Soham"],
    contacts: [
      { name: "Surajit", phone: "+917718344674" },
      { name: "Devi Prasad", phone: "+918210447474" }
    ],
    bannerImg: "/images/posters/hit-the-homerun.avif",
    phoneImg: "/images/posters/hit-the-homerun.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  },
  {
    id: "convergence",
    title: "Convergence",
    description: "Convergence is Jigisha's Biz-Tech Quiz. If reading about startups, AI, billion dollar deals, product launches, and CEOs somehow counts as 'scrolling,' you've officially found the most productive way to procrastinate. If your idea of breaking news is the next unicorn, the latest innovation, or the biggest acquisition, this is your quiz.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "Biz-Tech"],
    date: "August 29, 2026",
    timeRange: "1:30 PM - 4:00 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Mahargha", "Barshan", "Arunava"],
    contacts: [
      { name: "Oishi", phone: "+918697512263" },
      { name: "Arunava", phone: "+918001386218" }
    ],
    bannerImg: "/images/posters/convergence.avif",
    phoneImg: "/images/posters/convergence.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  },
  {
    id: "fandomania",
    title: "Fandomania",
    description: "Fandomania is Jigisha's Fandom Quiz. If you've ever argued over Marvel vs. DC, cried over a fictional character, quoted movie dialogues at the perfect moment, binged an entire series overnight, revisited childhood cartoons for the hundredth time, or proudly called yourself a fan of anything, welcome home. Every fandom has a story how many of them do you know?",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["U-25 Quiz", "Fandom"],
    date: "August 30, 2026",
    timeRange: "10:00 AM - 01:00 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Drisana", "Hamza", "Sneha", "Argha"],
    contacts: [
      { name: "Hamza", phone: "+919831324865" },
      { name: "Sneha", phone: "+917878396475" }
    ],
    bannerImg: "/images/posters/fandomania.avif",
    phoneImg: "/images/posters/fandomania.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  },
  {
    id: "p6",
    title: "Pragya 6th Sense",
    description: "Pragya Sixth Sense is Jigisha's flagship Open General Quiz and the festival's most prestigious battle of knowledge. Spanning current affairs, public affairs, history, science, sports, business, technology, literature, entertainment, geography, and everything in between, it challenges the sharpest minds across every genre. If there's one quiz that defines the spirit of Jigisha, this is it.",
    rules: [
      "It is mandatory to bring a government ID card on the day of the quiz event."
    ],
    tags: ["Open General Quiz"],
    date: "August 30, 2026",
    timeRange: "01:30 PM - 4:30 PM",
    teamSize: "Solo / Team of two",
    mode: "Offline Mode",
    quizMasters: ["Sabhyasachi", "Shayak", "Arnab", "Indrojeet"],
    contacts: [
      { name: "Subhadeep", phone: "+916291642437" },
      { name: "Mahulee", phone: "+919674623159" }
    ],
    bannerImg: "/images/posters/p6.avif",
    phoneImg: "/images/posters/p6.avif",
    registerUrl: "https://unstop.com/o/23Jigisha5"
  }
];
