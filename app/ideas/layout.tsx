import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "Explore our collection of innovative ideas and articles. Where all great things begin. Browse through curated content covering technology, creativity, and insights.",
  keywords: [
    "ideas",
    "articles",
    "innovation",
    "creative ideas",
    "technology articles",
    "insights",
    "blog posts",
  ],
  openGraph: {
    title: "Ideas | Suitmedia",
    description:
      "Explore our collection of innovative ideas and articles. Where all great things begin.",
    url: "/ideas",
    type: "website",
    images: [
      {
        url: "/og-ideas.jpg",
        width: 1200,
        height: 630,
        alt: "Suitmedia Ideas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideas | Suitmedia",
    description:
      "Explore our collection of innovative ideas and articles. Where all great things begin.",
    images: ["/og-ideas.jpg"],
  },
  alternates: {
    canonical: "/ideas",
  },
};

export default function IdeasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      {children}
    </div>
  );
}
