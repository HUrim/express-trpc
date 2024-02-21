import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/routers/_app.js";

const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc'
        }),
    ]
})

const authors = await trpc.getAuthors.query()
console.log('authors: ', authors);
const books = await trpc.getBooks.query()
console.log('books: ', books)
const characters = await trpc.getCharacters.query()
console.log('characters: ', characters)
const character = await trpc.createCharacter.mutate( {name: "Gollum", age: 580, specie: "hobbit", bookId: '1'})
const book = await trpc.createBook.mutate({title: "The lotr the followship of the ring", ticket: "110", authorId: "1", characters: [character]})
const author = await trpc.createAuthor.mutate({ name: `Author ${ 1}`, townName: `Malisheva`, books: [book]  })
console.log(`Created author ${  1 }:`, author)
console.log("This is the last user: ", await trpc.getUser.query(authors.length?.toString()))