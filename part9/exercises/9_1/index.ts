import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req,res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(weight, height);
    if(isNaN(height) || isNaN(weight)){
        res.json({
            error: 'malformed parameters'
        });
    }
    res.json({
        weight,
        height,
        bmi: bmi
    });
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target, } = req.body;
    console.log(daily_exercises, target);

    if( !daily_exercises || ! target){
        return res.status(400).send({ error: `parameters missing` });
    }
    if(!(daily_exercises instanceof Array) || isNaN(Number(target))){
        return res.status(400).send({ error: `malformed parameters` });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises( daily_exercises, target);
    return res.send(result);
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});