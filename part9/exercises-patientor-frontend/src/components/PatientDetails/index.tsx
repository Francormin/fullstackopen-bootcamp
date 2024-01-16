import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [, setDiagnoses] = useState<Array<Diagnosis>>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getPatient = async () => {
        const patientFound = await patientService.getById(id);
        patientFound ? setPatient(patientFound) : null;
      };

      getPatient();
    }
  }, [id]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    getDiagnoses();
  }, []);

  return (
    <div>
      {patient ? (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <h2>{patient.name}</h2>
            {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </div>
          <div>
            <p>
              <b>ssn:</b> {patient.ssn}
            </p>
            <p>
              <b>date of birth:</b> {patient.dateOfBirth}
            </p>
            <p>
              <b>occupation:</b> {patient.occupation}
            </p>
          </div>
          <div>
            <h3>entries</h3>
            {patient.entries.map(entry => (
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </div>
          <Button variant="contained">add new entry</Button>
        </div>
      ) : (
        <p>Patient not found</p>
      )}
    </div>
  );
};

export default PatientDetails;
