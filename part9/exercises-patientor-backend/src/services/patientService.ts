import { v1 as uuid } from "uuid";
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatient, Patient } from "../types";
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

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patientFound = patients.filter(patient => patient.id === patientId);

  if (!patientFound.length) throw Error("No such patient");
  else patientFound[0].entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntryToPatient
};
