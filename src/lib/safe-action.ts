import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next, ...props }) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { user } });
});

export const adminActionClient = actionClient.use(
  async ({ next, ...props }) => {
    const user = await getCurrentUser();

    if (user?.role !== "ADMINISTRATOR") {
      throw new Error("User is not an admin!");
    }

    return next({ ctx: { user } });
  },
);
