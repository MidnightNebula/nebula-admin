import { type Errors, getSession, type User } from '@/_shared/lib/auth';
import { cookies, headers } from 'next/headers';

type ErrorKey = keyof Errors;
type ErrorMessage = Errors[ErrorKey];

type UserFetchDataType =
  | { user: User; error: null; isAuthorized: boolean }
  | {
      user: null;
      error: {
        statusText: ErrorKey | string;
        message: ErrorMessage | string;
      };
      isAuthorized: boolean | null | undefined;
    };

export type ReturnUserDataType = Promise<UserFetchDataType>;

export async function getUser(): ReturnUserDataType {
  const cookieStore = await cookies();
  const isAuthorized = cookieStore.has('better-auth.session_token');

  try {
    const { data: session, error } = await getSession({
      fetchOptions: {
        credentials: 'include',
        headers: await headers(),
      },
    });

    if (error) {
      return { user: null, error: { statusText: error.statusText, message: error.message as string }, isAuthorized };
    }

    if (!session) {
      return {
        user: null,
        error: {
          statusText: 'SESSION_EXPIRED',
          message: 'Session expired. Re-authenticate to perform this action.',
        },
        isAuthorized,
      };
    }

    return { user: session.user, error: null, isAuthorized };
  } catch (err) {
    return { user: null, error: { statusText: 'PROVIDER_NOT_FOUND', message: 'Provider not found' }, isAuthorized };
  }
}
