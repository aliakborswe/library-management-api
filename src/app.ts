import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from './app/routes/bookRoutes';

const app: Application = express();
app.use(cors())
app.use(express.json());


// Routes
app.use("/api/books", bookRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the library management system API');
});



export default app;