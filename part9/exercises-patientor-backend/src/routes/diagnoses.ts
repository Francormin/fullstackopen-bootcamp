import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosisService.getDiagnoses() || [];
  return res.json(diagnoses);
});

router.post("/", (_req, res) => {
  return res.send("Saving a diagnose!");
});

export default router;
