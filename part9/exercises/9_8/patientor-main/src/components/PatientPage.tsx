import axios from "axios"
import React from "react";
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../constants"
import { useStateValue } from '../state/state';
import { getPatient } from "../state";
import { Patient, Entry, NewEntry } from '../types';
import styled from 'styled-components'
import { Button } from "@material-ui/core";
import {HospitalForm} from "./HospitalForm";
import { addEntry } from '../state/reducer';
import { HealthCheckForm } from "./CheckForm";
import {OccForm} from "./OccForm";

const EntryStyled = styled.div`
    background: rgb(218,244,255);
    border: 4px rgb(245,245,245) solid;
    border-radius: 4px;
    font-size: 14px;
    padding: 1rem;
    margin: 1rem 0;
`

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    const [{ diagnosis }] = useStateValue();
    switch(entry.type) {
        case "Hospital":
            return (
                <EntryStyled>
                    <p>{entry.date}</p>
                    <p>{entry.specialist}</p>
                    <p>{entry.description}</p>
                    <p>{entry.type}</p>
                    <p>{entry.discharge.criteria} {entry.discharge.date}</p>
                    {entry.diagnosisCodes?.length ? 
                        <h4>Diagnoses</h4>: null
                    }
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(c =>
                            <li key={c}>
                                <strong>{c}</strong> - 
                                <span> {diagnosis[c] && diagnosis[c].name}</span>
                            </li>
                        )}
                    </ul>
                </EntryStyled>
            )
        case "HealthCheck":
            return (
                <EntryStyled>
                    <p>{entry.date}</p>
                    <p>{entry.specialist}</p>
                    <p>{entry.description}</p>
                    <p>{entry.type}</p>
                    <p>{entry.healthCheckRating}</p>
                    {entry.diagnosisCodes?.length ? 
                        <h4>Diagnoses</h4>: null
                    }
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(c =>
                            <li key={c}>
                                <strong>{c}</strong> - 
                                <span> {diagnosis[c] && diagnosis[c].name}</span>
                            </li>
                        )}
                    </ul>
                </EntryStyled>
            )
        case "OccupationalHealthcare":
            return (
                <EntryStyled>
                    <p>{entry.date}</p>
                    <p>{entry.specialist}</p>
                    <p>{entry.description}</p>
                    <p>{entry.type}</p>
                    <p>{entry.employerName}</p>
                    {entry.sickLeave ? <p><strong>sick leave: </strong>{entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>: null}
                    {entry.diagnosisCodes?.length ? 
                        <h4>Diagnoses</h4>: null
                    }
                    <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(c =>
                            <li key={c}>
                                <strong>{c}</strong> - 
                                <span> {diagnosis[c] && diagnosis[c].name}</span>
                            </li>
                        )}
                    </ul>
                </EntryStyled>
            )
    }
}

const PatientPage = ({id}: {id: string}) => {
    const [{ patient }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [entryType, setEntryType] = React.useState<String>();
    const [error, setError] = React.useState<string | undefined>();


    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
    };

    useEffect(() => {
        if(id === patient.id){
            return
        }
        const setPatient = async () => {
            try {
                const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                dispatch(getPatient(singlePatient))
            } catch (error) {
                let errorMessage = `Something went wrong`;
                if(axios.isAxiosError(error) && error.response){
                    errorMessage += ` Error: ${error.response.data.message}`;
                }
                console.error(errorMessage);
            }
        }
        void setPatient()
    }, [])

    const submitEntry = async (values: NewEntry) => {
        try {
            
          const { data: newPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          console.log(newPatient)
          dispatch(addEntry(newPatient));
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

    return (
        <div>
            <h1>{patient.name}</h1>
            <sub>{patient.gender}</sub>
            <p>ssn: {patient.ssn}</p>
            <p>DOB: {patient.dateOfBirth}</p>
            <p>Occupation: {patient.occupation}</p>
            <Button onClick={openModal}>Add Entry</Button>
            <select onChange={(e) => setEntryType(e.target.value)}>
                <option value="HealthCheckEntry">Health Check</option>
                <option value="HospitalEntry">Hospital</option>
                <option value="OccupationalHealthcareEntry">Occupational</option>
            </select>
            {   
                modalOpen && entryType === 'HospitalEntry' ? <HospitalForm onSubmit={submitEntry} onCancel={closeModal}/>:
                modalOpen && entryType === 'HealthCheckEntry' ?  <HealthCheckForm onSubmit={submitEntry} onCancel={closeModal}/>:
                modalOpen && entryType === 'OccupationalHealthcareEntry' ? <OccForm onSubmit={submitEntry} onCancel={closeModal}/>
                : null 
            }
            {patient.entries.map(e => 
                <EntryDetails key={e.id} entry={e} />    
            )}
        </div>
    )
}

export default PatientPage