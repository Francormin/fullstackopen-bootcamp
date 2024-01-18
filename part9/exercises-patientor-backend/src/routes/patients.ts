import express from "express";
import patientService from "../services/patientService";
import { toNewEntryPatient, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatients() || [];
  return res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  return patient ? res.json(patient) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    return res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    return res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;

  try {
    const newEntry = toNewEntryPatient(req.body);
    const addedEntry = patientService.addEntryToPatient(id, newEntry);

    return res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    return res.status(400).send(errorMessage);
  }
});

export default router;
