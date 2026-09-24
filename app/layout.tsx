import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Skinstric.ai | A.I. Skincare',
  description: 'High-end minimalist skin analysis web application',
};

// Function: RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
