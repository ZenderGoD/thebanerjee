import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bebishal.com"),
  title: "Bishal Banerjee",
  description:
    "Bishal Banerjee builds software people talk to: founding engineer at IMAI, and the maker of Wisper Back, a voice app for the Mac.",
  openGraph: {
    title: "Bishal Banerjee",
    description: "Founding engineer at IMAI. Maker of Wisper Back.",
    url: "https://bebishal.com",
    images: ["/art/melencolia.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e9e9e4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrains.variable}`}>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
