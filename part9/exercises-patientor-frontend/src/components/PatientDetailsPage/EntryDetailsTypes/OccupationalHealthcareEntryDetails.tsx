import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { OccupationalHealthcareEntryValues } from "../../../types";

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntryValues }> = ({ entry }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "5px",
        padding: "5px 10px",
        margin: "15px 0px"
      }}
    >
      <p
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >
        {entry.date} <MedicalInformationIcon /> {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave?.startDate && <p>start date: {entry.sickLeave.startDate}</p>}
      {entry.sickLeave?.endDate && <p>end date: {entry.sickLeave.endDate}</p>}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
