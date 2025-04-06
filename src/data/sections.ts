export interface Section {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export const sections: Section[] = [
  {
    id: "about",
    title: "About Me",
    icon: "user",
    content: "Welcome to my retro-style portfolio!",
  },
  {
    id: "projects",
    title: "Projects",
    icon: "folder",
    content: "Check out my latest projects",
  },
  {
    id: "skills",
    title: "Skills",
    icon: "code",
    content: "My technical skills and expertise",
  },
  {
    id: "contact",
    title: "Contact",
    icon: "mail",
    content: "Get in touch with me",
  },
];
