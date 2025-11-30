'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { signIn } from '@/lib/authClient';
import { cn } from '@/lib/utils';

import { Alert, AlertTitle } from './ui/alert';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setIsError] = useState<string | null>(null);

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={async e => {
        e.preventDefault();
        setIsError(null);
        try {
          await signIn.social(
            {
              provider: 'discord',
              callbackURL: window.location.origin,
            },
            {
              onRequest: () => setIsPending(true),
              onSuccess: () => setIsPending(false),
              onError: error => {
                setIsError(error.error.message);
                setIsPending(false);
              },
            },
          );
        } catch (error) {
          setIsPending(false);
          setIsError('Fetching is error');
        }
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account with Discord</h1>
        </div>
        <Field>
          <Button
            name="action"
            value="discord"
            className="cursor-pointer"
            variant="outline"
            type="submit"
            disabled={isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.211.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.486 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.078-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.319 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105c-.652-.247-1.27-.547-1.857-.892a.077.077 0 0 1-.008-.126c.125-.094.25-.19.37-.29a.074.074 0 0 1 .077-.01c3.893 1.782 8.104 1.782 11.948 0a.075.075 0 0 1 .078.009c.12.1.245.197.371.291a.077.077 0 0 1-.006.126 12.298 12.298 0 0 1-1.858.891.076.076 0 0 0-.04.106c.36.698.773 1.364 1.225 1.993a.077.077 0 0 0 .084.028 19.88 19.88 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.549-13.662a.061.061 0 0 0-.031-.028Zm-12.2 11.056c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.334-.955 2.419-2.157 2.419Zm7.767 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419Z" />
            </svg>
            Login with Discord
          </Button>
          {error && (
            <Alert className="border-none p-2" variant="destructive">
              <AlertTitle className="text-center">{error}</AlertTitle>
            </Alert>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
}
