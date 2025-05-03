"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

const EmailSidebar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navbarLeft, setNavbarLeft] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const navbar = document.getElementById("navbar_left");
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarLeft(rect.left);
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
      const navbar = document.getElementById("navbar_left");
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarLeft(rect.left);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dividerColor = mounted
    ? theme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  return (
    <div className="fixed top-[63vh] transform translate-y-[-50%]">
      <div className="relative flex items-center">
        <div
          style={{
            position: "absolute",
            left: `${navbarLeft - 3}px`,
          }}
        >
          {/* Top Divider */}
          <Divider
            className="absolute"
            style={{
              left: "-15px",
              top: "-220px",
              transform: "rotate(-90deg)",
            }}
            orientation="horizontal"
            flexItem
            sx={{
              backgroundColor: dividerColor,
              height: "1px",
              width: "32px",
              transformOrigin: "center",
            }}
          />

          {/* Email */}
          <p
            className={`${
              mounted
                ? theme === "dark"
                  ? "text-[#F2F230]"
                  : "text-[#3185FC]"
                : "text-gray-700"
            } text-sm font-medium tracking-wider rotate-[-90deg] origin-left whitespace-nowrap`}
          >
            shaibalmuhtadee@gmail.com
          </p>

          {/* Bottom Divider */}
          <Divider
            className="absolute"
            style={{
              left: "-15px",
              bottom: "-16px",
              transform: "rotate(-90deg)",
            }}
            orientation="horizontal"
            flexItem
            sx={{
              backgroundColor: dividerColor,
              height: "1px",
              width: "32px",
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
