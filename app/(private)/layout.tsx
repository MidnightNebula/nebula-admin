import { ErrorTooltip } from '@/_shared/components/ErrorTooltip';
import { Header } from '@/_shared/components/Header';
import { getUser } from '@/_shared/lib/getUser';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user, error, isAuthorized } = await getUser();

  if (error?.statusText === 'SESSION_EXPIRED' || !isAuthorized) redirect('/login');

  return (
    <>
      <Header user={user} />
      {isAuthorized && error ? <ErrorTooltip /> : children}
    </>
  );
}
