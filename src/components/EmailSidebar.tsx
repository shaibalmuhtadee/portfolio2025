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
    <div
      className="fixed"
      style={{ left: "16vw", top: "63vh", transform: "translateY(-50%)" }}
    >
      <div className="relative flex items-center">
        {/* Top Divider */}
        <Divider
          className="absolute"
          style={{
            left: "-15px",
            top: "-220px",
            transform: "rotate(-90deg)",
          }}
          orientation="horizontal"
          flexItem
          sx={{
            backgroundColor: dividerColor,
            height: "1px",
            width: "32px",
            transformOrigin: "center",
          }}
        />

        {/* Email */}
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

        {/* Bottom Divider */}
        <Divider
          className="absolute"
          style={{
            left: "-15px",
            bottom: "-16px",
            transform: "rotate(-90deg)",
          }}
          orientation="horizontal"
          flexItem
          sx={{
            backgroundColor: dividerColor,
            height: "1px",
            width: "32px",
            transformOrigin: "center",
          }}
        />
      </div>
    </div>
  );
};

export default EmailSidebar;
