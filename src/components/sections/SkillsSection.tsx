"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import React from "react";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiDart,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiTailwindcss,
  SiFlutter,
  SiGit,
  SiDocker,
  SiAmazon,
  SiGooglecloud,
  SiGooglechrome,
  SiFigma,
  SiMongodb,
  SiPrisma,
  SiSqlite,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandFramerMotion } from "react-icons/tb";
import { motion, useInView } from "framer-motion";

export default function SkillsSection() {
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

  const typographyStyles = {
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "-0.09em",
  };

  const gridSizes = {
    label: { xs: 12 },
    content: { xs: 12 },
  };

  const iconMap = {
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    "C/C++": SiCplusplus,
    "HTML/CSS": SiHtml5,
    Dart: SiDart,
    PostgreSQL: BiLogoPostgresql,
    React: SiReact,
    "Next.js": SiNextdotjs,
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    Django: SiDjango,
    "Tailwind CSS": SiTailwindcss,
    Motion: TbBrandFramerMotion,
    Flutter: SiFlutter,
    Git: SiGit,
    Docker: SiDocker,
    AWS: SiAmazon,
    "Google Cloud": SiGooglecloud,
    DevTools: SiGooglechrome,
    Figma: SiFigma,
    MongoDB: SiMongodb,
    Prisma: SiPrisma,
    SQLite: SiSqlite,
    SQL: FaDatabase,
  };

  const skills = [
    {
      label: "Languages",
      content: "Python, JavaScript, TypeScript, C/C++, HTML/CSS, Dart, SQL",
    },
    {
      label: "Frameworks",
      content:
        "React, Next.js, Node.js, Express, Django, Tailwind CSS, Motion, Flutter",
    },
    {
      label: "Database",
      content: "PostgreSQL, SQLite, MongoDB, Prisma",
    },
    {
      label: "Tools",
      content: "Git, Docker, AWS, Google Cloud, DevTools, Figma",
    },
  ];

  // Fixed color mapping that doesn't change during hydration
  const getIconColor = (skill: string) => {
    // Colors that don't change with theme
    const staticColors: Record<string, string> = {
      Python: "#3776AB",
      JavaScript: "#F7DF1E",
      TypeScript: "#3178C6",
      "C/C++": "#00599C",
      "HTML/CSS": "#E34F26",
      Dart: "#0175C2",
      SQL: "#4479A1",
      React: "#61DAFB",
      "Node.js": "#339933",
      "Tailwind CSS": "#06B6D4",
      Motion: "#7B61FF",
      Flutter: "#02569B",
      PostgreSQL: "#336791",
      SQLite: "#003B57",
      MongoDB: "#47A248",
      Git: "#F05032",
      Docker: "#2496ED",
      AWS: "#FF9900",
      "Google Cloud": "#4285F4",
      Figma: "#F24E1E",
    };

    // If it's a static color, return it directly
    if (skill in staticColors) {
      return staticColors[skill];
    }

    // Only show theme-dependent colors after component is mounted
    if (!mounted) {
      return "currentColor"; // Use default color during server-side rendering
    }

    // Theme-dependent colors
    if (skill === "Next.js" || skill === "Express" || skill === "DevTools") {
      return theme === "dark" ? "#FFFFFF" : "#000000";
    }
    if (skill === "Django") {
      return theme === "dark" ? "#44B78B" : "#092E20";
    }
    if (skill === "Prisma") {
      return theme === "dark" ? "#FFFFFF" : "#2D3748";
    }

    return "currentColor"; // Fallback
  };

  const SkillItem = ({
    skill,
    index,
    categoryInView,
  }: {
    skill: string;
    index: number;
    categoryInView: boolean;
  }) => {
    const Icon = iconMap[skill as keyof typeof iconMap];
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
      margin: "-25% 0px -25% 0px",
      once: false,
    });

    // Only animate individual items when their parent category is in view
    const shouldAnimate = categoryInView && isInView;

    return (
      <motion.div
        ref={ref}
        key={skill}
        className="flex items-center gap-4 min-w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={
          shouldAnimate
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                },
              }
            : {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeIn",
                },
              }
        }
      >
        {Icon && (
          <Icon
            className="text-4xl min-w-[40px]"
            style={{ color: getIconColor(skill) }}
          />
        )}
        <span className="text-2xl whitespace-nowrap">{skill}</span>
      </motion.div>
    );
  };

  const renderSkillItems = (content: string, categoryInView: boolean) => {
    return content
      .split(", ")
      .map((skill, index) => (
        <SkillItem
          key={skill}
          skill={skill}
          index={index}
          categoryInView={categoryInView}
        />
      ));
  };

  const SkillCategory = ({ skill, index }: { skill: any; index: number }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
      margin: "-15% 0px -15% 0px",
      once: false,
    });

    return (
      <motion.div
        ref={ref}
        key={skill.label}
        className="flex flex-col lg:flex-row gap-12 mb-18"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: index * 0.2 }}
      >
        <motion.div
          className="lg:w-5/12"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
        >
          <Typography
            variant="h3"
            className="text-gray-400"
            sx={typographyStyles}
          >
            {skill.label}
          </Typography>
        </motion.div>
        <div className="lg:w-9/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
            {renderSkillItems(skill.content, isInView)}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl mt-16">
        <motion.h1
          className="text-4xl font-bold mb-6"
          style={{ color: highlightColor }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-15% 0px" }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h1>

        <div className="ml-4">
          {skills.map((skill, index) => (
            <SkillCategory key={skill.label} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
