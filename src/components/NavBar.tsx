"use client";

import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import StyleBreadcrumbs from "@mui/material/Breadcrumbs";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FiMenu } from "react-icons/fi";

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState("Intro");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
  const navBorderColor = mounted
    ? theme === "dark"
      ? "#606060"
      : "#000000"
    : "transparent";

  const linkStyles = {
    base: `relative transition-colors group hover:drop-shadow-sm text-lg`,
    underline: `absolute bottom-0 left-0 w-0 h-0.5 transition-all ${underlineColor} duration-300 group-hover:w-full`,
  };

  const menuItems = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="navbar"
          className={`flex items-center justify-between py-1 border-[${navBorderColor}] border-1 rounded-lg bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-xs max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl mx-auto`}
        >
          <div className="flex items-center gap-1">
            <div className="flex items-center pl-2">
              <Image
                src="/favicon/favicon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
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
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkStyles.base} ${textColor}`}
                >
                  {item.label}
                  <span className={linkStyles.underline}></span>
                </Link>
              ))}
              <span aria-hidden="true"></span>
            </StyleBreadcrumbs>
            <div className="pr-2">
              <ThemeSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: mounted
                  ? theme === "dark"
                    ? "#F2F230"
                    : "#3185FC"
                  : "gray",
              }}
            >
              <FiMenu size={24} />
            </IconButton>
          </div>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: mounted
                    ? theme === "dark"
                      ? "rgba(17, 24, 39, 0.8)"
                      : "rgba(255, 255, 255, 0.8)"
                    : "transparent",
                  backdropFilter: "blur(8px)",
                  border: "1px solid",
                  borderColor: mounted
                    ? theme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                    : "transparent",
                },
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.href}
                onClick={handleMenuClose}
                sx={{
                  color: mounted
                    ? theme === "dark"
                      ? "#F2F230"
                      : "#3185FC"
                    : "gray",
                }}
              >
                <Link href={item.href} className="w-full">
                  {item.label}
                </Link>
              </MenuItem>
            ))}
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                color: mounted
                  ? theme === "dark"
                    ? "#F2F230"
                    : "#3185FC"
                  : "gray",
              }}
            >
              <ThemeSwitch />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
