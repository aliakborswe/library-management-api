import type { Request, Response, NextFunction } from "express"

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {

  if (error.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    })
    return
  }

  if (error.name === "CastError") {
    res.status(400).json({
      message: "Invalid ID format",
      success: false,
      error: error,
    })
    return
  }

  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: process.env.NODE_ENV === "development" ? error : "Something went wrong",
  })
}
