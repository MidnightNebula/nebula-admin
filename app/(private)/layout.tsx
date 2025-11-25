import { Error } from '@/components/error';
import { Header } from '@/components/header';
import { getUser } from '@/lib/getUser';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user)
    return <Error error={'Session not found or user is undefined. Please, try login again'} />;

  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}
