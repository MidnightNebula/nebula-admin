import { SESSION_TOKEN_NAME } from '@/(private)/_shared/consts/consts';
import { ErrorTooltip } from '@/_shared/components/ErrorTooltip';
import { Header } from '@/_shared/components/Header';

import { geistMono, geistSans } from '@/_shared/fonts/fonts';
import { getSession, Session } from '@/_shared/lib/auth';
import { APIError } from 'better-auth';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import '@/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let session: Session | null = null;
  let e: string | undefined;

  const cookieStore = (await cookies()).has(SESSION_TOKEN_NAME);

  try {
    const { data, error } = await getSession({
      fetchOptions: {
        headers: await headers(),
        credentials: 'include',
      },
    });
    e = error?.statusText;
    session = data;
  } catch (err: any) {
    e = String(new APIError().status);
  }

  if (!session && !cookieStore) {
    redirect('/login');
  }

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
        <Header user={session?.user ?? null} />

        {e && <ErrorTooltip error={e} />}
        {children}
      </body>
    </html>
  );
}
