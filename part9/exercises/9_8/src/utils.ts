import { NewPatient, Gender, NewEntry, NewBaseEntry, Diagnosis, EntryType, HealthCheckRating } from './types';
type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isStringArray = (arr: unknown[]): arr is string[] => {
    const nonStrings = arr.some((item) => {
        return !isString(item);
    })

    return !nonStrings
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error(`Incorrect or missing name ${name}`);
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){ 
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }

    return ssn;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error(`Incorrect or missing date ${date}`);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }

    return occupation;
};


export const toNewPatient = ({name, ssn, dateOfBirth, gender, occupation }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };

    return newPatient;
};

const isRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating)
}

const getEntryType = (entryType: any): EntryType => { 
    if(!Object.values(EntryType).includes(entryType)){
        throw new Error(`Wrong Entry type!`)
    }
    return entryType 
}

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)){
        throw new Error(`Incorrect or missing entry type: ${description}`)
    }
    return description
}
const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error(`Incorrect or missing entry type: ${specialist}`)
    }
    return specialist
}

const parseDiagnosis = (diagnosisCodes: unknown): Diagnosis['code'][] => {
    if(!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)){
        throw new Error(`Incorrect or missing diagnoses`)
    }
    return diagnosisCodes
}

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)){
        throw new Error(`Missing discharge criteria`)
    }
    return criteria
}

const parseEmployer = (employer: unknown): string => {
    if(!employer || !isString(employer)){
        throw new Error(`Missing discharge employer`)
    }
    return employer
}

const parseDischarge = ({date, criteria} : {date:unknown, criteria: unknown}): {date: string; criteria: string} => {
    if(!date && !criteria){
        throw new Error(`Missing discharge`)
    }
    return {
        date: parseDate(date),
        criteria: parseCriteria(criteria)
    }
}

const parseSickLeave = ({startDate, endDate} : {startDate:unknown, endDate: unknown}): {startDate: string; endDate: string} => {
    if(!startDate && !endDate){
        throw new Error(`Missing sick leave date`)
    }
    return {
        startDate: parseDate(startDate),
        endDate: parseDate(endDate)
    }
}

const parseHealthCheck = (healthCheck: any): HealthCheckRating => {
    if( healthCheck === null || healthCheck === undefined || !isRating(healthCheck)){
        throw new Error(`Incorrect or missing health check`)
    }

    return healthCheck
}


const parseBaseEntry = (object: any): NewBaseEntry => {
    const baseEntry: NewBaseEntry = {
        type: getEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
    }
    object.diagnosisCodes ? baseEntry.diagnosisCodes = parseDiagnosis(object.diagnosisCodes): null

    return baseEntry
}

export const toNewEntry = (object: any): NewEntry => {
    const baseEntry = parseBaseEntry(object) as NewEntry;

    const entryType = baseEntry.type

    switch(entryType){
        case EntryType.Check:
            return {
                ...baseEntry,
                healthCheckRating: parseHealthCheck(object.healthCheckRating)
            }
        case EntryType.Occupational:
            const occEntry = {
                ...baseEntry,
                employerName: parseEmployer(object.employerName),
            }

            object.sickLeave ? occEntry.sickLeave = parseSickLeave(object.sickLeave): null

            return occEntry
        case EntryType.Hospital:
            return {
                ...baseEntry,
                discharge: parseDischarge(object.discharge)
            }
        default:
            return baseEntry
    }
}