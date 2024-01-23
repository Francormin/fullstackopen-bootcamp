import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio
} from "@mui/material";
import { Diagnosis, EntryFormValues, EntryType } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  entryType: EntryType | null;
  onEntryTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Array<Diagnosis>;
}

const AddEntryModal = ({ entryType, onEntryTypeChange, modalOpen, onClose, onSubmit, error, diagnoses }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>

      <FormControl sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
        <FormLabel id="demo-radio-buttons-group-label" sx={{ mb: 2 }}>
          Please, select the entry type:
        </FormLabel>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={entryType}
          onChange={onEntryTypeChange}
        >
          <FormControlLabel value={EntryType.HealthCheck} control={<Radio />} label="Health Check" />
          <FormControlLabel value={EntryType.Hospital} control={<Radio />} label="Hospital" />
          <FormControlLabel
            value={EntryType.OccupationalHealthcare}
            control={<Radio />}
            label="Occupational Healthcare"
          />
        </RadioGroup>
      </FormControl>

      {entryType === null ? null : (
        <DialogContent sx={{ mb: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Divider />
          <AddEntryForm entryType={entryType} onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddEntryModal;
