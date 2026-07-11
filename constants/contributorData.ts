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
    name: "Mahulee Lahiri",
    role: "UI/UX Design & Visual Identity",
    image: "/images/team/Mahulee.avif",
    linkedin: "https://linkedin.com/in/mahuleelahiri",
    insta: "https://www.instagram.com/_mahuleelahiri",
    fb: "https://www.facebook.com/share/1Dn4FqPJiv/",
    github: "#",
  },
  {
    name: "Supriyo Mondal",
    role: "Frontend Development & Component Design",
    image: "/images/team/Supriyo.avif",
    github: "https://github.com/supriyamondaldev",
    linkedin: "https://www.linkedin.com/in/supriya-mondal06",
    insta: "https://www.instagram.com/maisupriyohoon",
    fb: "https://www.facebook.com/share/1HMeyfZ8Hm/",
  },
  {
    name: "Ritam Das Gupta",
    role: "Frontend Development & Component Design",
    image: "/images/team/Ritam.avif",
    github: "https://github.com/ritamdasgupta",
    linkedin: "https://www.linkedin.com/in/ritam-das-gupta-413877320",
    insta: "https://www.instagram.com/__agantuk__05",
    fb: "#",
  },
  {
    name: "Anadir Paul",
    role: "Frontend Development & Asset Integration",
    image: "/images/team/Anadir.avif",
    github: "https://github.com/anadirpaul",
    linkedin: "https://www.linkedin.com/in/anadir-paul-28043a322",
    fb: "https://facebook.com/anadirpaul",
    insta: "https://www.instagram.com/anadeerpaul",
  },
];
