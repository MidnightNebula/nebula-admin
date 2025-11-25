'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { DEFAULT_THEME } from '@/app/shared/constants';
import { ThemeContext, type ThemeContextProps } from '@/app/shared/providers/theme-provider';

import { signOut, User, useSession } from '@/lib/authClient';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function Header({ user }: { user: User | null }) {
  const { theme, handleChangeTheme } = useContext<ThemeContextProps>(ThemeContext);

  const newTheme = theme === 'light' ? 'dark' : DEFAULT_THEME;

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Button
        onClick={() => {
          handleChangeTheme(newTheme);
        }}
      >
        Change theme
      </Button>
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
