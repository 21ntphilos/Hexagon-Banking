export const dynamic = "force-dynamic"

import Head from 'next/head'
import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({
  subsets:["latin"],
  variable:"--font-inter"
})

const ibmplexserif = IBM_Plex_Serif({
  subsets:["latin"],
  variable:"--font-IPS",
  weight:["400","700"]
})

export const metadata: Metadata = {
  title: "Hexagon",
  description: "Hexagon is a mordern banking plartform for everyone. ",
  icons: {
    icon:"./../../public/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href='./../../public/icons/logo.svg'/>
      </Head>
      <body
        className={`${inter.variable} ${ibmplexserif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
