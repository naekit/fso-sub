import React from "react";
import axios from "axios";
import styled from 'styled-components';
import {  Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import PatientPage from './components/PatientPage';
import { setPatients, getDiagnoses } from './state/reducer';

const App = () => {
  const [, dispatch] = useStateValue();
  const match = useMatch('/:id')

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const getDiagnosesList = async () => {
      try {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        dispatch(getDiagnoses(diagnosisList))
      }
     catch (error: unknown) {
      let errorMessage = `Something went wrong`;
      if(axios.isAxiosError(error) && error.response){
        errorMessage += ` Error: ${error.response.data.message}`;
      }
      console.error(errorMessage);
      }  
    }

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatients(patientListFromApi));
      } catch (error: unknown) {
        let errorMessage = `Something went wrong`;
        if(axios.isAxiosError(error) && error.response){
          errorMessage += ` Error: ${error.response.data.message}`;
        }
        console.error(errorMessage);
      }
    };
    void getDiagnosesList();
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/:id" element={<PatientPage id={match?.params.id}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
