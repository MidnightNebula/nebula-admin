'use client';

import { DiscordIcon } from '@/(public)/login/_shared/components/DiscordIcon';
import { signIn } from '@/_shared/lib/auth';
import { Alert, AlertTitle } from '@/_shared/shadcn/components/alert';
import { Button } from '@/_shared/shadcn/components/button';
import { Field, FieldGroup } from '@/_shared/shadcn/components/field';
import { cn } from '@/_shared/shadcn/lib/utils';
import { APIError } from 'better-auth';
import { useState } from 'react';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setIsError] = useState<string | null>(null);

  async function onSubmit(e: any) {
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
          onError: (error) => {
            setIsError(error.error.message);
            setIsPending(false);
          },
        }
      );
    } catch (error) {
      setIsPending(false);
      setIsError(String(new APIError().status));
    }
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={onSubmit}>
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
            <DiscordIcon />
            Login with Discord
          </Button>
          {error && (
            <Alert className="border-none bg-transparent p-2" variant="destructive">
              <AlertTitle className="bg-transparent text-center">{error}</AlertTitle>
            </Alert>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
}
