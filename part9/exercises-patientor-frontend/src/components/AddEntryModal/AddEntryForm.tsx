import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  entryType: EntryType;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Array<Diagnosis>;
}

const AddEntryForm = ({ entryType, onCancel, onSubmit, diagnoses }: Props) => {
  // base entry
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState<string>("");

  // health check entry
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | "">("");

  // hospital entry
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // occupational healthcare entry
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: [diagnosisCode],
      type: entryType
    });
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    if (value) {
      setDiagnosisCode(value);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const { value } = event.target;
    if (typeof value === "number") {
      setHealthCheckRating(value);
    }
  };

  return (
    <form onSubmit={addPatient}>
      <InputLabel style={{ marginTop: 20 }}>Entry Date</InputLabel>
      <TextField type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

      <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
      <TextField fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />

      <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
      <TextField fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />

      <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
      <Select fullWidth value={diagnosisCode} onChange={onDiagnosisCodesChange}>
        {diagnoses.map(diagnose => (
          <MenuItem key={diagnose.code} value={diagnose.code}>
            {diagnose.code}
          </MenuItem>
        ))}
      </Select>

      {entryType === EntryType.HealthCheck && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
          <Select fullWidth value={healthCheckRating} onChange={onHealthCheckRatingChange}>
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
          </Select>
        </>
      )}

      {entryType === EntryType.Hospital && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />

          <InputLabel style={{ marginTop: 20 }}>Discharge Criteria</InputLabel>
          <TextField
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}

      {entryType === EntryType.OccupationalHealthcare && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
          <TextField fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} />

          <InputLabel style={{ marginTop: 20 }}>Sick Leave - Start Date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />

          <InputLabel style={{ marginTop: 20 }}>Sick Leave - End Date</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </>
      )}

      <Grid mt={3}>
        <Grid item>
          <Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right"
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
