"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Image from "next/image";
import { signOut, User } from "@/lib/authClient";

export function Header({ user }: { user: User }) {
  if (!user) return null;

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Button className="w-12 h-12 cursor-pointer" onClick={() => signOut()}>
        <Image
          className="font-bold"
          src="/sign-out.svg"
          alt="sign-out button"
          width={60}
          height={60}
        />
      </Button>
      <Avatar>
        <AvatarImage src={user.image ? user.image : ""} />
        <AvatarFallback>signout</AvatarFallback>
      </Avatar>
    </div>
  );
}
