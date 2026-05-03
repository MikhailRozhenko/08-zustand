import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const robotoFont = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple app to create, search and manage your notes',

  openGraph: {
    title: 'NoteHub',
    description: 'A simple app to create, search and manage your notes',
    url: 'https://08-zustand-rho-six.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoFont.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
