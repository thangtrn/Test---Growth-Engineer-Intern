import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "~/providers/ToastProvider";
import HolyLoader from "holy-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Growth Engineer Intern",
   description: "Growth Engineer Intern ||Test",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${inter.className} bg-darkness text-title`}>
            <HolyLoader
               color="#ee0033"
               height="2px"
               speed={300}
               easing="linear"
            />
            <ToastProvider>{children}</ToastProvider>
         </body>
      </html>
   );
}
