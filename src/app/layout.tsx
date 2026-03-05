import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { getNavigationItems } from "@/lib/navigation";
import { getSettings } from "@/lib/settings";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Sturgeon Valley Baptist Church",
  description: "A community of believers in St. Albert, Alberta.",
};

import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: items } = await getNavigationItems();
  const { data: settings } = await getSettings();

  const headerItems = items?.filter(i => i.type === "HEADER").map(i => ({ label: i.label, url: i.url })) || [];
  const siteTitle = settings?.siteTitle || "SVBC";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Providers>
          <NavBar items={headerItems} siteTitle={siteTitle} />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

