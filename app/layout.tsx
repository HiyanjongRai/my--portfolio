import type { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Hiyan Jong Rai - Backend Developer",
  description: "Backend Developer from Nepal specializing in Spring Boot, REST APIs, MySQL, and PostgreSQL. Building reliable web applications.",
  keywords: [
    "Hiyan Jong Rai", 
    "Backend Developer", 
    "Spring Boot", 
    "Java Developer", 
    "REST API", 
    "PostgreSQL", 
    "MySQL", 
    "Nepal Developer", 
    "Delito Kathmandu", 
    "Himalayan Hub", 
    "Mirai Design", 
    "SEO Specialist Nepal", 
    "Content Creator Nepal"
  ],
  authors: [{ name: "Hiyan Jong Rai" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hiyanjong.vercel.app/",
    siteName: "Hiyan Jong Rai",
    title: "Hiyan Jong Rai - Backend Developer",
    description: "Backend Developer from Nepal specializing in Spring Boot, REST APIs, and database architecture.",
    images: [
      {
        url: "https://hiyanjong.vercel.app/images/profile1.jpg",
        width: 1200,
        height: 630,
        alt: "Hiyan Jong Rai"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiyan Jong Rai - Backend Developer",
    description: "Backend Developer from Nepal specializing in Spring Boot, REST APIs, and database architecture.",
    images: ["https://hiyanjong.vercel.app/images/profile1.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Pinterest domain verification */}
        <meta name="p:domain_verify" content="f38c642430bc7f307780f539033e3f8e" />
      </head>
      <body className="antialiased min-h-full bg-white font-sans" suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
