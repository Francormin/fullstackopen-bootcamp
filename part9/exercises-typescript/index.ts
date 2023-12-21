import express, { Application, Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app: Application = express();

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  } else {
    const result: object = calculateBmi(height, weight);
    res.json(result);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
