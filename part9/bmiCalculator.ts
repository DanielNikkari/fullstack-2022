interface bmiData {
  height: number;
  weight: number;
}

const parseArgumentsBMI = (args: string[]): bmiData => {
  console.log(args.length)
  if (args.length < 4) throw new Error("Too few arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('All of the data must be in numbers!')
  }

}

const calculateBmi = (height: number, weight: number) : string => {
  const bmi: number = weight / (height / 100)**2
  console.log(bmi)
  if (bmi < 18.5) {
    return 'Under weight'
  } else if (bmi > 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)'
  } else if (bmi > 25 && bmi < 29.9) {
    return 'Overweight'
  } else if (bmi > 30 && bmi < 34.9) {
    return 'Obesity (Class I)'
  } else if (bmi > 35 && bmi < 39.9) {
    return 'Obesity (Class II)'
  } else if (bmi > 40) {
    return 'Extreme obesity'
  }
}

const {height, weight} = parseArgumentsBMI(process.argv)
console.log(calculateBmi(height, weight))