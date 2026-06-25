export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData = {
  heading: "FREQUENTLY ASKED QUESTIONS",

  items: [
    {
      id: "faq-1",
      question: "What is Jigisha 5.0?",
      answer:
        "Jigisha 5.0 is the fifth edition of the annual quiz festival organized by Pragya — The Official Quiz Club of UEM Kolkata. It features multiple quizzes, interactive events, and exciting prizes.",
    },
    {
      id: "faq-2",
      question: "Who can participate?",
      answer:
        "Jigisha is open to all college and university students across India. Some individual quizzes may have specific eligibility criteria — please check each quiz's details for more information.",
    },
    {
      id: "faq-3",
      question: "Is there any registration fee?",
      answer:
        "No! All events at Jigisha 5.0 are completely free to participate in. There is no registration fee for any quiz or event — just bring your team and your enthusiasm!",
    },
    {
      id: "faq-4",
      question: "How do I register my team?",
      answer:
        "You can register through the 'Register Now' button on our website. Some events are hosted on Unstop — follow the respective registration links provided on each event page.",
    },
    {
      id: "faq-5",
      question: "What is the team size?",
      answer:
        "Team size varies by quiz. Most quizzes allow teams of 2–4 members, but individual participation is also available for certain events. Check the specific quiz rules for details.",
    },
    {
      id: "faq-6",
      question: "Where is the event held?",
      answer:
        "Jigisha 5.0 is held at the University of Engineering and Management (UEM) Kolkata campus. Detailed venue directions and maps are available on our Venue page.",
    },
    {
      id: "faq-7",
      question: "What are the prizes?",
      answer:
        "The total prize pool exceeds ₹75,000 across all quizzes. Winners receive cash prizes, trophies, certificates, and exclusive merchandise. Specific prize breakdowns are listed on each quiz page.",
    },
    {
      id: "faq-8",
      question: "How can I contact the organizers?",
      answer:
        "You can reach us via our social media handles or by emailing the Pragya Quiz Club directly. Contact details are available in the footer of this website and on our social media pages.",
    },
  ] as FAQItem[],
};
