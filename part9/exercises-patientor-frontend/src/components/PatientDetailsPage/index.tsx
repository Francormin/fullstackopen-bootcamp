import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";

import { Diagnosis, EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetailsTypes";
import AddEntryModal from "../AddEntryModal";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { id } = useParams();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError("");
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await patientService.addEntry(id, values);
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          const message = error.response.data.replace("Something went wrong. Error: ", "");
          setError(message);
          setTimeout(() => {
            setError("");
          }, 3500);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 3500);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const getPatient = async () => {
        const patientFound = await patientService.getById(id);
        patientFound ? setPatient(patientFound) : null;
      };

      getPatient();
    }
  }, [id, patient]);

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            diagnoses={diagnoses}
          />
          <Button variant="contained" onClick={() => openModal()}>
            add new entry
          </Button>
        </div>
      ) : (
        <p>Patient not found</p>
      )}
    </div>
  );
};

export default PatientDetails;
