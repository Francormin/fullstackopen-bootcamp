import { useState, SyntheticEvent } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  Checkbox,
  ListItemText
} from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  entryType: EntryType;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Array<Diagnosis>;
}

const healthCheckOptions: { rating: number; label: HealthCheckRating }[] = [
  {
    rating: 0,
    label: HealthCheckRating.Healthy
  },
  {
    rating: 1,
    label: HealthCheckRating.LowRisk
  },
  {
    rating: 2,
    label: HealthCheckRating.HighRisk
  },
  {
    rating: 3,
    label: HealthCheckRating.CriticalRisk
  }
];

const AddEntryForm = ({ entryType, onCancel, onSubmit, diagnoses }: Props) => {
  // base entry
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  // health check entry
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">("");

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
      diagnosisCodes: diagnosisCodes,
      type: entryType
    });
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<Array<string>>) => {
    const { value } = event.target;
    if (value) {
      setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
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
      <InputLabel htmlFor="entryDate" style={{ marginTop: 20 }} required>
        Entry Date
      </InputLabel>
      <Input id="entryDate" type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

      <InputLabel htmlFor="description" style={{ marginTop: 20 }} required>
        Description
      </InputLabel>
      <Input id="description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />

      <InputLabel htmlFor="specialist" style={{ marginTop: 20 }} required>
        Specialist
      </InputLabel>
      <Input id="specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />

      <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
      <Select
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={onDiagnosisCodesChange}
        renderValue={selected => Array.isArray(selected) && selected.join(", ")}
      >
        {diagnoses.map(diagnose => (
          <MenuItem key={diagnose.code} value={diagnose.code}>
            <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
            <ListItemText primary={diagnose.code} />
          </MenuItem>
        ))}
      </Select>

      {entryType === EntryType.HealthCheck && (
        <>
          <InputLabel style={{ marginTop: 20 }} required>
            Health Check Rating
          </InputLabel>
          <Select fullWidth value={healthCheckRating} onChange={onHealthCheckRatingChange}>
            {healthCheckOptions.map(option => (
              <MenuItem key={option.rating} value={option.rating}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {entryType === EntryType.Hospital && (
        <>
          <InputLabel htmlFor="dischargeDate" style={{ marginTop: 20 }}>
            Discharge Date
          </InputLabel>
          <Input
            id="dischargeDate"
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />

          <InputLabel htmlFor="dischargeCriteria" style={{ marginTop: 20 }}>
            Discharge Criteria
          </InputLabel>
          <Input
            id="dischargeCriteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}

      {entryType === EntryType.OccupationalHealthcare && (
        <>
          <InputLabel htmlFor="employerName" style={{ marginTop: 20 }} required>
            Employer Name
          </InputLabel>
          <Input
            id="employerName"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />

          <InputLabel htmlFor="sickLeaveStartDate" style={{ marginTop: 20 }}>
            Sick Leave - Start Date
          </InputLabel>
          <Input
            id="sickLeaveStartDate"
            type="date"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />

          <InputLabel htmlFor="sickLeaveEndDate" style={{ marginTop: 20 }}>
            Sick Leave - End Date
          </InputLabel>
          <Input
            id="sickLeaveEndDate"
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
