"use client";

import { Header } from "@/app/(public)/_shared/components/header";
import { Error } from "@/app/(public)/_shared/components/error";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  if (isPending) return <Spinner className="absolute top-2/4 left-2/4" />;
  if (error) return <Error error={error.message ?? "Unknown error"} />;
  if (!session) {
    router.push("/login");
    return;
  }

  return (
    <>
      <Header user={session.user} />
    </>
  );
}
