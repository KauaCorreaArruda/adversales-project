import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AdverSales — Demanda Qualificada que Vende",
  description:
    "Integramos geração de demanda massiva com vendas. Anúncios de precisão, funis de alta conversão e automações com IA para negócios B2B high ticket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} dark`}>
      <body className="min-h-full flex flex-col bg-[#020617] text-[#F8FAFC] antialiased">
        {children}
      </body>
    </html>
  );
}
