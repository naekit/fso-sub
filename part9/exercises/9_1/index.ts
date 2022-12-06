import express from 'express';
import {calculateBmi} from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req,res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    const bmi = calculateBmi(weight, height)
    if(isNaN(height) || isNaN(weight)){
        res.json({
            error: 'malformed parameters'
        })
    }
    res.json({
        weight,
        height,
        bmi: bmi
    })
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}/bmi`)
})