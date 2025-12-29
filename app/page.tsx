import { ErrorTooltip } from '@/_shared/components/ErrorTooltip';
import { Header } from '@/_shared/components/Header';
import { getUser } from '@/_shared/lib/getUser';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user, error, isAuthorized } = await getUser();
  console.log('user 2:', user);

  if (!user && !isAuthorized) redirect('/login');

  return (
    <>
      <Header user={user} />
      {error?.status === 500 && isAuthorized ? <ErrorTooltip /> : <div>Hello</div>}
    </>
  );
}
