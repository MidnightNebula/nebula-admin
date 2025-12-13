"use client";

import { redirect } from "next/navigation";

import { signOut, User } from "@/lib/auth";
import { Theme } from "@/app/(public)/_shared/components/theme";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function Header({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      <Theme />
      {user ? (
        <>
          <Button
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => redirect("/login"),
                  onError: () => console.log("Server is not active"),
                },
              })
            }
          >
            Sign Out
          </Button>
          <Avatar>
            <AvatarImage src={user.image || ""} />
          </Avatar>
        </>
      ) : (
        <>
          <Button onClick={() => redirect("/login")}>Sign in</Button>
        </>
      )}
    </div>
  );
}
