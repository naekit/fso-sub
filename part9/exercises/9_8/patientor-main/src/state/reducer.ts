import { State } from "./state";
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
    type: "GET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: action.payload
      }
    case "GET_DIAGNOSES":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnosis
        }
      }
    case "ADD_ENTRY":
      console.log(action.payload)
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload
          }
        }
      }
    default:
      return state;
  }
};

export const setPatients = (initialPatients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: initialPatients
  }
}

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  }
}

export const getPatient = (singlePatient: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: singlePatient
  }
}

export const getDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "GET_DIAGNOSES",
    payload: diagnoses
  }
}

export const addEntry = (patient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: patient
  }
}