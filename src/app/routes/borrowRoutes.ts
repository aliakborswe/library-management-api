import { Router } from "express";
import { borrowBook, getBorrowedBooksSummary } from "../controllers/borrowController";

const router = Router();

router.get("/", getBorrowedBooksSummary)
router.post("/:bookId", borrowBook);

export default router;
