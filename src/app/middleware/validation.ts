import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  author: z.string().trim().min(1, { message: "Author is required" }),
  genre: z.enum([ "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY" ], {
    errorMap: () => ({ message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY" })
  }),
  isbn: z.string().trim().min(1, { message: "ISBN is required" }),
  copies: z.number().int().nonnegative({ message: "Copies must be a non-negative integer" }),
  description: z.string().trim().optional(),
})

// For PATCH/PUT operations (optional fields)
export const partialBookSchema = bookSchema.partial()