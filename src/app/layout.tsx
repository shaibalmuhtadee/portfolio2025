import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NavBar from "../components/NavBar";
import ScrollBar from "../components/ScrollBar";
import EmailSidebar from "../components/EmailSidebar";
import SmoothScroll from "@/components/SmoothScroll";
import Script from "next/script";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Shaibal Muhtadee | Portfolio",
  description: "Portfolio of Shaibal Muhtadee",
  keywords: [
    "Shaibal Muhtadee",
    "software engineer",
    "full-stack developer",
    "web developer",
    "Next.js portfolio",
    "React developer",
    "frontend engineer",
    "backend developer",
    "personal website",
    "JavaScript developer",
  ],
  authors: [{ name: "Shaibal Muhtadee", url: "https://shaibalmuhtadee.com" }],
  creator: "Shaibal Muhtadee",
  publisher: "Shaibal Muhtadee",
  openGraph: {
    title: "Shaibal Muhtadee | Portfolio",
    description: "Explore the professional portfolio of Shaibal Muhtadee",
    url: "https://shaibalmuhtadee.com",
    siteName: "Shaibal Muhtadee | Portfolio",
    images: [
      {
        url: "https://shaibalmuhtadee.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shaibal Muhtadee Portfolio Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://shaibalmuhtadee.com"),
  alternates: {
    canonical: "https://shaibalmuhtadee.com",
  },
  themeColor: "#ffffff",
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
      <head>
        {/* Disable Dark Reader browser extension for this site to prevent hydration issues */}
        <meta name="darkreader-lock" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <div className="relative z-50">
            <NavBar />
          </div>
          <div className="relative z-40">
            <ScrollBar />
          </div>
          <div className="hidden lg:block relative z-30">
            <EmailSidebar />
          </div>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>

        {/* Script to remove Dark Reader inline attributes if they exist */}
        <Script id="fix-darkreader-hydration" strategy="afterInteractive">
          {`
            function removeDarkReaderAttributes() {
              const elements = document.querySelectorAll('[data-darkreader-inline-color], [data-darkreader-inline-bgcolor], [data-darkreader-inline-fill], [data-darkreader-inline-stroke]');
              elements.forEach(el => {
                el.removeAttribute('data-darkreader-inline-color');
                el.removeAttribute('data-darkreader-inline-bgcolor');
                el.removeAttribute('data-darkreader-inline-fill');
                el.removeAttribute('data-darkreader-inline-stroke');
                
                // Clean up inline styles that contain darkreader variables
                if (el.style && el.style.cssText) {
                  const style = el.style.cssText;
                  if (style.includes('--darkreader-inline')) {
                    // Create a new style without the darkreader properties
                    const newStyle = style
                      .split(';')
                      .filter(prop => !prop.includes('--darkreader-inline'))
                      .join(';');
                    el.style.cssText = newStyle;
                  }
                }
              });
            }
            
            // Run immediately and also after a short delay to catch any late-rendered elements
            removeDarkReaderAttributes();
            setTimeout(removeDarkReaderAttributes, 500);
          `}
        </Script>
      </body>
    </html>
  );
}
