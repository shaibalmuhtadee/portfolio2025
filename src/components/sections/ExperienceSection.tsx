"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import GlassBackground from "@/components/GlassBackground";

// Reusable list variants for animations
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

// First TimelineContent Component
const JobTimelineContent = ({
  title,
  company,
  period,
  responsibilities,
  highlightColor,
  isHighlighted = false,
}: {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  highlightColor: string;
  isHighlighted?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-15% 0px -15% 0px",
    once: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration: 0.5 } }
          : { opacity: 0, y: 20, transition: { duration: 0.3 } }
      }
    >
      <motion.h3
        className="text-2xl md:text-3xl font-bold mb-1"
        initial={{ opacity: 0, y: -10 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: 0.1 },
              }
            : {
                opacity: 0,
                y: -10,
                transition: { duration: 0.3 },
              }
        }
      >
        {title}
      </motion.h3>
      <motion.h4
        style={isHighlighted ? { color: highlightColor } : {}}
        className="text-xl md:text-2xl font-medium mb-2"
        initial={{ opacity: 0, y: -15 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              }
            : {
                opacity: 0,
                y: -15,
                transition: { duration: 0.4 },
              }
        }
      >
        {company}
      </motion.h4>
      <motion.p
        className="text-gray-400 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: 1,
                transition: { duration: 0.7, delay: 0.3 },
              }
            : { opacity: 0, transition: { duration: 0.3 } }
        }
      >
        {period}
      </motion.p>

      <motion.ul
        className="list-disc pl-5 space-y-1 text-[1.05rem] mt-3 text-sm md:text-base"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={listVariants}
      >
        {responsibilities.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

// Timeline Connector Component for reusability
const AnimatedConnector = () => (
  <motion.div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
      initial={{ scaleY: 0, transformOrigin: "top" }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: false, margin: "-20% 0px" }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <div
        style={{
          backgroundColor: "#bdbdbd",
          width: "3px",
          height: "100%",
        }}
      ></div>
    </motion.div>
  </motion.div>
);

export default function ExperienceSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const highlightColor = mounted
    ? resolvedTheme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  // Job data for reusability
  const jobs = [
    {
      title: "Software Engineer",
      company: "Your Company",
      period: "June 2025 - Present",
      isHighlighted: true,
      responsibilities: [
        "Create scalable and high-impact software solutions that grow your business quickly",
        "Tackle complex and interesting challenges in full-stack development to solve your real-world problems",
        "Collaborate with passionate teams, contribute to a shared mission, and work alongside your talented engineers",
      ],
    },
    {
      title: "Robotics Software Engineering Intern",
      company: "Zebra Technologies",
      period: "May 2023 - Sept 2024",
      responsibilities: [
        "Designed and deployed authentication and authorization servers, securing access for 200+ autonomous robots",
        "Engineered secure API endpoints in TypeScript, enabling management of sensitive data like API keys and JWTs",
        "Architected an ABAC system with a TOML config parser, enabling dynamic policy updates for multiple teams",
        "Developed a comprehensive test suite in Rust, eliminating 99% of system bugs and ensuring a reliable API",
        "Automated CI/CD pipelines and containerized microservices using Docker, deployed in Kubernetes",
      ],
    },
    {
      title: "Classroom Ambassador",
      company: "University of Toronto",
      period: "Sept 2022 - Apr 2023",
      responsibilities: [
        "Assisted and educated instructors with delivering in person and online classroom lectures and tutorials",
        "Built and ensured the operation of Intel Crestron teaching stations and various streaming and audio equipment",
        "Organized and monitored the information technology support of various classrooms throughout the university",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden"
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
          Experience
        </motion.h1>

        <div className="ml-8 md:ml-16 lg:ml-24">
          <Timeline
            position="right"
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
                display: "none",
              },
              "& .MuiTimelineItem-root": {
                minHeight: "160px",
              },
              "& .MuiTimelineContent-root": {
                padding: "0 16px 32px 16px",
              },
              "& .MuiTimelineDot-root": {
                margin: "0 -1 0 0",
                width: "22px",
                height: "22px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)", // Add glow effect
              },
              "& .MuiTimelineConnector-root": {
                width: "3px",
              },
            }}
          >
            {jobs.map((job, index) => (
              <TimelineItem key={job.title}>
                <TimelineOppositeContent color="text.secondary"></TimelineOppositeContent>
                <TimelineSeparator>
                  {/* Animated Dot with breathing effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-20% 0px" }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="dot-wrapper"
                  >
                    <TimelineDot
                      sx={
                        index === 0
                          ? {
                              backgroundColor: highlightColor,
                              position: "relative",
                              zIndex: 2,
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: "-4px",
                                left: "-4px",
                                right: "-4px",
                                bottom: "-4px",
                                borderRadius: "50%",
                                background: "transparent",
                                border: `2px solid ${highlightColor}`,
                                opacity: 0.7,
                                animation:
                                  "pulsingBorder 2s infinite ease-in-out",
                              },
                            }
                          : {}
                      }
                    />
                  </motion.div>

                  {/* Only show connector for all but the last item */}
                  {index < jobs.length - 1 && <AnimatedConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <JobTimelineContent
                    title={job.title}
                    company={job.company}
                    period={job.period}
                    responsibilities={job.responsibilities}
                    highlightColor={highlightColor}
                    isHighlighted={job.isHighlighted}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
