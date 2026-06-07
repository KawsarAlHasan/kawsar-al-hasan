import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// ─── SEO Metadata ─────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Kawsar Al Hasan — Full Stack Developer",
    template: "%s | Kawsar Al Hasan",
  },
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and scalable SaaS platforms. Available for freelance and full-time opportunities.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "SaaS",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Kawsar Al Hasan", url: "https://alexmorgan.dev" }],
  creator: "Kawsar Al Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexmorgan.dev",
    title: "Kawsar Al Hasan — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and scalable SaaS platforms.",
    siteName: "Kawsar Al Hasan Portfolio",
    images: [
      {
        url: "/og-image.png", // 1200x630px — create this file
        width: 1200,
        height: 630,
        alt: "Kawsar Al Hasan — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawsar Al Hasan — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and scalable SaaS platforms.",
    images: ["/og-image.png"],
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Suppress hydration warning caused by next-themes injecting class
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-white text-zinc-900 antialiased dark:bg-[#080808] dark:text-zinc-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
