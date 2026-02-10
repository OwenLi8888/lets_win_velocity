import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Permit Pathway AI | City of Waterloo",
  description:
    "Decision-support approval navigator for housing proposals. Identify policy misalignment, approval risk, and incentive opportunities before formal submission.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
