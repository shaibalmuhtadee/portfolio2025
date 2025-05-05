"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { HiArrowDown } from "react-icons/hi";
import GlassBackground from "@/components/GlassBackground";
import TypewriterEffect from "@/components/TypewriterEffect";

export default function IntroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only apply theme-based styling after component is mounted
  const highlightColor = mounted
    ? resolvedTheme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Only render the full component after mounting
  if (!mounted) {
    return <section className="min-h-screen" />; // Return minimal placeholder
  }

  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      ref={containerRef}
    >
      <GlassBackground color={highlightColor} showCircle />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          className="max-w-3xl ml-5"
        >
          <motion.div variants={childVariants} className="mb-4">
            <motion.p
              className="text-lg md:text-xl mb-3"
              style={{ color: highlightColor }}
            >
              Hello, my name is
            </motion.p>
          </motion.div>

          <motion.h1
            variants={headingVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Shaibal Muhtadee
          </motion.h1>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 opacity-80"
          >
            <TypewriterEffect
              words={["Engineer.", "Problem Solver.", "Builder of Things."]}
            />
          </motion.h2>

          <motion.div variants={childVariants}>
            <p className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              I&apos;m a software engineer with a passion for solving real-world
              problems through clean, efficient code. I&apos;m currently looking
              for opportunities where I can apply my skills and experience to
              meaningful, challenging, and fun projects.
            </p>
          </motion.div>

          <motion.div variants={childVariants} className="flex gap-5">
            <motion.a
              href="#projects"
              className={`px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 ${
                resolvedTheme === "dark" ? "text-gray-900" : "text-white"
              }`}
              style={{
                backgroundColor: highlightColor,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-md font-medium text-lg border-2 transition-all duration-300"
              style={{ borderColor: highlightColor }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.05)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.8,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <a href="#about" aria-label="Scroll to About section">
          <HiArrowDown size={28} style={{ color: highlightColor }} />
        </a>
      </motion.div>
    </section>
  );
}
