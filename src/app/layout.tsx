import type { Metadata } from "next";
import "./globals.css";
import { SidebarNavigation } from "@/components/nav/SidebarNavigation";

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
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
