"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  // Show profile picture with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Simulate typing animation
  useEffect(() => {
    if (showPassword) {
      setIsTyping(true);
      const correctPassword = "helloworld";
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < correctPassword.length) {
          setPassword(correctPassword.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          // Wait a moment before showing login success
          setTimeout(() => {
            setIsLoggedIn(true);

            // Wait a moment before calling onLogin
            setTimeout(() => {
              onLogin();
            }, 1000);
          }, 500);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [showPassword, onLogin]);

  // Show password field after profile picture appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPassword(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pixelated-grid fixed inset-0 flex items-center justify-center">
      <div className="pixelated-window w-80 bg-amber-50 p-6">
        <div className="flex flex-col items-center">
          <div
            className={`pixelated-border mb-6 overflow-hidden bg-gray-200 p-1 transition-all duration-500 ${
              showProfile ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <div className="h-20 w-20 overflow-hidden">
              <Image
                src="https://avatars.githubusercontent.com/ankit010201"
                alt="Profile"
                className="pixelated h-full w-full object-cover"
                width={80}
                height={80}
              />
            </div>
          </div>

          <div
            className={`retro-font mb-4 w-full transition-all duration-500 ${
              showPassword
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="mb-1 text-sm text-gray-700">User: ankit</div>
            <div className="mb-1 text-sm text-gray-700">
              Password: {password}
              {showCursor && <span className="animate-pulse">_</span>}
            </div>
          </div>

          {isLoggedIn && (
            <div className="retro-font animate-pulse text-sm text-emerald-600">
              Login successful...
            </div>
          )}

          <div className="retro-font mt-4 text-xs text-gray-500">
            PersonalOS v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
