import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/client/Navbar";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mussu Henna ✨",
  description: "Muss's Henna Designs and Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background bg-plus-pattern">
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"light"}
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <section className="">{children}</section>
        </ThemeProvider>
      </body>
    </html>
  );
}
