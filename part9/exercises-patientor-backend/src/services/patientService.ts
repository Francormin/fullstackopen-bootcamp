import { v1 as uuid } from "uuid";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import patients from "../data/patients";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient
};
