"use client";

export default function AboutWindow() {
  return (
    <div className="retro-font space-y-3 text-xs">
      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">PROFILE.exe</div>
        <div className="space-y-1 text-gray-700">
          <div>Name   : Ankit Agrawal</div>
          <div>Role   : Software Engineer</div>
          <div>Loc    : SF, CA</div>
          <div>Status : Building cool stuff</div>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">ABOUT.txt</div>
        <p className="leading-loose text-gray-700">
          Engineer focused on building products with extra attention to detail.
          Full-stack dev with ML experience.
        </p>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">EXPERIENCE.log</div>
        <div className="space-y-2 text-gray-700">
          <div>
            <div className="text-gray-900">Rippling</div>
            <div className="text-gray-500">Software Engineer · 2025–present</div>
          </div>
          <div>
            <div className="text-gray-900">Phaselaw</div>
            <div className="text-gray-500">Software Engineer · 2025</div>
          </div>
          <div>
            <div className="text-gray-900">Synced</div>
            <div className="text-gray-500">Software Engineer · 2023–2025</div>
          </div>
          <div>
            <div className="text-gray-900">Microsoft</div>
            <div className="text-gray-500">Software Engineer · 2021–2023</div>
          </div>
          <div>
            <div className="text-gray-900">Amazon</div>
            <div className="text-gray-500">SDE Intern · Summer 2020</div>
          </div>
        </div>
      </div>

      <div className="pixelated-border bg-amber-100 p-3">
        <div className="mb-2 text-amber-800">LINKS.lnk</div>
        <div className="space-y-1">
          <a href="https://github.com/ankit010201" target="_blank" rel="noopener noreferrer" className="block text-blue-700 hover:underline">→ github.com/ankit010201</a>
          <a href="https://linkedin.com/in/ankitagra" target="_blank" rel="noopener noreferrer" className="block text-blue-700 hover:underline">→ linkedin.com/in/ankitagra</a>
          <a href="https://x.com/Ankit010201" target="_blank" rel="noopener noreferrer" className="block text-blue-700 hover:underline">→ x.com/Ankit010201</a>
          <a href="https://ankit010201.substack.com" target="_blank" rel="noopener noreferrer" className="block text-blue-700 hover:underline">→ ankit010201.substack.com</a>
        </div>
      </div>
    </div>
  );
}
