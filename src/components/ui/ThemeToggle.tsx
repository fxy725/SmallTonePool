"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Monitor, Sun, Moon } from "lucide-react";

export function TripleThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "system", icon: <Monitor className="w-5 h-5" /> },
    { id: "light", icon: <Sun className="w-5 h-5" /> },
    { id: "dark", icon: <Moon className="w-5 h-5" /> },
  ] as const;

  return (
    <div
      className="liquid-glass-container"
      style={{
        background: "transparent",
        border: "none",
        padding: "0",
        boxShadow: "none",
        backdropFilter: "none",
      WebkitBackdropFilter: "none",
      }}
    >
      {themes.map((themeOption) => (
        <button
          key={themeOption.id}
          type="button"
          onClick={() => setTheme(themeOption.id)}
          className={`liquid-glass-button ${
            theme === themeOption.id ? "liquid-glass-active" : ""
          }`}
          aria-label={`切换到${
            themeOption.id === "system"
              ? "系统"
              : themeOption.id === "light"
              ? "浅色"
              : "深色"
          }主题`}
          aria-pressed={theme === themeOption.id}
        >
          {themeOption.icon}
        </button>
      ))}
    </div>
  );
}
