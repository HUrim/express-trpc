import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

import { z } from "zod";

// const t = initTRPC.create();
// export const t = initTRPC.context<{ signGuestBook: () => Promise<void>}>().create();
const createContext = ({
    req, 
    res,
}: trpcExpress.CreateExpressContextOptions) => ({})
type Context = Awaited<ReturnType<typeof createContext>>
const t = initTRPC.context<Context>().create()
// const createContext = async ( opts: CreateNextContextOptions ) => {
//     const { req } = opts
//     const session = await 
// }

const router = t.router
const publicProcedure = t.procedure
const mergeRouters = t.mergeRouters
// export const baseProcedure = t.procedure.input(z.object({townName: z.string()})).use((opts) => {
//     const { input } = opts
//     const { townName } = input
//     console.log(`Handling request with the user from: ${townName}`)
//     return
// })
const authorizedProcedure = publicProcedure.input(z.object({ townName: z.string() })).use((options) => {
    if (!new Set(["Malisheva", "Prishtina"]).has(options.input.townName)) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "We don't like people outside of Malisheva, we respect them but we don't like them. Hahahah just kidding"
        })
    }
    return options.next();
})

export { t, trpcExpress, createContext, router, publicProcedure, mergeRouters, authorizedProcedure }