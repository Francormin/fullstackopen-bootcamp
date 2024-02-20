import { EntryValues } from "../../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDetails: React.FC<{ entry: EntryValues }> = ({ entry }) => {
  switch (entry.type) {
    case "hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "occupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "healthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      throw new Error("Invalid type for EntryDetails");
  }
};

export default EntryDetails;
