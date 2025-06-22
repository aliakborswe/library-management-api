import { Router } from "express";
import { createBook } from "../controllers/bookController";

const router = Router()

router.post("/", createBook)


export default router;