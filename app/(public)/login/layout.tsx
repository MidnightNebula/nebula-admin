import { CenterContainer } from '@/_shared/components/CenterContainer';
import { geistMono, geistSans } from '@/_shared/fonts/fonts';
import '@/globals.css';
import Script from 'next/script';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`dark:bg-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script src="/app/_shared/lib/setTheme.ts" strategy="beforeInteractive" />
        <CenterContainer>{children}</CenterContainer>
      </body>
    </html>
  );
}
