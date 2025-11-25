import { getSession } from "./authClient";

export async function getUser() {
  const { data: user, error } = await getSession();

  if (error) {
    return error.message;
  }

  if (user) {
    return user;
  }
}
