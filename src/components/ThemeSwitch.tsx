"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // Move this inside useEffect to avoid hydration mismatch
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );

  // Ensure the component is mounted before rendering and handle theme determination client-side only
  useEffect(() => {
    setMounted(true);
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    setCurrentTheme(resolvedTheme);
  }, [systemTheme, theme]);

  // Use a server-safe rendering approach
  if (!mounted) {
    return <div className="w-8 h-8" />; // Return an empty placeholder with same dimensions
  }

  const buttonStyles = `flex items-center justify-center text-2xl transition-transform duration-150 rounded-md hover:cursor-pointer hover:drop-shadow-xs w-8 h-8`;
  const lightThemeStyles = `ring-black bg-light_secondary text-dark_primary hover:text-[#3185FC]`;
  const darkThemeStyles = `ring-light_primary bg-dark_secondary text-light_primary hover:text-[#F2F230]`;

  return (
    <>
      {currentTheme === "dark" ? (
        <button
          className={`${buttonStyles} ${darkThemeStyles}`}
          onClick={() => setTheme("light")}
          suppressHydrationWarning
        >
          <BsSunFill />
        </button>
      ) : (
        <button
          className={`${buttonStyles} ${lightThemeStyles}`}
          onClick={() => setTheme("dark")}
          suppressHydrationWarning
        >
          <BsMoonFill />
        </button>
      )}
    </>
  );
};

export default ThemeSwitch;
