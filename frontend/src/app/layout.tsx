import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocos - Empresa de ventas de productos",
  description: "Aplicación web para gestionar tu empresa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
