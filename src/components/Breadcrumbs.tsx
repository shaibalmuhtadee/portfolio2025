"use client";

import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useTheme } from "next-themes";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  const { theme } = useTheme();
  const [textColor, setTextColor] = React.useState("black");

  React.useEffect(() => {
    setTextColor(theme === "dark" ? "white" : "black");
  }, [theme]);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" color={textColor}>
        <Link underline="hover" color={textColor} href="#intro">
          Intro
        </Link>
        <Link underline="hover" color={textColor} href="#skills">
          Skills
        </Link>
        <Link underline="hover" color={textColor} href="#experience">
          Experience
        </Link>
        <Link underline="hover" color={textColor} href="#projects">
          Projects
        </Link>
        <Link underline="hover" color={textColor} href="#contact">
          Contact
        </Link>
      </Breadcrumbs>
    </div>
  );
}
