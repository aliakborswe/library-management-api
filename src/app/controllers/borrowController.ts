import { Borrow } from "../models/BorrowModel";
import { Book } from "../models/BookModel";
import { Request, Response } from "express";
import { borrowSchema } from "../middleware/validation";

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
    // Validate input with zod schema
    const validation = borrowSchema.safeParse(req.body)
    if (!validation.success) {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: validation.error.flatten().fieldErrors,
      })
      return
    }
  
    const { book: bookId, quantity, dueDate } = validation.data
  
    
    try {

      const book = await Book.findById(bookId)
      if (!book) {
        res.status(404).json({
          message: "Book not found",
          success: false,
          error: "Book with the specified ID does not exist",
        })
        return
      }
  
      if (book.copies < quantity) {
        res.status(400).json({
          message: "Insufficient copies available",
          success: false,
          error: `Only ${book.copies} copies available, but ${quantity} requested`,
        })
        return
      }
      // update book availability
      book.copies -= quantity
      await book.updateAvailability()
  // create borrow record
      const borrowRecord = new Borrow({
        book: bookId,
        quantity,
        dueDate: new Date(dueDate),
      })
      await borrowRecord.save()
  
  
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      })
    } catch (error: any) {
      res.status(400).json({
        message: "Failed to borrow book",
        success: false,
        error: error.message || error,
      })
    }
  }



export const getBorrowedBooksSummary = async (req: Request, res: Response): Promise<void> => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        { $unwind: "$bookDetails" },
        {
          $project: {
            _id: 0,
            book: {
              title: "$bookDetails.title",
              isbn: "$bookDetails.isbn",
            },
            totalQuantity: 1,
          },
        },
        { $sort: { totalQuantity: -1 } },
      ])
  
      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      })
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to retrieve borrowed books summary",
        success: false,
        error: error.message || error,
      })
    }
  }