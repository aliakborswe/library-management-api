import { Request, Response } from "express"
import { Book } from "../models/BookModel"
import { bookSchema } from "../middleware/validation"

export const createBook = async (req: Request, res: Response)=> {
  try {
    const result = bookSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: result.error.flatten().fieldErrors,
      })
      return
    }

    const book = new Book(result.data)
    await book.save()

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    })
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "ISBN already exists",
        success: false,
        error: error,
      })
      return
    }

    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message || error,
    })
  }
}
