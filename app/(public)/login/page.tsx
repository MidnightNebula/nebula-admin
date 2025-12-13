"use client";

import { LoginForm } from "@/app/(public)/login/_shared/components/LoginForm";

export default function Login() {
  return (
    <div className="grid items-center min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
