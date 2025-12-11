import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer, MobileBottomNav } from "@/components/layouts";
import ZaloWidget from "@/components/ZaloWidget";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vinago - Dịch vụ vận chuyển hàng ghép chuyên nghiệp",
  description:
    "Vinago - Dịch vụ vận chuyển hàng ghép uy tín, giá rẻ, giao hàng toàn quốc. Cam kết giao hàng nhanh chóng, an toàn, đúng hẹn.",
  keywords: [
    "vận chuyển hàng ghép",
    "ghép hàng",
    "vận chuyển hàng hóa",
    "giao hàng toàn quốc",
    "vận tải",
    "logistics",
  ],
  openGraph: {
    title: "Vinago - Dịch vụ vận chuyển hàng ghép chuyên nghiệp",
    description:
      "Dịch vụ vận chuyển hàng ghép uy tín, giá rẻ, giao hàng toàn quốc.",
    url: "https://vinago.io",
    siteName: "Vinago",
    type: "website",
    images: [
      {
        url: "https://vinago.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vinago - Vận chuyển hàng ghép",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinago - Dịch vụ vận chuyển hàng ghép chuyên nghiệp",
    description:
      "Dịch vụ vận chuyển hàng ghép uy tín, giá rẻ, giao hàng toàn quốc.",
    images: ["https://vinago.io/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
        
        {/* Zalo OA Chat Widget */}
        <ZaloWidget />
      </body>
    </html>
  );
}
