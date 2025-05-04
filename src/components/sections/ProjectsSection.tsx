"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GlassBackground from "@/components/GlassBackground";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function ProjectsSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Using resolvedTheme instead of theme for more reliable theme detection
  const highlightColor = mounted
    ? resolvedTheme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  const baseColor = mounted
    ? resolvedTheme === "dark"
      ? "#FFFFFF"
      : "#000000"
    : "#374151";

  // Return a loading state until mounted is true
  if (!mounted) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col relative overflow-hidden justify-between"
    >
      <GlassBackground color={highlightColor} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl mt-16">
        <motion.h1
          className="text-4xl font-bold mb-12"
          style={{ color: highlightColor }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-15% 0px" }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>

        <motion.ul
          className="space-y-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-5% 0px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {projectsData.map((project, index) => (
            <motion.li
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`${
                index !== projectsData.length - 1
                  ? "border-b border-gray-700 mt-2"
                  : ""
              } pb-4`}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Link href={`/projects/${project.slug}`} className="group">
                    <div className="flex items-center">
                      <h2
                        className="text-4xl sm:text-5xl font-bold mb-2 bg-[length:200%_100%] 
                            bg-[position:0_0] bg-clip-text text-transparent transition-[background-position] 
                            duration-700 ease-in-out group-hover:bg-[position:-100%_0] pb-[0.15em] pt-[0.05em]"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${baseColor} 50%, ${highlightColor} 50%)`,
                        }}
                      >
                        {project.name}
                      </h2>

                      <div className="ml-4 mb-4 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-150">
                        <LiaExternalLinkAltSolid
                          className="w-12 h-12"
                          key={highlightColor}
                          style={{ color: highlightColor }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex gap-4 mb-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-lg text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
