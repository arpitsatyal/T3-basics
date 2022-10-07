import * as trpc from "@trpc/server";

import {
  createPostSchema,
  getSinglePostSchema,
} from "./../../schema/post.schema";
import { createRouter } from "./createRouter";

export const postRouter = createRouter()
  .mutation("create", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "cannot create a post while logged out!",
        });
      }
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
      return post;
    },
  })
  .query("posts", {
    resolve({ ctx }) {
      return ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  })
  .mutation("delete-post", {
    input: getSinglePostSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.post.delete({
        where: {
          id: input.postId,
        },
      });
    },
  });
