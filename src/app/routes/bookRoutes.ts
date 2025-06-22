import { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBook } from "../controllers/bookController";

const router = Router()

router.get("/", getAllBooks)
router.get("/:bookId", getBookById)
router.post("/", createBook)
router.put("/:bookId", updateBook)

export default router;