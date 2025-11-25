"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Image from "next/image";
import { signOut, useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";
import { useChangeTheme } from "@/lib/useChangeTheme";
import { DEFAULT_THEME } from "@/app/shared/constants";

export function Header() {
  const { data: session } = useSession();
  const { theme, changeTheme } = useChangeTheme();

  const newTheme = theme === DEFAULT_THEME ? "dark" : DEFAULT_THEME;

  return (
    <div className="flex items-center justify-end gap-0.5">
      {session?.user ? (
        <>
          <Button
            onClick={() => {
              changeTheme(newTheme);
            }}
          >
            Change theme
          </Button>
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
            <Image
              className="font-bold"
              src="/sign-out.svg"
              alt="sign-out button"
              width={60}
              height={60}
            />
          </Button>
          <Avatar>
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>signout</AvatarFallback>
          </Avatar>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              changeTheme(newTheme);
            }}
          >
            Change theme
          </Button>
          <Button onClick={() => redirect("/login")}>Sign in</Button>
        </>
      )}
    </div>
  );
}
