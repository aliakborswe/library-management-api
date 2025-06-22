import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/bookController";

const router = Router()

router.post("/", createBook)
router.get("/", getAllBooks)

export default router;