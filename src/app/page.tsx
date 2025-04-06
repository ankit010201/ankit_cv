"use client";

import { useState, useEffect } from "react";
import Desktop from "@/components/desktop";
import TopBar from "@/components/top-bar";
import Window from "@/components/window";
import LoginScreen from "@/components/login-screen";
import { sections } from "@/lib/data";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [customBackground, setCustomBackground] =
    useState<string>("/background.jpg");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);

      const day = parts.find((part) => part.type === "day")?.value || "";
      const month = parts.find((part) => part.type === "month")?.value || "";
      const year = parts.find((part) => part.type === "year")?.value || "";
      const hour = parts.find((part) => part.type === "hour")?.value || "";
      const minute = parts.find((part) => part.type === "minute")?.value || "";
      const dayPeriod =
        parts.find((part) => part.type === "dayPeriod")?.value || "";

      setCurrentDate(
        `${day} ${month} ${year} | ${hour}:${minute} ${dayPeriod}`,
      );
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleIconClick = (sectionId: string) => {
    setActiveWindow(sectionId);
  };

  const closeWindow = () => {
    setActiveWindow(null);
  };

  const changeBackground = (newBackground: string) => {
    setCustomBackground(newBackground);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <main
      className="relative h-screen w-full overflow-hidden font-mono text-gray-800"
      style={{
        backgroundImage: `url(${customBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/90 to-amber-50/80"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative z-10 flex h-full flex-col">
            <TopBar osName="PersonalOS" currentDate={currentDate} />

            <Desktop
              onIconClick={handleIconClick}
              changeBackground={changeBackground}
            />

            {activeWindow && (
              <Window
                id={activeWindow}
                title={sections[activeWindow]?.title || ""}
                isActive={true}
                onClose={closeWindow}
                onFocus={() => setActiveWindow(activeWindow)}
              >
                {sections[activeWindow]?.content || ""}
              </Window>
            )}
          </div>
        </>
      )}
    </main>
  );
}
