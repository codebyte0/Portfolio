import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), { ssr: false });

export const metadata: Metadata = {
  title: "Portfolio Website - codebyte",
  description: "Modern Portfolio Website with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XV9LX8EKFC"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XV9LX8EKFC');
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeToggle />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
