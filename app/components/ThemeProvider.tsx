"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Always dark — clear any saved preference
    localStorage.removeItem("theme");
    document.documentElement.setAttribute("data-theme", "dark");
    setMounted(true);
  }, []);

  // toggleTheme is a no-op; kept so consumers don't break
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
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
