export interface AboutUsTextSegment {
  text: string;
  emphasis?: boolean;
}

export interface AboutUsStat {
  value: string;
  label: string;
}

export const aboutUsData = {
  heading: "ABOUT US",

  image: {
    src: "/images/Pragya_Team.avif",
    alt: "Pragya Quiz Club team",
  },

  description: [
    { text: "Jigisha", emphasis: true },
    { text: " is the annual quiz festival of University of Engineering and Management Kolkata. It is hosted by " },
    { text: "Pragya", emphasis: true },
    { text: " - The Official Quiz Club of UEM Kolkata. " },
    { text: "Pragya", emphasis: true },
    { text: " is home to some of Kolkata's most " },
    { text: "Elite Quizzers", emphasis: true },
    { text: " and " },
    { text: "Quiz-Masters", emphasis: true },
    { text: " who have conquered national level quizzes since its " },
    { text: "Inception In 2017", emphasis: true },
    { text: "." },
  ] as AboutUsTextSegment[],

  stats: [
    {
      value: "5000+",
      label: "Footfall",
    },
    {
      value: "₹75,000+",
      label: "Prize Pool",
    },
    {
      value: "3,00,000+",
      label: "Social Media Reach",
    },
    {
      value: "6",
      label: "Quizzes",
    },
  ] as AboutUsStat[],
};