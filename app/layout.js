import {DM_Sans, Dancing_Script, Open_Sans} from "next/font/google";
import "./globals.css";

import {Providers} from "./providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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

const OpenSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-OpenSans",
});

export const metadata = {
  title: "Purulia Tour | Empowering Digital Business Solutions for Growth",
  description:
    "Purulia Tour | Your digital transformation partner. We specialize in digital marketing, software development, and graphic design to help you achieve global success.",
  openGraph: {
    title: "Purulia Tour | Empowering Digital Business Solutions for Growth",
    description:
      "Purulia Tour: Your digital transformation partner. We specialize in digital marketing, software development, and graphic design to help you achieve global success.",
    type: "website",
    url: "www.puruliatour.com",
    site_name: "Purulia Tour",
    images: [
      {
        url: "https://res.cloudinary.com/dzigf3fcv/image/upload/v1722600241/m3mcvmdrvmdk2s2nefsy.png",
        width: 1200,
        height: 630,
        alt: "HomePage OG Image",
      },
    ],
  },
  // link: [
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "57x57",
  //     href: "/apple-icon-57x57.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "60x60",
  //     href: "/apple-icon-60x60.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "72x72",
  //     href: "/apple-icon-72x72.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "76x76",
  //     href: "/apple-icon-76x76.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "114x114",
  //     href: "/apple-icon-114x114.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "120x120",
  //     href: "/apple-icon-120x120.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "144x144",
  //     href: "/apple-icon-144x144.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "152x152",
  //     href: "/apple-icon-152x152.png",
  //   },
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "180x180",
  //     href: "/apple-icon-180x180.png",
  //   },
  // ],
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={`${DancingScript.variable} ${DMSans.variable} ${OpenSans.variable}`}
        suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#F6FFF8",
};
