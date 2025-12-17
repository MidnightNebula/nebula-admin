'use client';

import { useRouter } from 'next/navigation';

import { signOut, User } from '@/app/_shared/lib/auth';
import { Button } from '@/app/_shared/shadcn/components/button';
import { Avatar, AvatarImage } from '@/app/_shared/shadcn/components/avatar';
import { Theme } from '@/app/_shared/components/theme';

export function Header({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Theme />
      {user ? (
        <>
          <Button
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => router.push('/login'),
                  onError: () => console.log('Server is not active'),
                },
              })
            }
          >
            Sign Out
          </Button>
          <Avatar>
            <AvatarImage
              src={user.image || `https://cdn.discordapp.com/embed/avatars/${(Number(user.id) >> 22) % 6}.png`}
            />
          </Avatar>
        </>
      ) : (
        <>
          <Button onClick={() => router.push('/login')}>Sign in</Button>
        </>
      )}
    </div>
  );
}
