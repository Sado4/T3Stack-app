import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

// プロシージャ(エンドポイント)
export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllBlogs: publicProcedure.query(() => {
    return db.post.findMany();
  }),

  postBlog: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return db.post.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),

  // 詳細ページの取得
  getDetailBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return db.post.findUnique({
        where: { id: input.id },
      });
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    // const post = await ctx.db.post.findFirst({
    //   orderBy: { createdAt: "desc" },
    //   where: { createdBy: { id: ctx.session.user.id } },
    // });

    // return post ?? null;

    // FIXME: NextAuthを使わないため、一旦nullを返す
    return null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
