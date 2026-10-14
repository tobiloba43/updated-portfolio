import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-site",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erinle Tobiloba | Frontend Developer",
  description:
    "The portfolio of Erinle Tobiloba, a frontend developer creating thoughtful digital experiences with React and Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${manrope.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
