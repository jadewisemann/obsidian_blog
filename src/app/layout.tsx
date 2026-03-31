import type { Metadata } from "next";
import "./globals.css";
// KaTeX CSS — required for math rendering (no JS, pure css)
import "katex/dist/katex.min.css";
import { SidebarNavigation } from "@/components/nav/SidebarNavigation";
import { TagPane } from "@/components/nav/TagPane";

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
        <div className="layout">
          <aside className="sidebar">
            <SidebarNavigation />
            <TagPane />
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
