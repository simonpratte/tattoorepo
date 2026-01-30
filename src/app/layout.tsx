import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "InkFinder - Discover Your Perfect Tattoo Artist",
  description: "Find talented tattoo artists in your area. Browse by style, region, and discover your perfect ink match.",
  keywords: ["tattoo", "tattoo artist", "tattoo directory", "ink", "body art", "tattoo styles"],
  openGraph: {
    title: "InkFinder - Discover Your Perfect Tattoo Artist",
    description: "Find talented tattoo artists in your area. Browse by style, region, and discover your perfect ink match.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* Noise texture overlay */}
          <div className="noise-overlay" />

          <Header />

          <main className="relative">
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
