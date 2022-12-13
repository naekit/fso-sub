export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  Check = "HealthCheck",
  Occupational = "OccupationalHealthcare",
  Hospital = "Hospital"
}

interface BaseEntry {
  type: EntryType
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.Check;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalEntry extends BaseEntry {
  type: EntryType.Occupational;
  employerName: string;
  sickLeave?: {startDate: string; endDate: string};
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry = | HealthCheckEntry | OccupationalEntry | HospitalEntry

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit <Patient, 'id' | 'entries'>;

export type NewBaseEntry = Omit <BaseEntry, 'id'>; 

export type NewEntry = Exclude <Entry, 'id'>;
