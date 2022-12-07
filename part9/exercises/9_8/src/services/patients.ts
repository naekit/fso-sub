import patients from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

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

export default {
    getNonSensitivePatients,
    getPatients
};