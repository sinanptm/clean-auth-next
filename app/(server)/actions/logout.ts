"use server";

import { cookies } from "next/headers";
import { tryCatch } from "@/lib/utils";

/**
 * Server action to handle user logout.
 * Deletes the authentication cookies.
 */
const logoutAction = async () => {
  return await tryCatch(async () => {
    const cookieStore = await cookies();

    cookieStore.delete("auth-token");

    cookieStore.delete("user-info");

    return;
  });
};

export default logoutAction;
