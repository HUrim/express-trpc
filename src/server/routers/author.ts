import { z } from "zod";
import { publicProcedure, t } from "../trpc.js";
import { AuthorZData, Book } from "../db/dbTypes.js";
import { db } from "../db/db.js";

export const authorRouter = t.router({
    createAuthor: publicProcedure.input(AuthorZData).mutation( async (opts) => {
        const { input: authorData } = opts
        const author = await db.author.create(authorData)
        return author
    }),
    getAuthors: publicProcedure.query(async () => {
        const authors = await db.author.findMany()
        return authors
    }),
    getUser: publicProcedure.input(z.string()).query( async (opts) => {
        const { input: authorId } = opts
        const author = await db.author.findById(authorId)
        return author
    } )
})