import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckEntry } from "../../types";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.healthCheckRating === 0 ? (
        <FavoriteIcon color="success" />
      ) : entry.healthCheckRating === 1 ? (
        <FavoriteIcon sx={{ color: "yellow" }} />
      ) : entry.healthCheckRating === 2 ? (
        <FavoriteIcon color="warning" />
      ) : (
        <FavoriteIcon color="error" />
      )}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryDetails;
