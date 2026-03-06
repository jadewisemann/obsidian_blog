import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Obsidian Blog",
  description: "Minimalist blog backed by Obsidian markdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
