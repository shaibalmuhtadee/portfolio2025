"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import Typography from "@mui/material/Typography";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";

export default function AboutSection() {
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

  return (
    <section id="about" className="min-h-screen flex flex-col justify-between">
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
            className="lg:w-4/12"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.7 }}
          >
            <div
              className={`bg-opacity-10 ${profileCardColor} backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col h-full min-h-[600px] max-w-md mx-auto`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="pt-10 px-16 w-full">
                <div className="w-full rounded-xl overflow-hidden">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    className="object-cover w-full h-full"
                    width={240}
                    height={300}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end text-center items-center h-full pb-12">
                <div>
                  <h1 className={`${nameColor} mb-2 font-extrabold text-4xl`}>
                    Shaibal Muhtadee
                  </h1>
                  <p className={`${textColor} text-xl font-medium`}>
                    Software Engineer & Developer
                  </p>
                  <p className={`${textColor} mb-2 text-lg`}>Toronto, Canada</p>

                  {/* Social icons */}
                  <div
                    className={`${textColor} flex space-x-4 mb-4 items-center justify-center`}
                  >
                    <a
                      href="#"
                      className="hover:text-gray-50 transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-50 transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-50 transition-colors"
                    >
                      <MdEmail size={24} />
                    </a>
                  </div>

                  {/* Animated line */}
                  <div
                    className={`h-1 w-full ${lineColor} relative overflow-hidden rounded-full mb-[-10]`}
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
            <Typography
              variant="h3"
              className="text-gray-400 mb-4"
              sx={typographyStyles}
            >
              My Approach
            </Typography>
            <div className="text-lg">
              <p className="mb-4">
                I believe in building software that not only meets functional
                requirements but also provides an intuitive, delightful
                experience for users. My development process emphasizes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clean, maintainable code that scales with your needs</li>
                <li>
                  Responsive, accessible interfaces that work across all devices
                </li>
                <li>Performance optimization for speed and efficiency</li>
                <li>
                  Collaborative problem-solving and transparent communication
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
