import { Author, AuthorData, Book, BookData, Character, CharacterData } from "./dbTypes.js";

const authors: Author[] = []
const books: Book[] = []
const characters: Character[] = []
export const db = {
    author: {
        findMany: async () => authors,
        findById: async (id: string) => authors.find((author) => author.id === id),
        create: async (data: AuthorData) => {
            const author = {
                id: String(authors.length + 1),
                ...data
            }
            authors.push(author)
            return author
        }
    },
    book: {
        findMany: async () => books,
        findById: async (id: string) => books.find((book) => book.id === id),
        create: async (data: BookData) => {
            const book = {
                id: String(books.length + 1),
                ...data
            }
            books.push(book)
            return book
        }
    },
    character: {
        findMany: async () => characters,
        findById: async (id: string) => characters.find((character) => character.id === id),
        create: async (data: CharacterData) => {
            const character = {
                id: String(characters.length + 1),
                ...data
            }
            characters.push(character)
            return character
        }
    }
}