import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Steven Nguyen - Software Engineer",
  description: "Projects and work of Steven Nguyen, a software engineer specializing in full-stack web and mobile development.",
  openGraph: {
    type: "website",
    siteName: "Steven Nguyen",
    url: "https://www.xosnos.com",
  },
  icons: {
    apple: "/assets/img/icon/apple-touch-icon.png",
    icon: [
      { url: "/assets/img/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/img/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/img/icon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/img/icon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${lato.variable} font-lato antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
