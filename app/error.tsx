'use client';

import { Alert, AlertDescription, AlertTitle } from '@/app/_shared/shadcn/components/alert';
import { Button } from '@/app/_shared/shadcn/components/button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CONTACT_LINK = 'https://discord.com/channels/1352332037335420938/1376701065033945088';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Alert
        variant="destructive"
        className="w-fit border-red-400 bg-white text-center shadow-lg dark:border-red-600 dark:bg-gray-900"
      >
        <AlertTitle className="text-red-700 dark:text-red-400">{error.message}</AlertTitle>
        <AlertDescription className="text-center text-gray-700 dark:text-gray-300">
          <div className="mt-4 flex items-center justify-between gap-2.5">
            <Button
              onClick={() => {
                pathName === '/login' ? reset() : router.push('/login');
              }}
              className="cursor-pointer rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-[0_15px_25px_-10px_rgba(79,70,229,0.6)] focus:ring-4 focus:ring-indigo-200 focus:outline-none active:translate-y-0 active:scale-95"
            >
              Try again
            </Button>

            <Button
              onClick={() => router.push(CONTACT_LINK)}
              className="cursor-pointer rounded-2xl border-2 border-slate-100 bg-white px-8 py-3 font-semibold text-slate-600 transition-all duration-300 ease-out hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:ring-4 focus:ring-slate-100 focus:outline-none active:scale-95"
            >
              Contact with us
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
