import type { Metadata } from 'next';
import { Raleway, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'DVD Library — Breathtaker Hotel & Spa',
  description: 'Complimentary DVD collection for in-house guests. Mount Buller.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
