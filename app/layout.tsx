"use client";

import "./globals.css";
import { Provider } from 'react-redux';
// import { inter } from './ui/fonts';
import { Inter, Lusitana } from 'next/font/google';
import store from "./useRedux/reduxStore";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lusitana = Lusitana({ 
  weight: ['400', '700'], 
  subsets: ['latin'] ,
  variable: '--font-lusitana',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lusitana.variable} antialiased`}>
      <body> 
        <Provider store={store}>
          {children}
        </Provider></body>
    </html>
  );
}

