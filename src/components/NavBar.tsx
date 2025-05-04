"use client";

import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import StyleBreadcrumbs from "@mui/material/Breadcrumbs";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sections = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const pathname = usePathname();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update current section when pathname changes
  useEffect(() => {
    // If we're on a project page, set the section to "projects"
    if (pathname?.startsWith("/projects/")) {
      setCurrentSection("projects");
      return;
    }

    // Otherwise, reset the section if we're not on the homepage
    if (pathname !== "/") {
      setCurrentSection("");
      return;
    }
  }, [pathname]);

  useEffect(() => {
    // Skip intersection observer setup if not on homepage
    if (pathname !== "/") {
      return;
    }

    const observedSections = new Map<string, IntersectionObserverEntry>();

    const handleIntersections = (entries: IntersectionObserverEntry[]) => {
      // Your existing intersection observer code
      for (const entry of entries) {
        observedSections.set(entry.target.id, entry);
      }

      // Special case: if projects section is intersecting at all, prioritize it
      const projectsEntry = observedSections.get("projects");
      if (projectsEntry?.isIntersecting) {
        setCurrentSection("projects");
        return;
      }

      // Fallback: check viewport center is within the projects section
      const projEl = document.getElementById("projects");
      if (projEl) {
        const rect = projEl.getBoundingClientRect();
        const mid = window.innerHeight / 2;
        if (rect.top <= mid && rect.bottom >= mid) {
          setCurrentSection("projects");
          return;
        }
      }

      const scrollY = window.scrollY;

      // Priority for intro if near the top
      if (scrollY < 400) {
        setCurrentSection("intro");
        return;
      }

      let mostVisibleSection = "";
      let highestRatio = 0;

      observedSections.forEach((entry, id) => {
        // Skip 'about' section if still near top
        if (id === "about" && scrollY < 600) return;

        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          mostVisibleSection = id;
        }
      });

      // Fallback to 'intro' if no section dominates near top
      if (scrollY < 500 && (highestRatio < 0.3 || mostVisibleSection === "")) {
        mostVisibleSection = "intro";
      }

      console.debug(
        `Most visible: ${mostVisibleSection}, Ratio: ${highestRatio.toFixed(
          2
        )}, ScrollY: ${scrollY}, Path: ${pathname}`
      );

      setCurrentSection(mostVisibleSection);
    };

    const observer = new IntersectionObserver(handleIntersections, {
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), // [0, 0.1, ..., 1]
      rootMargin: "-10% 0px -10% 0px",
    });

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]); // Re-create observer if pathname changes

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
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact_bottom" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between py-1 border-[${navBorderColor}] border-1 rounded-lg bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-xs max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl mx-auto`}
        >
          <div id="navbar_left" className="flex items-center gap-1">
            <div className="flex items-center pl-2">
              <Link href="/">
                <div className="transition-all duration-300 rounded-full group hover:drop-shadow-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 212.12 241.51"
                    width="32"
                    height="32"
                    className="cursor-pointer transition-colors duration-300"
                    style={{
                      fill: mounted
                        ? theme === "dark"
                          ? "white"
                          : "black"
                        : "gray",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.fill = breadcrumbColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.fill = mounted
                        ? theme === "dark"
                          ? "white"
                          : "black"
                        : "gray";
                    }}
                  >
                    <path d="M.06 120.57c0-17.66.15-35.32-.09-53-.08-5.66 1.9-9.25 6.86-12.08q46.59-26.58 93-53.56c4.37-2.54 8.16-2.63 12.57-.06q47 27.4 94.13 54.52a10.17 10.17 0 0 1 5.6 9.72q-.13 54.48 0 109c0 4.67-1.71 7.84-5.77 10.16q-47.4 27.19-94.68 54.56c-3.88 2.25-7.3 2.31-11.21 0q-47.45-27.58-95-55c-3.9-2.25-5.44-5.38-5.41-9.84.13-18.16 0-36.31 0-54.47Zm195.1.55c0-15.66-.13-31.33.09-47 0-3.62-1-5.6-4.21-7.42q-40.95-23.4-81.68-47.18c-2.5-1.45-4.25-1.34-6.69.07Q62.09 43.14 21.36 66.4c-3.29 1.87-4.64 3.73-4.62 7.66q.27 46.49 0 93c0 3.83 1.09 5.88 4.44 7.79q40.74 23.25 81.23 47c2.7 1.57 4.53 1.45 7.13-.07q41-23.81 82.18-47.3c2.72-1.55 3.52-3.3 3.49-6.31-.1-15.73-.02-31.39-.02-47.05Z"></path>
                    <path d="M105.57 180.83c-15-.07-29-3.54-41.47-12.13-3.34-2.3-3.32-2.35-1.43-5.74 2.19-3.92 4.49-7.79 6.55-11.78 1.23-2.39 2.22-3.06 4.78-1.24 10.27 7.3 21.92 10.11 34.42 9.64a30.09 30.09 0 0 0 12.08-2.74c5.09-2.44 8.09-6.23 7.78-12.18-.27-5.25-3-8.75-8.88-10.72-6.49-2.18-13.34-2.74-20-4.06a115.48 115.48 0 0 1-11.6-2.86c-17-5.26-22.22-17.76-21.22-33.48 1.39-21.92 16.23-30.11 31.82-32.7 16.42-2.72 31.74.72 46 9.1 3.8 2.23 3.79 2.26 1.73 6.4s-4.12 8-6 12.07c-1 2.18-1.85 2.57-4 1.18-7.54-4.81-15.72-7.92-24.78-8.21a37.46 37.46 0 0 0-13.8 1.69c-5.73 2-8.68 5.67-8.89 10.8-.23 5.64 2.18 9.42 8 12 6 2.65 12.5 3.34 18.8 4.78 5.68 1.3 11.36 2.54 16.74 4.83 11.35 4.82 17.56 13.3 18.07 25.73a47.33 47.33 0 0 1-.51 12c-2.43 11.53-9.42 19.23-20.2 23.58a60.16 60.16 0 0 1-23.99 4.04Z"></path>
                  </svg>
                </div>
              </Link>
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
                {currentSection == "intro" ? "" : currentSection}
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
            <div id="navbar_right" className="pr-2">
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
