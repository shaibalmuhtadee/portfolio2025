"use client";

import { Button } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const highlightColor = mounted
    ? theme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  const footerColor = mounted
    ? theme === "dark"
      ? "text-gray-400"
      : "text-black"
    : "text-gray-400";

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`text-5xl font-bold mb-6 text-center text-[${highlightColor}]`}
          >
            Let's collaborate?
          </h1>
          <p className="max-w-xl text-center mb-8 text-lg">
            Have a project in mind, an interesting offer, or just want to hang
            out? Click the button below to send me an email. I'm always excited
            to take on new projects and explore fresh opportunities in software
            development—feel free to reach out!
          </p>
          <div className="relative group">
            {/* Animated border placeholder */}
            <span
              className="absolute inset-0 rounded-lg pointer-events-none z-10"
              style={{
                border: `2px solid ${highlightColor}`,
                boxShadow: `0 0 8px 2px ${highlightColor}55`,
                animation: "border-glow 2s linear infinite",
              }}
            />
            <Button
              variant="outlined"
              startIcon={<MdOutlineMail size={24} />}
              href="mailto:shaibalmuhtadee@gmail.com"
              sx={{
                color: highlightColor,
                borderColor: highlightColor,
                background: mounted
                  ? theme === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "F2F7F2"
                  : "rgba(0,0,0,0.2)",
                fontWeight: 600,
                fontSize: "1.1rem",
                px: 4,
                py: 1.5,
                borderRadius: "0.5rem",
                zIndex: 20,
                position: "relative",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: `0 0 12px 3px ${highlightColor}`,
                  borderColor: highlightColor,
                },
                textTransform: "none",
              }}
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl">
          <span className={`text-sm text-center block ${footerColor}`}>
            Crafted & Designed by Shaibal Muhtadee © 2025
          </span>
        </div>
      </div>
      <style jsx global>{`
        @keyframes border-glow {
          0% {
            box-shadow: 0 0 4px 1px ${highlightColor}33;
          }
          50% {
            box-shadow: 0 0 10px 2px ${highlightColor}88;
          }
          100% {
            box-shadow: 0 0 4px 1px ${highlightColor}33;
          }
        }
      `}</style>
    </section>
  );
}
