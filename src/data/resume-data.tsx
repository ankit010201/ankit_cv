import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Ankit Agrawal",
  initials: "AA",
  location: "San Jose, CA",
  locationLink: "https://maps.app.goo.gl/bG7jB43rwDJgC1rf9",
  about: "Engineer focused on building products with extra attention to detail",
  summary:
    "As a Full Stack Engineer with skills in Machine Learning as well, I have successfully taken multiple products from 0 to 1. I lead teams effectively, ensuring an environment where people can do their best work. Currently, I am a founder at a startup that is trying to redefine how tech is used by educators and students. I have experience working both at a large scale as a software engineer as well as at a startup as a technical founder.",
  avatarUrl: "https://avatars.githubusercontent.com/ankit010201",
  personalWebsiteUrl: "https://ankit010201.substack.com/",
  contact: {
    email: "ankit010201@gmail.com",
    tel: "+14086859694",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/ankit010201",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ankitagra/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/Ankit010201",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Univeristy of California Davis",
      degree: "Bachelor's Degree in Computer Science",
      start: "2018",
      end: "2021",
    },
  ],
  work: [
    {
      company: "Microsoft",
      link: "https://www.microsoft.com/en-us/",
      badges: [],
      title: "Software Engineer",
      start: "2021",
      end: "2023",
      description:
        "As part of the SPARTANS engineering team, I worked on high-impact projects in the Substrate organization. These projects included pipeline validations and building new personalized features for Outlook. In addition, during my time on the Capsense Engineering team, I worked closely with data scientists to build new pipelines and features that helped improve the accuracy and availability of the forecasting predictions. Technologies: Python, C#, TypeScript, React, Machine Learning, Azure",
    },
    {
      company: "Amazon",
      link: "https://www.amazon.com/",
      badges: [],
      title: "Software Development Engineer Intern",
      start: "Summer",
      end: "2020",
      description:
        "Utilized A/B experiments as part of the Alexa HHO Growth team to improve the retention of features for Amazon Alexa. Improved the data ingestion workflow by reducing the number of steps and making it more intuitive. Technologies: Java, Python, Machine Learning",
    },
  ],
  skills: [
    "Python",
    "C#",
    "Java",
    "C",
    "C++",
    "Tensorflow",
    "React/Next.js",
    "JavaScript",
    "Node.js",
    "SQL",
    "Machine Learning",
    "GCP/AWS/Azure",
  ],
  projects: [
    {
      title: "Strava Visualized",
      techStack: ["Side Project", "Javascript", "React"],
      description:
        "A platform to visualize your Strava activities as a yearly wrapped or with the routes",
      link: {
        label: "strava-visualized.vercel.app",
        href: "https://strava-visualized.vercel.app/",
      },
    },
    {
      title: "Substack Blog",
      techStack: ["Blog"],
      description:
        "A blog that covers a bunch of different topics that I'm currently interested in/working on",
      link: {
        label: "ankit010201.substack.com",
        href: "https://ankit010201.substack.com/",
      },
    },
  ],
} as const;
