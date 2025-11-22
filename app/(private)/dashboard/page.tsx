"use client";

import { Header } from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, isPending, error } = useSession();

  if (isPending)
    return (
      <Spinner className="absolute top-3/6 left-3/6 -translate-2/4 size-20" />
    );

  if (error) {
    console.log(error.statusText);
  }

  if (!session) redirect("/login");

  return (
    <>
      <Header user={session.user} />
      <div>Dashboard</div>
    </>
  );
}
