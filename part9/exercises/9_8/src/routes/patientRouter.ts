import express from 'express';
import patients from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();


router.get('/', (_req,res) => {
    res.send(patients.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {

    const patient = patients.getPatientById(req.params.id);

    if(patient){
        res.send(patient);
    } else {
        res.sendStatus(404);
    }

});

router.post('/', (req,res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patients.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error) {
        let errorMessage = `Something is wrong.`;
        if(error instanceof Error){
            errorMessage += ` Error: ${error.message}`;
        }

        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req,res) => {
    const patient = patients.getPatientById(req.params.id);

    if(patient){
        try {
            const newEntry = toNewEntry(req.body);
            const newPatient = patients.addEntry(patient, newEntry)
            res.json(newPatient)
        } catch (error) {
            let errorMessage = `Something is wrong.`;
            if(error instanceof Error){
                errorMessage += ` Error: ${error.message}`;
            }

            res.status(400).send(errorMessage);
        }
    }
})

export default router;