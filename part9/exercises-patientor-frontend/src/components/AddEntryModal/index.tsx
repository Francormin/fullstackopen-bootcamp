import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
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
      <div>
        <input
          type="radio"
          id="hospital"
          name="entryType"
          value={EntryType.Hospital}
          checked={entryType === EntryType.Hospital}
          onChange={onEntryTypeChange}
        />
        <label htmlFor="hospital">Hospital</label>
      </div>
      <div>
        <input
          type="radio"
          id="healthCheck"
          name="entryType"
          value={EntryType.HealthCheck}
          checked={entryType === EntryType.HealthCheck}
          onChange={onEntryTypeChange}
        />
        <label htmlFor="healthCheck">Health Check</label>
      </div>
      <div>
        <input
          type="radio"
          id="occupationalHealthcare"
          name="entryType"
          value={EntryType.OccupationalHealthcare}
          checked={entryType === EntryType.OccupationalHealthcare}
          onChange={onEntryTypeChange}
        />
        <label htmlFor="occupationalHealthcare">Occupational Healthcare</label>
      </div>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {entryType !== null ? (
          <AddEntryForm entryType={entryType} onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
