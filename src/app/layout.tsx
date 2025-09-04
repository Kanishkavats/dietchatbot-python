import type { Metadata } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import UISettingsPanel from "@/src/components/UISettingsPanel";
import { Provider } from "react-redux";
import ThemeApplier from "@/src/helper/ThemeApplier";
import Providers from "./providers";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "charifund-frontend",
  description: "development environment for charifund",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${nunito.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ThemeApplier />
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Providers>
        */
      </body>
    </html>
  );
}
