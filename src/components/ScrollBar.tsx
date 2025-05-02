"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ScrollBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollBarColor = mounted
    ? theme === "dark"
      ? "bg-[#F2F230]"
      : "bg-[#3185FC]"
    : "bg-gray-700";

  const scrollBarBackgroundColor = mounted
    ? theme === "dark"
      ? "bg-gray-700"
      : "bg-gray-300"
    : "bg-gray-700";

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-[50svh] right-[16.5%] -translate-y-1/2 w-1.5 h-[110px] rounded-full overflow-hidden ${scrollBarBackgroundColor}`}
    >
      <div
        className={`w-full rounded-full h-full ${scrollBarColor}`}
        style={{ transform: `translateY(-${100 - scrollProgress}%)` }}
      />
    </div>
  );
};

export default ScrollBar;
