import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from "@mui/material";
import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v,
  label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender | "">("");

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender: gender as Gender
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField label="Name" fullWidth value={name} onChange={({ target }) => setName(target.value)} required />
        <TextField
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
          required
        />
        <TextField
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
          required
        />

        <InputLabel htmlFor="dateOfBirth" style={{ marginTop: 20 }} required>
          Date of Birth
        </InputLabel>
        <TextField
          id="dateOfBirth"
          type="date"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }} required>
          Gender
        </InputLabel>
        <Select fullWidth value={gender} onChange={onGenderChange}>
          {genderOptions.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

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
    </div>
  );
};

export default AddPatientForm;
