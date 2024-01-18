import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Array<Diagnosis>;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes] = useState([]);
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: entryType
    });
  };

  const onEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    event.preventDefault();
    const { value } = event.target;
    const entryType = Object.values(EntryType).find(entryType => entryType === value);
    if (entryType) {
      setEntryType(entryType);
    }
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField label="Date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {/* <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select label="DiagnosisCodes" fullWidth value={diagnosisCodes}>
          {diagnoses.map(diagnose => (
            <MenuItem key={diagnose.code} value={diagnose.code}>
              {diagnose.code}
            </MenuItem>
          ))}
        </Select> */}

        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select label="EntryType" fullWidth value={entryType} onChange={onEntryTypeChange}>
          <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
          <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
        </Select>

        <Grid>
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
    </div>
  );
};

export default AddEntryForm;
