import express, { Express, Request, Response } from "express";
import { games } from "./db/schema";
import cors from "cors";
import { db } from "./db";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(cors());
app.options("*", cors());

const port = process.env.PORT || 3001;

app.get("/", async (req: Request, res: Response) => {
  res.json("Hello");
});

app.post("/game", async (req: Request, res: Response) => {
  const { emptyHole, win } = req.body;
  console.log(emptyHole, win);
  await db.insert(games).values({ emptyHole, win });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
