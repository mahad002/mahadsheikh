"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) || defaultTheme;
    setTheme(savedTheme);
    setMounted(true);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, storageKey, mounted]);

  // Always provide context so useTheme() in Header/Nav etc. never throws before mount
  const value = mounted ? { theme, setTheme } : { theme: defaultTheme, setTheme: () => {} };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}