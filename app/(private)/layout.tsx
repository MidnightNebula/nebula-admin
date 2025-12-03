import { Header } from '@/components/header';
import { getUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect('/login')
  return (
    <div>
      <Header user={user}/>
      {children}
    </div>
  );
}
