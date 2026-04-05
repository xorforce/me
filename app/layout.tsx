import type React from "react";
import type { Metadata } from "next";
import { fontVariables } from "@/lib/typography";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeSwitcher } from "../components/theme-switcher";

export const metadata: Metadata = {
  title: "Bhagat Singh - iOS Engineer",
  description: "iOS Engineer with an ever-lasting knack for design. Building better mobile applications.",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
