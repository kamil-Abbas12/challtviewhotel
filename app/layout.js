import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import WhatsAppButton from "@/components/WhatsAppButton";

import Navbar from "@/components/Navbar";
import { Gilda_Display } from 'next/font/google'
import Footer from "@/components/Footer";

const gilda = Gilda_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gilda',
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your Hotel App",
  description: "Book beautiful rooms with ease",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className={gilda.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar />
          {children}
                <WhatsAppButton />

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}