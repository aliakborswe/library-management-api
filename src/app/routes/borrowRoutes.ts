import { Router } from "express";
import { borrowBook } from "../controllers/borrowController";

const router = Router();

router.post("/", borrowBook)

export default router;
