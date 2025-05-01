"use client";

import Breadcrumbs from "./Breadcrumbs";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl flex items-center justify-between px-2 py-1 border rounded-lg bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-xs border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <Image src="/favicon/favicon.svg" alt="Logo" width={32} height={32} />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-6">
        <Link href="/intro" className="hover:text-blue-500 transition-colors">
          About
        </Link>
        <Link
          href="/experience"
          className="hover:text-blue-500 transition-colors"
        >
          Experience
        </Link>
        <Link
          href="/projects"
          className="hover:text-blue-500 transition-colors"
        >
          Projects
        </Link>
        <Link href="/contact" className="hover:text-blue-500 transition-colors">
          Contact
        </Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default NavBar;
