import uuid = require('uuid');
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getNonSensitivePatients = ():NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatients = ():Patient[] => {
    return patients;
};

const addPatient = (patient: NewPatient): Patient => {
    const newId: string = uuid.v4();
    const newPatient = {
        id: newId,
        ...patient
    };
    
    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatients,
    getPatients,
    addPatient
};