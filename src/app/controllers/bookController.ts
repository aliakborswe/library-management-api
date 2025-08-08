import { Request, Response } from "express"
import { Book } from "../models/BookModel"
import { bookSchema, partialBookSchema } from "../middleware/validation"

export const createBook = async (req: Request, res: Response): Promise<void> => {
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


export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const { filter, sort = "asc", sortBy = "createdAt", limit = "10", skip } = req.query
  
      const query: any = {}
  
      // Apply genre filter
      if (filter) {
        query.genre = filter
      }
  
      // Build sort object
      const sortOrder = sort === "desc" ? -1 : 1
      const sortObj: any = {}
      sortObj[sortBy as string] = sortOrder
  
      const books = await Book.find(query)
        .sort(sortObj)
        .skip(skip ? parseInt(skip as string) : 0)
        .limit(Number.parseInt(limit as string));
  
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      })
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve books",
        success: false,
        error: error,
      })
    }
  }


  export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookId } = req.params
      const book = await Book.findById(bookId)
  
      if (!book) {
        res.status(404).json({
          message: "Book not found",
          success: false,
          error: "Book with the specified ID does not exist",
        })
        return
      }
  
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      })
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve book",
        success: false,
        error: error,
      })
    }
  }


export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const result = partialBookSchema.safeParse(req.body)
  
    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: result.error.flatten().fieldErrors,
      })
      return
    }
  
    try {
      const { bookId } = req.params
      const book = await Book.findById(bookId)
  
      if (!book) {
        res.status(404).json({
          message: "Book not found",
          success: false,
          error: "Book with the specified ID does not exist",
        })
        return
      }
      // Update the book with the new data
      Object.assign(book, result.data)
      await book.save()
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      })
    } catch (error: any) {
      res.status(400).json({
        message: "Failed to update book",
        success: false,
        error: error.message || error,
      })
    }
  }


  export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookId } = req.params
      const book = await Book.findByIdAndDelete(bookId)
  
      if (!book) {
        res.status(404).json({
          message: "Book not found",
          success: false,
          error: "Book with the specified ID does not exist",
        })
        return
      }
  
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      })
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete book",
        success: false,
        error: error,
      })
    }
  }