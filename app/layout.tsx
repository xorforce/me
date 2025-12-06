import type React from "react";
import type { Metadata } from "next";
import { fontClasses, fontVariables, getCSSVariables } from "@/lib/typography";
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
  const variables = getCSSVariables();
  const css = `:root { ${Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ")} }`;

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={fontClasses.primary}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
