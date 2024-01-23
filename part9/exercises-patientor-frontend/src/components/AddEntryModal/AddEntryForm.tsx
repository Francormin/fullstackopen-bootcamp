import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";

interface Props {
  entryType: EntryType;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Array<Diagnosis>;
}

const AddEntryForm = ({ entryType, onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">("");

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
    if (value) {
      setHealthCheckRating(Number(value));
    }
  };

  return (
    <form onSubmit={addPatient}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />

      <TextField type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

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
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
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
