import express from 'express';
import diagnosis from '../services/diagnosis';
const router = express.Router();


router.get('/', (_req, res) => {
    res.send(diagnosis.getDiagnosis());
});


export default router;