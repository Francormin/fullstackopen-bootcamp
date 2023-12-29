import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses() || [];
  return res.json(diagnoses);
});

router.post("/", (_req, res) => {
  return res.send("Saving a diagnose!");
});

export default router;
