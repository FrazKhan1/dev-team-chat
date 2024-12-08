import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    const workSpaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode: "1234",
    });

    return workSpaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const workspaces = await ctx.db.query("workspaces").collect();
    return workspaces;
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Client is not authenticated!");
    }
    const workspace = await ctx.db.get(args.id);
    if (!workspace) {
      throw new Error("Workspace not found!");
    }

    return workspace;
  },
});
