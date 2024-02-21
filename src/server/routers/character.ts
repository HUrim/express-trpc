import { z } from "zod";
import { db } from "../db/db.js";
import { CharacterZData } from "../db/dbTypes.js";
import { publicProcedure, t } from "../trpc.js";

export const characterRouter = t.router({
    createCharacter: publicProcedure.input(CharacterZData).mutation( async (opts) => {
        const { input: characterData } = opts
        const character = await db.character.create(characterData)
        return character
    }),
    getCharacters: publicProcedure.query(async () => {
        const characters = await db.character.findMany()
        return characters
    }),
    getCharacter: publicProcedure.input(z.string()).query(async (opts) => {
        const { input: characterId } = opts
        const character = await db.character.findById(characterId)
        return character
    })
})