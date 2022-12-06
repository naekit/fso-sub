interface ResultObject {
    periodLength: Number;
    trainingDays: Number;
    success: Boolean;
    rating: Number;
    ratingDescription: String;
    target: Number;
    average: Number;
}

interface ParamsForCalculator {
    numArray: Array<number>;
    target: number;
}

const parseArguments = (args: Array<string>): ParamsForCalculator => {
    if(args.length < 4) throw new Error(`Not enough arguments`);
    let exerciseHourDays = []
    let targetNum =  0
    if(!isNaN(+args[2])){
        targetNum = +args[2]
    } else {
        throw new Error(`Target is not a number, please provide a number target`)
    }
    for(let i = 3; i < args.length; i++){
        if(!isNaN(+args[i])){
            exerciseHourDays.push(+args[i])
        } else {
            throw new Error(`Day number ${i - 2} is not a number, please provide hour in number form`)
        }
    }
    return {
        numArray: exerciseHourDays,
        target: targetNum
    }
}

const calculateExercises = (days: Array<number>, target: number): ResultObject => {
    const averageTime = days.reduce((a,c) => a + c, 0) / days.length
    const rating = averageTime < target ? 1
        : averageTime === target ? 2
        : 3
    return {
        periodLength: days.length,
        trainingDays: days.filter(x => x !== 0).length,
        success: averageTime >= target,
        rating: rating,
        ratingDescription: rating === 1 ? 'bad, do better': rating === 2 ? 'good job': 'congrats! killed it.',
        target,
        average: averageTime
    }
}

try {
    const { numArray, target } = parseArguments(process.argv);
    console.log(calculateExercises(numArray, target))
} catch (error: unknown) {
    let errorMessage = `Something bad happened`
    if(error instanceof Error) {
        errorMessage += ` Error: ${error.message}`
    }
    console.log(errorMessage)
}