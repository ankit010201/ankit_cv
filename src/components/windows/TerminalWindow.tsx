"use client";

import { useState, useRef, useEffect } from "react";

const COMMANDS: Record<string, string | (() => string)> = {
  help: `available commands:
  help       — show this message
  whoami     — who is this guy
  skills     — tech stack
  contact    — get in touch
  secret     — ???
  clear      — clear terminal`,
  whoami: "ankit agrawal. engineer. runner. ramen enjoyer.",
  skills: "python · typescript · react · next.js · c# · java · ml · gcp · aws",
  contact: "email: ankit010201@gmail.com\ngithub: github.com/ankit010201",
  secret: "you found it. the answer was 42 all along.",
  ls: "about.txt  projects/  music/  food/  photos/  running.log",
  pwd: "/home/ankit",
  date: () => new Date().toString(),
  uname: "PersonalOS v1.0.0 (retro build)",
  cat: "usage: cat <file> — try ls first",
};

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "PersonalOS v1.0.0 — type 'help' to start" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", text: `$ ${input}` }]);

    if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "") {
      // do nothing
    } else if (cmd in COMMANDS) {
      const result = COMMANDS[cmd];
      const output = typeof result === "function" ? result() : result;
      setLines((prev) => [...prev, { type: "output", text: output }]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", text: `command not found: ${cmd}. type 'help'` },
      ]);
    }
    setInput("");
  };

  return (
    <div className="retro-font flex h-full flex-col bg-gray-900 p-3 text-xs text-green-400">
      <div className="mb-2 text-green-600">
        ┌─[ankit@PersonalOS]─[~]
      </div>
      <div className="flex-1 overflow-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`mb-1 whitespace-pre-wrap ${
              line.type === "input"
                ? "text-green-300"
                : line.type === "error"
                  ? "text-red-400"
                  : "text-green-500"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-1 border-t border-green-900 pt-2">
        <span className="text-green-600">$</span>
        <input
          className="flex-1 bg-transparent text-green-300 outline-none placeholder-green-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command..."
          autoFocus
        />
      </form>
    </div>
  );
}
