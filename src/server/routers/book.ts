import { z } from "zod";
import { db } from "../db/db.js";
import { BookZData } from "../db/dbTypes.js";
import { publicProcedure, t } from "../trpc.js";

export const bookRouter = t.router({
    createBook: publicProcedure.input(BookZData).mutation( async (opts) => {
        const { input: bookData } = opts
        const book = await db.book.create(bookData)
        return book
    }),
    getBooks: publicProcedure.query(async () => {
        const books = await db.book.findMany()
        return books
    }),
    getBook: publicProcedure.input(z.string()).query( async (opts) => {
        const { input: bookId } = opts
        const book = await db.book.findById(bookId)
        return book
    } )
})