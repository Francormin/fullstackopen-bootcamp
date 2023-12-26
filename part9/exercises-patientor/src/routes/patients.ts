import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation } = req.body;

  if (!name || !dateOfBirth || !gender || !occupation) {
    return res.status(400).send({ error: "Missing name, dateOfBirth, gender, or occupation" });
  }

  try {
    const newPatient = patientService.addPatient({
      name,
      dateOfBirth,
      gender,
      occupation
    });

    return res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    return res.status(400).send(errorMessage);
  }
});

export default router;
