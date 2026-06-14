import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://royaa-furniture.com'),
  title: {
    default: "مؤسسة رؤية للأثاث | غرف نوم وأثاث منزلي بالرياض",
    template: "%s | مؤسسة رؤية للأثاث"
  },
  description: "تسوق أفضل غرف نوم وطني ومستورد، كنب تفصيل وجاهز بأسعار المصنع مباشرة. توصيل وتركيب مجاني داخل الرياض، ضمان مصنعي، والدفع عند الاستلام.",
  keywords: ["غرف نوم", "غرف نوم وطني", "غرف نوم بالرياض", "تفصيل غرف نوم", "كنب تفصيل", "كنب جاهز", "أثاث الرياض", "مؤسسة رؤية للأثاث"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "مؤسسة رؤية للأثاث | غرف نوم وأثاث منزلي بالرياض",
    description: "تسوق أفضل غرف نوم وطني ومستورد، كنب تفصيل وجاهز بأسعار المصنع مباشرة. توصيل وتركيب مجاني داخل الرياض، ضمان مصنعي، والدفع عند الاستلام.",
    url: "https://royaa-furniture.com",
    siteName: "مؤسسة رؤية للأثاث",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "مؤسسة رؤية للأثاث",
      }
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة رؤية للأثاث | غرف نوم وأثاث منزلي بالرياض",
    description: "تسوق أفضل غرف نوم وطني ومستورد، كنب تفصيل وجاهز بأسعار المصنع مباشرة. توصيل وتركيب مجاني داخل الرياض، ضمان مصنعي، والدفع عند الاستلام.",
    images: ["/logo.png"],
  }
};

import { FaWhatsapp } from 'react-icons/fa';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full" suppressHydrationWarning>
      <body className={`${cairo.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/966539404559?text=مرحباً مؤسسة رؤية، أريد الاستفسار عن منتجاتكم" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl shadow-green-500/30 hover:bg-[#1ebd57] hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center animate-bounce-short"
          aria-label="تواصل معنا عبر واتساب"
        >
          <FaWhatsapp size={32} />
        </a>
      </body>
    </html>
  );
}