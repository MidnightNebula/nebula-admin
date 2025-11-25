import { headers } from 'next/headers';

export async function getUser() {
  try {
    const response = await fetch('http://localhost:4000/api/getUser', {
      credentials: 'include',
      headers: await headers(),
    });

    const { data } = await response.json();
    if (!data) return null;
    return data.user;
  } catch (err) {
    return null;
  }
}
