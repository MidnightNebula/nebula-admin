'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Error({ error }: { error: string }) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Fetching is error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );
}
