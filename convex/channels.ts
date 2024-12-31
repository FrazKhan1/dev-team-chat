import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
    workSpaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Client is not authenticated!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workSpaceId", args.workSpaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member?.role != "admin") {
      throw new Error("Only admin can create channels!");
    }

    const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();

    const channelId = await ctx.db.insert("channels", {
      name: parsedName,
      workSpaceId: args.workSpaceId,
    });

    return channelId;
  },
});

export const get = query({
  args: {
    workSpaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return [];

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workSpaceId", args.workSpaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workSpaceId", args.workSpaceId)
      )
      .collect();

    return channels;
  },
});

export const getById = query({
  args: {
    id: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) return null;

    const channel = await ctx.db.get(args.id);

    if (!channel) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workSpaceId", channel?.workSpaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }

    return channel;
  },
});

export const update = mutation({
  args: {
    id: v.id("channels"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Client is not authenticated!");
    }

    const channel = await ctx.db.get(args.id);

    if (!channel) {
      throw new Error("Channel not found!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workSpaceId", channel?.workSpaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member?.role != "admin") {
      throw new Error("Only admin can update channels!");
    }

    await ctx.db.patch(args.id, {
      name: args.name,
    });

    return args.id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Client is not authenticated!");
    }

    const channel = await ctx.db.get(args.id);

    if (!channel) {
      throw new Error("Channel not found!");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workSpaceId", channel?.workSpaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member?.role != "admin") {
      throw new Error("Only admin can update channels!");
    }

    await ctx.db.delete(args.id);

    return args.id;
  },
});
