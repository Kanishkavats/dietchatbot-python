import type { Metadata } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UISettingsPanel from "@/components/UISettingsPanel";
import { Provider } from "react-redux";
import ThemeApplier from "@/helper/ThemeApplier";
import { store } from "@/store";
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
          <div className="fixed top-1/2 left-0 z-50 h-screen p-4">
            <UISettingsPanel />
          </div>
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
