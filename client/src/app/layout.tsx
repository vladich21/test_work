import type { Metadata, Viewport } from 'next';
import { Anonymous_Pro } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const anonymousPro = Anonymous_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-anonymous-pro',
});

export const metadata: Metadata = {
  title: 'Open Foundation',
  description: 'Telegram Mini App вЂ” Open Foundation',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={anonymousPro.variable}>
      <body className={`${anonymousPro.className} bg-[#2F2F33] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
