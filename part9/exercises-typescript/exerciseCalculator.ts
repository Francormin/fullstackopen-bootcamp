interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

function calculateExercises(days: number[], targetValue: number): Result {
  const periodLength = days.length;
  const trainingDays = days.filter(day => day > 0).length;
  const average = days.reduce((a, b) => a + b, 0) / days.length;
  const success = average >= targetValue;
  let rating = 0;
  let ratingDescription = "";

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

  return {
    periodLength,
    trainingDays,
    target: targetValue,
    average,
    success,
    rating,
    ratingDescription
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
