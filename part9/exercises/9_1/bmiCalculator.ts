interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArgs = (args: Array<string>): MultiplyValues => {
    if(args.length < 4) throw new Error(`Not enough arguments`);
    if(args.length > 4) throw new Error(`Too many arguments`);

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error (`Provided values were not numbers!`)
    }
}

export const calculateBmi = (mass: number, height: number): string => {
    const Bmi: number = mass / ((height/100) * (height/100))
    console.log(Bmi)
    switch(true) {
        case Bmi < 16:
            return 'Underweight (Severe thinness) : ${Bmi}' 
        case Bmi >= 16 && Bmi < 17:
            return 'Underweight (Moderate thinness) : ${Bmi}'
        case Bmi >= 17 && Bmi < 18.5:
            return `Underweight (Mild thinness) : ${Bmi}`
        case Bmi >= 18.5 && Bmi < 25:
            return `Normal range: ${Bmi}`
        case Bmi >= 25  && Bmi < 30:
            return `Overweight (Pre-obese) : ${Bmi}`
        case Bmi >= 30 && Bmi < 35:
            return `Obese (Class I) : ${Bmi}`
        case Bmi >= 35 && Bmi < 40:
            return `Obese (Class II) : ${Bmi}`
        case Bmi >= 40:
            return `Obese (Class III) : ${Bmi}`
        default:
            return `Invalid arguments or mixed up height and mass`
    }
}


try {
    const { value1, value2 } = parseArgs(process.argv);
    console.log(calculateBmi(value1, value2))
} catch(error: unknown) {
    let errorMessage = `Something bad happened`
    if(error instanceof Error) {
        errorMessage += ` Error: ${error.message}`
    }
    console.log(errorMessage)
}