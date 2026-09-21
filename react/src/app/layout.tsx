import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ReferenceBanner } from "@/components/reference-banner";

export const metadata: Metadata = {
  title: "N-GELO — Digital Marketplace for Creators (Next.js)",
  description: "Curated digital assets for designers & developers. UI kits, templates, courses, icons and 3D packs. React + Next.js + Linear-inspired.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#010102" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)');var d=m.matches;var isDark=s?s==='dark':d;if(isDark)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');if(!s){m.addEventListener('change',function(e){if(e.matches)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');});}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[hsl(var(--canvas))] text-[hsl(var(--ink))] antialiased" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif" }}>
        <Navbar />
        <ReferenceBanner />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
