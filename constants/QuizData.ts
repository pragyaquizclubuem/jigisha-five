export interface QuizItem {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  link?: string;
}

export const quizData = [
  {
    id: "jana-ojana",
    title: "Jana Ojana",
    image: "/images/posters/jana ojana.avif",
    tags: ["School Quiz", "Class 6 To 12", "General"],
    description: "Calling all bright sparks from classes 6 to 12 (including 2026 passouts) to step up, team up, and take on the thrill of brain-busting trivia, quirky questions, and a whole lot of fun.",
    link: "/events/jana-ojana",
  },
  {
    id: "hit-the-homerun",
    title: "Hit The Homerun",
    image: "/images/Pragya_Team.avif",
    tags: ["U-25", "Sports", "Offline"],
    description: "From iconic moments to legendary players, test your knowledge across cricket, football, Olympics, and beyond. Whether you play, cheer, or analyze - if sports excites you, this quiz is your arena!",
    link: "https://unstop.com/o/23Jigisha5",
  },
  {
    id: "convergence",
    title: "Convergence",
    image: "/images/Pragya_Team.avif",
    tags: ["U-25", "Biz-Tech", "Offline"],
    description: "Gear up for a high-voltage quiz that blends the fast-paced world of business with the cutting edge of technology. From startups to CEOs, gadgets to algorithms, show your biz-tech mettle.",
    link: "https://unstop.com/o/23Jigisha5",
  },
  {
    id: "fandomania",
    title: "Fandomania",
    image: "/images/Pragya_Team.avif",
    tags: ["U-25", "Fandom", "Offline"],
    description: "From anime and superhero universes to iconic sitcoms, movies, and pop culture trends—fandoms unite! Prove you're the ultimate fan in this ultimate showdown of pop-culture trivia.",
    link: "https://unstop.com/o/23Jigisha5",
  },
  {
    id: "fnb-unstop",
    title: "FNB (Unstop)",
    image: "/images/Pragya_Team.avif",
    tags: ["U-25", "MELA", "Online"],
    description: "Lights, camera, action! Bring your A-game online for Friday Night Blockbuster, the ultimate MELA (Music, Entertainment, Literature, Arts) quiz. Compete on Unstop and claim the crown.",
    link: "https://unstop.com/o/23Jigisha5",
  },
  {
    id: "pragya-6th-sense",
    title: "Pragya 6th Sense",
    image: "/images/Pragya_Team.avif",
    tags: ["Open To All", "General", "Offline"],
    description: "The prestigious flagship open general quiz of JIGISHA. Open to all ages, prepare for a battle of wits, lateral thinking, and deep connections. Bring your sixth sense to this battlefield of knowledge.",
    link: "https://unstop.com/o/23Jigisha5",
  },
] as QuizItem[];
