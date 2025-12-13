import { Header } from "@/app/(private)/_shared/components/header";
import { getUser } from "@/app/(private)/_shared/lib/getUser";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}
