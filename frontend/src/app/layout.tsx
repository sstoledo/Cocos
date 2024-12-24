import "../styles/tailwind.css";
import { CartProvider } from '@cart/provider';
import { ThemeProvider } from '@themes/provider';
import { Metadata } from 'next';

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-light-bg-primary dark:bg-dark-bg-primary">
              {children}
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}