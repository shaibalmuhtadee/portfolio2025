"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

const EmailSidebar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dividerColor = mounted
    ? theme === "dark"
      ? "#F2F230"
      : "#3185FC"
    : "#374151";

  return (
    <>
      <Divider
        className="fixed top-[38.6svh] left-[15.65%] -translate-y-1/2"
        orientation="horizontal"
        flexItem
        sx={{
          backgroundColor: dividerColor,
          height: "1px",
          width: "32px",
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
      />
      <div className="fixed top-[63svh] left-[16.5%] -translate-y-1/2 flex flex-col items-center gap-1">
        <p
          className={`${
            mounted
              ? theme === "dark"
                ? "text-[#F2F230]"
                : "text-[#3185FC]"
              : "text-gray-700"
          } text-sm font-medium tracking-wider rotate-[-90deg] origin-left whitespace-nowrap`}
        >
          shaibalmuhtadee@gmail.com
        </p>
      </div>
      <Divider
        className="fixed top-[65.8svh] left-[15.65%] -translate-y-1/2"
        orientation="horizontal"
        flexItem
        sx={{
          backgroundColor: dividerColor,
          height: "1px",
          width: "32px",
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
      />
    </>
  );
};

export default EmailSidebar;
