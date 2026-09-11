import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayabharathi & Prithika — Wedding Invitation",
  description:
    "The wedding invitation of Jayabharathi and Prithika — November 11, 2026.",
  themeColor: "#f4eee3",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
