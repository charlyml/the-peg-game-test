import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { games } from "./db/schema";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const app: Express = express();
const port = process.env.PORT || 3001;

app.post("/game", async (req: Request, res: Response) => {
  const { emptyHole, win } = req.body;
  await db.insert(games).values({ emptyHole, win });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
