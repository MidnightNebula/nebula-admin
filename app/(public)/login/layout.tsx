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
        <div className="grid min-h-svh items-center">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
