import { signIn } from "@/lib/authClient";

export async function auth(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  await signIn.social(
    {
      provider: "discord",
      callbackURL: window.location.origin,
    },
    {
      onError: (error) => {
        throw new Error(error.error.statusText);
      },
    }
  );
}
