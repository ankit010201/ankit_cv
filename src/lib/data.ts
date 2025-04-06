export type Section = {
  title: string;
  icon: string;
  content: string;
};

export type Sections = {
  [key: string]: Section;
};

export const sections: Sections = {
  about: {
    title: "About Me",
    icon: "user",
    content:
      "I am a passionate software developer with expertise in web technologies.",
  },
  education: {
    title: "Education",
    icon: "education",
    content: "Bachelor's in Computer Science from XYZ University",
  },
  experience: {
    title: "Experience",
    icon: "experience",
    content: "5+ years of experience in software development",
  },
  projects: {
    title: "Projects",
    icon: "projects",
    content: "Various projects showcasing my skills and expertise",
  },
  blog: {
    title: "Blog",
    icon: "blog",
    content: "My thoughts and experiences in tech",
  },
  contact: {
    title: "Contact",
    icon: "contact",
    content: "Get in touch with me",
  },
  resume: {
    title: "Resume",
    icon: "resume",
    content: "Download my resume",
  },
};
