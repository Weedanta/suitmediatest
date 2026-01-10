import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Suitmedia - Ideas Platform",
    template: "%s | Suitmedia",
  },
  description:
    "Discover innovative ideas and articles. A platform where all great things begin. Explore our collection of ideas, insights, and creative content.",
  keywords: [
    "ideas",
    "articles",
    "innovation",
    "creative",
    "insights",
    "suitmedia",
    "blog",
    "content",
  ],
  authors: [{ name: "Suitmedia" }],
  creator: "Suitmedia",
  publisher: "Suitmedia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://suitmedia.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Suitmedia - Ideas Platform",
    title: "Suitmedia - Ideas Platform",
    description:
      "Discover innovative ideas and articles. A platform where all great things begin.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Suitmedia - Ideas Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suitmedia - Ideas Platform",
    description:
      "Discover innovative ideas and articles. A platform where all great things begin.",
    images: ["/og-image.jpg"],
    creator: "@suitmedia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
