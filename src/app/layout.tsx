import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import React from "react";

import { metadata } from "@/app/metadata";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
