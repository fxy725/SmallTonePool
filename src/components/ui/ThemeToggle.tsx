"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function TripleThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { 
      id: "system", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'translateY(-1px)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) 
    },
    { 
      id: "light", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) 
    },
    { 
      id: "dark", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) 
    },
  ] as const;

  const activeIndex = themes.findIndex(t => t.id === theme);

  return (
    <div className="liquid-glass-container" style={{ 
      background: 'transparent', 
      border: 'none', 
      padding: '0',
      boxShadow: 'none',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none'
    }}>
      {/* 液体玻璃滑块指示器 */}
      <div 
        className="liquid-glass-indicator"
        style={{
          transform: `translateX(${activeIndex * 40}px)`
        }}
      />
      {themes.map((themeOption) => (
        <button
          key={themeOption.id}
          onClick={() => setTheme(themeOption.id)}
          className={`
            liquid-glass-button
            ${theme === themeOption.id ? "liquid-glass-active" : ""}
          `}
          aria-label={`切换到${themeOption.id === 'system' ? '系统' : themeOption.id === 'light' ? '浅色' : '深色'}主题`}
        >
          {themeOption.icon}
        </button>
      ))}
    </div>
  );
}
