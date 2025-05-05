"use client";

import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";

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
  // Create a client-side only state to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate unique class names based on the color
  const glassClassName = `glass-bg-${color.replace("#", "")}-${opacity
    .toString()
    .replace(".", "-")}`;
  const circleClassName = `circle-bg-${color.replace("#", "")}`;

  // Inject CSS variables only on the client side
  useEffect(() => {
    if (!mounted) return;

    // Create a style element
    const styleEl = document.createElement("style");
    const rgbColor = hexToRgb(color);

    // Add the specific CSS for this instance
    styleEl.innerHTML = `
      .${glassClassName} {
        background-color: rgba(${rgbColor}, ${opacity});
        backdrop-filter: blur(1px);
      }
      .${circleClassName} {
        background-color: ${color};
      }
    `;

    // Add style to document head
    document.head.appendChild(styleEl);

    // Clean up
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [color, opacity, glassClassName, circleClassName, mounted]);

  return (
    <motion.div
      className={`absolute inset-0 z-[-1] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ isolation: "isolate" }}
    >
      {/* Base glass effect - always present - without grain/noise */}
      <div className={`absolute inset-0 ${mounted ? glassClassName : ""}`} />

      {/* Optional top-right colored circle only */}
      {showCircle && mounted && (
        <div
          className={`absolute top-20 right-[20%] w-64 h-64 rounded-full bg-opacity-20 blur-[80px] ${circleClassName}`}
        />
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
