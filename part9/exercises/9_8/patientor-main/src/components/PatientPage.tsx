import axios from "axios"
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../constants"
import { useStateValue } from '../state/state';
import { getPatient } from "../state";
import { Patient, Entry } from '../types';
import styled from 'styled-components'

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

const PatientPage = ({id}: {id: string | undefined}) => {
    const [{ patient }, dispatch] = useStateValue();
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

    return (
        <div>
            <h1>{patient.name}</h1>
            <sub>{patient.gender}</sub>
            <p>ssn: {patient.ssn}</p>
            <p>DOB: {patient.dateOfBirth}</p>
            <p>Occupation: {patient.occupation}</p>
            {patient.entries.length ? <h3>entries</h3>: null}
            {patient.entries.map(e => 
                <EntryDetails key={e.id} entry={e} />    
            )}
        </div>
    )
}

export default PatientPage