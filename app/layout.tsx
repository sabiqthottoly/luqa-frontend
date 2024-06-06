"use client";
import { Provider } from "react-redux";
import "./globals.css";
// import { inter } from './ui/fonts';
import { Inter, Lusitana } from "next/font/google";
import { store } from "@/redux/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lusitana",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lusitana.variable} antialiased`}
    >
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
