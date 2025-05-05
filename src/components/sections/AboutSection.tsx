"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import emoji from "react-easy-emoji";
import { Divider } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";
import GlassBackground from "@/components/GlassBackground";

export default function AboutSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  const highlightColor = mounted
    ? theme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  const profileCardColor = mounted
    ? theme === "dark"
      ? "bg-[#1F2937]"
      : "bg-[#99a1af]"
    : "bg-[#374151]";

  const nameColor = mounted
    ? theme === "dark"
      ? "text-white"
      : "text-black"
    : "text-white";

  const textColor = mounted
    ? theme === "dark"
      ? "text-gray-300"
      : "text-gray-800"
    : "text-gray-800";

  const lineColor = mounted
    ? theme === "dark"
      ? "bg-[#374151]"
      : "bg-[#363f63]"
    : "bg-[#374151]";

  const underlineColor = mounted
    ? theme === "dark"
      ? highlightColor
      : highlightColor
    : "#374151";

  const waveStyle = {
    display: "inline-block",
    transformOrigin: "70% 70%",
    "&:hover": {
      animation: "wave 2.5s ease-in-out infinite",
    },
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes wave {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
      }
      
      .wave-emoji {
        display: inline-block;
        transform-origin: 70% 70%;
      }
      
      .wave-emoji:hover {
        animation: wave 2.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const isLeftInView = useInView(leftColumnRef, {
    margin: "-15% 0px -15% 0px",
    once: false,
  });
  const isRightInView = useInView(rightColumnRef, {
    margin: "-15% 0px -15% 0px",
    once: false,
  });

  const typographyStyles = {
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "-0.09em",
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: any, alpha: any) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify- relative overflow-hidden"
    >
      <GlassBackground color={highlightColor} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl mt-16">
        <motion.h1
          className="text-4xl font-bold mb-6"
          style={{ color: highlightColor }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
        >
          About
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-24 mb-18 ml-4">
          <motion.div
            ref={leftColumnRef}
            className="lg:w-4/12 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.7 }}
          >
            <div
              className={`bg-opacity-10 ${profileCardColor} backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col max-w-md mx-auto`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundBlendMode: "overlay",
              }}
            >
              {/* Image container with responsive padding */}
              <div className="pt-8 sm:pt-10 px-6 sm:px-10 md:px-16 w-full">
                <div className="w-full rounded-xl overflow-hidden max-w-[200px] sm:max-w-none mx-auto">
                  <Image
                    src="/profile.gif"
                    alt="Profile"
                    className="object-cover w-full h-full"
                    width={240}
                    height={300}
                    priority
                  />
                </div>
              </div>

              {/* Content with guaranteed minimum spacing */}
              <div className="flex flex-col text-center items-center py-8">
                <h1
                  className={`${nameColor} mb-2 font-extrabold text-3xl sm:text-4xl`}
                >
                  Shaibal Muhtadee
                </h1>
                <p className={`${textColor} text-lg sm:text-xl font-medium`}>
                  Software Engineer & Developer
                </p>
                <p className={`${textColor} mb-4 text-md sm:text-lg`}>
                  Toronto, Canada
                </p>

                {/* Social icons */}
                <div
                  className={`${textColor} flex space-x-4 mb-6 items-center justify-center`}
                >
                  <a href="#" className="hover:text-gray-50 transition-colors">
                    <FaGithub size={22} />
                  </a>
                  <a href="#" className="hover:text-gray-50 transition-colors">
                    <FaLinkedin size={22} />
                  </a>
                  <a href="#" className="hover:text-gray-50 transition-colors">
                    <MdEmail size={22} />
                  </a>
                </div>

                {/* Animated line with constrained width */}
                <div
                  className={`h-1 w-3/4 ${lineColor} relative overflow-hidden rounded-full`}
                >
                  <motion.div
                    className="absolute h-full rounded-full"
                    style={{
                      backgroundColor: highlightColor,
                      width: "20%",
                    }}
                    animate={{
                      left: ["-20%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0.2,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={rightColumnRef}
            className="lg:w-6/12"
            initial={{ opacity: 0, x: 50 }}
            animate={
              isRightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold">
              Hi, I&apos;m Shai!&nbsp;
              {isClient ? (
                <span className="inline-block wave-emoji cursor-pointer text-5xl">
                  {emoji("👋")}
                </span>
              ) : (
                <span className="inline-block wave-emoji cursor-pointer text-5xl">
                  👋
                </span>
              )}
            </h1>
            <Divider
              sx={{
                margin: "20px 0",
                backgroundColor: highlightColor,
                height: "2px",
                width: "100%",
              }}
            />
            <div className="text-2xl/relaxed">
              <p className="mb-4">
                I am a software engineer and aspiring web developer with a
                passion for turning ideas into creative solutions. I recently
                graduated from the{" "}
                <span
                  style={{
                    backgroundColor: hexToRgba(highlightColor, 0.3),
                  }}
                  className="inline-block cursor-pointer"
                >
                  <a href="https://www.utoronto.ca/" className="relative group">
                    University of Toronto
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: highlightColor }}
                    ></span>
                  </a>
                </span>{" "}
                with a Bachelor of Applied Science in Computer Engineering.
                I&apos;m currently seeking opportunities to apply my skills in a
                dynamic and innovative environment starting June 2025. Check out
                my{" "}
                <span className="inline-block cursor-pointer">
                  <a
                    href="Shaibal_Muhtadee_Resume.pdf"
                    target="_blank"
                    className="relative group"
                    style={{ color: highlightColor }}
                  >
                    resume
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: highlightColor }}
                    ></span>
                    <BiLinkExternal className="inline-block text-xs ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" />
                  </a>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
