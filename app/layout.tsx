import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress-context";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  title: "AlgoQuest | Master DSA in 28 Weeks",
  description: "A gamified, psychologically-engaging platform to master Data Structures & Algorithms and become interview-ready for top tech companies.",
  keywords: ["DSA", "LeetCode", "algorithms", "data structures", "coding interview", "Google interview"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
