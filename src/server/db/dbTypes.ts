import z, { ZodType, number, string } from "zod"
// enum CharacterType {
//     HUMAN,
//     ELF,
//     DWARF,
//     HOBBIT,
//     DRAGON,
//     BALROG,
//     WIZARD
// }

type Author = {
    id: string
    name: string
    townName: string
    books: Book[]
}

type Book = {
    id: string
    title: string
    ticket: string
    authorId: string
    characters: Character[]
}

type Character = {
    id: string
    name: string
    age: number
    specie: string
    bookId: string
}

type AuthorData = {
    name: string
    townName: string
    books: Book[]
}

type BookData = {
    title: string
    ticket: string
    authorId: string
    characters: Character[]
}

type CharacterData = {
    name: string
    age: number
    specie: string
    bookId: string
}

const CharacterZData: ZodType<CharacterData> = z.object({
    name: z.string(),
    age: z.number(),
    specie: z.string(),
    bookId: z.string()
})



const BookZData: ZodType<BookData> = z.object({
    title: z.string(),
    ticket: z.string(),
    authorId: z.string(),
    characters: z.array(CharacterZData)
})

// type BookSchema = z.infer<typeof BookZData>

const AuthorZData: ZodType<AuthorData> = z.object({
    name: z.string(),
    townName: z.string(),
    books: z.array(BookZData)
})

export { Author, Book, Character, AuthorData, BookData, CharacterData,
            AuthorZData, BookZData, CharacterZData }
