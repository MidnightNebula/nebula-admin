'use client';

import { LoginForm } from '@/app/(features)/login/_shared/components/LoginForm';
import { discordAuth } from '@/app/(features)/login/_shared/lib/discordAuth';
import { LoadingSpinner } from '@/app/_shared/components/LoadingSpinner';
import { useState } from 'react';

export type ErrorType = string | null;

export default function Login() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  if (isPending) return <LoadingSpinner />;
  if (error) throw new Error(error);
  return (
    <div className="grid min-h-svh items-center">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={() => discordAuth({ setError, setIsPending })} />
          </div>
        </div>
      </div>
    </div>
  );
}
