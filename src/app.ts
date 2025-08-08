import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./app/routes/bookRoutes";
import borrowRoutes from "./app/routes/borrowRoutes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// Routes
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the library management system");
});

export default app;
