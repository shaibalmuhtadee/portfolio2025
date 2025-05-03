"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const buttonStyles = `flex items-center justify-center text-2xl transition-transform duration-150 rounded-md hover:cursor-pointer hover:drop-shadow-xs`;
  const lightThemeStyles = `ring-black bg-light_secondary text-dark_primary hover:text-[#3185FC]`;
  const darkThemeStyles = `ring-light_primary bg-dark_secondary text-light_primary hover:text-[#F2F230]`;

  if (currentTheme === "dark") {
    return (
      <button
        className={`${buttonStyles} ${darkThemeStyles}`}
        onClick={() => setTheme("light")}
      >
        <BsSunFill />
      </button>
    );
  } else {
    return (
      <button
        className={`${buttonStyles} ${lightThemeStyles}`}
        onClick={() => setTheme("dark")}
      >
        <BsMoonFill />
      </button>
    );
  }
};

export default ThemeSwitch;
