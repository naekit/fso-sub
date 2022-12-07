import express from 'express';
import patients from '../services/patients';
import toNewPatient from '../utils';
const router = express.Router();


router.get('/', (_req,res) => {
    res.send(patients.getNonSensitivePatients());
});

router.post('/', (req,res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patients.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error) {
        let errorMessage = `Somthing is wrong.`;
        if(error instanceof Error){
            errorMessage += ` Error: ${error.message}`;
        }

        res.status(400).send(errorMessage);
    }
});

export default router;