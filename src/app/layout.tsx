import type { Metadata, Viewport } from "next";
import { switzer, bodoni } from "./fonts";
import { Cursor, RevealAll, SmoothScroll, SectionLabel } from "@/components/ui";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caviar Bakhoor",
  description: "Elixir Signature Scents, Caviar Bakhoor",
};

// The browser chrome (Android address bar, iOS status bar) takes the paper
// colour, so the page and the bar read as one surface on phones and tablets.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EFEEEB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <RevealAll />
        <Cursor />
        <SectionLabel />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
