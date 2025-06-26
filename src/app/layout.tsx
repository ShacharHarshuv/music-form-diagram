import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Formata",
  description: "Create beautiful musical form diagrams quickly",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
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
