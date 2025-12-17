import { ErrorType } from '@/app/(features)/login/page';
import { signIn } from '@/app/_shared/lib/auth';

interface authArg {
  setError: (error: ErrorType) => void;
  setIsPending: (value: boolean) => void;
}

export async function discordAuth({ setError, setIsPending }: authArg) {
  try {
    setError(null);
    await signIn.social(
      { provider: 'discord', callbackURL: window.location.origin },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => setIsPending(false),
        onError: (error) => {
          console.log(error);
          setIsPending(false);
        },
      }
    );
  } catch (error) {
    setIsPending(false);
    setError('Fetch failed');
  }
}
