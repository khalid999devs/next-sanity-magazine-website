import type { Metadata } from 'next';
import '../globals.css';
import localFont from 'next/font/local';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import { LenisGSAP } from '@/components/animations/LenisGSAP';

const bodyFont = localFont({
  src: '../../public/fonts/jmakkas.ttf',
  variable: '--font-body',
});

const headingFont = localFont({
  src: '../../public/fonts/sohidsafkat.ttf',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Roktakto KUET',
  description:
    'This is a magazine website that showcases the sacrifices and contributions of KUET students during the July movement and 18 february incident. Also it demonstrate the frightening pasts of campus politics and raise awareness among all the students of Bangladesh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <LenisGSAP>
          <main className='font-cbody'>
            <Header />
            {children}
            <Footer />
          </main>
        </LenisGSAP>
      </body>
    </html>
  );
}
