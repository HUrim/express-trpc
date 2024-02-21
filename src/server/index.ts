// import t from './trpc.js'
import { createContext, publicProcedure, router, t} from "./trpc.js";
// import { createHTTPServer } from '@trpc/server/adapters/standalone';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express'
import { appRouter } from './routers/_app.js';
// import { trpcExpress } from './trpc.js'

// export const appRouter = t.router({
//     greeting: publicProcedure.query(() => "Hello tRPC"),
//     hello: baseProcedure.input(z.object({name: z.string()})).query((opts) => {
//         const input = opts.input
//         return {
//             greeting: `Hello ${input.name} from ${input.townName}`
//         }
//     }),
//     outputHello: publicProcedure.input((value): string => {
//             if (typeof value === 'string') {
//                 return value
//             }
//             throw new Error('Input is not a string')
//         }).output((value): string => {
//             if (typeof value === 'string') {
//                 return value
//             }
//             throw new Error('Output is not a string')
//         }).query((opts) => {
//             const { input } = opts
//             return `hello ${input}`
//     }),
//     goodbye: authorizedProcedure.mutation(async (opts) => {
//         await opts.ctx.signGuestBook()
//         return {
//             message: "Goodbye!"
//         }
//     }),
//     userList: publicProcedure.query(async () => {
//         const users = await db.user.findMany();
//         return users
//     }),
//     userById: publicProcedure.input(z.string()).query(async ( { input } ) => {
//         const user = await db.user.findById(input)
//         return user
//     }),
//     userCreate: publicProcedure.input(z.object( { name: z.string(), townName: z.string() } )).mutation(async ( {input} ) => {
//         const user = await db.user.create(input)
//         return user
//     })
// })


// export type AppRouter = typeof appRouter




// const createContext = ({
//     req, 
//     res,
// }: trpcExpress.CreateExpressContextOptions) => ({})
// type Context = Awaited<ReturnType<typeof createContext>>

// export const t = initTRPC.context<Context>().create()
// export const appRouter = t.router({
//     userList: t.procedure.query(async () => {
//         const users = await db.user.findMany()
//         return users
//     }),
//     getUser: t.procedure.input(z.string()).query((opts) => {
//         const { input: userId } = opts
//         return { userId, name: 'Bilbo' }
//     }),
//     createUser: t.procedure.input(z.object({ name: z.string().min(5), townName: z.string() })).mutation( async (opts) => {
//         console.log(opts)
//         const { input: userData } = opts
//         return await db.user.create({...userData})
//     } )
// })

// export type AppRouter = typeof appRouter

const app = express()

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}))

// app.listen(4000)

// const server = createHTTPServer({
//     router: appRouter,
//     // createContext: function (opts: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse<IncomingMessage>>): MaybePromise<{ signGuestBook: () => Promise<void>; }> {
//     //     throw new Error("Function not implemented.");
//     // }
// })
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`)
})