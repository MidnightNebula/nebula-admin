'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ThemeContext, ThemeType, type ThemeContextProps } from '@/app/shared/providers/theme-provider';

import { signOut, User } from '@/lib/authClient';

import { Avatar,  AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function Header({ user }: { user: User | null }) {
  const { theme, handleChangeTheme } = useContext<ThemeContextProps>(ThemeContext);

  const newTheme = theme === ThemeType.light ? ThemeType.dark : ThemeType.light;

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
