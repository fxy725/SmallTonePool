"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark"; // 实际应用的主题（解析system后的结果）
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 获取系统主题偏好
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // 计算实际应用的主题
  const calculateActualTheme = useCallback(
    (currentTheme: Theme): "light" | "dark" => {
      if (currentTheme === "system") {
        return getSystemTheme();
      }
      return currentTheme;
    },
    [],
  );

  // 应用主题到DOM
  const applyTheme = (newActualTheme: "light" | "dark") => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const isDark = newActualTheme === "dark";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // 更新meta标签的theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      // 优先使用设计系统的背景主色变量，保持地址栏与页面底色一致
      const rootStyles = getComputedStyle(document.documentElement);
      const bgPrimary = rootStyles.getPropertyValue('--bg-primary')?.trim();
      const fallback = isDark ? '#0f172a' : '#f9fafb';
      metaThemeColor.setAttribute("content", bgPrimary || fallback);
    }
  };

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    const newActualTheme = calculateActualTheme(newTheme);
    setActualTheme(newActualTheme);



    applyTheme(newActualTheme);

    // 持久化到localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }
  };

  // 切换主题（在light和dark之间切换，不包含system）
  const toggleTheme = () => {
    const newTheme = actualTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        const newActualTheme = calculateActualTheme("system");
        setActualTheme(newActualTheme);
        applyTheme(newActualTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme, calculateActualTheme]);

  // 初始化主题
  useEffect(() => {
    if (typeof window === "undefined") return;

    let initialTheme: Theme = "system"; // 默认系统主题

    // 从localStorage读取保存的主题偏好
    try {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        initialTheme = savedTheme;
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
      // 如果读取失败，保持默认的系统主题
    }

    const initialActualTheme = calculateActualTheme(initialTheme);

    setThemeState(initialTheme);
    setActualTheme(initialActualTheme);
    applyTheme(initialActualTheme);
    setMounted(true);
  }, [calculateActualTheme]);

  // 防止服务端渲染不匹配的问题
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: "system", // 默认系统主题
          actualTheme: "light", // SSR期间默认浅色
          setTheme: () => { },
          toggleTheme: () => { },
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
