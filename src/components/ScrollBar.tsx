"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

const ScrollBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navbarRight, setNavbarRight] = useState(0);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Get the navbar element by ID
    navbarRef.current = document.getElementById("navbar_right");
  }, []);

  useEffect(() => {
    if (!navbarRef.current) return;

    const updatePosition = () => {
      const navbar = document.getElementById("navbar_right");
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarRight(rect.right);
      }
    };

    const observer = new ResizeObserver(updatePosition);
    observer.observe(document.body);

    // Initial position update
    updatePosition();

    return () => observer.disconnect();
  }, []);

  // Add window resize handler to update position
  useEffect(() => {
    const handleResize = () => {
      const navbar = document.getElementById("navbar_right");
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarRight(rect.right);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollBarColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-[#F2F230]"
      : "bg-[#3185FC]"
    : "bg-[#F2F230]"; // Default to dark mode yellow which is visible on both modes

  const scrollBarBackgroundColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-gray-700"
      : "bg-gray-300"
    : "bg-gray-700"; // Default to dark mode background

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-[50svh] transform translate-y-[-50%]">
      <div className="relative flex items-center">
        <div
          className={`w-1.5 h-[110px] rounded-full overflow-hidden ${scrollBarBackgroundColor}`}
          style={{
            position: "absolute",
            left: `${navbarRight + 3}px`,
          }}
        >
          <div
            className={`w-full rounded-full h-full ${scrollBarColor}`}
            style={{ transform: `translateY(-${100 - scrollProgress}%)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
