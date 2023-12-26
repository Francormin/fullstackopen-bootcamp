import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    return res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    return res.status(400).send(errorMessage);
  }
});

export default router;
