/** Contributor data — displayed in the "Designed by TEAM PRAGYA" modal */

export interface Contributor {
  name: string;
  role: string;
  /** Path to image inside /public (e.g. "/images/contributors/barshan.avif") */
  image: string;
  /** Social links — all optional */
  fb?: string;
  insta?: string;
  linkedin?: string;
  github?: string;
}

export const contributorData: Contributor[] = [
  {
    name: "Supriyo Mondal",
    role: "Frontend Development & Component Design",
    image: "/images/contributors/supriyo.avif",
    github: "https://github.com/supriyomondal",
    linkedin: "https://linkedin.com/in/supriyomondal",
    insta: "https://instagram.com/supriyomondal",
    fb: "#",
  },
  {
    name: "Ritam Das Gupta",
    role: "Frontend Development & Component Design",
    image: "/images/contributors/ritam.avif",
    github: "https://github.com/ritamdasgupta",
    linkedin: "https://linkedin.com/in/ritamdasgupta",
    insta: "https://instagram.com/ritamdasgupta",
    fb: "#",
  },
  {
    name: "Anadir Paul",
    role: "Frontend Development & Asset Integration",
    image: "/images/contributors/anadir.avif",
    github: "https://github.com/anadirpaul",
    linkedin: "https://linkedin.com/in/anadirpaul",
    fb: "https://facebook.com/anadirpaul",
    insta: "#",
  },
  {
    name: "Mahulee Lahiri",
    role: "UI/UX Design & Visual Identity",
    image: "/images/contributors/mahulee.avif",
    linkedin: "https://linkedin.com/in/mahuleelahiri",
    insta: "https://instagram.com/mahuleelahiri",
    fb: "https://facebook.com/mahuleelahiri",
    github: "#",
  },
];
