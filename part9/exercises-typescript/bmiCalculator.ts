export const calculateBmi = (height: number, weight: number): object => {
  const bmi: number = Number((weight / (height / 100) ** 2).toFixed(1));
  const objResponse: object = {
    height: `${height}cm`,
    weight: `${weight}kg`
  };

  switch (true) {
    case bmi < 18.5:
      return {
        ...objResponse,
        BMI: "Underweight"
      };
    case bmi >= 18.5 && bmi < 25.0:
      return {
        ...objResponse,
        BMI: "Normal (healthy weight)"
      };
    case bmi >= 25.0 && bmi < 30.0:
      return {
        ...objResponse,
        BMI: "Overweight"
      };
    case bmi >= 30.0:
      return {
        ...objResponse,
        BMI: "Obese"
      };
    default:
      return {
        ...objResponse,
        BMI: "Error"
      };
  }
};
