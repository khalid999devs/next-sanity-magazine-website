import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
