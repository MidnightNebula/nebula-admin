'use client';

import { useSession } from '@/app/_shared/lib/auth';
import { useRouter } from 'next/navigation';

import { Header } from '@/app/_shared/components/header';
import { LoadingSpinner } from '@/app/_shared/components/LoadingSpinner';

export default function Home() {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  if (isPending) return <LoadingSpinner />;
  if (error) throw new Error(error.message);
  if (!session) {
    router.replace('/login');
    return;
  }

  return (
    <>
      <Header user={session.user} />
    </>
  );
}
