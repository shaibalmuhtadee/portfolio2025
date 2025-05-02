import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavBar from "../components/NavBar";
import ScrollBar from "../components/ScrollBar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
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
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <div id="grain-overlay"></div>
          <NavBar />
          <ScrollBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
