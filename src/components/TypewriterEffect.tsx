"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
}

const TypewriterEffect = ({ words, className = "" }: TypewriterEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [isBlinking, setIsBlinking] = useState(true);
  const { resolvedTheme } = useTheme();
  const highlightColor = resolvedTheme === "dark" ? "#F2F230" : "#3185FC";

  useEffect(() => {
    const typingSpeed = 150; // milliseconds per character when typing
    const deletingSpeed = 75; // milliseconds per character when deleting
    const wordPause = 1500; // milliseconds to pause at complete word

    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (currentText === words[currentWordIndex]) {
        // Full word typed, pause before deleting
        setIsBlinking(true);
        timeout = setTimeout(() => {
          setIsBlinking(false);
          setPhase("deleting");
        }, wordPause);
      } else {
        // Still typing the current word
        setIsBlinking(false);
        timeout = setTimeout(() => {
          setCurrentText(
            words[currentWordIndex].substring(0, currentText.length + 1)
          );
        }, typingSpeed);
      }
    } else {
      // Deleting phase
      if (currentText === "") {
        // Word completely deleted, move to next word
        setPhase("typing");
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else {
        // Still deleting the current word
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, phase, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: isBlinking ? [1, 0, 1] : 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
        className="inline-block w-[3px] h-[0.9em] bg-current ml-1 align-middle"
        style={{ backgroundColor: highlightColor }}
      />
    </span>
  );
};

export default TypewriterEffect;
