import { headers } from "next/headers";
import { APIError } from "better-auth";
import { getSession } from "@/lib/auth";

export async function getUser() {
  try {
    const { data: session } = await getSession({
      fetchOptions: {
        credentials: "include",
        headers: await headers(),
      },
    });
    console.log("getUser response:", session);
    if (!session) return null;

    return session.user;
  } catch (err) {
    console.log("getUser error:", err);
    throw new APIError("UNAUTHORIZED", { message: "User is not found" });
  }
}
