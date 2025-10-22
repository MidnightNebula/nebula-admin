const FETCH_URL = 'https://jsonplaceholder.typicode.com';

export type Users = {
  id: number,
  username: string,
  email: string,
}

export const getUsers = ({signal}: {signal: AbortSignal}) => {
  return fetch(`${FETCH_URL}/users`, {signal}).then(res => res.json() as Promise<Users[]>);
}
