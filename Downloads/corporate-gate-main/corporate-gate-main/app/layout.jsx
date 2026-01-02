import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import FloatingChatbot from "./_components/FloatingChatbot";
import Providers from "./providers";
import SmoothScrollProvider from "./_components/SmoothScrollProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Corporate Gate - AI-Powered Resume Builder",
  description:
    "Create a job-ready resume in minutes with our AI resume builder and professional templates.",
  icons: {
    icon: "/image 14.svg",
    shortcut: "/image 14.svg",
    apple: "/image 14.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Providers>
          <SmoothScrollProvider>
            <Header />
            {children}
            <Footer />
            <FloatingChatbot />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
