import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { Inter } from 'next/font/google'
import Footer from "../components/layout/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'IHSN — Indian Hardware and Sanitary News',
    template: '%s | IHSN',
  },
  description: 'IHSN is a premier platform connecting businesses and professionals across trade exhibitions, networking events and industry publications.',
  keywords: ['trade exhibition', 'networking', 'IHSN', 'international trade', 'business forum'],
  openGraph: {
    title: 'IHSN — Indian Hardware And Sanitary news',
    description: 'Connecting businesses and professionals across trade exhibitions and industry events.',
    url: 'https://ihsn.in',
    siteName: 'IHSN',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IHSN — Indian Hardware And Sanitary news',
    description: 'Connecting businesses and professionals across trade exhibitions.',
  },
  metadataBase: new URL('https://ihsn.in'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
