interface ExerciseCalculatorValues {
  days: number[];
  targetValue: number;
}

const parseArguments1 = (args: string[]): ExerciseCalculatorValues | Error => {
  if (args.length < 4) throw new Error("Not enough arguments.");

  const [_, __, targetValue, ...rest] = args;

  const daysArr: number[] = [];
  for (const day of rest) {
    if (isNaN(Number(targetValue)) && isNaN(Number(day))) {
      throw new Error("Provided values were not numbers!");
    } else {
      daysArr.push(Number(day));
    }
  }

  return {
    days: daysArr,
    targetValue: Number(targetValue)
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

function calculateExercises(days: number[], targetValue: number): void {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter(day => day > 0).length;
  const average: number = days.reduce((a, b) => a + b, 0) / days.length;
  const success: boolean = average >= targetValue;
  let rating: number = 0;
  let ratingDescription: string = "";

  if (success) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= targetValue / 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  console.log({
    periodLength,
    trainingDays,
    target: targetValue,
    average,
    success,
    rating,
    ratingDescription
  });
}

try {
  const result: ExerciseCalculatorValues | Error = parseArguments1(process.argv);

  if (result instanceof Error) throw result;

  const { days, targetValue } = result;

  calculateExercises(days, targetValue);
} catch (error: unknown) {
  let errorMessage: string = "Something bad happened.";

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
