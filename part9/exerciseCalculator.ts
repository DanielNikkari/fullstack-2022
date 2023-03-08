
interface WorkoutData {
  target: number;
  exerciseTimes: number[];
}

const parseArguments = (args: string[]): WorkoutData => {
  if (args.length < 4) throw new Error("Too few arguments")

  let noStrings: boolean = true
  for (let i: number = 2; i < args.length; i++ ) {
    if (isNaN(Number(args[i]))) {
      noStrings = false
      throw new Error('Provided values were not numbers!');
    }
  }

  if (noStrings) {
    exerciseTimes = []
    for (let i: number = 3; i < args.length; i++) {
      exerciseTimes.push(Number(args[i]))
    }
    return {
      target: Number(args[2]),
      exerciseTimes
    }
  }
}


const calculateExercises = (exerciseTimes: number[], goal: number): object => {
  const avrgExercise: number = (exerciseTimes.reduce((partialSum, time) => partialSum + time, 0)) / exerciseTimes.length
  const trainingDays: number = exerciseTimes.reduce((training, time) => {if (time > 0) {return (training + 1)} else {return training}}, 0)
  const success: boolean = avrgExercise > goal ? true : false
  const rating: number = (avrgExercise / goal) >= 1 ? 3 : (avrgExercise / goal) >= 0.5 ? 2 : 1
  const ratingDescription : string = rating === 3 ? 'You have reached your goals, good job! (you achieved at least 100% of your goal)' : rating === 2 ? 'Almost there but not quite (you achieved at least 50% of your goal)' : 'Get off your ass Steve (you achieved less than 50% of your goal)'

  return {
    periodLength: exerciseTimes.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goal,
    average: avrgExercise    
  }
}

let {target, exerciseTimes} = parseArguments(process.argv)
console.log(calculateExercises(exerciseTimes, target))