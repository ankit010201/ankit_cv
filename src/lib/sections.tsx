import type React from "react";

export const sections: Record<
  string,
  { title: string; icon: string; content: React.ReactNode }
> = {
  about: {
    title: "About",
    icon: "user",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Well, that was crazy!</h2>
        <p>
          Hello! I&apos;m a software developer with a passion for creating
          unique digital experiences.
        </p>
        <p>
          I specialize in frontend development with React, Next.js, and modern
          CSS frameworks.
        </p>
        <hr className="my-4 border-gray-400" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-bold">5.52t</div>
            <div className="text-xs text-gray-700">Lines of code written</div>
          </div>
          <div>
            <div className="font-bold">1.82ha</div>
            <div className="text-xs text-gray-700">Water consumed</div>
          </div>
          <div>
            <div className="font-bold">53.3t</div>
            <div className="text-xs text-gray-700">Bugs fixed</div>
          </div>
        </div>
      </div>
    ),
  },
  education: {
    title: "Education",
    icon: "education",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="space-y-4 border-l-2 border-gray-400 pl-4">
          <div>
            <h3 className="font-bold">Master of Computer Science</h3>
            <p className="text-sm">University of Technology</p>
            <p className="text-xs text-gray-700">2018 - 2020</p>
          </div>
          <div>
            <h3 className="font-bold">Bachelor of Software Engineering</h3>
            <p className="text-sm">State University</p>
            <p className="text-xs text-gray-700">2014 - 2018</p>
          </div>
        </div>
      </div>
    ),
  },
  experience: {
    title: "Experience",
    icon: "experience",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <div className="space-y-4 border-l-2 border-gray-400 pl-4">
          <div>
            <h3 className="font-bold">Senior Frontend Developer</h3>
            <p className="text-sm">Tech Innovations Inc.</p>
            <p className="text-xs text-gray-700">2020 - Present</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>
                Led development of company&apos;s flagship web application
              </li>
              <li>Implemented modern React architecture with TypeScript</li>
              <li>Mentored junior developers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Web Developer</h3>
            <p className="text-sm">Digital Solutions LLC</p>
            <p className="text-xs text-gray-700">2018 - 2020</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>Built responsive websites for various clients</li>
              <li>Worked with React, Vue.js, and vanilla JavaScript</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    title: "Projects",
    icon: "projects",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="grid gap-4">
          <div className="rounded border border-gray-400 bg-gray-100 p-3">
            <h3 className="font-bold">RetroOS Portfolio</h3>
            <p className="text-sm">
              A nostalgic personal website with retro OS aesthetics
            </p>
            <div className="mt-2 flex space-x-2">
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                Next.js
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                React
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                Tailwind
              </span>
            </div>
          </div>
          <div className="rounded border border-gray-400 bg-gray-100 p-3">
            <h3 className="font-bold">E-commerce Platform</h3>
            <p className="text-sm">
              Full-stack online store with payment processing
            </p>
            <div className="mt-2 flex space-x-2">
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                React
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                Node.js
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  blog: {
    title: "Blog",
    icon: "blog",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Latest Blog Posts</h2>
        <div className="space-y-3">
          <div className="border-b border-gray-400 pb-3">
            <h3 className="font-bold">The Return of Retro UI Design</h3>
            <p className="text-xs text-gray-700">Posted on 15 Apr 2023</p>
            <p className="mt-1 text-sm">
              Exploring the nostalgic trend of Y2K and 90s computer aesthetics
              in modern web design...
            </p>
          </div>
          <div className="border-b border-gray-400 pb-3">
            <h3 className="font-bold">Building with Next.js 13</h3>
            <p className="text-xs text-gray-700">Posted on 28 Feb 2023</p>
            <p className="mt-1 text-sm">
              A deep dive into the new features and improvements in Next.js
              13...
            </p>
          </div>
          <div>
            <h3 className="font-bold">The Art of CSS Grid</h3>
            <p className="text-xs text-gray-700">Posted on 10 Jan 2023</p>
            <p className="mt-1 text-sm">
              Mastering CSS Grid for complex layouts with minimal code...
            </p>
          </div>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact",
    icon: "contact",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Get in Touch</h2>
        <p>Feel free to reach out through any of these channels:</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold">Email:</span>
            <span>hello@example.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">GitHub:</span>
            <span>github.com/username</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">LinkedIn:</span>
            <span>linkedin.com/in/username</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">Twitter:</span>
            <span>@username</span>
          </div>
        </div>
      </div>
    ),
  },
};
