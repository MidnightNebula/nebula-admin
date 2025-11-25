'use client';

import { LoginForm } from '@/components/login-form';

import { auth } from './actions/auth';

export default function Login() {
  return (
    <div className="grid items-center min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={auth} />
          </div>
        </div>
      </div>
    </div>
  );
}
