import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../../../types";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.discharge?.date && <p>discharge date: {entry.discharge.date}</p>}
      {entry.discharge?.criteria && <p>criteria: {entry.discharge.criteria}</p>}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryDetails;
