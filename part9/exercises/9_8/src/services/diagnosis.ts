import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnosis = ():Diagnosis[] => {
    return diagnoses;
};

export default {getDiagnosis};