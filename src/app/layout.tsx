import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Inter, Montserrat, Source_Code_Pro } from "next/font/google";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code",
  display: "swap",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImparoDeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} ${sourceCode.variable} text-neutral-900 antialiased font-montserrat bg-background flex flex-col items-center min-h-screen`}>
        <SessionProvider>
          <Navbar />
          <main className="w-full flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
