import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Form Diagram Editor",
  description: "Create beautiful musical form diagrams quickly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
