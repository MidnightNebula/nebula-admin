'use client';

import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/theme';

import { signOut, User } from '@/lib/authClient';

import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function Header({ user }: { user: User | null }) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <ThemeToggle />
      {user ? (
        <>
          <Button
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => redirect('/login'),
                  onError: () => console.log('Server is not active'),
                },
              })
            }
          >
            Sign Out
          </Button>
          <Avatar>
            <AvatarImage src={user.image || ''} />
          </Avatar>
        </>
      ) : (
        <>
          <Button onClick={() => redirect('/login')}>Sign in</Button>
        </>
      )}
    </div>
  );
}
