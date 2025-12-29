import { User, authClient, getSession } from '@/_shared/lib/auth';
import { cookies, headers } from 'next/headers';

const SESSION_TOKEN_NAME = 'better-auth.session_token' as const;

const ERRORS = {
  ...authClient.$ERROR_CODES,
  NETWORK_NOT_FOUND: 'Network is not found',
};

type ReturnDataSession = {
  user: User | null;
  error: { code?: string | undefined; message?: string | undefined; status: number; statusText: string } | null;
  isAuthorized: boolean;
};

export async function getUser(): Promise<ReturnDataSession> {
  const { headers, isAuthorized } = await getAuthContext();

  try {
    const { data: session, error } = await getSession({
      fetchOptions: {
        credentials: 'include',
        headers,
      },
    });

    if (!session) {
      return {
        user: null,
        error,
        isAuthorized: false,
      };
    }

    const user = session.user;

    if (error) {
      return {
        user,
        error,
        isAuthorized,
      };
    }

    return { user, error, isAuthorized };
  } catch (err) {
    return { user: null, error: getError(500, 'NETWORK_NOT_FOUND'), isAuthorized };
  }
}

const getError = (status: number, statusCode: keyof typeof ERRORS) => {
  return {
    status,
    statusText: statusCode,
    message: ERRORS[statusCode],
  };
};

async function getAuthContext() {
  const cookieStore = await cookies();

  return {
    isAuthorized: cookieStore.has(SESSION_TOKEN_NAME),
    headers: await headers(),
  };
}
