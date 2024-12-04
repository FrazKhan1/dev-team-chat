import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    // Get the authenticated user's ID
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    // Query the database for the user document
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), userId))
      .first();

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  },
});
