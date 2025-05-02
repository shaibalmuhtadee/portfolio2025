"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import StyleBreadcrumbs from "@mui/material/Breadcrumbs";

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState("Intro");
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sections.current[entry.target.id] = entry;
        });

        // Find the most visible section
        let mostVisibleSection = "Intro";
        let highestRatio = 0;

        Object.entries(sections.current).forEach(([id, entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = id;
          }
        });

        setCurrentSection(mostVisibleSection);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    // Observe all sections
    const sectionElements = document.querySelectorAll("section[id]");
    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const textColor = mounted
    ? theme === "dark"
      ? "text-white"
      : "text-black"
    : "text-transparent";
  const breadcrumbColor = mounted
    ? theme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "transparent";
  const underlineColor = mounted
    ? theme === "dark"
      ? "bg-white"
      : "bg-black"
    : "bg-transparent";

  const linkStyles = {
    base: `relative transition-colors group hover:drop-shadow-sm text-lg`,
    underline: `absolute bottom-0 left-0 w-0 h-0.5 transition-all ${underlineColor} duration-300 group-hover:w-full`,
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl flex items-center justify-between px-2 py-1 border rounded-lg bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-xs border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-1">
        <Image src="/favicon/favicon.svg" alt="Logo" width={32} height={32} />
        <StyleBreadcrumbs
          separator="/"
          color="inherit"
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              fontSize: "1.5rem",
              margin: "0 0.2rem",
              color: breadcrumbColor,
            },
          }}
        >
          <span className="font-medium text-lg">shaibalmuhtadee</span>
          <span
            className="font-medium text-lg"
            style={{ color: breadcrumbColor }}
          >
            {currentSection}
          </span>
        </StyleBreadcrumbs>
      </div>

      <div className="flex items-center">
        <StyleBreadcrumbs
          separator="|"
          color="inherit"
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              fontSize: "1.25rem",
              margin: "0 0.5rem 0.2rem 0.5rem",
              color: breadcrumbColor,
            },
          }}
        >
          <Link href="/#about" className={`${linkStyles.base} ${textColor}`}>
            About
            <span className={linkStyles.underline}></span>
          </Link>
          <Link
            href="/#experience"
            className={`${linkStyles.base} ${textColor}`}
          >
            Experience
            <span className={linkStyles.underline}></span>
          </Link>
          <Link href="/#projects" className={`${linkStyles.base} ${textColor}`}>
            Projects
            <span className={linkStyles.underline}></span>
          </Link>
          <Link href="/#contact" className={`${linkStyles.base} ${textColor}`}>
            Contact
            <span className={linkStyles.underline}></span>
          </Link>
          <span aria-hidden="true"></span>
        </StyleBreadcrumbs>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default NavBar;
