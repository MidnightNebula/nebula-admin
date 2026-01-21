import { CenterContainer } from '@/_shared/components/CenterContainer';
import { geistMono, geistSans } from '@/_shared/fonts/fonts';
import '@/globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`dark:bg-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme');
                const defTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (theme === 'dark' || (!theme && defTheme)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            })();
          `,
          }}
        />
        <CenterContainer>{children}</CenterContainer>
      </body>
    </html>
  );
}
