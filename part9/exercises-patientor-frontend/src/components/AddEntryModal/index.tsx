import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  diagnoses: Array<Diagnosis>;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
