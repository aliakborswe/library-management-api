import express, { Application, Request, Response } from 'express';



const app: Application = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the library management system API');
});



export default app;