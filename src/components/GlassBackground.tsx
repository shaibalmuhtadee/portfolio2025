"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassBackgroundProps {
  color: string;
  children?: ReactNode;
  className?: string;
  showCircle?: boolean;
  opacity?: number;
}

export default function GlassBackground({
  color,
  children,
  className = "",
  showCircle = false,
  opacity = 0.05,
}: GlassBackgroundProps) {
  return (
    <motion.div
      className={`absolute inset-0 z-[-1] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ isolation: "isolate" }}
    >
      {/* Base glass effect - always present - without grain/noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(${hexToRgb(color)}, ${opacity})`,
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Optional top-right colored circle only */}
      {showCircle && (
        <div
          className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-opacity-20 blur-[80px]"
          style={{ backgroundColor: color }}
        ></div>
      )}
      {children}
    </motion.div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return in RGB format
  return `${r}, ${g}, ${b}`;
}
