interface BmiCalculatorValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiCalculatorValues | Error => {
  if (args.length < 4) throw new Error("Not enough arguments.");
  if (args.length > 4) throw new Error("Too many arguments.");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number, partialMessage: string): void => {
  const bmi: number = Number((weight / (height / 100) ** 2).toFixed(1));

  switch (true) {
    case bmi < 18.5:
      console.log(`${partialMessage} Underweight`);
      return;
    case bmi >= 18.5 && bmi < 25.0:
      console.log(`${partialMessage} Normal (healthy weight)`);
      return;
    case bmi >= 25.0 && bmi < 30.0:
      console.log(`${partialMessage} Overweight`);
      return;
    case bmi >= 30.0:
      console.log(`${partialMessage} Obese`);
      return;
    default:
      console.log(`${partialMessage} Error`);
      return;
  }
};

try {
  const result = parseArguments(process.argv);

  if (result instanceof Error) throw result;

  const { height, weight } = result;
  calculateBmi(
    height,
    weight,
    `
      Height: ${height}cm
      Weight: ${weight}kg
      BMI result:`
  );
} catch (error: unknown) {
  let errorMessage: string = "Something bad happened.";

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
