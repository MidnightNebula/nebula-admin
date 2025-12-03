"use client"

import { Header } from '@/components/header';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from '@/lib/authClient';
import { Error } from "@/components/error"
import { redirect } from 'next/navigation';

export default function Home() {

  const {data: session, isPending, error} = useSession();

  if (isPending) {
    return <Spinner className='absolute top-2/4 left-2/4'/>
  } else if (!session){

    redirect('/login')
  }

  if (error) <Error error={error?.message}/>
  console.timeEnd()
  return <><Header user={session.user}/></>;
}
