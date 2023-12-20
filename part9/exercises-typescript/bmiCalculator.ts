const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight / (height / 100) ** 2).toFixed(1));

  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi < 25.0:
      return "Normal (healthy weight)";
    case bmi >= 25.0 && bmi < 30.0:
      return "Overweight";
    case bmi >= 30.0:
      return "Obese";
    default:
      return "";
  }
};

console.log(calculateBmi(180, 74));
