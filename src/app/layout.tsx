import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavBar from "../components/NavBar";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaibal Muhtadee | Portfolio",
  description: "Portfolio of Shaibal Muhtadee",
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      { rel: "icon", type: "image/png", url: "/favicon/favicon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
