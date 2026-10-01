import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/site";
import "./globals.css";

// Headlines, name, and section titles.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

// Body copy (400/600/700).
const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: { default: site.title, template: `%s · ${site.name}` },
    description: site.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    // data-scroll-behavior="smooth" lets Next.js pause smooth scrolling during page
    // changes, so every new page opens at the very top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivoBlack.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Fixed page background (theme gradient). */}
        <div aria-hidden className="bg-page pointer-events-none fixed inset-0 -z-10" />
        {/* Brutalist frame: a thick black border around the whole viewport. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] border-4 border-ink"
        />
        <Navbar name={site.name} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
