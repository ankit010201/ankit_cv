"use client";

import { useState } from "react";

interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

interface WindowProps {
  icon: DesktopIcon;
  onClose: () => void;
}

const Window = ({ icon, onClose }: WindowProps) => {
  return (
    <div
      className="retro-window fixed left-1/2 top-1/2 w-[500px] max-w-[90vw] -translate-x-1/2
                    -translate-y-1/2 transform"
    >
      <div className="flex items-center justify-between bg-[#000080] px-2 py-1 text-white">
        <span className="text-sm">{icon.title}</span>
        <button
          onClick={onClose}
          className="retro-button px-2 py-0 text-black hover:bg-[#c0c0c0] active:bg-[#a0a0a0]"
        >
          ×
        </button>
      </div>
      <div className="bg-white p-4">{icon.content}</div>
    </div>
  );
};

const RetroDesktop = () => {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const icons: DesktopIcon[] = [
    {
      id: "about",
      title: "About Me",
      icon: "💼",
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">About Me</h2>
          <p>
            Hi! I&apos;m a software developer passionate about creating amazing
            web experiences.
          </p>
          <p>
            I specialize in full-stack development with a focus on modern web
            technologies.
          </p>
        </div>
      ),
    },
    {
      id: "projects",
      title: "My Projects",
      icon: "🚀",
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="grid gap-4">
            <div className="rounded border p-3">
              <h3 className="font-bold">Project 1</h3>
              <p>Description of project 1...</p>
            </div>
            <div className="rounded border p-3">
              <h3 className="font-bold">Project 2</h3>
              <p>Description of project 2...</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      icon: "📧",
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Contact Me</h2>
          <div className="space-y-2">
            <p>Email: your.email@example.com</p>
            <p>LinkedIn: linkedin.com/in/yourprofile</p>
            <p>GitHub: github.com/yourusername</p>
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills",
      icon: "🛠️",
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Frontend</h3>
              <ul className="list-inside list-disc">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Backend</h3>
              <ul className="list-inside list-disc">
                <li>Node.js</li>
                <li>Python</li>
                <li>SQL</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--retro-bg)] p-4">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => setActiveWindow(icon.id)}
            className="desktop-icon"
          >
            <span className="text-4xl">{icon.icon}</span>
            <span className="desktop-icon-text">{icon.title}</span>
          </button>
        ))}
      </div>

      {activeWindow && (
        <Window
          icon={icons.find((i) => i.id === activeWindow)!}
          onClose={() => setActiveWindow(null)}
        />
      )}

      <div className="retro-window fixed bottom-0 left-0 right-0 flex items-center px-4 py-1">
        <span className="text-sm">Start</span>
        <span className="ml-auto text-sm">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default RetroDesktop;
