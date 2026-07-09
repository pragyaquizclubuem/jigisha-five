import { Metadata } from 'next';

const defaultTitle = "Jigisha 5.0 | The Annual Quiz Festival of UEM Kolkata";
const defaultDescription = "Jigisha is the annual quiz festival of University of Engineering and Management Kolkata. Hosted by Pragya - The Official Quiz Club of UEM Kolkata.";
const defaultImage = "https://mcdqguhkhsqhkwl4y6tclsibsqiwdnqkxsqoyqnbmq4.canva-cdn.email/49c9754efce7ff53f7583f2771e4c29b.png"; 

export function constructMetadata({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  icons = "/favicon.ico",
  noIndex = false,
  keywords = [
    "Jigisha", 
    "Jigisha 5.0",
    "Quiz Festival", 
    "UEM Kolkata", 
    "Pragya Quiz Club", 
    "Kolkata Quizzing", 
    "Jana Ojana",
    "Hit the Homerun",
    "Convergence",
    "Fandomania",
    "Pragya 6th Sense",
    "Friday Night Blockbuster",
    "Quizzing",
    "Quiz",
    "Kolkata Quiz",
    "Kolkata",
    "Jigisha 2026",
    "UEMK",
    "UEM",
    "Engineering Quiz",
    "Quiz Competition",
    "Kolkata"
  ],
  authors = [{ name: "Pragya Quiz Club" }],
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | Jigisha 5.0`,
    },
    description,
    keywords,
    authors,
    creator: "Pragya Quiz Club",
    openGraph: {
      type: "website",
      locale: "en_IN",
      title,
      description,
      siteName: "Jigisha 5.0",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Jigisha 5.0 Open Graph Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@PragyaQuizClub", 
    },
    icons,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL 
        ? process.env.NEXT_PUBLIC_APP_URL
        : process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://jigisha.pragya.club"
    ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
