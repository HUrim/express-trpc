import { mergeRouters, router } from "../trpc.js";
import { authorRouter } from "./author.js";
import { bookRouter } from "./book.js";
import { characterRouter } from "./character.js";

// const appRouter = router({
//     user: userRouter,
//     post: postRouter
// })

export const appRouter = mergeRouters(authorRouter, bookRouter, characterRouter)

export type AppRouter = typeof appRouter