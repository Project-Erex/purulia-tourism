import {DM_Sans, Dancing_Script} from "next/font/google";
import "./globals.css";

import {Providers} from "./providers";
import Header from "@/components/header/Header";

const DancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-DancingScript",
});
const DMSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-DMSans",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={`${DancingScript.variable} ${DMSans.variable}`}
        suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
