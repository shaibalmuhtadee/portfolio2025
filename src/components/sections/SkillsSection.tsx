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

  const renderSkillItems = (content: string) => {
    return content.split(", ").map((skill) => {
      const Icon = iconMap[skill as keyof typeof iconMap];
      const iconColors = {
        Python: "#3776AB", // Python blue
        JavaScript: "#F7DF1E", // JavaScript yellow
        TypeScript: "#3178C6", // TypeScript blue
        "C/C++": "#00599C", // C++ blue
        "HTML/CSS": "#E34F26", // HTML orange
        Dart: "#0175C2", // Dart blue
        SQL: "#4479A1", // SQL blue
        React: "#61DAFB", // React cyan
        "Next.js": theme === "dark" ? "#FFFFFF" : "#000000", // Next.js white/black
        "Node.js": "#339933", // Node.js green
        Express: theme === "dark" ? "#FFFFFF" : "#000000", // Express white/black
        Django: theme === "dark" ? "#44B78B" : "#092E20", // Django light green/dark green
        "Tailwind CSS": "#06B6D4", // Tailwind cyan
        Motion: "#7B61FF", // Framer Motion purple
        Flutter: "#02569B", // Flutter blue
        PostgreSQL: "#336791", // PostgreSQL blue
        SQLite: "#003B57", // SQLite blue
        MongoDB: "#47A248", // MongoDB green
        Prisma: theme === "dark" ? "#FFFFFF" : "#2D3748", // Prisma white/dark gray
        Git: "#F05032", // Git orange
        Docker: "#2496ED", // Docker blue
        AWS: "#FF9900", // AWS orange
        "Google Cloud": "#4285F4", // Google Cloud blue
        DevTools: theme === "dark" ? "#FFFFFF" : "#000000", // Chrome DevTools white/black
        Figma: "#F24E1E", // Figma orange
      };

      return (
        <div key={skill} className="flex items-center gap-4 min-w-[200px]">
          {Icon && (
            <Icon
              className="text-4xl min-w-[40px]"
              style={{ color: iconColors[skill as keyof typeof iconColors] }}
            />
          )}
          <span className="text-xl whitespace-nowrap">{skill}</span>
        </div>
      );
    });
  };

  return (
    <section id="skills" className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl">
        <h1 className={`text-4xl font-bold mb-12 text-[${highlightColor}]`}>
          Skills
        </h1>

        <div className="ml-4">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="flex flex-col lg:flex-row gap-12 mb-18"
            >
              <div className="lg:w-5/12">
                <Typography
                  variant="h2"
                  className="text-gray-400"
                  sx={typographyStyles}
                >
                  {skill.label}
                </Typography>
              </div>
              <div className="lg:w-7/12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
                  {renderSkillItems(skill.content)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
