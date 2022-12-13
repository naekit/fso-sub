import uuid = require('uuid');
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';

let allPatients = [...patients];

const getNonSensitivePatients = ():NonSensitivePatient[] => {
    return allPatients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatients = ():Patient[] => {
    return allPatients;
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = allPatients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newId: string = uuid.v4();
    const newPatient = {
        id: newId,
        ...patient,
        entries: [] as Entry[]
    };
    
    allPatients.concat(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry: Entry = {...newEntry, id: uuid.v4()};
    const savePatient = {...patient, entries: patient.entries.concat(entry)}

    allPatients = allPatients.map((p) => p.id === savePatient.id ? savePatient: p);

    return savePatient;
}

export default {
    getNonSensitivePatients,
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};