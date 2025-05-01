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

  // Apply theme-specific styles when the theme changes
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.style.setProperty(
        "--underline-color",
        "#F2F7F2"
      );
      document.documentElement.style.setProperty(
        "--underline-color-highlight",
        "#F2F230"
      );
    } else {
      document.documentElement.style.setProperty(
        "--underline-color",
        "#001429"
      );
      document.documentElement.style.setProperty(
        "--underline-color-highlight",
        "#3185FC"
      );
    }
  }, [currentTheme]);

  if (!mounted) {
    return null;
  }

  const buttonStyles = `flex items-center justify-center text-2xl transition-transform duration-150 rounded-md hover:cursor-pointer`;
  const lightThemeStyles = `ring-black bg-light_secondary text-dark_primary hover:text-[#8E97A4]`;
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
