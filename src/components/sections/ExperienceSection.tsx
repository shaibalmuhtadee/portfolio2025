"use client";

import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import GlassBackground from "@/components/GlassBackground";

// Define the experience item type
type ExperienceItemType = {
  title: string;
  company: string;
  date: string;
  description: string[];
  logo: string;
};

// Create a separate component for each experience item
const ExperienceItem = ({
  experience,
  index,
  highlightColor,
}: {
  experience: ExperienceItemType;
  index: number;
  highlightColor: string;
}) => {
  // Hooks are now at the top level of this component
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-15% 0px -15% 0px",
    once: false,
  });

  return (
    <motion.div
      key={`${experience.company}-${index}`}
      ref={ref}
      className="flex flex-col md:flex-row gap-16 mb-18 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="md:w-5/12"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.7 }}
      >
        <div className="sticky top-44">
          <h2 className="text-3xl font-bold mb-2">{experience.title}</h2>
          <h3 className="text-2xl mb-3" style={{ color: highlightColor }}>
            {experience.company}
          </h3>
          <p className="text-xl text-gray-400 mb-6">{experience.date}</p>
        </div>
      </motion.div>
      <motion.div
        className="md:w-7/12"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ul className="list-disc space-y-3 text-xl">
          {experience.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default function ExperienceSection() {
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

  // Experience items data
  const experienceItems = [
    {
      title: "Software Engineering Intern",
      company: "BCGX",
      date: "May 2024 - August 2024",
      description: [
        "Contributed to the development of enterprise-level digital products used by Fortune 500 companies.",
        "Built and maintained React components with TypeScript for a B2B SaaS platform.",
        "Collaborated with UX designers and product managers to implement responsive, accessible interfaces.",
        "Participated in agile development processes with daily stand-ups, sprint planning, and retrospectives.",
      ],
      logo: "/bcgx-logo.png",
    },
    {
      title: "Full Stack Developer",
      company: "University of Toronto",
      date: "September 2023 - April 2024",
      description: [
        "Developed a web application for tracking and visualizing academic performance metrics.",
        "Implemented backend services using Node.js and Express with PostgreSQL database.",
        "Built responsive front-end interfaces with React and Tailwind CSS.",
        "Integrated authentication and role-based access control for different user levels.",
      ],
      logo: "/uoft-logo.png",
    },
    {
      title: "Teaching Assistant",
      company: "University of Toronto",
      date: "January 2023 - December 2023",
      description: [
        "Led tutorial sessions for undergraduate computer engineering courses.",
        "Assisted students with programming assignments and technical concepts.",
        "Provided detailed feedback on assignments and projects.",
        "Collaborated with professors to develop effective teaching materials.",
      ],
      logo: "/uoft-logo.png",
    },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col relative overflow-hidden"
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
          Experience
        </motion.h1>

        <div className="ml-4 space-y-24">
          {/* Use the ExperienceItem component instead of defining hooks in the callback */}
          {experienceItems.map((experience, index) => (
            <ExperienceItem
              key={`${experience.company}-${index}`}
              experience={experience}
              index={index}
              highlightColor={highlightColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
