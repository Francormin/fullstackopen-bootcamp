/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const result = calculateBmi(height, weight);
    res.send(result);
  }
});

app.post("/exercises", (req: Request, res: Response): Response => {
  let { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  target = Number(target);
  daily_exercises = Array.isArray(daily_exercises) ? daily_exercises.map((element: any) => Number(element)) : [];

  if (isNaN(target) || daily_exercises.some((element: number) => isNaN(element))) {
    return res.status(400).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, target);
    return res.send(result);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
