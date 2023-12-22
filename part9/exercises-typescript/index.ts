import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  } else {
    const result = calculateBmi(height, weight);
    res.json(result);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
