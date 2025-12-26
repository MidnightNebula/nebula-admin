'use client';

import { Theme } from '@/_shared/components/Theme';
import { signOut, User } from '@/_shared/lib/auth';
import { Avatar, AvatarImage } from '@/_shared/shadcn/components/avatar';
import { Button } from '@/_shared/shadcn/components/button';
import { useRouter } from 'next/navigation';

export function Header({ user }: { user: User | null }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Theme />
      {user && (
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
      )}
    </div>
  );
}
