import type {Metadata} from 'next';
import {Geist, Geist_Mono, Inter} from 'next/font/google';
import './globals.css';
import Providers from './providers';
import {Toaster} from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tracka',
  description: 'Track your spending and stay within budget',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        <Toaster
          richColors
          position="bottom-center"
          toastOptions={{
            classNames: {
              title: '!font-sans !text-sm',
              description: '!font-sans',
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
